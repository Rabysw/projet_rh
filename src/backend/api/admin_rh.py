from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime

from auth.auth import get_current_user, User
from db_client import get_system_users, get_role_stats
from config_store import CompanyConfig, company_config_store
import config_store

router = APIRouter()

@router.get("/company-config", tags=["admin_rh"])
async def get_company_config(current_user: User = Depends(get_current_user)):
    """Get company configuration"""
    if config_store.company_config_store is None:
        return None
    return config_store.company_config_store

@router.post("/company-config", tags=["admin_rh"])
async def create_company_config(config: CompanyConfig, current_user: User = Depends(get_current_user)):
    """Initialize company configuration"""
    if current_user.role not in ["admin_rh", "resp_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    config.created_at = datetime.now().isoformat()
    config.updated_at = datetime.now().isoformat()
    config_store.company_config_store = config
    return config

@router.patch("/company-config", tags=["admin_rh"])
async def update_company_config(config_update: dict, current_user: User = Depends(get_current_user)):
    """Update existing company configuration"""
    if current_user.role not in ["admin_rh", "resp_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if config_store.company_config_store is None:
        raise HTTPException(status_code=404, detail="Configuration not found")
    
    current_config = config_store.company_config_store.dict()
    current_config.update(config_update)
    current_config["updated_at"] = datetime.now().isoformat()
    
    updated_config = CompanyConfig(**current_config)
    config_store.company_config_store = updated_config
    return updated_config

@router.get("/users", tags=["admin_rh"])
async def get_users(current_user: User = Depends(get_current_user)):
    """Get all system users"""
    return get_system_users()

@router.get("/roles", tags=["admin_rh"])
async def get_roles(current_user: User = Depends(get_current_user)):
    """Get role statistics"""
    return get_role_stats()

@router.get("/dashboard", tags=["admin_rh"])
async def get_dashboard(current_user: User = Depends(get_current_user)):
    """Admin RH dashboard"""
    return {
        "total_users": len(get_system_users()),
        "total_roles": len(get_role_stats()),
        "system_status": "healthy",
        "recent_activity": []
    }
