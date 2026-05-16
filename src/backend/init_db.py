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
sql_commands = """
-- 1. VIDER TOUTES LES TABLES (GARDER LA STRUCTURE)
-- On commence par désactiver les contraintes de clés étrangères temporairement si nécessaire 
-- ou on procède par ordre de dépendance.

TRUNCATE TABLE 
    attendance, leave_requests, leave_balances, skills, suggestions, 
    development_goals, payslips, trainings, available_trainings, 
    certificates, team_members, team_stats, projects, tasks,
    contracts, notes, note_acknowledgments, events, meetings, 
    collab_of_the_month, vehicles, badges, career_goals, 
    mobility_requests, kpis, team_leave_requests, team_skills_stats, 
    role_stats, reports, direction_kpis, employee_stats, 
    contract_alerts, company_config
CASCADE;

-- 2. DÉFINITION DES TABLES MANQUANTES

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'todo',
    priority VARCHAR(50) DEFAULT 'medium',
    assigned_to INTEGER,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company config table
CREATE TABLE IF NOT EXISTS company_config (
    id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    company_name VARCHAR(255) NOT NULL,
    company_logo_url TEXT,
    primary_color VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
# Remplacer les 5 employés mockés par une liste vide:
sample_data = {
    "employees": [],  # ← VIDER CETTE LISTE
    "leave_balances": [],
    "leave_requests": [],
    "payslips": [],
    "trainings": [],
    "available_trainings": [],
    "certificates": [],
    "skills": [],
    "development_goals": [],
    "suggestions": [],
    "team_members": [],
    "team_stats": [],
    "team_leave_requests": [],
    "team_skills_stats": [],
    "projects": [],
    "kpis": [],
    "contracts": [],
    "notes": [],
    "events": [],
    "collab_of_the_month": [],
    "vehicles": [],
    "badges": [],
    "career_goals": [],
    "mobility_requests": [],
    # ... Tous les autres: []
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
