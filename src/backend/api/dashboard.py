from fastapi import APIRouter, Depends, HTTPException, Header
from auth.auth import get_current_user, User
from supabase_client import supabase
from datetime import datetime

router = APIRouter()

@router.get("/manager")
def get_manager_dashboard(current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")

    try:
        # Récupérer l'employé manager
        emp = supabase.table("employees").select("id").eq("user_id", current_user.id).limit(1).execute()
        emp_id = emp.data[0]["id"] if emp.data else None

        # Compter les membres de l'équipe (ceux qui ont ce manager_id)
        team = supabase.table("employees").select("id, status").eq("manager_id", emp_id).execute() if emp_id else None
        team_data = team.data if team else []
        
        nb_collaborateurs = len(team_data)
        actifs = len([m for m in team_data if m.get("status") == "active"])
        taux_presence = int((actifs / nb_collaborateurs) * 100) if nb_collaborateurs > 0 else 0

        # Congés en attente pour l'équipe
        conges_a_valider = 0
        actions_en_attente = []
        
        if emp_id:
            # On récupère les demandes de congés des membres de l'équipe
            team_ids = [m["id"] for m in team_data]
            if team_ids:
                pending = supabase.table("leave_requests").select("*, employees(first_name, last_name)").in_("employee_id", team_ids).eq("status", "pending").execute()
                conges_a_valider = len(pending.data) if pending.data else 0
                
                for req in (pending.data or []):
                    emp_info = req.get("employees", {})
                    actions_en_attente.append({
                        "id": req["id"],
                        "type_conge": req["leave_type"],
                        "collaborateur": f"{emp_info.get('first_name', '')} {emp_info.get('last_name', '')}".strip() or f"Employé #{req['employee_id']}",
                        "date_debut": req["start_date"],
                        "date_fin": req["end_date"],
                        "nb_jours": req["days"],
                        "soumis_il_y_a": "Récemment"
                    })

        return {
            "kpis": {
                "nb_collaborateurs": nb_collaborateurs,
                "conges_a_valider": conges_a_valider,
                "taux_presence": taux_presence
            },
            "actions_en_attente": actions_en_attente
        }
    except Exception as e:
        print(f"Dashboard manager error: {e}")
        return {
            "kpis": {"nb_collaborateurs": 0, "conges_a_valider": 0, "taux_presence": 0},
            "actions_en_attente": [],
            "error": "Impossible de charger les données en temps réel"
        }

@router.get("/collaborateur")
def get_collaborator_dashboard(current_user: User = Depends(get_current_user)):
    try:
        emp = supabase.table("employees").select("id").eq("user_id", current_user.id).limit(1).execute()
        emp_id = emp.data[0]["id"] if emp.data else None

        # Solde congés
        balances = supabase.table("leave_balances").select("*").eq("employee_id", emp_id).execute() if emp_id else None
        cp_balance = next((b for b in (balances.data or []) if b["leave_type"] == "Congés payés"), None)
        total = cp_balance["total_days"] if cp_balance else 0
        pris = cp_balance["used_days"] if cp_balance else 0
        restants = cp_balance["remaining_days"] if cp_balance else 0

        # Demandes en cours
        pending_leaves = supabase.table("leave_requests").select("id").eq("employee_id", emp_id).eq("status", "pending").execute() if emp_id else None
        demandes_en_cours = len(pending_leaves.data) if pending_leaves and pending_leaves.data else 0

        # Formations en cours
        enrollments = supabase.table("training_enrollments").select("*").eq("employee_id", emp_id).execute() if emp_id else None
        formations_planifiees = len(enrollments.data) if enrollments and enrollments.data else 0

        # Notifications (simulées via les changements de statut des congés)
        notifications = []
        if emp_id:
            leave_reqs = supabase.table("leave_requests").select("*").eq("employee_id", emp_id).execute()
            for req in (leave_reqs.data or []):
                if req["status"] != "pending":
                    notifications.append({
                        "type": "Information",
                        "message": f"Votre demande de {req['leave_type']} est {req['status']}.",
                        "date": str(req.get("updated_at", ""))[:10],
                        "lu": False
                    })

        # Prochaine formation
        prochaine_formation = {"titre": "Aucune", "date_debut": "-", "statut": "N/A"}
        if enrollments and enrollments.data:
            enr = enrollments.data[0]
            training = supabase.table("trainings").select("*").eq("id", enr["training_id"]).limit(1).execute()
            if training.data:
                prochaine_formation = {
                    "titre": training.data[0]["title"],
                    "date_debut": str(training.data[0].get("start_date", "-")),
                    "statut": enr.get("status", "Inscrit")
                }

        # Plan de carrière
        goals = supabase.table("development_goals").select("*").eq("employee_id", emp_id).limit(1).execute() if emp_id else None
        goal = goals.data[0] if goals and goals.data else None
        plan_carriere = {
            "dernier_objectif": goal["title"] if goal else "Non défini",
            "progression": goal["progress"] if goal else 0
        }

        # Dernière fiche de paie
        payslips = supabase.table("payslips").select("*").eq("employee_id", emp_id).order("year", desc=True).limit(1).execute() if emp_id else None
        last_payslip = payslips.data[0] if payslips and payslips.data else None
        derniere_fiche_paie = {
            "mois": last_payslip["month"] if last_payslip else "-",
            "net": last_payslip["net_amount"] if last_payslip else 0
        }

        return {
            "kpis": {
                "conges_restants": restants,
                "formations_planifiees": formations_planifiees,
                "demandes_en_cours": demandes_en_cours
            },
            "solde_conges": {
                "total": total,
                "pris": pris,
                "restants": restants
            },
            "notifications": notifications,
            "prochaine_formation": prochaine_formation,
            "plan_carriere": plan_carriere,
            "derniere_fiche_paie": derniere_fiche_paie,
            "actualites_rh": [],
            "collaborateur_du_mois": None
        }
    except Exception as e:
        print(f"Dashboard collaborator error: {e}")
        return {
            "kpis": {"conges_restants": 0, "formations_planifiees": 0, "demandes_en_cours": 0},
            "solde_conges": {"total": 0, "pris": 0, "restants": 0},
            "notifications": [],
            "prochaine_formation": {"titre": "N/A", "date_debut": "-", "statut": "N/A"},
            "plan_carriere": {"dernier_objectif": "N/A", "progression": 0},
            "derniere_fiche_paie": {"mois": "-", "net": 0},
            "error": "Impossible de charger les données"
        }

@router.get("/resp-rh")
def get_resp_rh_dashboard(current_user: User = Depends(get_current_user)):
    # Stats employés
    employees = supabase.table("employees").select("*").execute()
    total = len(employees.data) if employees.data else 0
    actifs = len([e for e in (employees.data or []) if e.get("status") == "active"])

    # Congés en attente
    pending = supabase.table("leave_requests").select("id").eq("status", "pending").execute()
    conges_attente = len(pending.data) if pending.data else 0

    # Contrats actifs
    contracts = supabase.table("employees").select("id").eq("contract_status", "actif").execute()
    contrats_actifs = len(contracts.data) if contracts.data else 0

    return {
        "kpis": {
            "total_employes": total,
            "employes_actifs": actifs,
            "conges_en_attente": conges_attente,
            "contrats_actifs": contrats_actifs,
            "formations_du_mois": 0,
            "suggestions_attente": 0,
            "taux_absenteisme": 0
        }
    }

@router.get("/admin")
def get_admin_dashboard(current_user: User = Depends(get_current_user)):
    users = supabase.table("users").select("*").execute()
    total_users = len(users.data) if users.data else 0
    
    return {
        "kpis": {
            "total_users": total_users,
            "active_users": total_users,
            "security_alerts": 0,
            "system_health": "Optimal",
            "backups_status": "Effectué",
            "active_workflows": 0
        },
        "logs": [],
        "system_status": "Online"
    }

@router.get("/direction")
def get_direction_dashboard(current_user: User = Depends(get_current_user)):
    employees = supabase.table("employees").select("*").execute()
    total = len(employees.data) if employees.data else 0
    
    return {
        "kpis": {
            "effectif_total": total,
            "turnover": "0%",
            "presence_moyenne": "100%",
            "satisfaction_moyenne": "5/5",
            "masse_salariale": "0 FCFA",
            "performance_globale": "100%",
            "rapports_disponibles": 0
        },
        "analytics": {
            "repartition_departements": []
        },
        "reports": []
    }
