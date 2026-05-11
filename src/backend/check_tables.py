import os
from supabase import create_client

supabase_url = os.getenv("SUPABASE_URL", "https://pnjdmngofdcdymgdprds.supabase.co")
supabase_key = os.getenv("SUPABASE_KEY", "sb_secret_QfAyDDcGzfuUehoL6aKmPA_3KP8tXaz")

client = create_client(supabase_url, supabase_key)

# Get list of tables
response = client.postgrest.table("information_schema.tables").select("table_name").eq("table_schema", "public").execute()

print("Existing tables:")
for table in response.data:
    print(f"  - {table['table_name']}")
