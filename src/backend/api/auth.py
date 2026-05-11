from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional

from auth.auth import User, UserRole, users_db, tokens_db, get_current_user

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str  # For demo, password is ignored

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: User

class UserListResponse(BaseModel):
    users: list[User]

@router.post("/login", response_model=LoginResponse)
async def login(login_data: LoginRequest):
    """Login endpoint for ICES platform"""
    email = login_data.email
    password = login_data.password
    
    # Validate password
    if password != "password123":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Mot de passe incorrect"
        )
    
    if email not in users_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email non reconnu"
        )
    
    user = users_db[email]
    
    # Find corresponding token
    token = None
    for token_key, token_email in tokens_db.items():
        if token_email == email:
            token = token_key
            break
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur de configuration du token"
        )
    
    return LoginResponse(
        access_token=token,
        token_type="bearer",
        user=user
    )

@router.get("/users", response_model=UserListResponse)
async def get_users():
    """Get all users for demo purposes"""
    return UserListResponse(users=list(users_db.values()))

@router.get("/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user
