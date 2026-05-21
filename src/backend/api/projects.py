"""
Module Projets & Tâches — ASIN RH
Endpoints pour la gestion des projets, tâches, membres, commentaires et fichiers joints.
Accessible : manager (gestion complète) + collaborateur (lecture + mise à jour de ses tâches)
"""
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from auth.auth import get_current_user, User
from supabase_client import supabase, supabase_admin
from pydantic import BaseModel
from typing import Optional, List
import base64
import uuid
from datetime import datetime

router = APIRouter()


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _get_employee_id(user_id: str) -> int:
    """Retourne l'employee_id à partir du user_id, lève 404 sinon."""
    result = (
        supabase.table("employees")
        .select("id")
        .eq("user_id", user_id)
        .limit(1)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Employé non trouvé")
    return result.data[0]["id"]


def _assert_project_access(project_id: int, employee_id: int, role: str):
    """
    Vérifie que l'utilisateur a accès au projet :
    - Manager : doit être manager_id du projet
    - Collaborateur : doit être membre du projet
    - resp_rh / admin_rh / direction : accès total
    """
    if role in ("resp_rh", "admin_rh", "direction"):
        return  # accès complet

    project = supabase.table("projects").select("id, manager_id").eq("id", project_id).limit(1).execute()
    if not project.data:
        raise HTTPException(status_code=404, detail="Projet introuvable")

    if project.data[0]["manager_id"] == employee_id:
        return  # c'est le manager du projet

    # Vérifier si collaborateur membre
    membership = (
        supabase.table("project_members")
        .select("id")
        .eq("project_id", project_id)
        .eq("employee_id", employee_id)
        .limit(1)
        .execute()
    )
    if not membership.data:
        raise HTTPException(status_code=403, detail="Accès refusé à ce projet")


# ─── Schemas ──────────────────────────────────────────────────────────────────

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date_scheduled: Optional[str] = None
    category: Optional[str] = "Général"


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[str] = None
    end_date_scheduled: Optional[str] = None
    status: Optional[str] = None
    category: Optional[str] = None


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "À faire"
    priority: Optional[str] = "Normale"
    due_date: Optional[str] = None
    assigned_to: Optional[int] = None  # employee_id


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[str] = None
    assigned_to: Optional[int] = None


class TaskStatusUpdate(BaseModel):
    status: str


class MemberAdd(BaseModel):
    employee_id: int
    role_in_project: Optional[str] = "Membre"


class CommentCreate(BaseModel):
    content: str


class ProjectNoteCreate(BaseModel):
    content: str


# ─── Projects ─────────────────────────────────────────────────────────────────

@router.get("/")
async def list_projects(current_user: User = Depends(get_current_user)):
    """
    Retourne les projets accessibles à l'utilisateur connecté :
    - Manager : projets dont il est manager_id
    - Collaborateur : projets dont il est membre
    - RH / Direction : tous les projets
    """
    employee_id = _get_employee_id(str(current_user.id))
    role = current_user.role

    if role in ("resp_rh", "admin_rh", "direction"):
        result = (
            supabase.table("projects")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )
        return result.data or []

    if role == "manager":
        result = (
            supabase.table("projects")
            .select("*")
            .eq("manager_id", employee_id)
            .order("created_at", desc=True)
            .execute()
        )
        return result.data or []

    # collaborateur : projets où il est membre
    memberships = (
        supabase.table("project_members")
        .select("project_id")
        .eq("employee_id", employee_id)
        .execute()
    )
    if not memberships.data:
        return []
    project_ids = [m["project_id"] for m in memberships.data]
    result = (
        supabase.table("projects")
        .select("*")
        .in_("id", project_ids)
        .order("created_at", desc=True)
        .execute()
    )
    return result.data or []


@router.post("/")
async def create_project(
    payload: ProjectCreate,
    current_user: User = Depends(get_current_user),
):
    """Crée un projet. Réservé aux managers, resp_rh et admin_rh."""
    if current_user.role not in ("manager", "resp_rh", "admin_rh"):
        raise HTTPException(status_code=403, detail="Seuls les managers peuvent créer un projet")

    employee_id = _get_employee_id(str(current_user.id))

    data = {
        "name": payload.name,
        "description": payload.description,
        "start_date": payload.start_date,
        "end_date_scheduled": payload.end_date_scheduled,
        "category": payload.category,
        "manager_id": employee_id,
        "status": "En cours",
    }
    result = supabase_admin.table("projects").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Erreur lors de la création du projet")
    return result.data[0]


@router.patch("/{project_id}")
async def update_project(
    project_id: int,
    payload: ProjectUpdate,
    current_user: User = Depends(get_current_user),
):
    """Met à jour un projet. Réservé au manager du projet ou RH/admin."""
    employee_id = _get_employee_id(str(current_user.id))

    if current_user.role not in ("resp_rh", "admin_rh", "direction"):
        project = supabase.table("projects").select("manager_id").eq("id", project_id).limit(1).execute()
        if not project.data or project.data[0]["manager_id"] != employee_id:
            raise HTTPException(status_code=403, detail="Accès refusé")

    updates = {k: v for k, v in payload.dict().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="Aucune donnée à mettre à jour")

    result = supabase_admin.table("projects").update(updates).eq("id", project_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Projet introuvable")
    return result.data[0]


@router.delete("/{project_id}")
async def delete_project(
    project_id: int,
    current_user: User = Depends(get_current_user),
):
    """Supprime un projet. Réservé au manager du projet ou admin."""
    employee_id = _get_employee_id(str(current_user.id))

    if current_user.role not in ("resp_rh", "admin_rh"):
        project = supabase.table("projects").select("manager_id").eq("id", project_id).limit(1).execute()
        if not project.data or project.data[0]["manager_id"] != employee_id:
            raise HTTPException(status_code=403, detail="Accès refusé")

    supabase_admin.table("projects").delete().eq("id", project_id).execute()
    return {"message": "Projet supprimé"}


# ─── Members ──────────────────────────────────────────────────────────────────

@router.get("/{project_id}/members")
async def get_project_members(
    project_id: int,
    current_user: User = Depends(get_current_user),
):
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    result = (
        supabase.table("project_members")
        .select("*, employees(id, first_name, last_name, position, profile_picture_url)")
        .eq("project_id", project_id)
        .execute()
    )
    return result.data or []


@router.post("/{project_id}/members")
async def add_project_member(
    project_id: int,
    payload: MemberAdd,
    current_user: User = Depends(get_current_user),
):
    """Ajoute un membre au projet. Réservé au manager du projet."""
    employee_id = _get_employee_id(str(current_user.id))

    if current_user.role not in ("resp_rh", "admin_rh"):
        project = supabase.table("projects").select("manager_id").eq("id", project_id).limit(1).execute()
        if not project.data or project.data[0]["manager_id"] != employee_id:
            raise HTTPException(status_code=403, detail="Seul le manager peut ajouter des membres")

    data = {
        "project_id": project_id,
        "employee_id": payload.employee_id,
        "role_in_project": payload.role_in_project,
    }
    result = supabase_admin.table("project_members").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Erreur lors de l'ajout du membre")
    return result.data[0]


@router.delete("/{project_id}/members/{employee_id_to_remove}")
async def remove_project_member(
    project_id: int,
    employee_id_to_remove: int,
    current_user: User = Depends(get_current_user),
):
    """Retire un membre du projet."""
    employee_id = _get_employee_id(str(current_user.id))

    if current_user.role not in ("resp_rh", "admin_rh"):
        project = supabase.table("projects").select("manager_id").eq("id", project_id).limit(1).execute()
        if not project.data or project.data[0]["manager_id"] != employee_id:
            raise HTTPException(status_code=403, detail="Accès refusé")

    supabase_admin.table("project_members") \
        .delete() \
        .eq("project_id", project_id) \
        .eq("employee_id", employee_id_to_remove) \
        .execute()
    return {"message": "Membre retiré"}


# ─── Tasks ────────────────────────────────────────────────────────────────────

@router.get("/my-tasks")
async def get_my_tasks(current_user: User = Depends(get_current_user)):
    """
    Retourne toutes les tâches assignées à l'utilisateur connecté,
    tous projets confondus. Utile pour l'espace Productivité Collaborateur.
    """
    employee_id = _get_employee_id(str(current_user.id))
    result = (
        supabase.table("tasks")
        .select("*, projects(id, name, status)")
        .eq("assigned_to", employee_id)
        .order("due_date", desc=False)
        .execute()
    )
    return result.data or []


@router.get("/{project_id}/tasks")
async def get_project_tasks(
    project_id: int,
    current_user: User = Depends(get_current_user),
):
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    result = (
        supabase.table("tasks")
        .select("*, employees!tasks_assigned_to_fkey(id, first_name, last_name)")
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
    """Crée une tâche dans un projet. Réservé au manager du projet."""
    employee_id = _get_employee_id(str(current_user.id))

    if current_user.role not in ("resp_rh", "admin_rh"):
        project = supabase.table("projects").select("manager_id").eq("id", project_id).limit(1).execute()
        if not project.data or project.data[0]["manager_id"] != employee_id:
            raise HTTPException(status_code=403, detail="Seul le manager peut créer des tâches")

    data = {
        "project_id": project_id,
        "title": payload.title,
        "description": payload.description,
        "status": payload.status,
        "priority": payload.priority,
        "due_date": payload.due_date,
        "assigned_to": payload.assigned_to,
        "created_by": employee_id,
    }
    result = supabase_admin.table("tasks").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Erreur lors de la création de la tâche")
    return result.data[0]


@router.patch("/{project_id}/tasks/{task_id}")
async def update_task(
    project_id: int,
    task_id: int,
    payload: TaskUpdate,
    current_user: User = Depends(get_current_user),
):
    """Met à jour les détails d'une tâche. Réservé au manager."""
    employee_id = _get_employee_id(str(current_user.id))

    if current_user.role not in ("resp_rh", "admin_rh"):
        project = supabase.table("projects").select("manager_id").eq("id", project_id).limit(1).execute()
        if not project.data or project.data[0]["manager_id"] != employee_id:
            raise HTTPException(status_code=403, detail="Accès refusé")

    updates = {k: v for k, v in payload.dict().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="Aucune donnée à mettre à jour")

    result = supabase_admin.table("tasks").update(updates).eq("id", task_id).eq("project_id", project_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Tâche introuvable")
    return result.data[0]


@router.patch("/{project_id}/tasks/{task_id}/status")
async def update_task_status(
    project_id: int,
    task_id: int,
    payload: TaskStatusUpdate,
    current_user: User = Depends(get_current_user),
):
    """
    Met à jour le statut d'une tâche.
    - Manager : peut changer le statut de n'importe quelle tâche du projet
    - Collaborateur : peut changer uniquement le statut de ses propres tâches
    """
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    # Si collaborateur, vérifier que la tâche lui est assignée
    if current_user.role == "collaborateur":
        task = supabase.table("tasks").select("assigned_to").eq("id", task_id).limit(1).execute()
        if not task.data or task.data[0]["assigned_to"] != employee_id:
            raise HTTPException(status_code=403, detail="Vous ne pouvez modifier que vos propres tâches")

    valid_statuses = ["À faire", "En cours", "Terminé", "Bloqué"]
    if payload.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Statut invalide. Valeurs possibles : {valid_statuses}")

    result = (
        supabase_admin.table("tasks")
        .update({"status": payload.status, "updated_at": datetime.utcnow().isoformat()})
        .eq("id", task_id)
        .eq("project_id", project_id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Tâche introuvable")
    return result.data[0]


@router.delete("/{project_id}/tasks/{task_id}")
async def delete_task(
    project_id: int,
    task_id: int,
    current_user: User = Depends(get_current_user),
):
    """Supprime une tâche. Réservé au manager du projet."""
    employee_id = _get_employee_id(str(current_user.id))

    if current_user.role not in ("resp_rh", "admin_rh"):
        project = supabase.table("projects").select("manager_id").eq("id", project_id).limit(1).execute()
        if not project.data or project.data[0]["manager_id"] != employee_id:
            raise HTTPException(status_code=403, detail="Accès refusé")

    supabase_admin.table("tasks").delete().eq("id", task_id).eq("project_id", project_id).execute()
    return {"message": "Tâche supprimée"}


# ─── Task Comments ────────────────────────────────────────────────────────────

@router.get("/{project_id}/tasks/{task_id}/comments")
async def get_task_comments(
    project_id: int,
    task_id: int,
    current_user: User = Depends(get_current_user),
):
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    result = (
        supabase.table("task_comments")
        .select("*, employees!task_comments_author_id_fkey(id, first_name, last_name, profile_picture_url)")
        .eq("task_id", task_id)
        .order("created_at", desc=False)
        .execute()
    )
    return result.data or []


@router.post("/{project_id}/tasks/{task_id}/comments")
async def add_task_comment(
    project_id: int,
    task_id: int,
    payload: CommentCreate,
    current_user: User = Depends(get_current_user),
):
    """Ajoute un commentaire à une tâche. Accessible à tous les membres du projet."""
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    if not payload.content.strip():
        raise HTTPException(status_code=400, detail="Le commentaire ne peut pas être vide")

    data = {
        "task_id": task_id,
        "author_id": employee_id,
        "content": payload.content.strip(),
    }
    result = supabase_admin.table("task_comments").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Erreur lors de l'ajout du commentaire")
    return result.data[0]


@router.delete("/{project_id}/tasks/{task_id}/comments/{comment_id}")
async def delete_task_comment(
    project_id: int,
    task_id: int,
    comment_id: int,
    current_user: User = Depends(get_current_user),
):
    """Supprime un commentaire. Seul l'auteur ou le manager peut supprimer."""
    employee_id = _get_employee_id(str(current_user.id))

    comment = supabase.table("task_comments").select("author_id").eq("id", comment_id).limit(1).execute()
    if not comment.data:
        raise HTTPException(status_code=404, detail="Commentaire introuvable")

    is_author = comment.data[0]["author_id"] == employee_id
    is_privileged = current_user.role in ("manager", "resp_rh", "admin_rh")

    if not is_author and not is_privileged:
        raise HTTPException(status_code=403, detail="Vous ne pouvez supprimer que vos propres commentaires")

    supabase_admin.table("task_comments").delete().eq("id", comment_id).execute()
    return {"message": "Commentaire supprimé"}


# ─── Task Files ───────────────────────────────────────────────────────────────

@router.get("/{project_id}/tasks/{task_id}/files")
async def get_task_files(
    project_id: int,
    task_id: int,
    current_user: User = Depends(get_current_user),
):
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    result = (
        supabase.table("task_files")
        .select("*, employees!task_files_uploaded_by_fkey(id, first_name, last_name)")
        .eq("task_id", task_id)
        .order("created_at", desc=True)
        .execute()
    )
    return result.data or []


@router.post("/{project_id}/tasks/{task_id}/files")
async def upload_task_file(
    project_id: int,
    task_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    """
    Upload un fichier lié à une tâche.
    Le fichier est stocké dans Supabase Storage sous task-files/{project_id}/{task_id}/
    Accessible à tous les membres du projet.
    """
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    # Limiter la taille (10 MB max)
    MAX_SIZE = 10 * 1024 * 1024
    content = await file.read()
    if len(content) > MAX_SIZE:
        raise HTTPException(status_code=413, detail="Fichier trop volumineux (max 10 MB)")

    # Générer un nom de fichier unique
    ext = file.filename.split(".")[-1] if "." in file.filename else "bin"
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    storage_path = f"{project_id}/{task_id}/{unique_name}"

    try:
        supabase.storage.from_("task-files").upload(
            path=storage_path,
            file=content,
            file_options={"content-type": file.content_type or "application/octet-stream"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur upload Supabase Storage : {str(e)}")

    # Récupérer l'URL publique
    public_url = supabase.storage.from_("task-files").get_public_url(storage_path)

    # Enregistrer en base
    data = {
        "task_id": task_id,
        "uploaded_by": employee_id,
        "file_name": file.filename,
        "file_url": public_url,
        "file_size": len(content),
        "mime_type": file.content_type,
    }
    result = supabase_admin.table("task_files").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement du fichier")
    return result.data[0]


@router.delete("/{project_id}/tasks/{task_id}/files/{file_id}")
async def delete_task_file(
    project_id: int,
    task_id: int,
    file_id: int,
    current_user: User = Depends(get_current_user),
):
    """Supprime un fichier. Seul l'auteur ou le manager peut supprimer."""
    employee_id = _get_employee_id(str(current_user.id))

    file_record = supabase.table("task_files").select("uploaded_by, file_url").eq("id", file_id).limit(1).execute()
    if not file_record.data:
        raise HTTPException(status_code=404, detail="Fichier introuvable")

    is_uploader = file_record.data[0]["uploaded_by"] == employee_id
    is_privileged = current_user.role in ("manager", "resp_rh", "admin_rh")

    if not is_uploader and not is_privileged:
        raise HTTPException(status_code=403, detail="Accès refusé")

    supabase_admin.table("task_files").delete().eq("id", file_id).execute()
    return {"message": "Fichier supprimé"}


# ─── Project Notes ────────────────────────────────────────────────────────────

@router.get("/{project_id}/notes")
async def get_project_notes(
    project_id: int,
    current_user: User = Depends(get_current_user),
):
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    result = (
        supabase.table("project_notes")
        .select("*, employees!project_notes_author_id_fkey(id, first_name, last_name, profile_picture_url)")
        .eq("project_id", project_id)
        .order("created_at", desc=True)
        .execute()
    )
    return result.data or []


@router.post("/{project_id}/notes")
async def add_project_note(
    project_id: int,
    payload: ProjectNoteCreate,
    current_user: User = Depends(get_current_user),
):
    """Ajoute une note/commentaire sur le projet. Accessible à tous les membres."""
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    if not payload.content.strip():
        raise HTTPException(status_code=400, detail="La note ne peut pas être vide")

    data = {
        "project_id": project_id,
        "author_id": employee_id,
        "content": payload.content.strip(),
    }
    result = supabase_admin.table("project_notes").insert(data).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Erreur lors de l'ajout de la note")
    return result.data[0]


@router.delete("/{project_id}/notes/{note_id}")
async def delete_project_note(
    project_id: int,
    note_id: int,
    current_user: User = Depends(get_current_user),
):
    employee_id = _get_employee_id(str(current_user.id))

    note = supabase.table("project_notes").select("author_id").eq("id", note_id).limit(1).execute()
    if not note.data:
        raise HTTPException(status_code=404, detail="Note introuvable")

    is_author = note.data[0]["author_id"] == employee_id
    is_privileged = current_user.role in ("manager", "resp_rh", "admin_rh")

    if not is_author and not is_privileged:
        raise HTTPException(status_code=403, detail="Accès refusé")

    supabase_admin.table("project_notes").delete().eq("id", note_id).execute()
    return {"message": "Note supprimée"}


# ─── Stats projet (pour la vue manager) ──────────────────────────────────────

@router.get("/{project_id}/stats")
async def get_project_stats(
    project_id: int,
    current_user: User = Depends(get_current_user),
):
    """Retourne les statistiques d'un projet : nb tâches par statut, retards, membres."""
    employee_id = _get_employee_id(str(current_user.id))
    _assert_project_access(project_id, employee_id, current_user.role)

    tasks = supabase.table("tasks").select("status, due_date, assigned_to").eq("project_id", project_id).execute()
    members = supabase.table("project_members").select("id").eq("project_id", project_id).execute()

    task_list = tasks.data or []
    today = datetime.utcnow().date().isoformat()

    stats = {
        "total": len(task_list),
        "a_faire": sum(1 for t in task_list if t["status"] == "À faire"),
        "en_cours": sum(1 for t in task_list if t["status"] == "En cours"),
        "termine": sum(1 for t in task_list if t["status"] == "Terminé"),
        "bloque": sum(1 for t in task_list if t["status"] == "Bloqué"),
        "en_retard": sum(
            1 for t in task_list
            if t.get("due_date") and t["due_date"] < today and t["status"] != "Terminé"
        ),
        "membres": len(members.data or []),
    }
    return stats