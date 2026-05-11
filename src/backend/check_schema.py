import os
import psycopg2

DATABASE_URL = "postgresql://postgres.pnjdmngofdcdymgdprds:56u48tgW1AFpuxH9@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

# Check users table structure
print("=== USERS ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position;")
for col in cur.fetchall():
    print(f"  {col[0]}: {col[1]}")

# Check conges table structure
print("\n=== CONGES ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'conges' ORDER BY ordinal_position;")
for col in cur.fetchall():
    print(f"  {col[0]}: {col[1]}")

# Check departements table structure
print("\n=== DEPARTEMENTS ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'departements' ORDER BY ordinal_position;")
for col in cur.fetchall():
    print(f"  {col[0]}: {col[1]}")

# Check skills table structure
print("\n=== SKILLS ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'skills' ORDER BY ordinal_position;")
for col in cur.fetchall():
    print(f"  {col[0]}: {col[1]}")

# Check suggestions table structure
print("\n=== SUGGESTIONS ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'suggestions' ORDER BY ordinal_position;")
for col in cur.fetchall():
    print(f"  {col[0]}: {col[1]}")

# Sample data from users
print("\n=== Sample users ===")
cur.execute("SELECT id, email, role, full_name FROM users LIMIT 5;")
for row in cur.fetchall():
    print(f"  {row}")

cur.close()
conn.close()
