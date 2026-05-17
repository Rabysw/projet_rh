from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from supabase_client import supabase
from auth.auth import normalize_role
from utils.db_utils import retry_on_disconnect
import bcrypt

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class UserData(BaseModel):
    id: str
    email: str
    full_name: str
    role: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserData

@router.post("/login", response_model=LoginResponse)
@retry_on_disconnect()
def login(credentials: LoginRequest):
    print(f"Login attempt for: {credentials.email}")
    try:
        response = supabase.table("users").select("*").eq("email", credentials.email).limit(1).execute()
    except Exception as e:
        print(f"Database connection error during login: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Le service d'authentification est temporairement indisponible. Veuillez réessayer plus tard."
        )

    if not response.data:
        print(f"User not found: {credentials.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect"
        )

    user_data = response.data[0]
    print(f"User found: {user_data['email']}")

    try:
        password_valid = bcrypt.checkpw(
            credentials.password.encode('utf-8'),
            user_data["password_hash"].encode('utf-8')
        )
        print(f"Password valid: {password_valid}")
    except Exception as e:
        print(f"Bcrypt error: {e}")
        password_valid = False

    if not password_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect"
        )

    # Log pour débugger le rôle exact en base
    print(f"Role in DB for {user_data['email']}: '{user_data.get('role')}'")

    return LoginResponse(
        access_token=user_data["token"],
        token_type="bearer",
        user=UserData(
            id=str(user_data["id"]),
            email=user_data["email"],
            full_name=f"{user_data.get('prenom', '')} {user_data.get('nom', '')}".strip(),
            role=normalize_role(user_data.get("role")),
        )
    )