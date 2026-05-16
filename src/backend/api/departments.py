from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime

from auth.auth import get_current_user, User
from supabase_client import supabase

router = APIRouter()

@router.get("/")
async def list_departments(
    current_user: User = Depends(get_current_user)
):
    """List all departments from Supabase"""
    response = supabase.table("departments").select("*").execute()
    return response.data or []

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_department(
    name: str,
    current_user: User = Depends(get_current_user)
):
    """Create a new department in Supabase"""
    if current_user.role not in ["admin_rh", "resp_rh"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    
    response = supabase.table("departments").insert({"name": name}).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create department")
    
    return response.data[0]

@router.get("/{department_id}")
async def get_department(
    department_id: int,
    current_user: User = Depends(get_current_user)
):
    """Get department by ID from Supabase"""
    response = supabase.table("departments").select("*").eq("id", department_id).limit(1).execute()
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found"
        )
    
    return response.data[0]

@router.delete("/{department_id}")
async def delete_department(
    department_id: int,
    current_user: User = Depends(get_current_user)
):
    """Delete department from Supabase (admin only)"""
    if current_user.role not in ["admin_rh", "resp_rh"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Admin or RH can delete departments"
        )
    
    response = supabase.table("departments").delete().eq("id", department_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Department not found")
        
    return {"message": "Department deleted successfully"}
