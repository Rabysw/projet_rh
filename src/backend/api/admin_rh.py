from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime

from auth.auth import get_current_user, User
from db_client import get_system_users, get_role_stats
from config_store import CompanyConfig, company_config_store
from supabase_client import supabase
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

import secrets
import string
import bcrypt

@router.post("/users", tags=["admin_rh"])
async def create_user(user_data: dict, current_user: User = Depends(get_current_user)):
    """Create a new system user with expanded profile information"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    email = user_data.get("email")
    role = user_data.get("role")
    prenom = user_data.get("prenom", "")
    nom = user_data.get("nom", "")
    password = user_data.get("password")

    if not email or not role or not password:
        raise HTTPException(status_code=400, detail="Missing required fields")

    # Hash password
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    # Generate random token
    token = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(64))

    new_user = {
        "email": email,
        "role": role,
        "prenom": prenom,
        "nom": nom,
        "password_hash": password_hash,
        "token": token,
        "status": "active"
    }

    try:
        response = supabase.table("users").insert(new_user).execute()
        user = response.data[0]
        
        # If user is a collaborator, manager, or resp_rh, create an employee record with ALL info
        if role in ["collaborateur", "manager", "resp_rh"]:
            employee_data = {
                "user_id": user["id"],
                # Identifiants
                "professional_email": email,
                "first_name": prenom,
                "last_name": nom,
                
                # État civil
                "birth_date": user_data.get("birth_date"),
                "birth_place": user_data.get("birth_place"),
                "gender": user_data.get("gender"),
                "nationality": user_data.get("nationality"),
                "marital_status": user_data.get("marital_status"),
                "children_count": user_data.get("children_count", 0),
                
                # Coordonnées
                "professional_phone": user_data.get("phone"),
                "personal_phone": user_data.get("personal_phone"),
                "address": user_data.get("address"),
                "personal_email": user_data.get("personal_email"),
                
                # Carrière
                "position": user_data.get("position"),
                "department_id": user_data.get("department_id"),
                "contract_type": user_data.get("contract_type", "CDI"),
                "hire_date": user_data.get("hire_date", datetime.now().date().isoformat()),
                "base_salary": user_data.get("base_salary", 0),
                "status": "actif",
                
                # Documents d'identité
                "id_card_type": user_data.get("id_card_type"),
                "id_card_number": user_data.get("id_card_number"),
                "id_card_expiry": user_data.get("id_card_expiry"),
                
                # Contact d'urgence
                "emergency_contact_name": user_data.get("emergency_contact_name"),
                "emergency_contact_relation": user_data.get("emergency_contact_relation"),
                "emergency_contact_phone": user_data.get("emergency_contact_phone"),
            }
            
            # Clean up None/empty values to let DB defaults work
            employee_data = {
                k: v for k, v in employee_data.items() 
                if v is not None and v != "" and v != 0
            }
            
            try:
                supabase.table("employees").insert(employee_data).execute()
            except Exception as e:
                print(f"Warning: Failed to create employee record: {str(e)}")
                # Don't fail the user creation if employee record fails
            
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

@router.delete("/users/{user_id}", tags=["admin_rh"])
async def delete_user(user_id: str, current_user: User = Depends(get_current_user)):
    """Delete a system user"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    try:
        supabase.table("users").delete().eq("id", user_id).execute()
        return {"message": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete user: {str(e)}")

@router.get("/users", tags=["admin_rh"])
async def get_users(current_user: User = Depends(get_current_user)):
    """Get all system users from database"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    try:
        response = supabase.table("users").select("*").order("nom").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch users: {str(e)}")

@router.get("/roles", tags=["admin_rh"])
async def get_roles(current_user: User = Depends(get_current_user)):
    """Get dynamic role statistics from database"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    try:
        # Get all users to count roles
        response = supabase.table("users").select("role").execute()
        users = response.data
        
        counts = {}
        for u in users:
            r = u["role"]
            counts[r] = counts.get(r, 0) + 1
            
        role_configs = {
            "direction": {"label": "Direction", "color": "bg-purple-100 text-purple-800"},
            "admin_rh": {"label": "Admin RH", "color": "bg-blue-100 text-blue-800"},
            "resp_rh": {"label": "Resp. RH", "color": "bg-green-100 text-green-800"},
            "manager": {"label": "Manager", "color": "bg-orange-100 text-orange-800"},
            "collaborateur": {"label": "Collaborateur", "color": "bg-gray-100 text-gray-800"},
        }
        
        stats = []
        for role, config in role_configs.items():
            stats.append({
                "role": config["label"],
                "count": counts.get(role, 0),
                "color": config["color"]
            })
            
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch role stats: {str(e)}")

@router.get("/dashboard", tags=["admin_rh"])
async def get_dashboard(current_user: User = Depends(get_current_user)):
    """Admin RH dashboard"""
    return {
        "total_users": len(get_system_users()),
        "total_roles": len(get_role_stats()),
        "system_status": "healthy",
        "recent_activity": []
    }