from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from auth.auth import get_current_user, User

router = APIRouter()

@router.get("/chatbot/status", tags=["ia"])
async def chatbot_status(current_user: User = Depends(get_current_user)):
    return {"status": "online", "model": "ICES-LLM-V1"}

@router.get("/documents/templates", tags=["ia"])
async def get_templates(current_user: User = Depends(get_current_user)):
    return [
        {"name": "Contrat de travail (CDI)", "time": "30 secondes"},
        {"name": "Attestation de stage", "time": "15 secondes"},
        {"name": "Accord de confidentialité", "time": "20 secondes"}
    ]

@router.get("/turnover/prediction", tags=["ia"])
async def predict_turnover(current_user: User = Depends(get_current_user)):
    if current_user.role not in ["admin_rh", "direction"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    return {
        "global_risk": "32%",
        "risk_by_dept": [
            {"name": "Département Commercial", "risk": "Élevé", "score": 82, "reason": "Surmenage détecté"},
            {"name": "Support Client", "risk": "Modéré", "score": 45, "reason": "Baisse de l'engagement"}
        ]
    }

@router.get("/matching/candidates", tags=["ia"])
async def get_matching_candidates(job_id: Optional[str] = None, current_user: User = Depends(get_current_user)):
    return [
        {"name": "Moussa SOW", "position": "Lead Développeur", "score": 98, "status": "Candidat Interne"},
        {"name": "Fatima DIOP", "position": "Chef de projet", "score": 85, "status": "Candidat Externe"}
    ]
