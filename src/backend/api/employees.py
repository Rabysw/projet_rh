from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from typing import Optional, List
from datetime import datetime

from models.employee import (
    Employee, EmployeeInput, EmployeeFilter, 
    PaginatedEmployees, EmploymentStatus, ContractType, HRRole, PaginationParams
)
from auth.auth import get_current_user, User
from services.employee_service import EmployeeService

router = APIRouter()

# In-memory storage (replace with database in production)
employees_db = {}
departments_db = {}
next_employee_id = 1
employee_service = EmployeeService()

@router.post("/", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(
    employee_data: EmployeeInput,
    current_user: User = Depends(get_current_user)
):
    """Create a new employee"""
    global next_employee_id
    
    # Check authorization
    if current_user.role not in ["admin", "user"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    
    # Validate department exists if provided
    if employee_data.department_id and employee_data.department_id not in departments_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Department not found"
        )
    
    employee = employee_service.create_employee(
        employee_data, next_employee_id, datetime.now()
    )
    employees_db[next_employee_id] = employee
    next_employee_id += 1
    
    return employee

@router.get("/", response_model=PaginatedEmployees)
async def list_employees(
    filter: EmployeeFilter = EmployeeFilter(),
    pagination: PaginationParams = PaginationParams(),
    current_user: User = Depends(get_current_user)
):
    """List employees with filtering and pagination"""
    return employee_service.list_employees(
        list(employees_db.values()), filter, pagination
    )

@router.get("/{employee_id}", response_model=Employee)
async def get_employee(
    employee_id: int,
    current_user: User = Depends(get_current_user)
):
    """Get employee by ID"""
    if employee_id not in employees_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    return employees_db[employee_id]

@router.put("/{employee_id}", response_model=Employee)
async def update_employee(
    employee_id: int,
    employee_data: EmployeeInput,
    current_user: User = Depends(get_current_user)
):
    """Update employee"""
    if employee_id not in employees_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    # Validate department exists if provided
    if employee_data.department_id and employee_data.department_id not in departments_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Department not found"
        )
    
    updated_employee = employee_service.update_employee(
        employees_db[employee_id], employee_data, datetime.now()
    )
    employees_db[employee_id] = updated_employee
    
    return updated_employee

@router.delete("/{employee_id}")
async def delete_employee(
    employee_id: int,
    current_user: User = Depends(get_current_user)
):
    """Delete employee (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can delete employees"
        )
    
    if employee_id not in employees_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    del employees_db[employee_id]
    return {"message": "Employee deleted successfully"}

@router.post("/{employee_id}/profile-picture")
async def set_employee_profile_picture(
    employee_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Set employee profile picture"""
    if employee_id not in employees_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be an image"
        )
    
    # In a real implementation, you would upload to cloud storage
    # For now, we'll just simulate it
    profile_picture = {
        "url": f"/uploads/{file.filename}",
        "filename": file.filename
    }
    
    employees_db[employee_id].profile_picture = profile_picture
    employees_db[employee_id].updated_at = datetime.now()
    
    return {"message": "Profile picture updated successfully"}
