from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime
from auth.auth import get_current_user, User
from supabase_client import supabase
from utils.db_utils import retry_on_disconnect

router = APIRouter()

@router.get("/kpis", tags=["direction"])
@retry_on_disconnect()
async def get_kpis_endpoint(current_user: User = Depends(get_current_user)):
    """Get direction KPIs from real data where possible"""
    if current_user.role not in ["direction", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    try:
        # Taux de turnover (mock for now but structure is ready)
        # Masse salariale (sum of base_salary from employees)
        emp_resp = supabase.table("employees").select("base_salary").execute()
        total_salary = sum(e.get("base_salary", 0) for e in (emp_resp.data or []))
        
        return {
            "masse_salariale": f"{total_salary:,} FCFA",
            "turnover": "4.2%",
            "satisfaction": "4.8/5",
            "absenteisme": "2.1%"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analytics", tags=["direction"])
@retry_on_disconnect()
async def get_analytics(current_user: User = Depends(get_current_user)):
    """Get advanced analytics for direction"""
    if current_user.role not in ["direction", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    try:
        # Répartition par département
        dept_resp = supabase.table("employees").select("department_id").execute()
        depts = [e["department_id"] for e in (dept_resp.data or []) if e.get("department_id")]
        
        dept_counts = {}
        for d in depts:
            dept_counts[d] = dept_counts.get(d, 0) + 1
            
        return {
            "department_distribution": dept_counts,
            "risk_analysis": [
                {"dept": "Ventes", "risk": "Modéré", "score": 12}
            ],
            "objectives": [
                {"label": "Recrutement IT", "progress": 75},
                {"label": "Digitalisation RH", "progress": 90}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/exports", tags=["direction"])
@retry_on_disconnect()
async def get_exports_list(current_user: User = Depends(get_current_user)):
    """List available exports for direction"""
    if current_user.role not in ["direction", "admin_rh"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    return [
        {"name": "Registre du personnel", "format": "PDF/XLS", "last": "15/05/2026", "type": "legal"},
        {"name": "Déclaration CNSS", "format": "XLS", "last": "01/05/2026", "type": "tax"},
        {"name": "État des salaires", "format": "XLS", "last": "30/04/2026", "type": "finance"}
    ]
