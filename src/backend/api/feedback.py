from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List, Optional
from datetime import datetime
import uuid

from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

@router.post("/doleances")
async def submit_feedback(
    title: str = Body(...),
    description: str = Body(...),
    category: str = Body(...),
    is_anonymous: bool = Body(False),
    current_user: User = Depends(get_current_user)
):
    """Soumission d'une doléance ou suggestion avec génération de numéro de suivi"""
    tracking_number = f"ICES-{datetime.now().year}-{uuid.uuid4().hex[:6].upper()}"
    
    new_feedback = {
        "employee_id": None if is_anonymous else current_user.id,
        "tracking_number": tracking_number,
        "type": "Doléance",
        "title": title,
        "description": description,
        "category": category,
        "priority": "Moyenne",
        "status": "Nouveau",
        "created_at": datetime.now().isoformat()
    }
    
    supabase.table("suggestions").insert(new_feedback).execute()
    
    return {
        "message": "Votre remontée a été enregistrée",
        "tracking_number": tracking_number,
        "status": "Nouveau"
    }

@router.get("/doleances/{tracking_number}")
async def track_feedback(tracking_number: str):
    """Suivi d'une doléance via son numéro unique (accessible sans auth si anonyme)"""
    response = supabase.table("suggestions").select("*").eq("tracking_number", tracking_number).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Numéro de suivi invalide")
    feedback = response.data[0]

    return {
        "title": feedback['title'],
        "status": feedback['status'],
        "created_at": feedback['created_at'],
        "response": feedback['response'],
        "response_date": getattr(feedback, "response_date", None)
    }

@router.post("/{feedback_id}/traiter")
async def process_feedback(
    feedback_id: int, 
    response: str = Body(...), 
    new_status: str = Body("Traité"),
    current_user: User = Depends(get_current_user)
):
    """Traitement par la RH ou Direction"""
    if current_user.role not in ["resp_rh", "admin_rh", "direction"]:
        raise HTTPException(status_code=403, detail="Accès réservé aux gestionnaires")
    
    supabase.table("suggestions").update({
        "status": new_status,
        "response": response,
        "updated_at": datetime.now().isoformat()
    }).eq("id", feedback_id).execute()
    
    # Ici on déclencherait une notification WebSocket/Email
    return {"message": "Réponse enregistrée et statut mis à jour"}