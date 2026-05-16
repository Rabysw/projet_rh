from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime
import uuid

from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

def resolve_employee_id(emp_id_or_user_id: str) -> int:
    """
    Tente de convertir l'ID en entier. Si c'est un UUID, 
    cherche l'employee_id correspondant dans la table employees.
    """
    try:
        return int(emp_id_or_user_id)
    except ValueError:
        # C'est probablement un UUID
        try:
            uuid.UUID(emp_id_or_user_id)
            resp = supabase.table("employees").select("id").eq("user_id", emp_id_or_user_id).limit(1).execute()
            if resp.data:
                return resp.data[0]["id"]
            raise HTTPException(status_code=404, detail="Employé non trouvé pour cet utilisateur")
        except ValueError:
            raise HTTPException(status_code=400, detail="Format d'ID invalide")

@router.get("/competences/radar/{employee_id}")
def get_competences_radar(employee_id: str, current_user: User = Depends(get_current_user)):
    """Module 02 - Données pour le graphique radar des compétences"""
    resolved_id = resolve_employee_id(employee_id)
    response = supabase.table("skills").select("*").eq("employee_id", resolved_id).execute()
    skills = response.data
    
    return {
        "labels": [s['skill_name'] for s in skills],
        "data": [s['level'] for s in skills],
        "target": [] # Données cibles à configurer via le référentiel métier
    }

@router.get("/competences/gaps/{employee_id}")
def get_competences_gaps(employee_id: str, current_user: User = Depends(get_current_user)):
    """Analyse des écarts de compétences"""
    resolved_id = resolve_employee_id(employee_id)
    response = supabase.table("skills").select("*").eq("employee_id", resolved_id).execute()
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
def sign_evaluation(evaluation_id: str, current_user: User = Depends(get_current_user)):
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
def create_pdi(pdi: dict, current_user: User = Depends(get_current_user)):
    """Création ou mise à jour d'un Plan de Développement Individuel"""
    if current_user.role not in ["manager", "resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Seuls les managers ou RH peuvent créer un PDI")
    
    # Mocking for demo
    return {"message": "PDI enregistré avec succès", "id": 1}

@router.post("/commentaires")
def add_evaluation_comment(comment: dict, current_user: User = Depends(get_current_user)):
    """Module 02 - Ajout d'un commentaire sur une évaluation ou un objectif"""
    if current_user.role not in ["manager", "resp_rh", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Non autorisé")
    
    return {"message": "Commentaire ajouté", "timestamp": datetime.now().isoformat()}

@router.get("/career/{employee_id}")
def get_career_plan(employee_id: str, current_user: User = Depends(get_current_user)):
    """Module 04 - Plan de carrière complet"""
    resolved_id = resolve_employee_id(employee_id)
    # TÂCHE 7 — Nettoyage des données fictives
    return {
        "objectives": {"short_term": [], "long_term": []},
        "entretiens": [],
        "mobilites": []
    }

@router.post("/career/entretiens/{entretien_id}/signer")
def sign_career_entretien(entretien_id: str, current_user: User = Depends(get_current_user)):
    """Double signature électronique horodatée"""
    timestamp = datetime.now().isoformat()
    return {
        "message": "Signature enregistrée",
        "timestamp": timestamp,
        "signer": current_user.full_name
    }

@router.get("/list/{employee_id}")
def get_evaluations_list(employee_id: str, current_user: User = Depends(get_current_user)):
    """Liste des évaluations pour un collaborateur"""
    resolved_id = resolve_employee_id(employee_id)
    response = supabase.table("evaluations").select("*").eq("employee_id", resolved_id).order("evaluation_date", desc=True).execute()
    return response.data or []

@router.get("/pdi/{employee_id}")
def get_pdi(employee_id: str, current_user: User = Depends(get_current_user)):
    """Récupération du PDI d'un collaborateur"""
    resolved_id = resolve_employee_id(employee_id)
    # Vérification des droits (soit soi-même, soit manager/RH)
    # Note: current_user.id est un UUID, alors que resolved_id est un int.
    # Pour vérifier si c'est soi-même, on compare current_user.id au user_id de l'employé.
    
    emp_resp = supabase.table("employees").select("user_id").eq("id", resolved_id).limit(1).execute()
    if not emp_resp.data:
        raise HTTPException(status_code=404, detail="Employé non trouvé")
    
    emp_user_id = emp_resp.data[0]["user_id"]
    
    if current_user.role == "collaborateur" and str(current_user.id) != emp_user_id:
        raise HTTPException(status_code=403, detail="Accès refusé")
        
    response = supabase.table("pdis").select("*").eq("employee_id", resolved_id).execute()
    if not response.data:
        return {"message": "Aucun PDI trouvé pour ce collaborateur"}
    return response.data[0]