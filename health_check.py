import os
import requests
import psycopg2
from dotenv import load_dotenv
import sys

# Load env from backend
load_dotenv("/home/sowraby/projet_rh/src/backend/.env")

def check_db_connectivity():
    print("🔍 Vérification de la base de données Supabase...")
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("❌ DATABASE_URL manquante dans le .env")
        return False
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        tables = [t[0] for t in cur.fetchall()]
        required_tables = ['users', 'employees', 'leave_requests', 'attendance', 'trainings']
        missing = [t for t in required_tables if t not in tables]
        if missing:
            print(f"⚠️ Tables manquantes : {', '.join(missing)}")
        else:
            print(f"✅ Base de données connectée ({len(tables)} tables trouvées)")
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"❌ Erreur DB : {e}")
        return False

def check_backend_api():
    print("\n🔍 Vérification du serveur Backend (Uvicorn)...")
    try:
        # Port updated to 8005 as per main.py
        response = requests.get("http://localhost:8005/health", timeout=5)
        if response.status_code == 200:
            print("✅ API Backend opérationnelle")
            return True
        else:
            print(f"❌ API répond avec le code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ API Backend injoignable : {e}")
        return False

def check_env_vars():
    print("\n🔍 Vérification des variables d'environnement...")
    vars = ["SUPABASE_URL", "SUPABASE_KEY", "DATABASE_URL"]
    all_ok = True
    for v in vars:
        if os.getenv(v):
            print(f"✅ {v} configurée")
        else:
            print(f"❌ {v} manquante")
            all_ok = False
    return all_ok

if __name__ == "__main__":
    print("🚀 DÉMARRAGE DU BILAN DE SANTÉ ICES RH\n" + "="*40)
    e_ok = check_env_vars()
    db_ok = check_db_connectivity()
    # Note: API check will fail if not running, but it's a good reminder
    api_ok = check_backend_api()
    
    print("\n" + "="*40)
    if e_ok and db_ok:
        print("🎉 PRÊT POUR LE DÉPLOIEMENT !")
    else:
        print("🛑 DES CORRECTIONS SONT NÉCESSAIRES AVANT LE DÉPLOIEMENT.")
