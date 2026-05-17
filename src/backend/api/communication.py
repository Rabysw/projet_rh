from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List
from datetime import datetime
from auth.auth import get_current_user, User
from supabase_client import supabase
from utils.db_utils import retry_on_disconnect

router = APIRouter()

@router.get("/notes")
@retry_on_disconnect()
async def get_notes(current_user: User = Depends(get_current_user)):
    """Récupère les notes de service destinées au profil de l'utilisateur"""
    try:
        response = supabase.table("notes").select("*").eq("status", "Publiée").execute()
        return response.data or []
    except Exception as e:
        print(f"Error fetching notes: {e}")
        return []

@router.post("/notes")
@retry_on_disconnect()
async def create_note(note: dict = Body(...), current_user: User = Depends(get_current_user)):
    """RH/Admin : Création d'une note de service"""
    if current_user.role not in ["resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Non autorisé")
    
    try:
        response = supabase.table("notes").insert(note).execute()
        return {"message": "Note de service créée avec succès", "data": response.data[0] if response.data else None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating note: {str(e)}")

@router.post("/notes/{note_id}/accuser-lecture")
@retry_on_disconnect()
async def acknowledge_note(note_id: int, current_user: User = Depends(get_current_user)):
    """Module 07 - Enregistre l'horodatage de l'accusé de lecture"""
    # Get employee_id
    emp_resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
    if not emp_resp.data:
        raise HTTPException(status_code=404, detail="Profil employé non trouvé")
    emp_id = emp_resp.data[0]["id"]

    try:
        ack_data = {
            "note_id": note_id,
            "employee_id": emp_id,
            "acknowledged_at": datetime.now().isoformat()
        }
        supabase.table("note_acknowledgments").upsert(ack_data).execute()
        return {"message": "Accusé de lecture enregistré", "timestamp": ack_data["acknowledged_at"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error acknowledging note: {str(e)}")

@router.get("/evenements")
@retry_on_disconnect()
async def get_events(current_user: User = Depends(get_current_user)):
    """Liste tous les événements RH"""
    try:
        response = supabase.table("events").select("*").execute()
        return response.data or []
    except Exception as e:
        print(f"Error fetching events: {e}")
        return []

@router.post("/evenements")
@retry_on_disconnect()
async def create_event(event: dict = Body(...), current_user: User = Depends(get_current_user)):
    """RH/Admin : Création d'un événement (Anniversaire, Team Building, etc.)"""
    if current_user.role not in ["resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Non autorisé")
    
    try:
        supabase.table("events").insert(event).execute()
        return {"message": "Événement créé avec succès"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating event: {str(e)}")

# Alias for English frontend
@router.get("/events")
@retry_on_disconnect()
async def get_events_en(current_user: User = Depends(get_current_user)):
    """Alias: Liste tous les événements RH"""
    return await get_events(current_user)

@router.get("/palmares/collaborateur-du-mois")
@retry_on_disconnect()
async def get_collab_of_month():
    """Récupère le palmarès actuel"""
    try:
        response = supabase.table("collaborator_of_the_month").select("*, employees(first_name, last_name)").order("created_at", desc=True).limit(1).execute()
        if response.data:
            return response.data[0]
        return {"message": "Aucun palmarès pour le moment"}
    except Exception as e:
        print(f"Error fetching collab of month: {e}")
        return {"message": "Erreur lors de la récupération"}

# Alias for simpler frontend path
@router.get("/palmares")
@retry_on_disconnect()
async def get_palmares():
    """Alias: Récupère le palmarès actuel"""
    return await get_collab_of_month()

@router.get("/reunions")
@retry_on_disconnect()
async def get_meetings(current_user: User = Depends(get_current_user)):
    """Liste toutes les réunions"""
    try:
        response = supabase.table("meetings").select("*").execute()
        return response.data or []
    except Exception as e:
        print(f"Error fetching meetings: {e}")
        return []

@router.post("/reunions")
@retry_on_disconnect()
async def create_meeting(meeting: dict = Body(...), current_user: User = Depends(get_current_user)):
    """Enregistrement des instances (Comité de direction, DP, etc.) et PV"""
    if current_user.role not in ["resp_rh", "admin_rh", "direction"]:
        raise HTTPException(status_code=403, detail="Non autorisé")
    
    try:
        supabase.table("meetings").insert(meeting).execute()
        return {"message": "PV de réunion enregistré"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating meeting: {str(e)}")