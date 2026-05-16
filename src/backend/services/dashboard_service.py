from datetime import datetime, timedelta
from supabase_client import supabase


# ==================== MANAGER ====================

def get_manager_dashboard_data(manager_id: int):
    # Récupération de l'équipe
    team_resp = supabase.table("employees").select("*").eq("manager_id", manager_id).execute()
    team = team_resp.data
    team_ids = [m['id'] for m in team]

    active = sum(1 for m in team if m['status'] == "active")
    on_leave = sum(1 for m in team if m['status'] == "on_leave")
    
    # Congés en attente pour l'équipe
    leaves_resp = supabase.table("leave_requests").select("*, employees(first_name, last_name)").in_("employee_id", team_ids).eq("status", "pending").execute()
    
    actions_en_attente = [{
        "id": l['id'],
        "type_conge": l['leave_type'],
        "collaborateur": f"{l['employees']['first_name']} {l['employees']['last_name']}",
        "date_debut": l['start_date'],
        "date_fin": l['end_date'],
        "nb_jours": l['days'],
        "soumis_il_y_a": "Récemment"
    } for l in leaves_resp.data]

    # Projets
    projects_resp = supabase.table("projects").select("*").eq("manager_id", manager_id).execute()
    projects = projects_resp.data
    on_track = sum(1 for p in projects if p['status'] == "on_track")
    at_risk = sum(1 for p in projects if p['status'] == "at_risk")

    return {
        "kpis": {
            "nb_collaborateurs": len(team),
            "membres_actifs": active,
            "membres_en_conge": on_leave,
            "conges_a_valider": len(actions_en_attente),
            "taux_presence": round((active / len(team) * 100), 1) if team else 0,
            "projets_on_track": on_track,
            "projets_at_risk": at_risk,
        },
        "actions_en_attente": actions_en_attente,
        "equipe": team,
        "projets": projects,
        "kpis_equipe": [] # À lier à la table kpis si nécessaire
    }


# ==================== RESP RH ====================

def get_resp_rh_dashboard_data():
    employees = supabase.table("employees").select("*").execute().data
    contracts = supabase.table("contracts").select("*").execute().data
    
    total = len(employees)
    actifs = sum(1 for e in employees if e['status'] == "active")
    en_conge = sum(1 for e in employees if e['status'] == "on_leave")
    cdi = sum(1 for e in employees if e['contract_type'] == "CDI")
    cdd = sum(1 for e in employees if e['contract_type'] == "CDD")

    # Simplification des alertes
    alertes_contrats = [c for c in contracts if c.get('alert')]

    return {
        "kpis": {
            "total_employes": total,
            "actifs": actifs,
            "en_conge": en_conge,
            "contrats_a_renouveler": len(alertes_contrats),
            "alertes_medicales": 0,
            "formations_ce_mois": 0,
            "enquetes_en_cours": 0,
            "suggestions_en_attente": 0,
            "doleances_critiques": 0,
            "taux_completion_eval": "0%"
        },
        "repartition_contrats": {
            "CDI": cdi,
            "CDD": cdd,
            "Stage": 0,
        },
        "alertes_contrats": alertes_contrats,
        "employes": employees,
        "budget_formation": {
            "annuel": 27_000_000,
            "depense": 0,
            "restant": 27_000_000,
            "pourcentage": 0,
        }
    }


# ==================== ADMIN RH ====================

def get_admin_rh_dashboard_data():
    users = supabase.table("system_users").select("*").execute().data
    roles_stats = supabase.table("role_stats").select("*").execute().data
    
    actifs = sum(1 for u in users if u['status'] == "active")
    inactifs = sum(1 for u in users if u['status'] == "inactive")

    return {
        "kpis": {
            "total_utilisateurs": len(users),
            "utilisateurs_actifs": actifs,
            "utilisateurs_inactifs": inactifs,
            "roles_configures": len(roles_stats),
        },
        "utilisateurs": users,
        "roles": roles_stats,
        "permissions": [],
        "derniers_logs": [],
        "systeme": {
            "db_status": "Opérationnelle",
            "db_uptime": "99.9%",
            "securite": "Active",
            "incidents": 0,
        },
        "comptes_en_attente": 2,
        "comptes_inactifs_30j": inactifs,
    }


# ==================== DIRECTION ====================

def get_direction_dashboard_data():
    employees_resp = supabase.table("employees").select("id, status").execute()
    employees = employees_resp.data
    reports = supabase.table("reports").select("*").execute().data
    
    total_count = len(employees)
    active_count = sum(1 for e in employees if e.get('status') == 'active')
    
    return {
        "kpis": [],
        "kpis_strategiques": {
            "effectif_total": total_count,
            "actifs": active_count,
            "taux_turnover": 4.2,
            "taux_presence": 97,
            "formations_realises": 18,
            "formations_planifiees": 22,
            "score_satisfaction": 3.8,
            "suggestions_traitees_pct": 85,
        },
        "evolution_effectif": {
            "entrees": 48,
            "sorties": 36,
            "net": 12,
            "historique": [65, 68, 70, 72, 75, 78, 80, 82, 85, 87, 90, 92],
        },
        "repartition_departements": [
            {"dept": "Technique",   "effectif": 156, "pourcent": 37},
            {"dept": "Commercial",  "effectif": 98,  "pourcent": 23},
            {"dept": "Admin",       "effectif": 76,  "pourcent": 18},
            {"dept": "Production",  "effectif": 54,  "pourcent": 13},
            {"dept": "Direction",   "effectif": 40,  "pourcent": 9},
        ],
        "turnover_mensuel": [
            {"mois": "Mai",      "taux": 2.1},
            {"mois": "Avril",    "taux": 2.8},
            {"mois": "Mars",     "taux": 3.2},
            {"mois": "Février",  "taux": 2.5},
            {"mois": "Janvier",  "taux": 2.9},
        ],
        "absenteisme": {
            "moyenne_mensuelle": 4.2,
            "mois_en_cours": 3.8,
            "maladie": 2.8,
            "conges": 0.9,
            "autres": 0.5,
        },
        "masse_salariale": {
            "annuelle": "4.2M €",
            "variation": "+8% vs 2023",
            "fixe": "3.6M €",
            "variable": "0.4M €",
            "charges": "0.2M €",
        },
        "satisfaction": {
            "score_global": 3.8,
            "variation": "+0.2 vs Q1",
            "details": {
                "ambiance": 4,
                "management": 4,
                "remuneration": 3,
            },
        },
        "suggestions": {
            "recues_ce_mois": 24,
            "traitees": 20,
            "en_attente": 4,
            "taux": 85,
            "temps_moyen": "48h",
        },
        "rapports": reports,
    }


# ==================== COLLABORATEUR ====================

def get_collaborateur_dashboard_data(user_id: int):
    # Solde
    balance_resp = supabase.table("leave_balances").select("*").eq("employee_id", user_id).eq("leave_type", "Congés payés").execute()
    balance = balance_resp.data[0] if balance_resp.data else {"total": 0, "used": 0, "remaining": 0}

    # Demandes et formations
    leaves_resp = supabase.table("leave_requests").select("id").eq("employee_id", user_id).eq("status", "pending").execute()
    trainings_resp = supabase.table("trainings").select("*").eq("employee_id", user_id).execute()
    
    formations = trainings_resp.data
    prochaine = next((t for t in formations if t['status'] == "in_progress"), None)
    
    # Paie
    payslip_resp = supabase.table("payslips").select("*").eq("employee_id", user_id).order("payment_date", desc=True).limit(1).execute()
    derniere_fiche = payslip_resp.data[0] if payslip_resp.data else None
    
    # Objectifs
    goals_resp = supabase.table("career_goals").select("*").eq("employee_id", user_id).limit(1).execute()
    objectif_en_cours = goals_resp.data[0] if goals_resp.data else None

    return {
        "kpis": {
            "conges_restants": balance['remaining'],
            "formations_planifiees": sum(1 for t in formations if t['status'] == "in_progress"),
            "demandes_en_cours": len(leaves_resp.data),
        },
        "solde_conges": {
            "total": balance['total'],
            "pris": balance['used'],
            "restants": balance['remaining'],
        },
        "notifications": [],
        "prochaine_formation": {
            "titre": prochaine['title'] if prochaine else None,
            "date_debut": prochaine['start_date'] if prochaine else None,
            "statut": prochaine['status'] if prochaine else None,
        },
        "derniere_fiche_paie": {
            "mois": derniere_fiche['month'] if derniere_fiche else None,
            "net": derniere_fiche['net_amount'] if derniere_fiche else 0,
        },
        "plan_carriere": {
            "dernier_objectif": objectif_en_cours['target_position'] if objectif_en_cours else None,
            "progression": objectif_en_cours['progress'] if objectif_en_cours else 0,
        },
        "actualites_rh": [
            {"titre": "Nouvelle politique de télétravail", "resume": "Nouvelles modalités applicables dès juin.", "date": "01/05/2024"},
            {"titre": "Journée cohésion d'équipe", "resume": "Rendez-vous le 15 juin pour la journée annuelle.", "date": "28/04/2024"},
        ],
        "collaborateur_du_mois": {
            "nom": "Thomas Moreau",
            "departement": "Technique",
            "motif": "Excellence technique et esprit d'équipe remarquable",
        },
    }

def calculate_monthly_leave_accrual():
    """
    Job to be called monthly. 
    In Benin, 2.5 days per month of effective work.
    """
    # On récupère tous les soldes de congés payés
    # En SQL réel, on ferait un UPDATE avec calcul, ici on boucle pour la logique
    balances = supabase.table("leave_balances").select("*").eq("leave_type", "Congés payés").execute().data
    for b in balances:
        supabase.table("leave_balances").update({
            "total": float(b['total']) + 2.5,
            "remaining": float(b['remaining']) + 2.5
        }).eq("id", b['id']).execute()

def check_critical_alerts():
    """Logic for contract endings and ID expirations"""
    alerts = []
    today = datetime.now()
    contracts = supabase.table("contracts").select("*, employees(first_name, last_name)").execute().data
    
    for c in contracts:
        if c['contract_end']:
            end_date = datetime.strptime(c['contract_end'], "%Y-%m-%d")
            # ... logique d'alerte ...
    return alerts