import os
import psycopg2

DATABASE_URL = "postgresql://postgres.pnjdmngofdcdymgdprds:56u48tgW1AFpuxH9@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

# Check utilisateurs table structure
print("=== UTILISATEURS ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'utilisateurs' ORDER BY ordinal_position;")
for col in cur.fetchall():
    print(f"  {col[0]}: {col[1]}")

# Sample data from utilisateurs
print("\n=== Sample utilisateurs ===")
cur.execute("SELECT * FROM utilisateurs LIMIT 5;")
rows = cur.fetchall()
# Get column names
cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'utilisateurs' ORDER BY ordinal_position;")
cols = [c[0] for c in cur.fetchall()]
print(f"Columns: {cols}")
for row in rows:
    print(f"  {row}")

# Check formations table structure
print("\n=== FORMATIONS ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'formations' ORDER BY ordinal_position;")
for col in cur.fetchall():
    print(f"  {col[0]}: {col[1]}")

# Sample data from formations
print("\n=== Sample formations ===")
cur.execute("SELECT * FROM formations LIMIT 3;")
rows = cur.fetchall()
cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'formations' ORDER BY ordinal_position;")
cols = [c[0] for c in cur.fetchall()]
print(f"Columns: {cols}")
for row in rows:
    print(f"  {row}")

# Check soldes_conge table structure
print("\n=== SOLDES_CONGE ===")
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'soldes_conge' ORDER BY ordinal_position;")
for col in cur.fetchall():
    print(f"  {col[0]}: {col[1]}")

# Sample data from soldes_conge
print("\n=== Sample soldes_conge ===")
cur.execute("SELECT * FROM soldes_conge LIMIT 3;")
rows = cur.fetchall()
cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'soldes_conge' ORDER BY ordinal_position;")
cols = [c[0] for c in cur.fetchall()]
print(f"Columns: {cols}")
for row in rows:
    print(f"  {row}")

cur.close()
conn.close()
