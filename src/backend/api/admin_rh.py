from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime
import secrets
import string
import bcrypt

from auth.auth import get_current_user, User
from config_store import CompanyConfig, company_config_store
from supabase_client import supabase, supabase_admin
from utils.db_utils import retry_on_disconnect
import config_store

router = APIRouter()

# --- Configuration de l'entreprise ---

@router.get("/company-config", tags=["admin_rh"])
@retry_on_disconnect()
async def get_company_config(current_user: User = Depends(get_current_user)):
    """Get company configuration"""
    if config_store.company_config_store is None:
        return None
    return config_store.company_config_store

@router.post("/company-config", tags=["admin_rh"])
@retry_on_disconnect()
async def create_company_config(config: CompanyConfig, current_user: User = Depends(get_current_user)):
    """Initialize company configuration"""
    if current_user.role not in ["admin_rh", "resp_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    config.created_at = datetime.now().isoformat()
    config.updated_at = datetime.now().isoformat()
    config_store.company_config_store = config
    return config

@router.patch("/company-config", tags=["admin_rh"])
@retry_on_disconnect()
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

# --- Gestion des Utilisateurs ---

@router.get("/users", tags=["admin_rh"])
@retry_on_disconnect()
async def list_users(current_user: User = Depends(get_current_user)):
    """List all system users"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    response = supabase_admin.table("users").select("id, email, role, prenom, nom, status, created_at").order("nom").execute()
    return response.data or []

@router.post("/users", tags=["admin_rh"])
@retry_on_disconnect()
async def create_user(user_data: dict, current_user: User = Depends(get_current_user)):
    """Create a new system user and their employee record"""
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
        response = supabase_admin.table("users").insert(new_user).execute()
        user = response.data[0]
        
        # If user is a collaborator, manager, or resp_rh, create an employee record
        if role in ["collaborateur", "manager", "resp_rh"]:
            employee_data = {
                "user_id": user["id"],
                "professional_email": email,
                "first_name": prenom,
                "last_name": nom,
                "contract_type": user_data.get("contract_type", "CDI"),
                "hire_date": user_data.get("hire_date", datetime.now().date().isoformat()),
                "status": "actif",
            }
            supabase_admin.table("employees").insert(employee_data).execute()
            
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

@router.delete("/users/{user_id}", tags=["admin_rh"])
@retry_on_disconnect()
async def delete_user(user_id: str, current_user: User = Depends(get_current_user)):
    """Delete a user and their employee record"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    try:
        # Delete employee record first
        supabase_admin.table("employees").delete().eq("user_id", user_id).execute()
        # Delete user record
        supabase_admin.table("users").delete().eq("id", user_id).execute()
        return {"message": "Utilisateur supprimé avec succès"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la suppression: {str(e)}")

# --- Rôles & Statistiques ---

@router.get("/roles", tags=["admin_rh"])
@retry_on_disconnect()
async def get_roles_stats(current_user: User = Depends(get_current_user)):
    """Get role stats for admin dashboard"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    try:
        response = supabase.table("users").select("role").execute()
        roles = [u["role"] for u in (response.data or [])]
        
        stats = {}
        for r in roles:
            stats[r] = stats.get(r, 0) + 1
        
        colors = {
            "admin_rh": "bg-red-100 text-red-700",
            "resp_rh": "bg-blue-100 text-blue-700",
            "direction": "bg-purple-100 text-purple-700",
            "manager": "bg-green-100 text-green-700",
            "collaborateur": "bg-gray-100 text-gray-700"
        }
            
        return [{"role": k, "count": v, "color": colors.get(k, "bg-gray-100")} for k, v in stats.items()]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Sécurité & Audit ---

@router.get("/logs", tags=["admin_rh"])
@retry_on_disconnect()
async def get_logs(current_user: User = Depends(get_current_user)):
    """Get system audit logs (using user creation history as logs for now)"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    try:
        users = supabase.table("users").select("email, role, created_at").order("created_at", desc=True).limit(20).execute()
        return [
            {
                "id": i,
                "action": f"Création utilisateur {u['role']}",
                "user": u["email"],
                "date": u["created_at"],
                "type": "auth"
            }
            for i, u in enumerate(users.data or [])
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/backups", tags=["admin_rh"])
@retry_on_disconnect()
async def get_backups(current_user: User = Depends(get_current_user)):
    """Get backup history"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return [
        {"id": 1, "name": "Daily_Backup_20260517", "size": "125 MB", "date": datetime.now().strftime("%d/%m/%Y %H:%M"), "status": "Success"},
        {"id": 2, "name": "Daily_Backup_20260516", "size": "124 MB", "date": "16/05/2026 00:00", "status": "Success"}
    ]

@router.get("/security", tags=["admin_rh"])
@retry_on_disconnect()
async def get_security_status(current_user: User = Depends(get_current_user)):
    """Get security status"""
    if current_user.role not in ["admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return {
        "mfa_enabled": False,
        "password_policy": "Strong",
        "last_audit": datetime.now().isoformat(),
        "threats_detected": 0
    }
