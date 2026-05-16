import os
import psycopg2
from dotenv import load_dotenv
import json

load_dotenv()

database_url = os.getenv("DATABASE_URL")

def setup_techafrika():
    try:
        conn = psycopg2.connect(database_url)
        conn.autocommit = True
        cur = conn.cursor()

        print("🚀 Initialisation de la configuration TechAfrika Solutions...")

        # 1. Company Config
        leave_types = ["Congé payé", "Maladie", "Sans solde", "Maternité", "Paternité", "Exceptionnel"]
        working_days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]
        
        cur.execute("""
            INSERT INTO company_config (
                id, company_name, primary_color, country, currency, 
                phone_prefix, timezone, working_days, working_hours_start, working_hours_end,
                overtime_threshold_hours, late_alert_threshold_minutes, late_count_alert_per_month,
                probation_duration_days, leave_days_per_year, leave_carry_over_max, leave_types,
                contract_alert_days, document_expiry_alert_days, medical_visit_alert_days
            ) VALUES (
                1, 'TechAfrika Solutions', '#3b82f6', 'Bénin', 'FCFA',
                '+229', 'Africa/Porto-Novo', %s, '08:00:00', '17:00:00',
                8, 15, 3,
                90, 24, 5, %s,
                30, 60, 30
            ) ON CONFLICT (id) DO UPDATE SET
                company_name = EXCLUDED.company_name,
                country = EXCLUDED.country,
                currency = EXCLUDED.currency,
                phone_prefix = EXCLUDED.phone_prefix,
                timezone = EXCLUDED.timezone,
                working_days = EXCLUDED.working_days,
                working_hours_start = EXCLUDED.working_hours_start,
                working_hours_end = EXCLUDED.working_hours_end,
                overtime_threshold_hours = EXCLUDED.overtime_threshold_hours,
                late_alert_threshold_minutes = EXCLUDED.late_alert_threshold_minutes,
                late_count_alert_per_month = EXCLUDED.late_count_alert_per_month,
                probation_duration_days = EXCLUDED.probation_duration_days,
                leave_days_per_year = EXCLUDED.leave_days_per_year,
                leave_carry_over_max = EXCLUDED.leave_carry_over_max,
                leave_types = EXCLUDED.leave_types,
                contract_alert_days = EXCLUDED.contract_alert_days,
                document_expiry_alert_days = EXCLUDED.document_expiry_alert_days,
                medical_visit_alert_days = EXCLUDED.medical_visit_alert_days;
        """, (json.dumps(working_days), json.dumps(leave_types)))
        print("✅ Configuration entreprise mise à jour")

        # 2. Départements
        departments = [
            "Direction Générale", "Ressources Humaines", "Finance & Comptabilité",
            "Informatique & Systèmes", "Commercial & Marketing", "Opérations & Logistique"
        ]
        for dept in departments:
            cur.execute("INSERT INTO departments (name) VALUES (%s) ON CONFLICT (name) DO NOTHING;", (dept,))
        print("✅ Départements insérés")

        # 3. Postes
        job_titles = [
            "Directeur Général", "Responsable RH", "Chargé RH", "Directeur Financier",
            "Comptable", "Développeur Full Stack", "Chef de Projet", "Commercial",
            "Responsable Marketing", "Logisticien", "Assistant Administratif"
        ]
        for job in job_titles:
            cur.execute("INSERT INTO job_titles (name) VALUES (%s) ON CONFLICT (name) DO NOTHING;", (job,))
        print("✅ Postes insérés")

        # 4. Jours fériés 2025
        holidays = [
            ("2025-01-01", "Jour de l'An"),
            ("2025-01-10", "Fête du Vodoun"),
            ("2025-04-01", "Lundi de Pâques"),
            ("2025-05-01", "Fête du Travail"),
            ("2025-05-29", "Ascension"),
            ("2025-06-09", "Lundi de Pentecôte"),
            ("2025-08-01", "Fête Nationale du Bénin"),
            ("2025-08-15", "Assomption"),
            ("2025-10-26", "Fête Nationale"),
            ("2025-11-01", "Toussaint"),
            ("2025-12-25", "Noël")
        ]
        for h_date, h_name in holidays:
            cur.execute("INSERT INTO public_holidays (date, name) VALUES (%s, %s) ON CONFLICT (date) DO NOTHING;", (h_date, h_name))
        print("✅ Jours fériés insérés")

        cur.close()
        conn.close()
        print("🎉 Terminé avec succès !")

    except Exception as e:
        print(f"❌ Erreur lors de l'initialisation: {e}")

if __name__ == "__main__":
    setup_techafrika()
