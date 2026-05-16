import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL")

def run_sql(sql):
    try:
        conn = psycopg2.connect(database_url)
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute(sql)
        print("SQL executed successfully!")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"SQL failed: {e}")

if __name__ == "__main__":
    run_sql("ALTER TABLE leave_requests RENAME COLUMN justification_url TO justificatif_url;")
