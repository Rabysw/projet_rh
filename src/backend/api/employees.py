from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from typing import Optional, List
from datetime import datetime
from httpx import ConnectError
from postgrest.exceptions import APIError

from models.employee import (
    Employee, EmployeeInput, EmployeeFilter, 
    PaginatedEmployees, EmploymentStatus, ContractType, HRRole, PaginationParams
)
from auth.auth import get_current_user, User
from supabase_client import supabase
from utils.db_utils import retry_on_disconnect

router = APIRouter()

import bcrypt

@router.post("/", response_model=Employee, status_code=status.HTTP_201_CREATED)
@retry_on_disconnect()
async def create_employee(
    employee_data: EmployeeInput,
    current_user: User = Depends(get_current_user)
):
    """Create a new employee and their system user account"""
    if current_user.role not in ["admin_rh", "resp_rh"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    
    # 1. Create System User first
    password = employee_data.password or "Ices2026!" # Default password if not provided
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    user_data = {
        "email": employee_data.professional_email or employee_data.email,
        "password_hash": hashed_password,
        "role": employee_data.hr_role.value.lower() if employee_data.hr_role else "collaborateur",
        "prenom": employee_data.first_name,
        "nom": employee_data.last_name,
        "status": "active",
        "created_at": datetime.now().isoformat()
    }
    
    try:
        user_response = supabase.table("users").insert(user_data).execute()
        if not user_response.data:
            raise HTTPException(status_code=400, detail="Failed to create system user account")
        
        new_user = user_response.data[0]
        user_id = new_user["id"]
        
        # 2. Create Employee Record linked to user
        db_data = {
            "user_id": str(user_id),
            "first_name": employee_data.first_name,
            "last_name": employee_data.last_name,
            "professional_email": employee_data.professional_email or employee_data.email,
            "professional_phone": employee_data.professional_phone or employee_data.phone,
            "department_id": employee_data.department_id if employee_data.department_id != 0 else None,
            "position": employee_data.position,
            "contract_type": employee_data.contract_type,
            "status": employee_data.status.lower() if employee_data.status else "active",
            "hire_date": employee_data.hire_date or datetime.now().date().isoformat(),
            "matricule": f"EMP-{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "base_salary": employee_data.base_salary,
            "birth_date": employee_data.birth_date or None,
            "birth_place": employee_data.birth_place,
            "gender": employee_data.gender or None,
            "nationality": employee_data.nationality or None,
            "marital_status": employee_data.marital_status,
            "children_count": employee_data.children_count,
            "id_card_number": employee_data.id_card_number,
            "id_card_type": employee_data.id_card_type,
            "id_card_expiry": employee_data.id_card_expiry or None,
            "address": employee_data.address,
            "personal_phone": employee_data.personal_phone,
            "personal_email": employee_data.personal_email,
            "work_location": employee_data.work_location,
            "emergency_contact_name": employee_data.emergency_contact_name,
            "emergency_contact_relation": employee_data.emergency_contact_relation,
            "emergency_contact_phone": employee_data.emergency_contact_phone,
            "diploma": employee_data.diploma,
            "contract_start": employee_data.contract_start or None,
            "contract_end": employee_data.contract_end or None,
            "manager_id": employee_data.manager_id,
            "hr_role": employee_data.hr_role.value if employee_data.hr_role else "Employee",
        }
        
        response = supabase.table("employees").insert(db_data).execute()
    except APIError as e:
        if e.code == "23505":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Un compte avec cet email existe déjà."
            )
        raise HTTPException(status_code=500, detail=f"Erreur base de données : {e.message}")
    except ConnectError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service temporairement indisponible. Réessayez plus tard."
        )

    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create employee")
    
    new_emp = response.data[0]
    return Employee(**new_emp)

@router.get("/", response_model=PaginatedEmployees)
@retry_on_disconnect()
async def list_employees(
    search: Optional[str] = None,
    status: Optional[str] = None,
    department_id: Optional[int] = None,
    page: int = 1,
    page_size: int = 20,
    current_user: User = Depends(get_current_user)
):
    """List employees with filtering and pagination"""
    query = supabase.table("employees").select("*", count="exact")
    
    if search:
        query = query.or_(f"first_name.ilike.%{search}%,last_name.ilike.%{search}%,professional_email.ilike.%{search}%")
    if status:
        query = query.eq("status", status.lower())
    if department_id:
        query = query.eq("department_id", department_id)
        
    start = (page - 1) * page_size
    end = start + page_size - 1
    
    result = query.range(start, end).order("last_name").execute()
    
    return PaginatedEmployees(
        employees=[Employee(**e) for e in (result.data or [])],
        total=result.count or 0,
        page=page,
        page_size=page_size
    )

@router.get("/{employee_id}", response_model=Employee)
@retry_on_disconnect()
async def get_employee(
    employee_id: int,
    current_user: User = Depends(get_current_user)
):
    """Get employee by ID"""
    result = supabase.table("employees").select("*").eq("id", employee_id).limit(1).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    return Employee(**result.data[0])

@router.put("/{employee_id}", response_model=Employee)
@retry_on_disconnect()
async def update_employee(
    employee_id: int,
    employee_data: EmployeeInput,
    current_user: User = Depends(get_current_user)
):
    """Update employee"""
    if current_user.role not in ["admin_rh", "resp_rh"]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
        
    db_data = {
        "first_name": employee_data.first_name,
        "last_name": employee_data.last_name,
        "professional_email": employee_data.email,
        "professional_phone": employee_data.phone,
        "department_id": employee_data.department_id if employee_data.department_id != 0 else None,
        "position": employee_data.position,
        "contract_type": employee_data.contract_type,
        "status": employee_data.status.lower() if employee_data.status else "active",
        "base_salary": employee_data.base_salary,
        "updated_at": datetime.now().isoformat()
    }
    
    try:
        result = supabase.table("employees").update(db_data).eq("id", employee_id).execute()
    except APIError as e:
        if e.code == "23505":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Un employé avec cet email professionnel existe déjà."
            )
        raise HTTPException(status_code=500, detail=f"Erreur base de données : {e.message}")
    except ConnectError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service temporairement indisponible. Réessayez plus tard."
        )

    if not result.data:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    return Employee(**result.data[0])

@router.delete("/{employee_id}")
@retry_on_disconnect()
async def delete_employee(
    employee_id: int,
    current_user: User = Depends(get_current_user)
):
    """Delete employee (admin only)"""
    if current_user.role != "admin_rh":
        raise HTTPException(status_code=403, detail="Only admins can delete employees")
    
    try:
        result = supabase.table("employees").delete().eq("id", employee_id).execute()
    except ConnectError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service temporairement indisponible. Réessayez plus tard."
        )

    if not result.data:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    return {"message": "Employee deleted successfully"}

@router.post("/{employee_id}/profile-picture")
@retry_on_disconnect()
async def set_employee_profile_picture(
    employee_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Set employee profile picture"""
    url = f"https://api.ices-bj.com/storage/v1/object/public/avatars/{file.filename}"
    
    try:
        result = supabase.table("employees").update({"profile_picture_url": url}).eq("id", employee_id).execute()
    except ConnectError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service temporairement indisponible. Réessayez plus tard."
        )

    if not result.data:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    return {"message": "Profile picture updated successfully", "url": url}