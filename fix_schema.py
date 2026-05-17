import os
import psycopg2
from dotenv import load_dotenv

load_dotenv("/home/sowraby/projet_rh/src/backend/.env")

def check_tables():
    db_url = os.getenv("DATABASE_URL")
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        tables = [row[0] for row in cur.fetchall()]
        print(f"Tables in public schema: {tables}")
        
        # Check if collaborator_of_the_month specifically exists
        if 'collaborator_of_the_month' not in tables:
            print("Creating collaborator_of_the_month table...")
            cur.execute("""
                CREATE TABLE IF NOT EXISTS collaborator_of_the_month (
                    id SERIAL PRIMARY KEY,
                    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
                    month VARCHAR(20) NOT NULL,
                    year INTEGER NOT NULL,
                    reason TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(month, year)
                );
                ALTER TABLE collaborator_of_the_month ENABLE ROW LEVEL SECURITY;
                CREATE POLICY "Everyone can see palmares" ON collaborator_of_the_month FOR SELECT TO authenticated USING (TRUE);
            """)
            conn.commit()
            print("Table created.")
        else:
            print("Table collaborator_of_the_month already exists.")
            
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_tables()
