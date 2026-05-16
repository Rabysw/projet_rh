
import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

client = create_client(url, key)

try:
    print("Testing connection to Supabase...")
    res = client.table("employees").select("count", count="exact").execute()
    print(f"Success! Employee count: {res.count}")
except Exception as e:
    print(f"Error: {e}")
