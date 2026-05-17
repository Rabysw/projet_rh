from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List
from datetime import datetime
from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

# --- GESTION PARC AUTO ---

@router.get("/vehicules")
async def list_vehicles(current_user: User = Depends(get_current_user)):
    query = supabase.table("vehicles").select("*")

    if current_user.role not in ["resp_rh", "admin_rh", "direction"]:
        # Get employee_id
        emp_resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
        if not emp_resp.data:
            return []
        emp_id = emp_resp.data[0]["id"]
        query = query.eq("assigned_to", emp_id)
    
    response = query.execute()
    return response.data

@router.post("/vehicules/{vehicle_id}/attribuer")
async def assign_vehicle(
    vehicle_id: int, 
    employee_id: int = Body(..., embed=True),
    current_user: User = Depends(get_current_user)
):
    """Attribue un véhicule à un collaborateur"""
    if current_user.role not in ["resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Non autorisé")
        
    # Vérification de l'existence du véhicule dans Supabase
    vehicle_resp = supabase.table("vehicles").select("*").eq("id", vehicle_id).execute()
    if not vehicle_resp.data:
        raise HTTPException(status_code=404, detail="Véhicule non trouvé")
        
    new_assignment = {
        "employee_id": employee_id,
        "date_start": datetime.now().strftime("%d/%m/%Y")
    }
    
    history = vehicle_resp.data[0].get("assignment_history", []) or []
    history.append(new_assignment)

    supabase.table("vehicles").update({
        "status": "Attribué",
        "assigned_to": employee_id,
        "assignment_history": history,
        "updated_at": datetime.now().isoformat()
    }).eq("id", vehicle_id).execute()

    return {"message": "Véhicule attribué avec succès"}

# --- GESTION DES BADGES ---

@router.post("/badges/declarer-perte")
async def report_lost_badge(current_user: User = Depends(get_current_user)):
    """Désactive le badge actuel et notifie la RH pour remplacement"""
    # Get employee_id
    emp_resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
    if not emp_resp.data:
        raise HTTPException(status_code=404, detail="Profil employé non trouvé")
    emp_id = emp_resp.data[0]["id"]

    supabase.table("badges").update({"status": "Perdu"})\
        .eq("employee_id", emp_id)\
        .eq("status", "Actif").execute()
        
    return {"message": "Badge désactivé pour sécurité. Demande de remplacement envoyée."}

@router.get("/badges/inventaire")
async def get_all_badges(current_user: User = Depends(get_current_user)):
    if current_user.role not in ["admin_rh", "resp_rh"]:
        raise HTTPException(status_code=403, detail="Accès refusé")
    
    response = supabase.table("badges").select("*, employees(first_name, last_name)").execute()
    return response.data