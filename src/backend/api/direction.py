from fastapi import APIRouter, Depends
from typing import List

from auth.auth import get_current_user, User
from db_client import get_reports, get_direction_kpis

router = APIRouter()

@router.get("/reports", tags=["direction"])
async def get_reports_endpoint(current_user: User = Depends(get_current_user)):
    """Get reports"""
    return get_reports()

@router.get("/kpis", tags=["direction"])
async def get_kpis_endpoint(current_user: User = Depends(get_current_user)):
    """Get direction KPIs"""
    return get_direction_kpis()

@router.get("/dashboard", tags=["direction"])
async def get_dashboard(current_user: User = Depends(get_current_user)):
    """Direction dashboard"""
    return {
        "reports_count": len(get_reports()),
        "kpis": get_direction_kpis(),
        "period": "2024",
        "status": "active"
    }
