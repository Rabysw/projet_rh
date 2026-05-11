# api/resp_rh.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from auth.auth import get_current_user, User
from data_store import rh_employees, rh_contracts, Employee, Contract

router = APIRouter()

# RBAC helper
def require_role(current_user: User, allowed_roles: list):
    if current_user.role not in allowed_roles:
        raise HTTPException(status_code=403, detail="Accès réservé aux RH")

@router.get("/employees", response_model=List[Employee])
def get_employees(
    search: Optional[str] = None,
    status: Optional[str] = None,
    department_id: Optional[int] = None,
    current_user: User = Depends(get_current_user)
):
    """Get all employees with optional filtering"""
    require_role(current_user, ["admin_rh", "resp_rh", "direction"])
    employees = rh_employees
    
    if search:
        search_lower = search.lower()
        employees = [e for e in employees if search_lower in e.first_name.lower() 
                     or search_lower in e.last_name.lower() 
                     or search_lower in e.professional_email.lower()]
    
    if status:
        employees = [e for e in employees if e.status == status]
    
    if department_id:
        employees = [e for e in employees if e.department_id == department_id]
    
    return employees

@router.get("/employees/stats")
def get_employee_stats(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["admin_rh", "resp_rh", "direction"])
    """Get employee statistics for dashboard"""
    total = len(rh_employees)
    active = len([e for e in rh_employees if e.status == 'active'])
    on_leave = len([e for e in rh_employees if e.status == 'on_leave'])
    new_this_month = len([e for e in rh_employees if e.status == 'new'])
    
    return {
        "total": total,
        "active": active,
        "on_leave": on_leave,
        "new_this_month": new_this_month
    }

@router.get("/employees/{employee_id}", response_model=Employee)
def get_employee_detail(
    employee_id: int,
    current_user: User = Depends(get_current_user)
):
    """Get employee details by ID"""
    require_role(current_user, ["admin_rh", "resp_rh", "direction"])
    employee = next((e for e in rh_employees if e.id == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.get("/contracts", response_model=List[Contract])
def get_contracts(
    status: Optional[str] = None,
    contract_type: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    """Get all contracts with optional filtering"""
    require_role(current_user, ["admin_rh", "resp_rh", "direction"])
    contracts = rh_contracts
    
    if status:
        contracts = [c for c in contracts if c.status == status]
    
    if contract_type:
        contracts = [c for c in contracts if c.type == contract_type]
    
    return contracts

@router.get("/contracts/alerts")
def get_contract_alerts(current_user: User = Depends(get_current_user)):
    """Get contract alerts (expiring contracts)"""
    require_role(current_user, ["admin_rh", "resp_rh", "direction"])
    expiring_30 = len([c for c in rh_contracts if c.alert and "30" in c.alert])
    expiring_60 = len([c for c in rh_contracts if c.alert and "60" in c.alert])
    active = len([c for c in rh_contracts if c.status == 'active'])
    
    return {
        "expiring_30_days": expiring_30,
        "expiring_60_days": expiring_60,
        "active": active
    }

@router.get("/dashboard")
def get_resp_rh_dashboard(current_user: User = Depends(get_current_user)):
    # 1. KPIs Dynamiques
    collaborateurs_actifs = len([e for e in rh_employees if e.status == 'active'])
    
    # Contrats avec alerte ou statut alert
    contrats_alert = [c for c in rh_contracts if c.alert is not None or c.status == 'alert']
    contrats_a_renouveler = len(contrats_alert)

    # Stats par type de contrat
    cdi_count = len([e for e in rh_employees if e.contract_type == 'CDI'])
    cdd_count = len([e for e in rh_employees if e.contract_type == 'CDD'])
    stage_count = len([e for e in rh_employees if e.contract_type == 'Stage'])

    # Groupement par département
    depts = {}
    for emp in rh_employees:
        dept_name = f"Département {emp.department_id}" if emp.department_id else "Non assigné"
        depts[dept_name] = depts.get(dept_name, 0) + 1
    departements_list = [{"nom": k, "effectif": v} for k, v in depts.items()]

    # 2. Alertes Prioritaires (Dynamiques basées sur les contrats)
    alertes_prioritaires = []
    for contract in contrats_alert:
        alertes_prioritaires.append({
            "titre": f"Fin de contrat - {contract.employee}",
            "description": f"{contract.type} - {contract.alert}",
            "echeance": contract.end,
            "type_alerte": "Urgent",
            "urgence": "high",
            "action_bouton": "Renouveler",
            "action_secondaire": "Arrêt"
        })
    
    # Ajout manuel d'autres alertes si besoin (ou depuis une table alerts si elle existait)
    alertes_prioritaires.append({
        "titre": "Formation SST",
        "description": "3 collaborateurs non certifiés",
        "echeance": "30/06/2024",
        "type_alerte": "Conformité",
        "urgence": "medium",
        "action_bouton": "Planifier",
        "action_secondaire": None
    })

    return {
        "kpis": {
            "collaborateurs_actifs": collaborateurs_actifs,
            "contrats_a_renouveler": contrats_a_renouveler,
            "alertes_medicales": 3, # À dynamiser si table médicale
            "formations_ce_mois": 4, # À dynamiser si table formation
            "enquetes_en_cours": 2,
            "suggestions_en_attente": 7
        },
        "alertes_prioritaires": alertes_prioritaires,
        "stats_personnel": {
            "actifs": collaborateurs_actifs,
            "cdi": cdi_count,
            "cdd": cdd_count,
            "stages": stage_count,
            "departements": departements_list
        },
        "budget_formation": {
            "total": "27 000 000 FCFA",
            "depense": "19 200 000 FCFA",
            "restant": "7 800 000 FCFA",
            "pourcentage": 71
        },
        "evaluations": {
            "total": collaborateurs_actifs,
            "faites": 35,
            "retard": max(0, collaborateurs_actifs - 35),
            "pourcentage": int((35/collaborateurs_actifs)*100) if collaborateurs_actifs > 0 else 0
        },
        "suggestions": {"traitement": 12, "repondues": 28},
        "contrats_60_jours": 8
    }

@router.get("/suggestions")
def get_all_suggestions(current_user: User = Depends(get_current_user)):
    """Consultation des doléances et suggestions par la RH"""
    require_role(current_user, ["admin_rh", "resp_rh"])
    from data_store import collab_suggestions
    return collab_suggestions

@router.post("/suggestions/{suggestion_id}/respond")
def respond_suggestion(suggestion_id: int, response: dict, current_user: User = Depends(get_current_user)):
    """Réponse de la RH à une suggestion"""
    require_role(current_user, ["admin_rh", "resp_rh"])
    from data_store import collab_suggestions
    suggestion = next((s for s in collab_suggestions if s.id == suggestion_id), None)
    if not suggestion:
        raise HTTPException(status_code=404, detail="Suggestion non trouvée")
    
    suggestion.response = response.get("text", "")
    suggestion.status = "Répondu"
    return suggestion

@router.get("/leaves/pending")
def get_pending_leaves(current_user: User = Depends(get_current_user)):
    """Consultation des demandes de congé en attente de validation RH"""
    require_role(current_user, ["admin_rh", "resp_rh"])
    from data_store import manager_leave_requests
    return [l for l in manager_leave_requests if l.status == "approved"] # Validés par manager, en attente RH

@router.post("/leaves/{leave_id}/validate")
def validate_leave_final(leave_id: int, current_user: User = Depends(get_current_user)):
    """Validation finale par la RH"""
    require_role(current_user, ["admin_rh", "resp_rh"])
    from data_store import manager_leave_requests, collab_leave_requests
    
    leave = next((l for l in manager_leave_requests if l.id == leave_id), None)
    if leave:
        leave.status = "validated"
    
    collab_leave = next((l for l in collab_leave_requests if l.id == leave_id), None)
    if collab_leave:
        collab_leave.status = "validated"
        
    return {"message": "Validation finale effectuée"}
