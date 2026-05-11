import os
import psycopg2

DATABASE_URL = "postgresql://postgres.pnjdmngofdcdymgdprds:56u48tgW1AFpuxH9@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

# Get list of tables
cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;")
tables = cur.fetchall()

print("Existing tables:")
for table in tables:
    print(f"  - {table[0]}")

cur.close()
conn.close()
