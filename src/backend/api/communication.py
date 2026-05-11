from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List
from datetime import datetime
from auth.auth import get_current_user, User
from data_store import notes, events, collaborator_of_the_month, meetings, rh_employees

router = APIRouter()

@router.get("/notes")
async def get_notes(current_user: User = Depends(get_current_user)):
    """Récupère les notes de service destinées au profil de l'utilisateur"""
    return [n for n in notes if n.status == "Publiée"]

@router.post("/notes")
async def create_note(note: dict = Body(...), current_user: User = Depends(get_current_user)):
    """RH/Admin : Création d'une note de service"""
    if current_user.role not in ["resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Non autorisé")
    
    # Simuler l'ajout
    return {"message": "Note de service créée avec succès"}

@router.post("/notes/{note_id}/accuser-lecture")
async def acknowledge_note(note_id: int, current_user: User = Depends(get_current_user)):
    """Module 07 - Enregistre l'horodatage de l'accusé de lecture"""
    note = next((n for n in notes if n.id == note_id), None)
    if not note or not note.requires_acknowledgment:
        raise HTTPException(status_code=404, detail="Note non trouvée ou accusé non requis")
    
    return {"message": "Accusé de lecture enregistré", "timestamp": datetime.now().isoformat()}

@router.get("/evenements")
async def get_events(current_user: User = Depends(get_current_user)):
    """Liste tous les événements RH"""
    return events

@router.post("/evenements")
async def create_event(event: dict = Body(...), current_user: User = Depends(get_current_user)):
    """RH/Admin : Création d'un événement (Anniversaire, Team Building, etc.)"""
    if current_user.role not in ["resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Non autorisé")
    
    return {"message": "Événement créé avec succès"}

# Alias for English frontend
@router.get("/events")
async def get_events_en(current_user: User = Depends(get_current_user)):
    """Alias: Liste tous les événements RH"""
    return events

@router.get("/palmares/collaborateur-du-mois")
async def get_collab_of_month():
    """Récupère le palmarès actuel"""
    if collaborator_of_the_month:
        return collaborator_of_the_month
    
    return {"message": "Aucun palmarès pour le moment"}

# Alias for simpler frontend path
@router.get("/palmares")
async def get_palmares():
    """Alias: Récupère le palmarès actuel"""
    return await get_collab_of_month()

@router.get("/reunions")
async def get_meetings(current_user: User = Depends(get_current_user)):
    """Liste toutes les réunions"""
    return meetings

@router.post("/reunions")
async def create_meeting(meeting: dict = Body(...), current_user: User = Depends(get_current_user)):
    """Enregistrement des instances (Comité de direction, DP, etc.) et PV"""
    if current_user.role not in ["resp_rh", "admin_rh", "direction"]:
        raise HTTPException(status_code=403, detail="Non autorisé")
    
    return {"message": "PV de réunion enregistré"}