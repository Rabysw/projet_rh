from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List
from datetime import datetime
from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

@router.get("/solde/{employee_id}")
def get_leave_balance(employee_id: int, current_user: User = Depends(get_current_user)):
    """Récupère le solde de congés (Module 03)"""
    if current_user.role == "collaborateur":
        # Check if this user owns this employee_id
        emp_check = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
        if not emp_check.data or emp_check.data[0]['id'] != employee_id:
            raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    response = supabase.table("leave_balances").select("*").eq("employee_id", employee_id).execute()
    return response.data

@router.post("/demande")
def submit_leave_request(
    leave_type: str = Body(...),
    start_date: str = Body(...),
    end_date: str = Body(...),
    reason: str = Body(None),
    current_user: User = Depends(get_current_user)
):
    """Soumission d'une nouvelle demande de congé"""
    # Get employee_id from user_id
    emp_resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
    if not emp_resp.data:
        raise HTTPException(status_code=404, detail="Profil employé non trouvé")
    
    emp_id = emp_resp.data[0]['id']
    
    # Simulation du calcul de jours
    days = 5 
    
    new_request = {
        "employee_id": emp_id,
        "leave_type": leave_type,
        "start_date": start_date,
        "end_date": end_date,
        "days": days,
        "status": "pending",
        "reason": reason
    }
    
    resp = supabase.table("leave_requests").insert(new_request).execute()
    if not resp.data:
        raise HTTPException(status_code=500, detail="Erreur lors de la création")
        
    return {"message": "Demande de congé soumise avec succès", "id": resp.data[0]['id']}

@router.patch("/{request_id}/statut")
def update_leave_status(
    request_id: int,
    status: str = Body(..., embed=True), # approved / rejected
    current_user: User = Depends(get_current_user)
):
    """Workflow d'approbation (Manager / RH)"""
    if current_user.role not in ["manager", "resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Seuls les managers ou RH peuvent valider les congés")

    request_resp = supabase.table("leave_requests").select("*").eq("id", request_id).execute()
    if not request_resp.data:
        raise HTTPException(status_code=404, detail="Demande non trouvée")

    request = request_resp.data[0]
    supabase.table("leave_requests").update({"status": status}).eq("id", request_id).execute()
    
    return {"message": f"Demande {status}", "id": request_id}

@router.get("/calendrier-equipe")
def get_team_calendar(current_user: User = Depends(get_current_user)):
    """Vue partagée des absences pour éviter les chevauchements (Module 03)"""
    # Récupération des congés approuvés
    response = supabase.table("leave_requests").select("*, employees(first_name, last_name)").eq("status", "approved").execute()
    return [
        {
            "title": f"{r['leave_type']} - {r.get('employees', {}).get('first_name', '')} {r.get('employees', {}).get('last_name', '')}", 
            "start": r['start_date'], 
            "end": r['end_date'], 
            "status": r['status']
        }
        for r in (response.data or [])
    ]