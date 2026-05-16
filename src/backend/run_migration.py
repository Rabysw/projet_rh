import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL")

if not database_url:
    print("Error: DATABASE_URL not found in .env")
    exit(1)

def run_migration(sql_file):
    try:
        with open(sql_file, 'r') as f:
            sql = f.read()
        
        conn = psycopg2.connect(database_url)
        conn.autocommit = True
        cur = conn.cursor()
        
        print(f"Running migration: {sql_file}")
        cur.execute(sql)
        print("Migration successful!")
        
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Migration failed: {e}")

if __name__ == "__main__":
    import sys
    file_to_run = sys.argv[1] if len(sys.argv) > 1 else "src/backend/setup_sirh.sql"
    run_migration(file_to_run)
