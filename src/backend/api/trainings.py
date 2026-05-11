from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List
from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

@router.post("/{training_id}/feuille-presence")
async def submit_attendance(
    training_id: int, 
    participant_ids: List[int] = Body(...),
    current_user: User = Depends(get_current_user)
):
    """Enregistre les présences à une session de formation"""
    if current_user.role not in ["resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Droits insuffisants")
    
    training_resp = supabase.table("trainings").select("*").eq("id", training_id).execute()
    if not training_resp.data:
        raise HTTPException(status_code=404, detail="Formation non trouvée")
    
    supabase.table("trainings").update({"participant_ids": participant_ids}).eq("id", training_id).execute()
    return {"message": f"{len(participant_ids)} participants enregistrés"}

@router.post("/{training_id}/evaluation-post")
async def submit_post_evaluation(
    training_id: int,
    score_satisfaction: int = Body(..., ge=1, le=5),
    comment: str = Body(""),
    current_user: User = Depends(get_current_user)
):
    """Soumission de l'évaluation à chaud par le collaborateur"""
    evaluation_data = {
        "training_id": training_id,
        "employee_id": current_user.id,
        "score_satisfaction": score_satisfaction,
        "comment": comment,
        "created_at": datetime.now().isoformat()
    }
    supabase.table("training_evaluations").insert(evaluation_data).execute()

    return {
        "message": "Évaluation enregistrée",
        "training_id": training_id,
        "status": "Merci pour votre retour"
    }

@router.get("/{training_id}/taux-efficacite")
async def get_efficiency_rate(training_id: int):
    """Calcule le taux d'efficacité basé sur les évaluations post-formation"""
    # Simulation de calcul
    return {
        "training_id": training_id,
        "taux_satisfaction": "88%",
        "acquisition_competences": "92%",
        "recommandation": "Élevée"
    }