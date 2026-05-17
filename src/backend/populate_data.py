
import os
import secrets
import string
import bcrypt
import psycopg2
from datetime import datetime, timedelta
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(".env")

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
db_url = os.environ.get("DATABASE_URL")
supabase = create_client(url, key)

def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def populate():
    print("Populating database with ICES demo data...")
    
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()

    # 1. Create Users
    users = [
        {"email": "admin@ices.com", "role": "admin_rh", "prenom": "Admin", "nom": "ICES"},
        {"email": "rh@ices.com", "role": "resp_rh", "prenom": "Marie", "nom": "Dubois"},
        {"email": "manager@ices.com", "role": "manager", "prenom": "Jean", "nom": "Dupont"},
        {"email": "collab@ices.com", "role": "collaborateur", "prenom": "Thomas", "nom": "Martin"},
        {"email": "direction@ices.com", "role": "direction", "prenom": "Paul", "nom": "Lefebvre"},
    ]

    for u in users:
        password = "password123"
        password_hash = hash_password(password)
        token = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(64))
        
        cur.execute("""
            INSERT INTO users (email, role, prenom, nom, password_hash, token, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (email) DO UPDATE SET
                role = EXCLUDED.role,
                prenom = EXCLUDED.prenom,
                nom = EXCLUDED.nom,
                password_hash = EXCLUDED.password_hash,
                token = EXCLUDED.token
            RETURNING id;
        """, (u["email"], u["role"], u["prenom"], u["nom"], password_hash, token, "active"))
        u["id"] = cur.fetchone()[0]
        print(f"User {u['email']} created/updated.")

    # 2. Create Employees
    employee_ids = {}
    for u in users:
        if u["role"] in ["resp_rh", "manager", "collaborateur"]:
            manager_id = None
            if u["role"] == "collaborateur" and "manager" in employee_ids:
                manager_id = employee_ids["manager"]
                
            cur.execute("""
                INSERT INTO employees (user_id, first_name, last_name, professional_email, position, department_id, status, contract_type, hire_date, matricule, base_salary, manager_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (professional_email) DO UPDATE SET
                    user_id = EXCLUDED.user_id,
                    position = EXCLUDED.position,
                    department_id = EXCLUDED.department_id,
                    manager_id = EXCLUDED.manager_id
                RETURNING id;
            """, (u["id"], u["prenom"], u["nom"], u["email"], 
                  "Consultant Senior" if u["role"] == "manager" else "Consultant",
                  1 if u["role"] != "resp_rh" else 2,
                  "active", "CDI", "2023-01-15", 
                  f"ICES-{u['id'][:4].upper()}" if isinstance(u['id'], str) else f"ICES-{u['id']}",
                  2500000 if u["role"] == "manager" else 1500000,
                  manager_id))
            employee_ids[u["role"]] = cur.fetchone()[0]
            print(f"Employee {u['prenom']} created/updated.")

    # 3. Add Skills for Thomas (collab)
    if "collaborateur" in employee_ids:
        skills = [
            (employee_ids["collaborateur"], "React", 4),
            (employee_ids["collaborateur"], "FastAPI", 4),
            (employee_ids["collaborateur"], "PostgreSQL", 3),
            (employee_ids["collaborateur"], "Docker", 2),
            (employee_ids["collaborateur"], "Agile", 5),
        ]
        for s in skills:
            cur.execute("""
                INSERT INTO skills (employee_id, skill_name, level)
                VALUES (%s, %s, %s)
                ON CONFLICT (employee_id, skill_name) DO UPDATE SET
                    level = EXCLUDED.level;
            """, s)
        print("Skills added for collab.")

    # 4. Add Evaluations
    if "collaborateur" in employee_ids:
        evals = [
            (employee_ids["collaborateur"], employee_ids["manager"], "2023-12-20", "Annuelle", 8.8, "completed", "Goals met"),
            (employee_ids["collaborateur"], employee_ids["manager"], "2024-05-10", "Mi-parcours", 9.2, "pending", "In progress"),
        ]
        for ev in evals:
            cur.execute("""
                INSERT INTO evaluations (employee_id, evaluator_id, evaluation_date, period, score, status, goals_met)
                VALUES (%s, %s, %s, %s, %s, %s, %s);
            """, ev)
        print("Evaluations added.")

    conn.commit()
    cur.close()
    conn.close()
    print("Population complete.")

if __name__ == "__main__":
    populate()
