from fastapi import APIRouter, Depends, HTTPException, Body
from auth.auth import get_current_user, User
from supabase_client import supabase
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()


# ─── Schemas ──────────────────────────────────────────────────────────────────

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date_scheduled: Optional[str] = None
    category: Optional[str] = "Général"


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "a_faire"
    due_date: Optional[str] = None
    assigned_to: Optional[int] = None


class TaskStatusUpdate(BaseModel):
    status: str


# ─── Projects ─────────────────────────────────────────────────────────────────

@router.get("/")
async def list_projects(current_user: User = Depends(get_current_user)):
    # Récupérer l'ID employé de l'utilisateur
    employee = (
        supabase.table("employees")
        .select("id")
        .eq("user_id", str(current_user.id))
        .limit(1)
        .execute()
    )
    if not employee.data:
        return []
    employee_id = employee.data[0]["id"]
    
    # Voir les projets où l'utilisateur est manager
    result = (
        supabase.table("projects")
        .select("*")
        .eq("manager_id", employee_id)
        .order("created_at", desc=True)
        .execute()
    )
    return result.data or []


@router.post("/")
async def create_project(
    payload: ProjectCreate,
    current_user: User = Depends(get_current_user),
):
    employee = (
        supabase.table("employees")
        .select("id")
        .eq("user_id", str(current_user.id))
        .limit(1)
        .execute()
    )
    if not employee.data:
        raise HTTPException(status_code=404, detail="Employé non trouvé")
    employee_id = employee.data[0]["id"]

    data = {
        "name": payload.name,
        "description": payload.description,
        "start_date": payload.start_date,
        "end_date_scheduled": payload.end_date_scheduled,
        "category": payload.category,
        "manager_id": employee_id,
        "status": "en_cours"
    }

    result = supabase.table("projects").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Erreur lors de la création du projet")
    return result.data[0]


# ─── Tasks ────────────────────────────────────────────────────────────────────

@router.get("/{project_id}/tasks")
async def get_project_tasks(
    project_id: int,
    current_user: User = Depends(get_current_user),
):
    result = (
        supabase.table("tasks")
        .select("*")
        .eq("project_id", project_id)
        .order("created_at", desc=True)
        .execute()
    )
    return result.data or []


@router.post("/{project_id}/tasks")
async def create_task(
    project_id: int,
    payload: TaskCreate,
    current_user: User = Depends(get_current_user),
):
    data = {
        "project_id": project_id,
        "title": payload.title,
        "description": payload.description,
        "status": payload.status,
        "due_date": payload.due_date,
        "assigned_to": payload.assigned_to
    }

    result = supabase.table("tasks").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Erreur lors de la création de la tâche")
    return result.data[0]
