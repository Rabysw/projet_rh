from fastapi import APIRouter, Depends, HTTPException, Body
from datetime import datetime
from typing import List, Optional
from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

@router.post("/entree")
async def clock_in(
    location: str = Body("Bureau"), 
    current_user: User = Depends(get_current_user)
):
    """Enregistre l'arrivée d'un collaborateur (Module 01)"""
    # Obtenir l'ID de l'employé correspondant à l'utilisateur
    emp_resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
    if not emp_resp.data:
        raise HTTPException(status_code=404, detail="Profil employé non trouvé")
    emp_id = emp_resp.data[0]['id']

    # Vérifier si déjà pointé aujourd'hui sans sortie
    today = datetime.now().strftime("%Y-%m-%d") # Format ISO pour la base de données
    
    existing = supabase.table("attendance").select("*")\
        .eq("employee_id", emp_id)\
        .eq("date", today)\
        .is_("clock_out", "null")\
        .execute()
    
    if existing.data:
        raise HTTPException(status_code=400, detail="Vous avez déjà un pointage en cours pour aujourd'hui.")

    now = datetime.now()
    clock_in_time = now.strftime("%H:%M:%S")
    # Logique d'alerte retard (Heure limite 08:00)
    is_late = now.hour >= 8 and now.minute > 0

    new_log = {
        "employee_id": emp_id,
        "date": today,
        "clock_in": clock_in_time,
        "location": location,
        "status": "present" if not is_late else "late"
    }
    
    supabase.table("attendance").insert(new_log).execute()
    
    return {
        "message": "Pointage d'entrée réussi" + (" (Retard enregistré)" if is_late else ""),
        "time": clock_in_time,
        "late_alert": is_late
    }

@router.post("/sortie")
async def clock_out(current_user: User = Depends(get_current_user)):
    """Enregistre le départ d'un collaborateur"""
    # Obtenir l'ID de l'employé
    emp_resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
    if not emp_resp.data:
        raise HTTPException(status_code=404, detail="Profil employé non trouvé")
    emp_id = emp_resp.data[0]['id']

    today = datetime.now().strftime("%Y-%m-%d")
    
    log_query = supabase.table("attendance").select("*")\
        .eq("employee_id", emp_id)\
        .eq("date", today)\
        .is_("clock_out", "null")\
        .execute()
    
    if not log_query.data:
        raise HTTPException(status_code=404, detail="Aucun pointage d'entrée trouvé pour aujourd'hui.")

    log_id = log_query.data[0]['id']
    clock_out_time = datetime.now().strftime("%H:%M:%S")
    
    supabase.table("attendance").update({"clock_out": clock_out_time}).eq("id", log_id).execute()
    
    return {"message": "Pointage de sortie réussi", "time": clock_out_time}

@router.get("/historique")
async def get_my_attendance(current_user: User = Depends(get_current_user)):
    """Récupère l'historique personnel de pointage"""
    # Obtenir l'ID de l'employé
    emp_resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
    if not emp_resp.data:
        return []
    emp_id = emp_resp.data[0]['id']

    response = supabase.table("attendance").select("*").eq("employee_id", emp_id).execute()
    return response.data