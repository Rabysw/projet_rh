from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List, Optional
from auth.auth import get_current_user, User
from data_store import projects, tasks

router = APIRouter()

@router.get("/")
async def list_projects(current_user: User = Depends(get_current_user)):
    """Liste tous les projets accessibles au rôle"""
    return projects

@router.get("/{project_id}/tasks")
async def get_project_tasks(project_id: int):
    """Récupère les tâches d'un projet pour affichage Kanban"""
    return [t for t in tasks if t.project_id == project_id]

@router.patch("/{project_id}/tasks/{task_id}/status")
async def update_task_status(
    project_id: int,
    task_id: int,
    status: str = Body(..., embed=True),
    current_user: User = Depends(get_current_user)
):
    """Met à jour le statut d'une tâche (Drag & Drop Kanban)"""
    task = next((t for t in tasks if t.id == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")

    task.status = status

    # Recalcul de la progression du projet
    project_tasks = [t for t in tasks if t.project_id == project_id]
    completed = len([t for t in project_tasks if t.status == "Terminé"])

    new_progress = 0
    if project_tasks:
        new_progress = int((completed / len(project_tasks)) * 100)
        project = next((p for p in projects if p.id == project_id), None)
        if project:
            project.progress = new_progress

    return {"message": "Statut mis à jour", "new_status": status, "project_progress": new_progress}

@router.get("/{project_id}/gantt")
async def get_gantt_data(project_id: int):
    """Formatte les données pour le diagramme de Gantt"""
    project = next((p for p in projects if p.id == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Projet non trouvé")

    project_tasks = [t for t in tasks if t.project_id == project_id]

    return {
        "id": project.id,
        "name": project.name,
        "start": project.start_date,
        "end": project.end_date_scheduled,
        "tasks": [
            {
                "id": t.id,
                "name": t.title,
                "start": project.start_date,
                "end": t.deadline,
                "progress": 100 if t.status == "Terminé" else 0
            } for t in project_tasks
        ]
    }