# api/dashboard.py
from fastapi import APIRouter, Depends, HTTPException, Header
from auth.auth import get_current_user, User, tokens_db, users_db
from data_store import (
    manager_team, manager_leave_requests, 
    collab_leave_balance, collab_leave_requests, collab_trainings, 
    collab_suggestions, collab_payslips, collab_goals,
    rh_employees, rh_contracts
)
from db_client import get_system_users, get_role_stats, get_direction_kpis

router = APIRouter()


def _get_user_from_authorization_header(authorization: str | None) -> User:
    """
    Permet d'accepter soit `Authorization: Bearer <token>`, soit `Authorization: <token>`.
    Cette tolérance est volontairement limitée à certaines routes pour compatibilité.
    """
    if not authorization:
        # Align with HTTPBearer default behavior: 403 when missing credentials
        raise HTTPException(status_code=403, detail="Not authenticated")

    token = authorization.strip()
    if token.lower().startswith("bearer "):
        token = token[7:].strip()

    if token not in tokens_db:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    email = tokens_db[token]
    if email not in users_db:
        raise HTTPException(status_code=401, detail="User not found")

    return users_db[email]


@router.get("/manager")
def get_manager_dashboard(authorization: str | None = Header(default=None)):
    current_user = _get_user_from_authorization_header(authorization)
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    # 1. KPIs Dynamiques
    nb_collaborateurs = len(manager_team)
    
    # Compter les demandes 'pending'
    conges_a_valider = len([req for req in manager_leave_requests if req.status == 'pending'])
    
    # Calculer taux de présence (Actifs / Total)
    actifs = len([m for m in manager_team if m.status == 'active'])
    taux_presence = int((actifs / nb_collaborateurs) * 100) if nb_collaborateurs > 0 else 0

    # 2. Actions en attente (Liste dynamique)
    actions_en_attente = []
    for req in manager_leave_requests:
        if req.status == 'pending':
            actions_en_attente.append({
                "id": req.id,
                "type_conge": req.type,
                "collaborateur": req.employee,
                "date_debut": req.start,
                "date_fin": req.end,
                "nb_jours": req.days,
                "soumis_il_y_a": "2 jours" # Mock temporel simple
            })

    return {
        "kpis": {
            "nb_collaborateurs": nb_collaborateurs,
            "conges_a_valider": conges_a_valider,
            "taux_presence": taux_presence
        },
        "actions_en_attente": actions_en_attente
    }

@router.get("/collaborateur")
async def get_collaborator_dashboard(current_user: User = Depends(get_current_user)):
    # 1. Solde Congés Dynamique
    cp_balance = next((b for b in collab_leave_balance if b.type == "Congés payés"), None)
    total = cp_balance.total if cp_balance else 0
    pris = cp_balance.used if cp_balance else 0
    restants = cp_balance.remaining if cp_balance else 0

    # 2. KPIs
    demandes_en_cours = len([r for r in collab_leave_requests if r.status == 'pending'])
    formations_planifiees = len([t for t in collab_trainings if t.status == 'in_progress'])

    # 3. Notifications (Générées depuis les statuts)
    from api.collaborateur import get_notifications
    notifications = await get_notifications(current_user)

    # 4. Prochaine Formation
    next_training = next((t for t in collab_trainings if t.status == 'in_progress'), None)
    prochaine_formation = {
        "titre": next_training.title if next_training else "Aucune",
        "date_debut": next_training.date if next_training else "-",
        "statut": "En cours" if next_training else "N/A"
    }

    # 5. Plan de carrière
    goal = next((g for g in collab_goals), None)
    plan_carriere = {
        "dernier_objectif": goal.title if goal else "Non défini",
        "progression": goal.progress if goal else 0
    }

    # 6. Dernière Fiche de Paie
    last_payslip = collab_payslips[0] if collab_payslips else None
    derniere_fiche_paie = {
        "mois": last_payslip.month if last_payslip else "-",
        "net": last_payslip.net if last_payslip else 0
    }

    # 7. Actualités & Collab du mois (Mockés car pas dans data_store, mais structurés)
    actualites_rh = [
        {"titre": "Politique Télétravail", "resume": "Mise à jour juin 2024", "date": "01/06/2024"}
    ]
    collaborateur_du_mois = {"nom": "Thomas Moreau", "departement": "Tech", "motif": "Excellence"}

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
        "actualites_rh": actualites_rh,
        "collaborateur_du_mois": collaborateur_du_mois
    }

@router.get("/resp-rh")
def get_resp_rh_dashboard(current_user: User = Depends(get_current_user)):
    from api.resp_rh import get_resp_rh_dashboard as get_rh_data
    return get_rh_data(current_user)

@router.get("/admin")
def get_admin_dashboard(current_user: User = Depends(get_current_user)):
    users = get_system_users()
    roles = get_role_stats()
    return {
        "kpis": {
            "total_users": len(users),
            "active_users": len([u for u in users if u.status == "active"]),
            "roles_configured": len(roles)
        },
        "users": users,
        "roles": roles
    }

@router.get("/direction")
def get_direction_dashboard(current_user: User = Depends(get_current_user)):
    return get_direction_kpis()