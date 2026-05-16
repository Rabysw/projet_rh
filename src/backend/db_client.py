from data_store import (
    manager_team,
    manager_leave_requests,
    manager_team_skills,
    manager_projects,
    manager_kpis,
    rh_employees,
    rh_contracts,
    admin_users,
    admin_roles,
    direction_reports,
    direction_kpis,
)

# Manager data access

def get_team_members(manager_id: str):
    from supabase_client import supabase
    
    # Trouver le département du manager
    manager_emp = supabase.table("employees").select("id, department").eq("user_id", str(manager_id)).limit(1).execute()
    if not manager_emp.data:
        return manager_team  # fallback mock
    
    dept = manager_emp.data[0].get("department")
    if not dept:
        return manager_team  # fallback mock
    
    # Récupérer les employés du même département
    response = supabase.table("employees").select(
        "id, first_name, last_name, position, professional_email, status, department"
    ).eq("department", dept).execute()
    
    if not response.data:
        return manager_team  # fallback mock
    
    return [
        {
            "id": e["id"],
            "name": f"{e['first_name']} {e['last_name']}",
            "role": e.get("position", ""),
            "email": e.get("professional_email", ""),
            "status": e.get("status", "active"),
            "skills": [],
            "performance": 0,
        }
        for e in response.data
    ]


def get_team_stats(manager_id: int):
    # Use rh_employees for real counts
    active = sum(1 for e in rh_employees if e.department_id == manager_id and e.status == "active")
    on_leave = sum(1 for e in rh_employees if e.department_id == manager_id and e.status == "on_leave")
    return {
        "total_members": sum(1 for e in rh_employees if e.department_id == manager_id),
        "active_members": active,
        "members_on_leave": on_leave,
        "project_count": len(manager_projects),
        "skill_coverage": "82%",
    }


def get_team_leave_requests(manager_id: int):
    return manager_leave_requests


def get_team_skills_stats(manager_id: int):
    return manager_team_skills


def get_projects(manager_id: int):
    return manager_projects


def get_kpis(manager_id: int):
    return manager_kpis

# Resp RH data access

def get_employees():
    return rh_employees


def get_employee_stats():
    total = len(rh_employees)
    active = sum(1 for e in rh_employees if e.status == "active")
    on_leave = sum(1 for e in rh_employees if e.status == "on_leave")
    return {
        "total_employees": total,
        "active_employees": active,
        "employees_on_leave": on_leave,
        "pending_contracts": sum(1 for c in rh_contracts if c.status == "alert" or c.alert),
    }


def get_contracts():
    return rh_contracts


def get_contract_alerts():
    return [c for c in rh_contracts if c.status == "alert" or c.alert]

# Admin RH data access

def get_system_users():
    return admin_users


def get_role_stats():
    return admin_roles

# Direction data access

def get_reports():
    return direction_reports


def get_direction_kpis():
    return direction_kpis
