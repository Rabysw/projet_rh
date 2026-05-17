from supabase_client import supabase
from typing import List, Dict, Any

# Helper to get employee info from user_id
def get_employee_by_user_id(user_id: str):
    response = supabase.table("employees").select("*").eq("user_id", user_id).limit(1).execute()
    return response.data[0] if response.data else None

# Manager data access

def get_team_members(manager_id: str):
    """Get team members for a manager (manager_id is user_id or employee_id)"""
    # First find the employee record for this manager
    manager_emp = supabase.table("employees").select("id, department_id").eq("user_id", manager_id).limit(1).execute()
    if not manager_emp.data:
        # Try if manager_id is already an employee_id
        manager_emp = supabase.table("employees").select("id, department_id").eq("id", manager_id).limit(1).execute()
    
    if not manager_emp.data:
        return []
    
    m_id = manager_emp.data[0]["id"]
    
    # Get employees reporting to this manager
    response = supabase.table("employees").select(
        "id, first_name, last_name, position, professional_email, status, department_id"
    ).eq("manager_id", m_id).execute()
    
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


def get_team_stats(manager_id: str):
    manager_emp = supabase.table("employees").select("id").eq("user_id", manager_id).limit(1).execute()
    if not manager_emp.data:
        return {"total_members": 0, "active_members": 0, "members_on_leave": 0, "project_count": 0, "skill_coverage": "0%"}
    
    m_id = manager_emp.data[0]["id"]
    
    # Count team members
    team_resp = supabase.table("employees").select("id, status").eq("manager_id", m_id).execute()
    team = team_resp.data or []
    
    active = sum(1 for e in team if e["status"] == "active")
    on_leave = sum(1 for e in team if e["status"] == "on_leave")
    
    # Count projects
    projects_resp = supabase.table("projects").select("id").eq("manager_id", m_id).execute()
    project_count = len(projects_resp.data) if projects_resp.data else 0
    
    return {
        "total_members": len(team),
        "active_members": active,
        "members_on_leave": on_leave,
        "project_count": project_count,
        "skill_coverage": "82%", # Placeholder for now
    }


def get_team_leave_requests(manager_id: str):
    manager_emp = supabase.table("employees").select("id").eq("user_id", manager_id).limit(1).execute()
    if not manager_emp.data:
        return []
    
    m_id = manager_emp.data[0]["id"]
    
    # Get IDs of team members
    team_resp = supabase.table("employees").select("id").eq("manager_id", m_id).execute()
    team_ids = [e["id"] for e in (team_resp.data or [])]
    
    if not team_ids:
        return []
        
    # Get leave requests for these members
    response = supabase.table("leave_requests").select(
        "*, employees(first_name, last_name)"
    ).in_("employee_id", team_ids).execute()
    
    return [
        {
            "id": r["id"],
            "employee": f"{r['employees']['first_name']} {r['employees']['last_name']}",
            "type": r["leave_type"],
            "start": r["start_date"],
            "end": r["end_date"],
            "days": float(r["days"]),
            "status": r["status"],
            "reason": r.get("reason", "")
        }
        for r in response.data
    ]


def get_team_skills_stats(manager_id: str):
    # This might need a more complex join or aggregation
    # For now returning empty list to be safe or placeholder
    return []


def get_projects(manager_id: str):
    manager_emp = supabase.table("employees").select("id").eq("user_id", manager_id).limit(1).execute()
    if not manager_emp.data:
        return []
    m_id = manager_emp.data[0]["id"]
    
    response = supabase.table("projects").select("*").eq("manager_id", m_id).execute()
    return response.data or []


def get_kpis(manager_id: str):
    # KPIs are not clearly defined in the current schema for managers, 
    # might need a kpis table if it's not the direction_kpis one.
    # Looking at debug_schema.py, there's no general kpis table.
    return []

# Resp RH data access

def get_employees():
    response = supabase.table("employees").select("*").execute()
    return response.data or []


def get_employee_stats():
    response = supabase.table("employees").select("id, status").execute()
    employees = response.data or []
    
    total = len(employees)
    active = sum(1 for e in employees if e["status"] == "active")
    on_leave = sum(1 for e in employees if e["status"] == "on_leave")
    
    # For pending contracts, we'd need to check end dates
    return {
        "total_employees": total,
        "active_employees": active,
        "employees_on_leave": on_leave,
        "pending_contracts": 0, # Placeholder
    }


def get_contracts():
    # We don't have a 'contracts' table in debug_schema, but employees have contract fields
    response = supabase.table("employees").select(
        "id, first_name, last_name, contract_type, contract_start, contract_end, contract_status"
    ).execute()
    
    return [
        {
            "id": e["id"],
            "employee_name": f"{e['first_name']} {e['last_name']}",
            "type": e["contract_type"],
            "start_date": e["contract_start"],
            "end_date": e["contract_end"],
            "status": e["contract_status"]
        }
        for e in response.data
    ]


def get_contract_alerts():
    # Placeholder: find contracts ending soon
    return []

# Admin RH data access

def get_system_users():
    response = supabase.table("users").select("*").execute()
    return response.data or []


def get_role_stats():
    # Aggregation of roles from users table
    response = supabase.table("users").select("role").execute()
    roles = [u["role"] for u in (response.data or [])]
    
    stats = {}
    for r in roles:
        stats[r] = stats.get(r, 0) + 1
        
    return [{"role": k, "count": v} for k, v in stats.items()]

# Direction data access

def get_reports():
    # Check if reports table exists in debug_schema. No, but there is 'surveys' maybe?
    # Actually, I didn't see a 'reports' table in the debug output.
    return []


def get_direction_kpis():
    # Placeholder
    return []
