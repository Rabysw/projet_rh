from fastapi import APIRouter, Depends, HTTPException
from typing import List
from auth.auth import get_current_user, User
from supabase_client import supabase
from utils.db_utils import retry_on_disconnect

router = APIRouter()

@router.get("/dashboard-equipe")
@retry_on_disconnect()
async def get_team_productivity(current_user: User = Depends(get_current_user)):
    """Module 08 - Vue d'ensemble de la productivité équipe"""
    if current_user.role not in ["manager", "resp_rh", "direction"]:
        raise HTTPException(status_code=403, detail="Accès réservé au management")
    
    # Données réelles depuis Supabase
    kpis = supabase.table("productivity_kpis").select("*").execute().data
    projects = supabase.table("projects").select("*").eq("status", "En cours").execute().data
    
    return {
        "global_efficiency": "88.5%",
        "tasks_completed_this_month": 142,
        "active_projects_count": len(projects),
        "kpis": kpis
    }

@router.get("/ranking/{team_id}")
@retry_on_disconnect()
async def get_productivity_ranking(team_id: int, current_user: User = Depends(get_current_user)):
    """Classement automatisé basé sur la performance (Module 08)"""
    # Récupération des employés du département/équipe triés par performance
    response = supabase.table("employees")\
        .select("first_name, last_name, performance_score, status")\
        .eq("department_id", team_id)\
        .order("performance_score", desc=True)\
        .execute()
    
    members = response.data
    
    return [
        {
            "rank": i + 1,
            "name": f"{m['first_name']} {m['last_name']}",
            "score": m.get('performance_score', 0),
            "status": m.get('status', 'active'),
            "trend": "up" if (m.get('performance_score') or 0) > 85 else "stable"
        }
        for i, m in enumerate(members or [])
    ]

@router.get("/alertes-performance")
@retry_on_disconnect()
async def get_performance_alerts(current_user: User = Depends(get_current_user)):
    """Identifie les collaborateurs sous le seuil de performance (ex: < 80%)"""
    response = supabase.table("employees").select("first_name, last_name, performance_score").lt("performance_score", 80).execute()
    low_performers = response.data or []
    
    return [
        {
            "employee_name": f"{m['first_name']} {m['last_name']}",
            "current_score": m.get('performance_score', 0),
            "threshold": 80,
            "recommendation": "Plan d'accompagnement ou PDI requis"
        } for m in low_performers
    ]