import os
from supabase import create_client, Client
from dotenv import load_dotenv
import httpx

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Warning: Supabase credentials not found in environment variables.")

# Forcer HTTP/1.1 pour éviter les erreurs "Server disconnected" fréquentes avec HTTP/2 sur PostgREST
# On augmente aussi les timeouts
client_options = {
    "postgrest_client_timeout": 30,
}

# Malheureusement supabase-py ne permet pas facilement de passer un client httpx custom
# mais on peut essayer de configurer les timeouts globaux si possible.
# Pour l'instant, on reste sur create_client standard mais avec plus de vigilance dans les appels.

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

def get_db():
    return supabase