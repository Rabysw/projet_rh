from fastapi import APIRouter, Depends, HTTPException
from auth.auth import get_current_user, User
from db_client import (
    get_team_members,
    get_team_stats,
    get_team_leave_requests,
    get_team_skills_stats,
    get_projects,
    get_kpis,
)
from data_store import (
    manager_leave_requests, collab_leave_requests, TeamLeaveRequest,
    manager_team, manager_projects, manager_kpis
)
from datetime import datetime

router = APIRouter()


@router.get("/team")
def read_team(current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return get_team_members(current_user.id)


@router.get("/stats")
def read_stats(current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return get_team_stats(current_user.id)


@router.get("/leaves")
def read_leave_requests(current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return get_team_leave_requests(current_user.id)


@router.post("/leaves/{leave_id}/approve")
def approve_leave(leave_id: int, current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")

    # 1. Update manager's list
    leave = next((l for l in manager_leave_requests if l.id == leave_id), None)
    if not leave:
        raise HTTPException(status_code=404, detail="Demande non trouvée")
    if leave.status != "pending":
        raise HTTPException(status_code=400, detail="Cette demande a déjà été traitée")

    leave.status = "approved"

    # 2. ALSO update collaborator's personal list to notify them
    collab_leave = next((l for l in collab_leave_requests if l.id == leave_id), None)
    if collab_leave:
        collab_leave.status = "approved"

    return {"message": "Congé approuvé avec succès"}


@router.post("/leaves/{leave_id}/reject")
def reject_leave(leave_id: int, current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")

    # 1. Update manager's list
    leave = next((l for l in manager_leave_requests if l.id == leave_id), None)
    if not leave:
        raise HTTPException(status_code=404, detail="Demande non trouvée")
    if leave.status != "pending":
        raise HTTPException(status_code=400, detail="Cette demande a déjà été traitée")

    leave.status = "rejected"

    # 2. ALSO update collaborator's personal list to notify them
    collab_leave = next((l for l in collab_leave_requests if l.id == leave_id), None)
    if collab_leave:
        collab_leave.status = "rejected"

    return {"message": "Congé rejeté"}


@router.get("/skills")
def read_skills(current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return get_team_skills_stats(current_user.id)


@router.get("/skills/stats")
def read_skills_stats(current_user: User = Depends(get_current_user)):
    """Statistiques globales des compétences de l'équipe"""
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return {
        "moyenne_equipe": 3.4,
        "competences_critiques": 2,
        "employes_en_formation": 3,
        "gaps_identifies": 7
    }


@router.get("/skills/members")
def read_skills_members(current_user: User = Depends(get_current_user)):
    """Liste des membres de l'équipe avec leurs niveaux de compétences"""
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return [
        {
            "id": 1,
            "nom": "Dupont Jean",
            "poste": "Développeur",
            "competences": [
                {"nom": "Python", "niveau_actuel": 3, "niveau_requis": 4},
                {"nom": "React", "niveau_actuel": 2, "niveau_requis": 3}
            ],
            "score_global": 68
        },
        {
            "id": 2,
            "nom": "Martin Sophie",
            "poste": "Designer UX",
            "competences": [
                {"nom": "Figma", "niveau_actuel": 4, "niveau_requis": 4},
                {"nom": "UI/UX", "niveau_actuel": 3, "niveau_requis": 3}
            ],
            "score_global": 85
        }
    ]


@router.get("/team/leave-requests")
def read_team_leave_requests(current_user: User = Depends(get_current_user)):
    """Alias for /leaves"""
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return get_team_leave_requests(current_user.id)

@router.get("/team/skills")
def read_team_skills(current_user: User = Depends(get_current_user)):
    """Alias for /skills"""
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return get_team_skills_stats(current_user.id)

@router.get("/team/productivity")
def read_team_productivity(current_user: User = Depends(get_current_user)):
    """Team productivity metrics"""
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return {
        "kpis": manager_kpis,
        "projects": manager_projects,
        "team_members": len(manager_team)
    }

@router.patch("/productivity/{indicator_id}")
def update_productivity(indicator_id: int, data: dict, current_user: User = Depends(get_current_user)):
    """Mise à jour d'un indicateur de productivité"""
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    # Simulation de mise à jour
    return {"message": "Indicateur mis à jour", "id": indicator_id, "new_value": data.get("value")}

@router.get("/projects")
def read_projects(current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return get_projects(current_user.id)

@router.post("/projects")
def create_project(project: dict, current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    # Simulation
    return {"message": "Projet créé", "id": 999, "name": project.get("name")}

@router.get("/projects/{project_id}/tasks")
def read_project_tasks(project_id: int, current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    # For now, return mock tasks to avoid 500 if DB table is missing
    return [
        {"id": 1, "name": "Conception BDD", "status": "done", "assignee": "Jean"},
        {"id": 2, "name": "Dev Frontend", "status": "in_progress", "assignee": "Sophie"},
        {"id": 3, "name": "Tests unitaires", "status": "todo", "assignee": "Pierre"}
    ]

@router.post("/projects/{project_id}/tasks")
def create_task(project_id: int, task: dict, current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return {"message": "Tâche ajoutée", "id": 888, "name": task.get("name")}

@router.patch("/projects/tasks/{task_id}")
def update_task_status(task_id: int, data: dict, current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return {"message": "Statut mis à jour", "id": task_id, "new_status": data.get("status")}

@router.get("/kpis")
def read_kpis(current_user: User = Depends(get_current_user)):
    if current_user.role != "manager":
        raise HTTPException(status_code=403, detail="Non autorisé")
    return get_kpis(current_user.id)