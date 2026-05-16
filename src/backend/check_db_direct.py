import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def check_db_content():
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        response = supabase.table("users").select("email, role").execute()
        print(f"Connection success. Users found: {len(response.data)}")
        for user in response.data:
            print(f"- {user['email']} (Role: {user['role']})")
    except Exception as e:
        print(f"Error checking DB: {e}")

if __name__ == "__main__":
    check_db_content()
