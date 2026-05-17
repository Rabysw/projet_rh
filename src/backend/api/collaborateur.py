from fastapi import APIRouter, Depends, HTTPException
from auth.auth import get_current_user, User
from supabase_client import supabase
from datetime import datetime
from typing import Optional, List
from utils.db_utils import retry_on_disconnect

router = APIRouter()

# ==================== NOTIFICATIONS ====================

@router.get("/notifications")
@retry_on_disconnect()
def get_notifications(current_user: User = Depends(get_current_user)):
    """Récupère les notifications pour l'utilisateur courant."""
    # On essaie de récupérer l'ID employé
    emp_id = None
    try:
        resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
        if resp.data:
            emp_id = resp.data[0]["id"]
    except Exception:
        pass

    notifications = []
    
    if emp_id:
        # 1. Notifications de congés
        try:
            leave_reqs = supabase.table("leave_requests").select("*").eq("employee_id", emp_id).order("updated_at", desc=True).limit(5).execute()
            for req in (leave_reqs.data or []):
                if req["status"] != "pending":
                    notifications.append({
                        "id": f"leave_{req['id']}",
                        "type": "Information",
                        "message": f"Votre demande de {req['leave_type']} du {req['start_date']} est {req['status']}.",
                        "date": str(req.get("updated_at", ""))[:10],
                        "lu": False
                    })
        except Exception:
            pass

    return notifications


# ==================== UTILITAIRE ====================

@retry_on_disconnect()
def get_employee_id(user_id: str) -> str | None:
    """Retourne l'employee_id lié à un user_id, ou None."""
    try:
        resp = supabase.table("employees").select("id").eq("user_id", user_id).limit(1).execute()
        return resp.data[0]["id"] if resp.data else None
    except Exception as e:
        print(f"Error in get_employee_id: {e}")
        return None


# ==================== PROFIL ====================

@router.get("/profile")
@retry_on_disconnect()
def get_profile(current_user: User = Depends(get_current_user)):
    response = supabase.table("employees").select("*").eq("user_id", str(current_user.id)).limit(1).execute()
    emp = response.data[0] if response.data else None

    # Récupérer le nom du manager si défini
    manager_name = ""
    if emp and emp.get("manager_id"):
        mgr = supabase.table("employees").select("first_name, last_name").eq("id", emp["manager_id"]).limit(1).execute()
        if mgr.data:
            m = mgr.data[0]
            manager_name = f"{m.get('first_name', '')} {m.get('last_name', '')}".strip()

    return {
        "user": {"full_name": current_user.full_name, "email": current_user.email},
        "department_id": emp.get("department_id") if emp else None,
        "position": emp.get("position", "") if emp else "",
        "manager": manager_name,
        "hire_date": emp.get("hire_date", "") if emp else "",
        "contract_type": emp.get("contract_type", "") if emp else "",
        "phone": emp.get("professional_phone", "") if emp else "",
        "address": emp.get("address", "") if emp else "",
        "birth_date": emp.get("birth_date", "") if emp else "",
        "matricule": emp.get("matricule", "") if emp else "",
    }


@router.patch("/profile")
def update_profile(profile_data: dict, current_user: User = Depends(get_current_user)):
    """
    Le collaborateur peut modifier uniquement phone et address.
    Les données sensibles passent par RH.
    """
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        raise HTTPException(status_code=404, detail="Employé non trouvé")

    # Champs autorisés pour le collaborateur
    allowed_fields = {"phone": "personal_phone", "address": "address"}
    update_data = {db_key: profile_data[key] for key, db_key in allowed_fields.items() if key in profile_data}
    update_data["updated_at"] = datetime.now().isoformat()

    if not update_data:
        raise HTTPException(status_code=400, detail="Aucun champ modifiable fourni")

    supabase.table("employees").update(update_data).eq("id", emp_id).execute()

    return {"message": "Profil mis à jour avec succès"}


# ==================== CONGÉS ====================

@router.get("/leave-balance")
@retry_on_disconnect()
def get_leave_balance(current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []

    response = supabase.table("leave_balances").select("*").eq("employee_id", emp_id).execute()
    
    return [
        {
            "type": r["leave_type"],
            "total": r["total_days"],
            "used": r["used_days"],
            "remaining": r["remaining_days"],
        }
        for r in (response.data or [])
    ]


@router.get("/leave-requests")
@retry_on_disconnect()
def get_leave_requests(current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []

    response = (
        supabase.table("leave_requests")
        .select("*")
        .eq("employee_id", emp_id)
        .order("created_at", desc=True)
        .execute()
    )

    return [
        {
            "id": r["id"],
            "type": r["leave_type"],
            "start": r["start_date"],
            "end": r["end_date"],
            "days": r["days"],
            "status": r["status"],
            "reason": r.get("reason", ""),
            "commentaire_manager": r.get("manager_comment", ""),
        }
        for r in (response.data or [])
    ]


@router.post("/leave-requests")
@retry_on_disconnect()
def create_leave_request(request: dict, current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        raise HTTPException(status_code=404, detail="Employé non trouvé")

    new_request = {
        "employee_id": emp_id,
        "leave_type": request.get("type"),
        "start_date": request.get("start"),
        "end_date": request.get("end"),
        "days": request.get("days"),
        "status": "pending",
        "reason": request.get("reason", ""),
        "justificatif_url": request.get("justificatif_url", ""),
    }

    response = supabase.table("leave_requests").insert(new_request).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Erreur lors de la création")
        
    r = response.data[0]
    return r


# ==================== PRÉSENCES ====================

@router.get("/attendance")
@retry_on_disconnect()
def get_attendance(current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return {"historique": []}

    response = (
        supabase.table("attendance")
        .select("*")
        .eq("employee_id", emp_id)
        .order("date", desc=True)
        .limit(30)
        .execute()
    )

    records = response.data or []

    return {
        "historique": [
            {
                "date": r["date"],
                "heure_arrivee": r.get("clock_in", ""),
                "heure_depart": r.get("clock_out", ""),
                "location": r.get("location", ""),
                "status": r.get("status", "present"),
            }
            for r in records
        ],
    }


# ==================== ÉVALUATIONS ====================

@router.get("/evaluations")
@retry_on_disconnect()
def get_evaluations(current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []

    response = (
        supabase.table("evaluations")
        .select("*")
        .eq("employee_id", emp_id)
        .order("evaluation_date", desc=True)
        .execute()
    )
    return response.data or []


# ==================== FORMATIONS ====================

@router.get("/trainings")
@retry_on_disconnect()
def get_trainings(current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []

    # Mes inscriptions
    try:
        enrollments = supabase.table("training_enrollments").select("*, trainings(*)").eq("employee_id", emp_id).execute()
        
        result = []
        for e in (enrollments.data or []):
            t = e.get("trainings", {})
            result.append({
                "id": e["id"],
                "title": t.get("title", "Formation"),
                "status": e.get("status", "enrolled"),
                "date": t.get("start_date", ""),
                "duration": t.get("duration", ""),
                "progress": e.get("progress", 0),
                "evaluated": False # Placeholder
            })
        return result
    except Exception as e:
        print(f"Error fetching trainings: {e}")
        return []

@router.get("/available-trainings")
@retry_on_disconnect()
def get_available_trainings(current_user: User = Depends(get_current_user)):
    """Récupère les formations disponibles au catalogue"""
    try:
        response = supabase.table("trainings").select("*").execute()
        return [
            {
                "id": t["id"],
                "title": t["title"],
                "category": t.get("category", "Général"),
                "duration": t.get("duration", ""),
                "deadline": t.get("end_date", "")
            }
            for t in (response.data or [])
        ]
    except Exception as e:
        print(f"Error fetching available trainings: {e}")
        return []

@router.get("/certificates")
@retry_on_disconnect()
def get_certificates(current_user: User = Depends(get_current_user)):
    """Récupère les certificats obtenus par le collaborateur"""
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []
    response = supabase.table("certificates").select("*").eq("employee_id", emp_id).execute()
    return response.data or []


@router.get("/payslips")
@retry_on_disconnect()
def get_payslips(current_user: User = Depends(get_current_user)):
    """Récupère les fiches de paie du collaborateur"""
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []

    response = (
        supabase.table("payslips")
        .select("*")
        .eq("employee_id", emp_id)
        .order("payment_date", desc=True)
        .execute()
    )

    return response.data or []


# ==================== SUGGESTIONS ====================

@router.post("/suggestions")
@retry_on_disconnect()
def create_suggestion(suggestion: dict, current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    
    new_suggestion = {
        "employee_id": emp_id,
        "title": suggestion.get("title"),
        "content": suggestion.get("content"),
        "category": suggestion.get("category"),
        "is_anonymous": suggestion.get("is_anonymous", False),
        "status": "pending"
    }
    
    response = supabase.table("suggestions").insert(new_suggestion).execute()
    return response.data[0] if response.data else None

# ==================== COMPÉTENCES ====================

@router.get("/skills/technical")
@retry_on_disconnect()
def get_technical_skills(current_user: User = Depends(get_current_user)):
    """Récupère les compétences techniques du collaborateur."""
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []

    try:
        response = (
            supabase.table("employee_skills")
            .select("*")
            .eq("employee_id", emp_id)
            .eq("type", "technical")
            .execute()
        )
        return [
            {
                "id": r["id"],
                "name": r.get("name", ""),
                "level": r.get("level", 0),        # ex: 1-5
                "category": r.get("category", ""),
            }
            for r in (response.data or [])
        ]
    except Exception as e:
        print(f"Error fetching technical skills: {e}")
        return []

@router.get("/skills/soft")
@retry_on_disconnect()
def get_soft_skills(current_user: User = Depends(get_current_user)):
    """Récupère les compétences comportementales du collaborateur."""
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []

    try:
        response = (
            supabase.table("employee_skills")
            .select("*")
            .eq("employee_id", emp_id)
            .eq("type", "soft")
            .execute()
        )
        return [
            {
                "id": r["id"],
                "name": r.get("name", ""),
                "level": r.get("level", 0),
                "category": r.get("category", ""),
            }
            for r in (response.data or [])
        ]
    except Exception as e:
        print(f"Error fetching soft skills: {e}")
        return []


# ==================== OBJECTIFS ====================

@router.get("/goals")
@retry_on_disconnect()
def get_goals(current_user: User = Depends(get_current_user)):
    """Récupère les objectifs du collaborateur."""
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []

    try:
        response = (
            supabase.table("goals")
            .select("*")
            .eq("employee_id", emp_id)
            .order("created_at", desc=True)
            .execute()
        )
        return [
            {
                "id": r["id"],
                "title": r.get("title", ""),
                "description": r.get("description", ""),
                "progress": r.get("progress", 0),   # 0-100
                "status": r.get("status", "in_progress"),
                "due_date": r.get("due_date", ""),
                "category": r.get("category", ""),
            }
            for r in (response.data or [])
        ]
    except Exception as e:
        print(f"Error fetching goals: {e}")
        return []


# ==================== COMPÉTENCES ====================

@router.get("/skills/technical")
@retry_on_disconnect()
def get_technical_skills(current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []
    try:
        response = (
            supabase.table("employee_skills")
            .select("*")
            .eq("employee_id", emp_id)
            .eq("type", "technical")
            .execute()
        )
        return [{"id": r["id"], "name": r.get("name", ""), "level": r.get("level", 0), "category": r.get("category", "")} for r in (response.data or [])]
    except Exception as e:
        print(f"Error fetching technical skills: {e}")
        return []


@router.get("/skills/soft")
@retry_on_disconnect()
def get_soft_skills(current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []
    try:
        response = (
            supabase.table("employee_skills")
            .select("*")
            .eq("employee_id", emp_id)
            .eq("type", "soft")
            .execute()
        )
        return [{"id": r["id"], "name": r.get("name", ""), "level": r.get("level", 0), "category": r.get("category", "")} for r in (response.data or [])]
    except Exception as e:
        print(f"Error fetching soft skills: {e}")
        return []


# ==================== OBJECTIFS ====================

@router.get("/goals")
@retry_on_disconnect()
def get_goals(current_user: User = Depends(get_current_user)):
    emp_id = get_employee_id(str(current_user.id))
    if not emp_id:
        return []
    try:
        response = (
            supabase.table("goals")
            .select("*")
            .eq("employee_id", emp_id)
            .order("created_at", desc=True)
            .execute()
        )
        return [{"id": r["id"], "title": r.get("title", ""), "description": r.get("description", ""), "progress": r.get("progress", 0), "status": r.get("status", "in_progress"), "due_date": r.get("due_date", ""), "category": r.get("category", "")} for r in (response.data or [])]
    except Exception as e:
        print(f"Error fetching goals: {e}")
        return []
