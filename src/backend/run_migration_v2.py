import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL")

if not database_url:
    print("Error: DATABASE_URL is missing in .env")
    exit(1)

def run_migration():
    try:
        # Connect to the database
        conn = psycopg2.connect(database_url)
        conn.autocommit = True
        cursor = conn.cursor()

        # Read the migration SQL file
        with open("migration_v2.sql", "r") as f:
            sql = f.read()

        print("Running migration...")
        cursor.execute(sql)
        print("Migration completed successfully!")

        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error during migration: {e}")

if __name__ == "__main__":
    run_migration()
