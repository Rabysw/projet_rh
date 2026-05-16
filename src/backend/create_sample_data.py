import os
import bcrypt
import psycopg2
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL")

def get_hashed_password(plain_text_password):
    return bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_sample_users():
    try:
        conn = psycopg2.connect(database_url)
        conn.autocommit = True
        cur = conn.cursor()

        users = [
            ('admin@ices.com', 'password123', 'admin_rh', 'Admin', 'ICES', 'token_admin'),
            ('rh@ices.com', 'password123', 'resp_rh', 'Responsable', 'RH', 'token_rh'),
            ('manager@ices.com', 'password123', 'manager', 'Manager', 'Tech', 'token_manager'),
            ('collab@ices.com', 'password123', 'collaborateur', 'Jean', 'Dupont', 'token_collab'),
            ('direction@ices.com', 'password123', 'direction', 'Directeur', 'Général', 'token_direction'),
        ]

        for email, pwd, role, prenom, nom, token in users:
            pwd_hash = get_hashed_password(pwd)
            cur.execute("""
                INSERT INTO users (email, password_hash, role, prenom, nom, token, status)
                VALUES (%s, %s, %s, %s, %s, %s, 'active')
                ON CONFLICT (email) DO UPDATE SET 
                    password_hash = EXCLUDED.password_hash,
                    role = EXCLUDED.role,
                    token = EXCLUDED.token
                RETURNING id;
            """, (email, pwd_hash, role, prenom, nom, token))
            user_id = cur.fetchone()[0]
            print(f"User created: {email} (ID: {user_id})")

            # Create corresponding employee record
            cur.execute("""
                INSERT INTO employees (user_id, matricule, first_name, last_name, professional_email, hire_date, position, status)
                VALUES (%s, %s, %s, %s, %s, CURRENT_DATE, %s, 'active')
                ON CONFLICT (professional_email) DO NOTHING;
            """, (user_id, f"MAT-{role.upper()}", prenom, nom, email, role.capitalize()))

        # Link Jean Dupont to Manager
        cur.execute("SELECT id FROM employees WHERE professional_email = 'manager@ices.com'")
        mgr_id = cur.fetchone()[0]
        cur.execute("UPDATE employees SET manager_id = %s WHERE professional_email = 'collab@ices.com'", (mgr_id,))

        # Sample leave balances
        cur.execute("SELECT id FROM employees")
        emp_ids = cur.fetchall()
        for (emp_id,) in emp_ids:
            cur.execute("""
                INSERT INTO leave_balances (employee_id, leave_type, total_days, remaining_days, year)
                VALUES (%s, 'Congés payés', 30, 25, 2024)
                ON CONFLICT DO NOTHING;
            """, (emp_id,))

        # Sample company config
        cur.execute("""
            INSERT INTO company_config (id, company_name, primary_color, country, currency, phone_prefix)
            VALUES (1, 'ICES SIRH', '#2563eb', 'Bénin', 'FCFA', '+229')
            ON CONFLICT (id) DO UPDATE SET company_name = EXCLUDED.company_name;
        """)

        print("Sample data inserted successfully!")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Failed to create sample users: {e}")

if __name__ == "__main__":
    create_sample_users()
