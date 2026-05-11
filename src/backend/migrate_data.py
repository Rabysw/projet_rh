import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from supabase_client import supabase
import data_store

def migrate():
    print("Démarrage de la migration vers Supabase...")

    # Migration des employés
    employees_data = [e.dict() for e in data_store.rh_employees]
    if employees_data:
        supabase.table("employees").upsert(employees_data).execute()
        print(f"✓ {len(employees_data)} employés migrés.")

    # Migration des contrats
    contracts_data = [c.dict() for c in data_store.rh_contracts]
    if contracts_data:
        supabase.table("contracts").upsert(contracts_data).execute()
        print(f"✓ {len(contracts_data)} contrats migrés.")

    # Migration du pointage
    attendance_data = [a.dict() for a in data_store.attendance_logs]
    if attendance_data:
        supabase.table("attendance").upsert(attendance_data).execute()
        print(f"✓ {len(attendance_data)} logs de présence migrés.")

    # Migration des demandes de congés
    leave_data = [r.dict() for r in data_store.collab_leave_requests]
    if leave_data:
        supabase.table("leave_requests").upsert(leave_data).execute()
        print(f"✓ {len(leave_data)} demandes de congés migrées.")

    print("Migration terminée avec succès.")

if __name__ == "__main__":
    migrate()