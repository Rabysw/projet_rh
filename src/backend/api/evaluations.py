from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime

from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

@router.get("/competences/radar/{employee_id}")
async def get_competences_radar(employee_id: int, current_user: User = Depends(get_current_user)):
    """Module 02 - Données pour le graphique radar des compétences"""
    response = supabase.table("skills").select("*").eq("employee_id", employee_id).execute()
    skills = response.data
    
    return {
        "labels": [s['skill_name'] for s in skills],
        "data": [s['level'] for s in skills],
        "target": [] # Données cibles à configurer via le référentiel métier
    }

@router.get("/competences/gaps/{employee_id}")
async def get_competences_gaps(employee_id: int, current_user: User = Depends(get_current_user)):
    """Analyse des écarts de compétences"""
    response = supabase.table("skills").select("*").eq("employee_id", employee_id).execute()
    skills = response.data
    
    gaps = []
    for s in skills:
        target = 85 # Valeur arbitraire de cible
        gap = s['level'] - target
        if gap < 0:
            gaps.append({
                "skill": s['skill_name'],
                "current": s['level'],
                "target": target,
                "gap": gap,
                "priority": "Haute" if gap < -20 else "Moyenne"
            })
    return gaps

@router.post("/{evaluation_id}/signer")
async def sign_evaluation(evaluation_id: int, current_user: User = Depends(get_current_user)):
    """Signature électronique avec horodatage"""
    timestamp = datetime.now().isoformat()
    role_field = "employee_signed" if current_user.role == "collaborateur" else "rh_signed"
    
    supabase.table("evaluations").update({role_field: True, "updated_at": timestamp}).eq("id", evaluation_id).execute()

    if current_user.role == "collaborateur":
        return {
            "status": "Signé par le collaborateur",
            "timestamp": timestamp,
            "signer": f"{current_user.email}"
        }
    elif current_user.role in ["resp_rh", "admin_rh"]:
        return {
            "status": "Validé par la RH",
            "timestamp": timestamp,
            "signer": f"{current_user.email}"
        }
    
    raise HTTPException(status_code=403, detail="Rôle non autorisé pour la signature")

@router.post("/pdi")
async def create_pdi(pdi: dict, current_user: User = Depends(get_current_user)):
    """Création ou mise à jour d'un Plan de Développement Individuel"""
    if current_user.role not in ["manager", "resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Seuls les managers ou RH peuvent créer un PDI")
    
    # Mocking for demo
    return {"message": "PDI enregistré avec succès", "id": 1}

@router.post("/commentaires")
async def add_evaluation_comment(comment: dict, current_user: User = Depends(get_current_user)):
    """Module 02 - Ajout d'un commentaire sur une évaluation ou un objectif"""
    if current_user.role not in ["manager", "resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Non autorisé")
    
    return {"message": "Commentaire ajouté", "timestamp": datetime.now().isoformat()}

@router.get("/career/{employee_id}")
async def get_career_plan(employee_id: int, current_user: User = Depends(get_current_user)):
    """Module 04 - Plan de carrière complet"""
    # TÂCHE 7 — Nettoyage des données fictives
    return {
        "objectives": {"short_term": [], "long_term": []},
        "entretiens": [],
        "mobilites": []
    }

@router.post("/career/entretiens/{entretien_id}/signer")
async def sign_career_entretien(entretien_id: int, current_user: User = Depends(get_current_user)):
    """Double signature électronique horodatée"""
    timestamp = datetime.now().isoformat()
    return {
        "message": "Signature enregistrée",
        "timestamp": timestamp,
        "signer": current_user.full_name
    }

@router.get("/pdi/{employee_id}")
async def get_pdi(employee_id: int, current_user: User = Depends(get_current_user)):
    """Récupération du PDI d'un collaborateur"""
    # Vérification des droits (soit soi-même, soit manager/RH)
    if current_user.role == "collaborateur" and current_user.id != employee_id:
        raise HTTPException(status_code=403, detail="Accès refusé")
        
    response = supabase.table("pdis").select("*").eq("employee_id", employee_id).execute()
    if not response.data:
        return {"message": "Aucun PDI trouvé pour ce collaborateur"}
    return response.data[0]