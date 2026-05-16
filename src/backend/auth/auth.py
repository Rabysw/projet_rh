from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from enum import Enum
from httpx import ConnectError
from supabase_client import supabase

class UserRole(str, Enum):
    COLLABORATEUR = "collaborateur"
    MANAGER = "manager"
    RESP_RH = "resp_rh"
    ADMIN_RH = "admin_rh"
    DIRECTION = "direction"

# Configuration des rôles pour les comptes de test (ANALYSIS_AND_PLAN.md)
TEST_USERS_ROLES = {
    "collab@ices.bj": UserRole.COLLABORATEUR,
    "manager@ices.bj": UserRole.MANAGER,
    "rh@ices.bj": UserRole.RESP_RH,
    "admin@ices.bj": UserRole.ADMIN_RH,
    "dir@ices.bj": UserRole.DIRECTION
}

class User(BaseModel):
    id: str
    email: str
    full_name: str
    role: UserRole
    department_id: Optional[str] = None

ROLE_ALIASES = {
    "collaborateur": "collaborateur",
    "collab": "collaborateur",
    "employee": "collaborateur",
    "employé": "collaborateur",
    "user": "collaborateur",
    "manager": "manager",
    "gestionnaire": "manager",
    "direction": "direction",
    "directeur": "direction",
    "admin_rh": "admin_rh",
    "admin rh": "admin_rh",
    "admin": "admin_rh",
    "hradmin": "admin_rh",
    "hr admin": "admin_rh",
    "resp_rh": "resp_rh",
    "resp. rh": "resp_rh",
    "resp rh": "resp_rh",
    "responsable rh": "resp_rh",
    "rh": "resp_rh",
    "hrmanager": "resp_rh",
    "hr manager": "resp_rh",
}

def normalize_role(role: Optional[str]) -> str:
    if not role:
        return "collaborateur"  # Valeur par défaut sécurisée
    role_key = role.strip().lower()
    return ROLE_ALIASES.get(role_key, role_key)

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    token = credentials.credentials

    # 1. Vérification prioritaire des identifiants de test (mode dev)
    if token in TEST_USERS_ROLES:
        role = TEST_USERS_ROLES[token]
        name_part = token.split('@')[0].replace('.', ' ').title()
        return User(
            id=f"test-{token}",
            email=token,
            full_name=name_part,
            role=role
        )

    try:
        response = supabase.table("users").select("*").eq("token", token).limit(1).execute()
    except ConnectError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Service d'authentification temporairement indisponible. Réessayez plus tard.",
        )

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_data = response.data[0]
    user_email = user_data.get("email")

    # Utilisation du rôle réel de la base de données Supabase
    normalized_role = normalize_role(user_data.get("role"))
    try:
        user_role = UserRole(normalized_role)
    except ValueError:
        user_role = UserRole.COLLABORATEUR

    return User(
        id=user_data["id"],
        email=user_email,
        full_name=f"{user_data.get('prenom', '')} {user_data.get('nom', '')}".strip(),
        role=user_role,
    )

async def get_admin_user(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role not in ["admin_rh", "direction"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user