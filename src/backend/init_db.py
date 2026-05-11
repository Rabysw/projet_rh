import os
import json
import psycopg2
from supabase import create_client
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
database_url = os.getenv("DATABASE_URL")

if not supabase_url or not supabase_key:
    raise ValueError("Erreur : SUPABASE_URL ou SUPABASE_KEY est manquant dans le fichier .env")

client = create_client(supabase_url, supabase_key)

# Create tables using SQL
# Added DROP TABLE commands to ensure schema matches expectations if tables already exist
sql_commands = """
-- Cleanup existing conflicting tables if they exist
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS leave_requests CASCADE;
DROP TABLE IF EXISTS leave_balances CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS suggestions CASCADE;
DROP TABLE IF EXISTS development_goals CASCADE;
DROP TABLE IF EXISTS payslips CASCADE;
DROP TABLE IF EXISTS trainings CASCADE;
DROP TABLE IF EXISTS available_trainings CASCADE;
DROP TABLE IF EXISTS certificates CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS team_stats CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS system_users CASCADE;
DROP TABLE IF EXISTS employees CASCADE;

-- Employees table
CREATE TABLE IF NOT EXISTS employees ( -- Module 01 Administration du Personnel
    id SERIAL PRIMARY KEY,
    matricule VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birth_date DATE,
    birth_place VARCHAR(100),
    nationality VARCHAR(100),
    gender VARCHAR(10),
    marital_status VARCHAR(50),
    children_count INTEGER DEFAULT 0,
    id_card_number VARCHAR(50),
    id_card_type VARCHAR(50),
    id_card_expiry DATE,
    address TEXT,
    personal_phone VARCHAR(50),
    personal_email VARCHAR(255),
    emergency_contact_name VARCHAR(255),
    emergency_contact_relation VARCHAR(100),
    emergency_contact_phone VARCHAR(50),
    hire_date DATE NOT NULL,
    position VARCHAR(100),
    diploma VARCHAR(255),
    department_id INTEGER, -- Assuming a departments table exists or will exist
    manager_id INTEGER REFERENCES employees(id),
    contract_type VARCHAR(50),
    contract_status VARCHAR(50) DEFAULT 'actif', -- Actif, Suspendu, Démissionnaire, Licencié
    contract_start DATE,
    contract_end DATE,
    essai_fin_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    professional_email VARCHAR(255) UNIQUE NOT NULL,
    professional_phone VARCHAR(50),
    work_location VARCHAR(100),
    base_salary NUMERIC, -- En FCFA
    num_cnss VARCHAR(50),
    ifu VARCHAR(50),
    situation_fiscale VARCHAR(50) DEFAULT 'Célibataire',
    visite_medicale_date DATE,
    sanctions JSONB DEFAULT '[]'::jsonb,
    profile_picture_url TEXT,
    performance_score INTEGER DEFAULT 80,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leave balances table
CREATE TABLE IF NOT EXISTS leave_balances (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    leave_type VARCHAR(50) NOT NULL,
    total NUMERIC DEFAULT 0, -- Changed to NUMERIC for 2.5 days/month
    used NUMERIC DEFAULT 0,
    remaining NUMERIC DEFAULT 0,
    year INTEGER DEFAULT 2024
);

-- Leave requests table
CREATE TABLE IF NOT EXISTS leave_requests (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    leave_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payslips table
CREATE TABLE IF NOT EXISTS payslips (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    gross_amount INTEGER NOT NULL,
    net_amount INTEGER NOT NULL,
    payment_date DATE,
    deductions JSONB
);

-- Trainings table
CREATE TABLE IF NOT EXISTS trainings (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'in_progress',
    start_date DATE,
    duration VARCHAR(50),
    progress INTEGER DEFAULT 0,
    category VARCHAR(100)
);

-- Available trainings
CREATE TABLE IF NOT EXISTS available_trainings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    duration VARCHAR(50), -- e.g., '8h', '2 jours'
    deadline DATE
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    obtained_date DATE
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    skill_name VARCHAR(100) NOT NULL,
    level INTEGER DEFAULT 0,
    category VARCHAR(100)
);

-- Development goals table
CREATE TABLE IF NOT EXISTS development_goals (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    title TEXT NOT NULL,
    target_date VARCHAR(20),
    progress INTEGER DEFAULT 0
);

-- Suggestions table
CREATE TABLE IF NOT EXISTS suggestions (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    title VARCHAR(255) NOT NULL,
    tracking_number VARCHAR(50) UNIQUE, -- Module 06
    category VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    likes INTEGER DEFAULT 0,
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team members (for managers)
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER,
    employee_id INTEGER,
    role VARCHAR(100),
    skills JSONB,
    performance INTEGER DEFAULT 0
);

-- Team leave requests
CREATE TABLE IF NOT EXISTS team_leave_requests (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER,
    employee_id INTEGER,
    leave_type VARCHAR(50) NOT NULL,
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20) NOT NULL,
    days INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    reason TEXT
);

-- Team skills stats
CREATE TABLE IF NOT EXISTS team_skills_stats (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER,
    skill_name VARCHAR(100) NOT NULL,
    total_members INTEGER DEFAULT 0,
    certified_count INTEGER DEFAULT 0,
    in_progress_count INTEGER DEFAULT 0
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER,
    name VARCHAR(255) NOT NULL,
    progress INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'on_track',
    deadline DATE,
    owner VARCHAR(255)
);

-- KPIs table
CREATE TABLE IF NOT EXISTS kpis (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER,
    label VARCHAR(100) NOT NULL,
    current_value INTEGER DEFAULT 0,
    target_value INTEGER DEFAULT 0,
    unit VARCHAR(20)
);

-- Contracts table (for Resp RH)
CREATE TABLE IF NOT EXISTS contracts (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER,
    contract_type VARCHAR(50) NOT NULL,
    contract_start DATE NOT NULL, -- Renamed from start_date
    contract_end DATE, -- Renamed from end_date
    contract_duration_months INTEGER, -- Added for clarity
    status VARCHAR(20) DEFAULT 'active',
    alert TEXT
);

-- System users table (for Admin RH)
CREATE TABLE IF NOT EXISTS system_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    last_login VARCHAR(20)
);

-- Role stats
CREATE TABLE IF NOT EXISTS role_stats (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    count INTEGER DEFAULT 0,
    color VARCHAR(50)
);

-- Reports table (for Direction)
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    date DATE,
    file_size VARCHAR(20),
    status VARCHAR(20) DEFAULT 'available'
);

-- Direction KPIs
CREATE TABLE IF NOT EXISTS direction_kpis (
    id SERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(50),
    change VARCHAR(20)
);

-- Employee stats
CREATE TABLE IF NOT EXISTS employee_stats (
    id SERIAL PRIMARY KEY,
    total_count INTEGER DEFAULT 0,
    active_count INTEGER DEFAULT 0,
    on_leave_count INTEGER DEFAULT 0,
    new_this_month INTEGER DEFAULT 0
);

-- Contract alerts
CREATE TABLE IF NOT EXISTS contract_alerts (
    id SERIAL PRIMARY KEY,
    expiring_30_days INTEGER DEFAULT 0,
    expiring_60_days INTEGER DEFAULT 0,
    active_count INTEGER DEFAULT 0
);

-- Team stats
CREATE TABLE IF NOT EXISTS team_stats (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER,
    total_members INTEGER DEFAULT 0,
    active_count INTEGER DEFAULT 0,
    on_leave_count INTEGER DEFAULT 0,
    total_skills_certified INTEGER DEFAULT 0,
    avg_performance INTEGER DEFAULT 0,
    attendance_rate INTEGER DEFAULT 0,
    performance_change VARCHAR(20)
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    date VARCHAR(20) NOT NULL,
    clock_in TIME NOT NULL, -- Changed to TIME
    clock_out VARCHAR(10),
    location VARCHAR(100) DEFAULT 'Bureau'
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    content TEXT,
    target_audience VARCHAR(100),
    publish_date VARCHAR(50),
    requires_acknowledgment BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'Publiée'
);

-- Note acknowledgments
CREATE TABLE IF NOT EXISTS note_acknowledgments (
    id SERIAL PRIMARY KEY,
    note_id INTEGER REFERENCES notes(id),
    employee_id INTEGER REFERENCES employees(id),
    acknowledged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    date_time VARCHAR(50),
    location VARCHAR(255),
    participants VARCHAR(255),
    description TEXT
);

-- Meetings table
CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    date VARCHAR(20),
    instance_type VARCHAR(100),
    participants JSONB,
    agenda TEXT,
    report_url TEXT,
    decisions JSONB,
    status VARCHAR(20)
);

-- Collab of the month
CREATE TABLE IF NOT EXISTS collab_of_the_month (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(100),
    model VARCHAR(100),
    plate VARCHAR(20) UNIQUE,
    status VARCHAR(50),
    assigned_to INTEGER REFERENCES employees(id),
    assignment_history JSONB DEFAULT '[]'::jsonb,
    next_maintenance VARCHAR(20)
);

-- Badges table
CREATE TABLE IF NOT EXISTS badges (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    uid VARCHAR(50) UNIQUE,
    status VARCHAR(50)
); 

-- Career goals table
CREATE TABLE IF NOT EXISTS career_goals (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    short_term TEXT,
    medium_term TEXT,
    target_position VARCHAR(100), -- e.g., 'Lead Tech'
    progress INTEGER DEFAULT 0
);

-- Mobility requests
CREATE TABLE IF NOT EXISTS mobility_requests (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    target_position VARCHAR(100),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

def execute_sql_direct(db_url, sql):
    """Executes SQL commands directly via psycopg2"""
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        cur.execute(sql)
        conn.commit()
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"psycopg2 error: {e}")
        return False

# Execute SQL to create tables
print("Creating tables...")
if database_url:
    if execute_sql_direct(database_url, sql_commands):
        print("Tables created successfully via psycopg2!")
else:
    try:
        response = client.postgrest.rpc('exec_sql', {'query': sql_commands}).execute()
        print("Tables created successfully via RPC!")
    except Exception as e:
        print(f"Error creating tables: {e}")
        print("\nTIP: If RPC fails, ensure 'exec_sql' is defined in Supabase OR add DATABASE_URL to your .env file.")

# Insert sample data
# Ensure sample data matches the new, corrected schema
sample_data = {
    "employees": [
        {
            "id": 1, "matricule": "EMP-001", "first_name": "Jean", "last_name": "Dupont",
            "birth_date": "1990-01-15", "birth_place": "Cotonou", "nationality": "Béninoise",
            "gender": "Homme", "marital_status": "Célibataire", "children_count": 0,
            "id_card_number": "123456789", "id_card_type": "CNI", "id_card_expiry": "2028-12-31",
            "address": "123 Rue de la Joie, Cotonou", "personal_phone": "+229 97000001",
            "personal_email": "jean.dupont.perso@email.com",
            "emergency_contact_name": "Maman Dupont", "emergency_contact_relation": "Mère", "emergency_contact_phone": "+229 97000002",
            "hire_date": "2022-03-15", "position": "Développeur Senior", "diploma": "Master Informatique",
            "department_id": 1, "manager_id": 2, "contract_type": "CDI", "contract_status": "actif",
            "contract_start": "2022-03-15", "contract_end": None, "essai_fin_date": None, "status": "active",
            "professional_email": "collab@ices.bj", "professional_phone": "+229 97000003",
            "work_location": "Bureau", "base_salary": 850000, "num_cnss": "CNSS12345", "ifu": "IFU67890",
            "situation_fiscale": "Célibataire", "visite_medicale_date": "2024-10-01",
            "performance_score": 92, "created_at": "2022-03-15T08:00:00", "updated_at": "2024-05-01T10:00:00"
        },
        {
            "id": 2, "matricule": "EMP-002", "first_name": "Marie", "last_name": "Laurent",
            "birth_date": "1988-06-20", "birth_place": "Porto-Novo", "nationality": "Béninoise",
            "gender": "Femme", "marital_status": "Marié(e)", "children_count": 1,
            "id_card_number": "987654321", "id_card_type": "Passeport", "id_card_expiry": "2027-06-30",
            "address": "456 Avenue de la Liberté, Cotonou", "personal_phone": "+229 96000001",
            "personal_email": "marie.laurent.perso@email.com",
            "emergency_contact_name": "Mari Laurent", "emergency_contact_relation": "Époux", "emergency_contact_phone": "+229 96000002",
            "hire_date": "2021-06-01", "position": "Chef de projet", "diploma": "Ingénieur Logiciel",
            "department_id": 1, "manager_id": 5, "contract_type": "CDI", "contract_status": "actif",
            "contract_start": "2021-06-01", "contract_end": None, "essai_fin_date": None, "status": "active",
            "professional_email": "manager@ices.bj", "professional_phone": "+229 96000003",
            "work_location": "Bureau", "base_salary": 1200000, "num_cnss": "CNSS54321", "ifu": "IFU09876",
            "situation_fiscale": "Marié(e)", "visite_medicale_date": "2025-03-15",
            "performance_score": 88, "created_at": "2021-06-01T09:00:00", "updated_at": "2024-05-01T11:00:00"
        },
        {
            "id": 3, "matricule": "EMP-003", "first_name": "Sophie", "last_name": "Bernard",
            "birth_date": "1985-03-10", "birth_place": "Abomey", "nationality": "Béninoise",
            "gender": "Femme", "marital_status": "Célibataire", "children_count": 0,
            "id_card_number": "112233445", "id_card_type": "CNI", "id_card_expiry": "2026-08-20",
            "address": "789 Rue du Marché, Cotonou", "personal_phone": "+229 95000001",
            "personal_email": "sophie.bernard.perso@email.com",
            "emergency_contact_name": "Frère Bernard", "emergency_contact_relation": "Frère", "emergency_contact_phone": "+229 95000002",
            "hire_date": "2020-09-20", "position": "Responsable RH", "diploma": "Master RH",
            "department_id": 2, "manager_id": 5, "contract_type": "CDI", "contract_status": "actif",
            "contract_start": "2020-09-20", "contract_end": None, "essai_fin_date": None, "status": "active",
            "professional_email": "rh@ices.bj", "professional_phone": "+229 95000003",
            "work_location": "Bureau", "base_salary": 1000000, "num_cnss": "CNSS98765", "ifu": "IFU43210",
            "situation_fiscale": "Célibataire", "visite_medicale_date": "2024-11-01",
            "performance_score": 90, "created_at": "2020-09-20T10:00:00", "updated_at": "2024-05-01T12:00:00"
        },
        {
            "id": 4, "matricule": "EMP-004", "first_name": "Admin", "last_name": "Système",
            "birth_date": "1980-02-01", "birth_place": "Parakou", "nationality": "Béninoise",
            "gender": "Homme", "marital_status": "Marié(e)", "children_count": 2,
            "id_card_number": "667788990", "id_card_type": "CNI", "id_card_expiry": "2029-01-01",
            "address": "101 Rue de l'IT, Cotonou", "personal_phone": "+229 94000001",
            "personal_email": "admin.sys.perso@email.com",
            "emergency_contact_name": "Épouse Admin", "emergency_contact_relation": "Épouse", "emergency_contact_phone": "+229 94000002",
            "hire_date": "2020-01-10", "position": "Administrateur Système", "diploma": "Licence Informatique",
            "department_id": 3, "manager_id": 5, "contract_type": "CDI", "contract_status": "actif",
            "contract_start": "2020-01-10", "contract_end": None, "essai_fin_date": None, "status": "active",
            "professional_email": "admin@ices.bj", "professional_phone": "+229 94000003",
            "work_location": "Bureau", "base_salary": 950000, "num_cnss": "CNSS11223", "ifu": "IFU44556",
            "situation_fiscale": "Marié(e)", "visite_medicale_date": "2024-09-01",
            "performance_score": 95, "created_at": "2020-01-10T09:00:00", "updated_at": "2024-05-01T13:00:00"
        },
        {
            "id": 5, "matricule": "EMP-005", "first_name": "Pierre", "last_name": "Martin",
            "birth_date": "1975-07-04", "birth_place": "Cotonou", "nationality": "Béninoise",
            "gender": "Homme", "marital_status": "Marié(e)", "children_count": 3,
            "id_card_number": "001122334", "id_card_type": "CNI", "id_card_expiry": "2030-05-01",
            "address": "200 Boulevard de la République, Cotonou", "personal_phone": "+229 93000001",
            "personal_email": "pierre.martin.perso@email.com",
            "emergency_contact_name": "Épouse Martin", "emergency_contact_relation": "Épouse", "emergency_contact_phone": "+229 93000002",
            "hire_date": "2019-01-01", "position": "Directeur Général", "diploma": "MBA",
            "department_id": 4, "manager_id": None, "contract_type": "CDI", "contract_status": "actif",
            "contract_start": "2019-01-01", "contract_end": None, "essai_fin_date": None, "status": "active",
            "professional_email": "dir@ices.bj", "professional_phone": "+229 93000003",
            "work_location": "Bureau", "base_salary": 2500000, "num_cnss": "CNSS00112", "ifu": "IFU33445",
            "situation_fiscale": "Marié(e)", "visite_medicale_date": "2025-01-01",
            "performance_score": 98, "created_at": "2019-01-01T08:00:00", "updated_at": "2024-05-01T14:00:00"
        }
    ],
    "leave_balances": [
        {"employee_id": 1, "leave_type": "Congés payés", "total": 25.0, "used": 12.0, "remaining": 13.0, "year": 2024},
        {"employee_id": 1, "leave_type": "RTT", "total": 12.0, "used": 5.0, "remaining": 7.0, "year": 2024},
        {"employee_id": 1, "leave_type": "Maladie", "total": 10.0, "used": 2.0, "remaining": 8.0, "year": 2024},
    ],
    "leave_requests": [
        {"employee_id": 1, "leave_type": "Congés payés", "start_date": "2024-07-15", "end_date": "2024-07-26", "days": 10, "status": "approved", "reason": "Vacances famille"},
        {"employee_id": 1, "leave_type": "RTT", "start_date": "2024-05-20", "end_date": "2024-05-20", "days": 1, "status": "approved", "reason": "Démarches admin"},
    ],
    "payslips": [
        {"employee_id": 1, "month": "Mai 2024", "year": 2024, "gross_amount": 850000, "net_amount": 680000, "payment_date": "2024-05-31", "deductions": [{"label": "CNSS", "amount": 42500}, {"label": "AMO", "amount": 25500}, {"label": "IRPP", "amount": 127500}]},
        {"employee_id": 1, "month": "Avril 2024", "year": 2024, "gross_amount": 850000, "net_amount": 680000, "payment_date": "2024-04-30", "deductions": [{"label": "CNSS", "amount": 42500}, {"label": "AMO", "amount": 25500}, {"label": "IRPP", "amount": 127500}]},
    ],
    "trainings": [
        {"employee_id": 1, "title": "Sécurité informatique — Niveau 1", "status": "completed", "start_date": "2024-03-15", "duration": "8h", "progress": 100, "category": "IT"},
        {"employee_id": 1, "title": "Leadership & Management", "status": "in_progress", "start_date": "2024-06-10", "duration": "16h", "progress": 65, "category": "Management"},
    ],
    "available_trainings": [
        {"title": "AWS Certified Solutions Architect", "category": "Cloud", "duration": "40h", "deadline": "2024-09-30"},
        {"title": "Scrum Master Certification", "category": "Agile", "duration": "16h", "deadline": "2024-08-15"},
    ],
    "certificates": [
        {"employee_id": 1, "title": "React Advanced Patterns", "issuer": "ICES Academy", "obtained_date": "2024-01-20"},
        {"employee_id": 1, "title": "Sécurité informatique N1", "issuer": "Cybersafe", "obtained_date": "2024-03-15"},
    ],
    "skills": [
        {"employee_id": 1, "skill_name": "React / Next.js", "level": 90, "category": "Frontend"},
        {"employee_id": 1, "skill_name": "TypeScript", "level": 85, "category": "Langage"},
        {"employee_id": 1, "skill_name": "Node.js", "level": 80, "category": "Backend"},
    ],
    "development_goals": [
        {"employee_id": 1, "title": "AWS Solutions Architect", "target_date": "2024-09-30", "progress": 45},
        {"employee_id": 1, "title": "Anglais C1", "target_date": "2024-12-31", "progress": 60},
    ],
    "suggestions": [
        {"employee_id": 1, "title": "Ajouter des casiers pour les vélos", "tracking_number": "SUG-2024-001", "category": "work_env", "status": "reviewed", "likes": 12, "response": "En cours d'étude pour juillet 2024"},
        {"employee_id": 1, "title": "Horaires flexibles le vendredi", "tracking_number": "SUG-2024-002", "category": "process", "status": "implemented", "likes": 28, "response": "Implémenté depuis mai 2024"},
    ],
    "team_members": [
        {"manager_id": 2, "employee_id": 1, "role": "Développeur", "skills": ["React", "Node.js"], "performance": 92},
    ],
    "team_stats": [
        {"manager_id": 2, "total_members": 8, "active_count": 6, "on_leave_count": 2, "total_skills_certified": 24, "avg_performance": 88, "attendance_rate": 94, "performance_change": "+3%"},
    ],
    "team_leave_requests": [
        {"manager_id": 2, "employee_id": 1, "leave_type": "Congés payés", "start_date": "15/06/2024", "end_date": "28/06/2024", "days": 10, "status": "pending", "reason": "Vacances famille"},
    ],
    "team_skills_stats": [
        {"manager_id": 2, "skill_name": "React", "total_members": 8, "certified_count": 6, "in_progress_count": 2}, # Assuming manager_id 2 is Marie Laurent
        {"manager_id": 2, "skill_name": "TypeScript", "total_members": 8, "certified_count": 5, "in_progress_count": 3}, # Assuming manager_id 2 is Marie Laurent
    ],
    "projects": [
        {"id": 1, "manager_id": 2, "name": "Migration AWS", "progress": 75, "status": "on_track", "deadline": "2024-06-30", "owner": "Lucas Petit"},
    ],
    "kpis": [
        {"manager_id": 2, "label": "Sprint velocity", "current_value": 42, "target_value": 45, "unit": "points"},
        {"manager_id": 2, "label": "Taux de complétion", "current_value": 88, "target_value": 90, "unit": "%"},
    ],
    "contracts": [
        {"employee_id": 1, "contract_type": "CDI", "contract_start": "2022-03-15", "contract_end": None, "contract_duration_months": None, "status": "active", "alert": None},
    ],
    "system_users": [
        {"id": 1, "name": "Admin Principal", "email": "admin@ices.bj", "role": "admin_rh", "status": "active", "last_login": "2024-05-07T14:30:00"},
        {"id": 2, "name": "Marie Laurent", "email": "manager@ices.bj", "role": "manager", "status": "active", "last_login": "2024-05-07T12:15:00"},
    ],
    "role_stats": [
        {"role": "Direction", "count": 8, "color": "bg-purple-100 text-purple-800"},
        {"role": "Admin RH", "count": 15, "color": "bg-blue-100 text-blue-800"},
        {"role": "Resp. RH", "count": 12, "color": "bg-green-100 text-green-800"},
        {"role": "Manager", "count": 25, "color": "bg-orange-100 text-orange-800"},
        {"role": "Collaborateur", "count": 364, "color": "bg-gray-100 text-gray-800"},
    ],
    "reports": [
        {"title": "Bilan social 2023", "report_type": "Annuel", "date": "2024-01-15", "file_size": "2.4 MB", "status": "available"},
        {"title": "Rapport formations T1 2024", "report_type": "Trimestriel", "date": "2024-04-05", "file_size": "1.8 MB", "status": "available"},
    ],
    "direction_kpis": [
        {"label": "Effectif total", "value": "424", "change": "+8"},
        {"label": "Taux de turnover", "value": "12%", "change": "-2%"},
    ],
    "employee_stats": [
        {"total_count": 424, "active_count": 398, "on_leave_count": 18, "new_this_month": 8},
    ],
    "contract_alerts": [
        {"expiring_30_days": 3, "expiring_60_days": 5, "active_count": 380},
    ],
    "attendance": [
        {"employee_id": 1, "date": "2024-05-15", "clock_in": "07:55:00", "clock_out": "17:30:00", "location": "Bureau"},
        {"employee_id": 1, "date": "2024-05-16", "clock_in": "08:05:00", "clock_out": None, "location": "Télétravail"},
    ],
    "notes": [
        {"id": 1, "title": "Mise à jour de la politique de télétravail", "type": "Note interne", "content": "Nous sommes heureux d'annoncer une flexibilité accrue...", "target_audience": "Tous", "publish_date": "2024-05-01", "requires_acknowledgment": True, "status": "Publiée"},
    ],
    "events": [
        {"id": 1, "title": "Team Building - Sortie Annuelle", "type": "Team Building", "date_time": "2024-06-15T09:00:00", "location": "Plage de Fidjrossè", "participants": "Tous", "description": "Journée de détente et de renforcement d'équipe.", "auto_reminder": True},
    ],
    "collab_of_the_month": [
        {"employee_id": 1, "reason": "Excellence technique et esprit d'équipe remarquable", "created_at": "2024-05-01T00:00:00"},
    ],
    "vehicles": [
        {"id": 1, "brand": "Toyota", "model": "Hilux", "plate": "BJ-1234-AB", "status": "Disponible", "assigned_to": None, "assignment_history": [], "next_maintenance": "2024-12-15"},
    ],
    "badges": [
        {"id": 1, "employee_id": 1, "uid": "BADGE-001", "status": "Actif"},
    ],
    "career_goals": [
        {"id": 1, "employee_id": 1, "short_term": "Maîtriser FastAPI", "medium_term": "Devenir Lead Tech", "target_position": "Lead Tech", "progress": 50},
    ],
    "mobility_requests": [
        {"id": 1, "employee_id": 1, "target_position": "Chef de projet", "status": "En étude par la RH", "created_at": "2024-05-10T10:00:00"},
    ]
}

# Insert data into tables
for table_name, data in sample_data.items():
    try:
        if data:
            client.table(table_name).upsert(data).execute()
            print(f"Inserted {len(data)} rows into {table_name}")
    except Exception as e:
        print(f"Error upserting into {table_name}: {e}")

print("\nDatabase setup complete!")
