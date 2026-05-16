# api/resp_rh.py
from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List, Optional
from datetime import datetime, timedelta
from auth.auth import get_current_user, User
from supabase_client import supabase
from pydantic import BaseModel

router = APIRouter()


# ─── RBAC ─────────────────────────────────────────────────────────────────────

def require_role(current_user: User, allowed_roles: list):
    if current_user.role not in allowed_roles:
        raise HTTPException(status_code=403, detail="Accès non autorisé")


# ─── Schemas ──────────────────────────────────────────────────────────────────

class ContractCreate(BaseModel):
    employee_id: str
    type: str                        # CDI, CDD, Stage, etc.
    start: str                       # YYYY-MM-DD
    end: Optional[str] = None
    salary_base: Optional[float] = None
    notes: Optional[str] = None


class PointageUpdate(BaseModel):
    arrival: Optional[str] = None
    departure: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None


class PointageCreate(BaseModel):
    employee_id: str
    date: str
    arrival: Optional[str] = None
    departure: Optional[str] = None
    location: str = "Siège"
    status: str = "present"


# ─── Employees ────────────────────────────────────────────────────────────────

@router.get("/employees")
def get_employees(
    search: Optional[str] = None,
    status: Optional[str] = None,
    department_id: Optional[str] = None,
    current_user: User = Depends(get_current_user),
):
    # Check if user is Admin, RH or Direction
    is_privileged = current_user.role in ["admin_rh", "resp_rh", "direction"]
    
    query = supabase.table("employees").select(
        "id, first_name, last_name, professional_email, "
        "position, department_id, status, contract_type, hire_date, "
        "departments(name)"
    )

    if is_privileged:
        if status:
            query = query.eq("status", status)
        if department_id:
            query = query.eq("department_id", department_id)
    elif current_user.role == "manager":
        # Get manager's employee id
        mgr_resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
        if mgr_resp.data:
            mgr_id = mgr_resp.data[0]["id"]
            query = query.eq("manager_id", mgr_id)
        else:
            return []
    else:
        raise HTTPException(status_code=403, detail="Accès non autorisé")

    result = query.order("last_name").execute()
    employees = result.data or []

    if search:
        s = search.lower()
        employees = [
            e for e in employees
            if s in (e.get("first_name") or "").lower()
            or s in (e.get("last_name") or "").lower()
            or s in (e.get("professional_email") or "").lower()
        ]

    # Normalize to frontend shape
    return [
        {
            "id": e["id"],
            "name": f"{e.get('first_name', '')} {e.get('last_name', '')}".strip(),
            "role": e.get("position") or "—",
            "dept": e.get("departments", {}).get("name") if e.get("departments") else "—",
            "status": e.get("status") or "active",
            "contract": e.get("contract_type") or "CDI",
            "hired": e.get("hire_date") or "",
        }
        for e in employees
    ]


@router.get("/employees/stats")
def get_employee_stats(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["admin_rh", "resp_rh", "direction"])

    result = supabase.table("employees").select("id, status, hire_date").execute()
    all_employees = result.data or []

    today = datetime.today()
    first_of_month = today.replace(day=1).strftime("%Y-%m-%d")

    total = len(all_employees)
    active = sum(1 for e in all_employees if e.get("status") == "active")
    on_leave = sum(1 for e in all_employees if e.get("status") == "on_leave")
    new_this_month = sum(
        1 for e in all_employees
        if (e.get("hire_date") or "") >= first_of_month
    )

    return {
        "total": total,
        "active": active,
        "on_leave": on_leave,
        "new_this_month": new_this_month,
    }


@router.get("/employees/{employee_id}")
def get_employee_detail(
    employee_id: str,
    current_user: User = Depends(get_current_user),
):
    # Check if user is Admin, RH or Direction
    is_privileged = current_user.role in ["admin_rh", "resp_rh", "direction"]
    
    # If Manager, check if the employee is in their team
    is_manager_of = False
    if current_user.role == "manager":
        # Get manager's employee id
        mgr_resp = supabase.table("employees").select("id").eq("user_id", str(current_user.id)).limit(1).execute()
        if mgr_resp.data:
            mgr_id = mgr_resp.data[0]["id"]
            # Check if this employee has this manager
            check_resp = supabase.table("employees").select("id").eq("id", employee_id).eq("manager_id", mgr_id).limit(1).execute()
            if check_resp.data:
                is_manager_of = True

    if not is_privileged and not is_manager_of:
        raise HTTPException(status_code=403, detail="Accès non autorisé")

    result = (
        supabase.table("employees")
        .select("*, departments(name), managers:manager_id(first_name, last_name)")
        .eq("id", employee_id)
        .limit(1)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Employé non trouvé")

    e = result.data[0]
    manager_name = "—"
    if e.get("managers"):
        m = e.get("managers")
        manager_name = f"{m.get('first_name', '')} {m.get('last_name', '')}".strip()

    return {
        "id": e["id"],
        "name": f"{e.get('first_name', '')} {e.get('last_name', '')}".strip(),
        "email": e.get("professional_email") or "",
        "phone": e.get("professional_phone") or "",
        "address": e.get("address") or "",
        "dept": e.get("departments", {}).get("name") if e.get("departments") else "—",
        "role": e.get("position") or "—",
        "hired": e.get("hire_date") or "",
        "contract": e.get("contract_type") or "CDI",
        "status": e.get("status") or "active",
        "matricule": e.get("matricule") or f"EMP-{e['id']}",
        "birth_date": e.get("birth_date") or "",
        "birth_place": e.get("birth_place") or "",
        "nationality": e.get("nationality") or "",
        "gender": e.get("gender") or "",
        "marital_status": e.get("marital_status") or "",
        "children_count": e.get("children_count") or 0,
        "id_type": e.get("id_card_type") or "",
        "id_number": e.get("id_card_number") or "",
        "id_expiry": e.get("id_card_expiry") or "",
        "emergency_contact": e.get("emergency_contact_name") or "",
        "emergency_relation": e.get("emergency_contact_relation") or "",
        "emergency_phone": e.get("emergency_contact_phone") or "",
        "personal_email": e.get("personal_email") or "",
        "salary_base": str(e.get("base_salary") or "0"),
        "work_location": e.get("work_location") or "",
        "manager": manager_name,
        "cnss": e.get("num_cnss") or "—",
        "ifu": e.get("ifu") or "—",
    }


# ─── Contracts (Embedded in Employees Table) ─────────────────────────────────

@router.get("/contracts")
def get_contracts(
    status: Optional[str] = None,
    contract_type: Optional[str] = None,
    current_user: User = Depends(get_current_user),
):
    require_role(current_user, ["admin_rh", "resp_rh", "direction"])

    try:
        query = supabase.table("employees").select(
            "id, first_name, last_name, contract_type, contract_start, contract_end, contract_status, contract_url"
        )
        if status:
            query = query.eq("contract_status", status)
        if contract_type:
            query = query.eq("contract_type", contract_type)

        result = query.order("contract_start", desc=True).execute()
        employees = result.data or []
    except Exception as e:
        print(f"Error fetching contracts: {e}")
        return []

    today = datetime.today().date()

    def compute_alert(e):
        end = e.get("contract_end")
        if not end:
            return None
        try:
            end_dt = datetime.fromisoformat(end).date()
            days_left = (end_dt - today).days
            if days_left < 0:
                return "Contrat expiré"
            if days_left <= 60:
                return f"Expire dans {days_left} jours"
        except Exception:
            pass
        return None

    return [
        {
            "id": e["id"],
            "employee": f"{e.get('first_name', '')} {e.get('last_name', '')}".strip(),
            "type": e.get("contract_type") or "CDI",
            "start": e.get("contract_start") or "",
            "end": e.get("contract_end"),
            "status": e.get("contract_status") or "actif",
            "alert": compute_alert(e),
            "contract_url": e.get("contract_url"),
        }
        for e in employees
    ]


@router.get("/contracts/alerts")
def get_contract_alerts(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["admin_rh", "resp_rh", "direction"])

    result = supabase.table("employees").select("contract_end, contract_status").execute()
    employees = result.data or []
    today = datetime.today().date()

    exp_30 = exp_60 = active = 0
    for e in employees:
        if e.get("contract_status") == "actif":
            active += 1
        end = e.get("contract_end")
        if end:
            try:
                days = (datetime.fromisoformat(end).date() - today).days
                if 0 <= days <= 30:
                    exp_30 += 1
                elif 31 <= days <= 60:
                    exp_60 += 1
            except Exception:
                pass

    return {"expiring_30_days": exp_30, "expiring_60_days": exp_60, "active": active}


# ─── Attendance / Pointage ────────────────────────────────────────────────────

@router.get("/pointage")
def get_pointage(
    date: Optional[str] = None,
    current_user: User = Depends(get_current_user),
):
    """Retourne tous les pointages d'une date donnée (format YYYY-MM-DD)."""
    require_role(current_user, ["admin_rh", "resp_rh"])

    target_date = date or datetime.today().strftime("%Y-%m-%d")

    result = (
        supabase.table("attendance")
        .select("*, employees(first_name, last_name)")
        .eq("date", target_date)
        .order("created_at")
        .execute()
    )
    rows = result.data or []

    return [
        {
            "id": r["id"],
            "employee_id": r.get("employee_id"),
            "employee_name": f"{(r.get('employees') or {}).get('first_name', '')} {(r.get('employees') or {}).get('last_name', '')}".strip(),
            "date": r.get("date") or target_date,
            "arrival": r.get("clock_in") or "",
            "departure": r.get("clock_out") or "",
            "location": r.get("location") or "Bureau",
            "status": r.get("status") or "present",
            "has_justificatif": False, # TODO: implement file check
        }
        for r in rows
    ]


# ─── Dashboard ────────────────────────────────────────────────────────────────

@router.get("/dashboard")
def get_resp_rh_dashboard(current_user: User = Depends(get_current_user)):
    require_role(current_user, ["admin_rh", "resp_rh", "direction"])

    try:
        employees = supabase.table("employees").select("id, first_name, last_name, status, contract_type, department_id, contract_end").execute().data or []
        
        today = datetime.today().date()
        active = sum(1 for e in employees if e.get("status") == "active")

        contrats_alert = []
        alertes_prioritaires = []
        for e in employees:
            end = e.get("contract_end")
            if end:
                try:
                    days = (datetime.fromisoformat(end).date() - today).days
                    if days <= 60:
                        contrats_alert.append(e)
                        if days <= 30:
                            alertes_prioritaires.append({
                                "titre": "Renouvellement contrat",
                                "description": f"Le contrat de {e.get('first_name')} {e.get('last_name')} expire dans {days} jours.",
                                "type_alerte": "Contrat",
                                "urgence": "high" if days <= 7 else "medium",
                                "action_bouton": "Traiter",
                                "echeance": end
                            })
                except:
                    pass

        # Congés en attente
        pending_leaves_resp = supabase.table("leave_requests").select("*, employees(first_name, last_name)").eq("status", "pending").execute()
        pending_leaves = pending_leaves_resp.data or []
        
        conges_data = {
            "demandes_en_attente": [
                {
                    "id": r["id"],
                    "collaborateur": f"{r.get('employees', {}).get('first_name', '')} {r.get('employees', {}).get('last_name', '')}",
                    "type": r["leave_type"],
                    "jours": r["days"],
                    "date_debut": r["start_date"]
                }
                for r in pending_leaves
            ]
        }

        cdi = sum(1 for e in employees if e.get("contract_type") == "CDI")
        cdd = sum(1 for e in employees if e.get("contract_type") == "CDD")
        stage = sum(1 for e in employees if e.get("contract_type") == "Stage")

        return {
            "kpis": {
                "collaborateurs_actifs": active,
                "contrats_a_renouveler": len(contrats_alert),
                "alertes_medicales": 0,
                "formations_ce_mois": 0,
                "enquetes_en_cours": 0,
                "suggestions_en_attente": 0,
                "taux_absenteisme": 2.4, # Mock
            },
            "stats_personnel": {
                "actifs": active,
                "cdi": cdi,
                "cdd": cdd,
                "stages": stage,
            },
            "conges": conges_data,
            "alertes_prioritaires": alertes_prioritaires,
            "contrats_60_jours": len(contrats_alert),
        }
    except Exception as e:
        print(f"Resp RH dashboard error: {e}")
        return {
            "kpis": {"collaborateurs_actifs": 0, "contrats_a_renouveler": 0},
            "stats_personnel": {"actifs": 0, "cdi": 0, "cdd": 0, "stages": 0},
            "conges": {"demandes_en_attente": []},
            "alertes_prioritaires": [],
            "error": "Impossible de charger les données RH"
        }
