from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from enum import Enum

# ICES Platform authentication model
class UserRole(str, Enum):
    COLLABORATEUR = "collaborateur"
    MANAGER = "manager"
    RESP_RH = "resp_rh"
    ADMIN_RH = "admin_rh"
    DIRECTION = "direction"

# Simple authentication model (replace with real JWT in production)
class User(BaseModel):
    id: int
    email: str
    full_name: str
    role: UserRole
    department_id: Optional[int] = None

# In-memory user storage for ICES platform (replace with database in production)
users_db = {
    "admin@ices.bj": User(
        id=1, 
        email="admin@ices.bj", 
        full_name="Administrateur ICES",
        role=UserRole.ADMIN_RH
    ),
    "dir@ices.bj": User(
        id=2, 
        email="dir@ices.bj", 
        full_name="Directeur ICES",
        role=UserRole.DIRECTION
    ),
    "rh@ices.bj": User(
        id=3, 
        email="rh@ices.bj", 
        full_name="Responsable RH ICES",
        role=UserRole.RESP_RH
    ),
    "manager@ices.bj": User(
        id=4, 
        email="manager@ices.bj", 
        full_name="Manager ICES",
        role=UserRole.MANAGER,
        department_id=1
    ),
    "collab@ices.bj": User(
        id=5, 
        email="collab@ices.bj", 
        full_name="Collaborateur ICES",
        role=UserRole.COLLABORATEUR,
        department_id=1
    ),
}

# Simple token-based authentication (replace with JWT in production)
# Map token to email for database lookup
tokens_db = {
    "admin-token": "admin@ices.bj",
    "direction-token": "dir@ices.bj",
    "resp_rh-token": "rh@ices.bj",
    "manager-token": "manager@ices.bj",
    "collaborateur-token": "collab@ices.bj",
}

# Map user ID to email for database lookups
user_id_to_email = {
    1: "admin@ices.bj",
    2: "dir@ices.bj",
    3: "rh@ices.bj",
    4: "manager@ices.bj",
    5: "collab@ices.bj",
}

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """Get current user from token"""
    token = credentials.credentials
    
    if token not in tokens_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    email = tokens_db[token]
    if email not in users_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return users_db[email]

async def get_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """Get current user and verify admin role"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user
