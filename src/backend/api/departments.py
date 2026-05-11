from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime

from models.department import Department, DepartmentInput, DepartmentWithCount
from auth.auth import get_current_user, User
from services.department_service import DepartmentService

router = APIRouter()

# In-memory storage (replace with database in production)
departments_db = {}
next_department_id = 1
department_service = DepartmentService()

@router.post("/", response_model=Department, status_code=status.HTTP_201_CREATED)
async def create_department(
    department_data: DepartmentInput,
    current_user: User = Depends(get_current_user)
):
    """Create a new department"""
    global next_department_id
    
    # Check authorization
    if current_user.role not in ["admin", "user"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    
    department = department_service.create_department(
        department_data, next_department_id, datetime.now()
    )
    departments_db[next_department_id] = department
    next_department_id += 1
    
    return department

@router.get("/", response_model=List[Department])
async def list_departments(
    current_user: User = Depends(get_current_user)
):
    """List all departments"""
    return list(departments_db.values())

@router.get("/{department_id}", response_model=Department)
async def get_department(
    department_id: int,
    current_user: User = Depends(get_current_user)
):
    """Get department by ID"""
    if department_id not in departments_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    
    return departments_db[department_id]

@router.put("/{department_id}", response_model=Department)
async def update_department(
    department_id: int,
    department_data: DepartmentInput,
    current_user: User = Depends(get_current_user)
):
    """Update department"""
    if department_id not in departments_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    
    updated_department = department_service.update_department(
        departments_db[department_id], department_data, datetime.now()
    )
    departments_db[department_id] = updated_department
    
    return updated_department

@router.delete("/{department_id}")
async def delete_department(
    department_id: int,
    current_user: User = Depends(get_current_user)
):
    """Delete department (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete departments"
        )
    
    if department_id not in departments_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    
    del departments_db[department_id]
    return {"message": "Department deleted successfully"}

@router.get("/{department_id}/with-count", response_model=DepartmentWithCount)
async def get_department_with_employee_count(
    department_id: int,
    current_user: User = Depends(get_current_user)
):
    """Get department with employee count"""
    if department_id not in departments_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    
    # Import here to avoid circular imports
    from api.employees import employees_db
    
    department = departments_db[department_id]
    employee_count = len([
        emp for emp in employees_db.values()
        if emp.department_id == department_id
    ])
    
    return DepartmentWithCount(
        id=department.id,
        name=department.name,
        description=department.description,
        employee_count=employee_count,
        created_at=department.created_at,
        updated_at=department.updated_at
    )
