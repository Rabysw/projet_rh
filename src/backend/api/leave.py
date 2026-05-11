from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List
from datetime import datetime
from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

@router.get("/solde/{employee_id}")
async def get_leave_balance(employee_id: int, current_user: User = Depends(get_current_user)):
    """Récupère le solde de congés (Module 03)"""
    if current_user.role == "collaborateur" and current_user.id != employee_id:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
    
    response = supabase.table("leave_balances").select("*").eq("employee_id", employee_id).execute()
    return response.data

@router.post("/demande")
async def submit_leave_request(
    leave_type: str = Body(...),
    start_date: str = Body(...),
    end_date: str = Body(...),
    reason: str = Body(None),
    current_user: User = Depends(get_current_user)
):
    """Soumission d'une nouvelle demande de congé"""
    # Simulation du calcul de jours (en prod: calcul entre dates excluant week-ends/jours fériés Bénin)
    days = 5 
    
    # Vérification du solde via Supabase
    balance_resp = supabase.table("leave_balances")\
        .select("*")\
        .eq("employee_id", current_user.id)\
        .eq("type", leave_type)\
        .execute()
    
    if balance_resp.data and balance_resp.data[0]['remaining'] < days:
        raise HTTPException(status_code=400, detail="Solde insuffisant")

    new_request = {
        "employee_id": current_user.id,
        "type": leave_type,
        "start": start_date,
        "end": end_date,
        "days": days,
        "status": "pending",
        "reason": reason
    }
    
    resp = supabase.table("leave_requests").insert(new_request).execute()
    return {"message": "Demande de congé soumise avec succès", "id": resp.data[0]['id']}

@router.patch("/{request_id}/statut")
async def update_leave_status(
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
    
    # Si approuvé, on déduit du solde
    if status == "approved":
        balance_resp = supabase.table("leave_balances")\
            .select("*")\
            .eq("employee_id", request['employee_id'])\
            .eq("type", request['type'])\
            .execute()
            
        if balance_resp.data:
            balance = balance_resp.data[0]
            new_used = balance['used'] + request['days']
            new_remaining = balance['remaining'] - request['days']
            supabase.table("leave_balances").update({"used": new_used, "remaining": new_remaining}).eq("id", balance['id']).execute()

    return {"message": f"Demande {status}", "id": request_id}

@router.get("/calendrier-equipe")
async def get_team_calendar(current_user: User = Depends(get_current_user)):
    """Vue partagée des absences pour éviter les chevauchements (Module 03)"""
    # Récupération des congés approuvés
    response = supabase.table("leave_requests").select("*, employees(first_name, last_name)").eq("status", "approved").execute()
    return [
        {"title": f"{r['type']} - {r['employees']['first_name']} {r['employees']['last_name']}", "start": r['start'], "end": r['end'], "status": r['status']}
        for r in response.data
    ]