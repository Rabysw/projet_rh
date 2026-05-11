from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List
from datetime import datetime
from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

@router.post("/entretiens/signer")
async def sign_career_interview(
    interview_id: int = Body(...),
    current_user: User = Depends(get_current_user)
):
    """Signature électronique de l'entretien de carrière (Module 04)"""
    supabase.table("career_interviews").update({
        "signed_at": datetime.now().isoformat(),
        "signer_email": current_user.email
    }).eq("id", interview_id).execute()

    return {
        "message": "Entretien signé et archivé",
        "signer": current_user.email,
        "timestamp": datetime.now().isoformat(),
        "validity": "Conforme aux spécifications ICES"
    }

@router.get("/mobilites/{employee_id}/historique")
async def get_mobility_history(employee_id: int, current_user: User = Depends(get_current_user)):
    """Historique des promotions et changements de poste"""
    response = supabase.table("mobility_history").select("*").eq("employee_id", employee_id).execute()
    return response.data

@router.post("/objectifs")
async def create_career_goal(
    goal: dict = Body(...),
    current_user: User = Depends(get_current_user)
):
    """Définition des objectifs de carrière court/moyen terme"""
    employee_id = goal.get("employee_id")
    if current_user.role == "collaborateur" and current_user.id != employee_id:
        raise HTTPException(status_code=403, detail="Accès non autorisé")
        
    resp = supabase.table("career_goals").insert(goal).execute()
    return {"message": "Objectif de carrière enregistré", "goal_id": resp.data[0]['id']}

@router.get("/recommandations-rh")
async def get_rh_recommendations(current_user: User = Depends(get_current_user)):
    """Vue Direction/RH pour les plans de succession"""
    if current_user.role not in ["resp_rh", "admin_rh", "direction"]:
        raise HTTPException(status_code=403, detail="Accès réservé à la Direction")
        
    response = supabase.table("succession_plans").select("*, employees(first_name, last_name)").execute()
    return response.data

@router.post("/mobilites/demander")
async def request_internal_mobility(
    target_position: str = Body(..., embed=True),
    current_user: User = Depends(get_current_user)
):
    """Soumission d'un souhait de mobilité par le collaborateur"""
    new_request = {
        "employee_id": current_user.id,
        "target_position": target_position,
        "status": "En étude par la RH",
        "created_at": datetime.now().isoformat()
    }
    supabase.table("mobility_requests").insert(new_request).execute()

    return {
        "message": "Demande de mobilité enregistrée",
        "employee": current_user.email,
        "target": target_position,
        "status": "En étude par la RH"
    }