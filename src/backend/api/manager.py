from fastapi import APIRouter, Depends, HTTPException
from supabase_client import supabase
from auth.auth import get_current_user, User
from datetime import datetime
from typing import Optional, List

router = APIRouter()

def require_role(current_user: User, allowed_roles: list):
    if current_user.role not in allowed_roles:
        raise HTTPException(status_code=403, detail="Accès non autorisé")

@router.get("/team")
def read_team(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["manager", "admin_rh", "resp_rh"])
    
    # Trouver l'ID employé du manager
    mgr = supabase.table("employees").select("id").eq("user_id", current_user.id).limit(1).execute()
    if not mgr.data:
        return []
    mgr_id = mgr.data[0]["id"]
    
    # Récupérer l'équipe
    result = supabase.table("employees").select("*").eq("manager_id", mgr_id).execute()
    return result.data or []

@router.get("/stats")
def read_stats(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["manager", "admin_rh", "resp_rh"])
    
    mgr = supabase.table("employees").select("id").eq("user_id", current_user.id).limit(1).execute()
    if not mgr.data:
        return {"total": 0, "active": 0}
    mgr_id = mgr.data[0]["id"]
    
    team = supabase.table("employees").select("id, status").eq("manager_id", mgr_id).execute()
    team_data = team.data or []
    
    return {
        "total": len(team_data),
        "active": len([m for m in team_data if m.get("status") == "active"]),
        "on_leave": len([m for m in team_data if m.get("status") == "on_leave"]),
    }

@router.get("/leaves")
def read_leave_requests(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["manager", "admin_rh", "resp_rh"])
    
    mgr = supabase.table("employees").select("id").eq("user_id", current_user.id).limit(1).execute()
    if not mgr.data:
        return []
    mgr_id = mgr.data[0]["id"]
    
    # Trouver les IDs de l'équipe
    team = supabase.table("employees").select("id").eq("manager_id", mgr_id).execute()
    emp_ids = [e["id"] for e in (team.data or [])]
    
    if not emp_ids:
        return []
    
    # Récupérer leurs demandes de congés
    requests = supabase.table("leave_requests").select("*, employees(first_name, last_name)").in_("employee_id", emp_ids).order("created_at", desc=True).execute()
    
    return [
        {
            "id": r["id"],
            "employee": f"{r['employees']['first_name']} {r['employees']['last_name']}" if r.get("employees") else "Inconnu",
            "type": r["leave_type"],
            "start": r["start_date"],
            "end": r["end_date"],
            "days": r["days"],
            "status": r["status"],
            "reason": r.get("reason", "")
        }
        for r in (requests.data or [])
    ]

@router.post("/leaves/{leave_id}/approve")
def approve_leave(leave_id: int, current_user: User = Depends(get_current_user)):
    require_role(current_user, ["manager", "admin_rh", "resp_rh"])
    
    result = supabase.table("leave_requests").update({
        "status": "approved",
        "manager_comment": f"Approuvé par {current_user.full_name}"
    }).eq("id", leave_id).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Demande non trouvée")
    
    return {"message": "Congé approuvé avec succès"}

@router.post("/leaves/{leave_id}/reject")
def reject_leave(leave_id: int, comment: str = "", current_user: User = Depends(get_current_user)):
    require_role(current_user, ["manager", "admin_rh", "resp_rh"])
    
    result = supabase.table("leave_requests").update({
        "status": "rejected",
        "manager_comment": comment or f"Refusé par {current_user.full_name}"
    }).eq("id", leave_id).execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Demande non trouvée")
    
    return {"message": "Congé rejeté"}

@router.get("/skills/members")
def read_skills_members(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["manager", "admin_rh", "resp_rh"])
    
    mgr = supabase.table("employees").select("id").eq("user_id", current_user.id).limit(1).execute()
    if not mgr.data:
        return []
    mgr_id = mgr.data[0]["id"]
    
    # Récupérer les employés de l'équipe
    employees = supabase.table("employees").select("id, first_name, last_name, position").eq("manager_id", mgr_id).execute()
    
    if not employees.data:
        return []
    
    result = []
    for emp in employees.data:
        skills = supabase.table("skills").select("*").eq("employee_id", emp["id"]).execute()
        
        competences = [
            {
                "nom": s["skill_name"],
                "niveau_actuel": s.get("level", 1),
                "niveau_requis": 5
            }
            for s in (skills.data or [])
        ]
        
        score = round(sum(c["niveau_actuel"] for c in competences) / len(competences)) if competences else 0
        
        result.append({
            "id": emp["id"],
            "nom": f"{emp['first_name']} {emp['last_name']}",
            "poste": emp.get("position", ""),
            "competences": competences,
            "score_global": score
        })
    
    return result

@router.get("/team/productivity")
def read_team_productivity(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["manager", "admin_rh", "resp_rh"])
    
    emp = supabase.table("employees").select("id").eq("user_id", current_user.id).limit(1).execute()
    if not emp.data:
        return {"kpis": [], "projects": []}
    mgr_id = emp.data[0]["id"]

    projects = supabase.table("projects").select("*").eq("manager_id", mgr_id).execute()
    
    kpis = [
        {"label": "Taux de complétion", "current": 0, "target": 100, "unit": "%"},
        {"label": "Projets actifs", "current": len(projects.data or []), "target": 5, "unit": ""}
    ]
    
    return {
        "kpis": kpis,
        "projects": [
            {
                "id": p["id"],
                "name": p["name"],
                "description": p["description"],
                "category": p["category"],
                "status": p["status"],
                "progress": p["progress"],
                "deadline": p.get("end_date_scheduled"),
            }
            for p in (projects.data or [])
        ]
    }

@router.get("/projects")
def read_projects(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["manager", "admin_rh", "resp_rh"])
    
    emp = supabase.table("employees").select("id").eq("user_id", current_user.id).limit(1).execute()
    if not emp.data:
        return []
    mgr_id = emp.data[0]["id"]
    
    result = supabase.table("projects").select("*").eq("manager_id", mgr_id).execute()
    return result.data or []
