# reset_database.py
import os
from supabase import create_client
from dotenv import load_dotenv

print("=== Script de RESET ICES RH (Supabase) ===")
print("Ce script va vider toutes les données, sauf les comptes admin.")
inpt = input("Voulez-vous vraiment continuer ? (oui/non): ")
if inpt.strip().lower() != "oui":
    print("Abandon.")
    exit(0)

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Liste des tables à vider
tables = [
    "attendance",
    "leave_requests",
    "leave_balances",
    "skills",
    "suggestions",
    "development_goals",
    "payslips",
    "trainings",
    "available_trainings",
    "certificates",
    "team_members",
    "team_stats",
    "projects",
    "tasks",
    "contracts",
    "notes",
    "note_acknowledgments",
    "events",
    "meetings",
    "collab_of_the_month",
    "vehicles",
    "badges",
    "career_goals",
    "mobility_requests",
    "kpis",
    "team_leave_requests",
    "team_skills_stats",
    "role_stats",
    "reports",
    "direction_kpis",
    "employee_stats",
    "contract_alerts",
]

for t in tables:
    try:
        print(f"DELETE FROM {t} ...", end="")
        client.table(t).delete().neq("id", -1).execute()
        print("OK")
    except Exception as e:
        print(f"Erreur : {e}")

# Garde uniquement l'admin RH
try:
    print("-> Suppression des comptes non-admin dans employees")
    client.table("employees").delete().not_.eq("id", 4).execute()
except Exception as e:
    print("Erreur employees:", e)

try:
    print("-> Suppression des users non-admin dans system_users")
    client.table("system_users").delete().not_.eq("role", "admin_rh").execute()
except Exception as e:
    print("Erreur system_users:", e)

print("RESET terminé. 🚀")