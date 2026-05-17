from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from auth.auth import get_current_user, User
from supabase_client import supabase
from utils.db_utils import retry_on_disconnect

router = APIRouter()

# Pydantic models for CompanyConfig
class CompanyConfigBase(BaseModel):
    company_name: str
    primary_color: str
    company_logo_url: Optional[str] = None
    country: Optional[str] = "Bénin"
    currency: Optional[str] = "XOF"
    phone_prefix: Optional[str] = "+229"
    timezone: Optional[str] = "Africa/Porto-Novo"
    fiscal_id: Optional[str] = None
    legal_structure: Optional[str] = None
    working_days: Optional[List[str]] = ["Lun", "Mar", "Mer", "Jeu", "Ven"]
    working_hours_start: Optional[str] = "08:00:00"
    working_hours_end: Optional[str] = "17:00:00"
    break_duration_minutes: Optional[int] = 60
    leave_days_per_year: Optional[int] = 24
    leave_carry_over_max: Optional[int] = 5
    leave_types: Optional[List[str]] = ["Congés payés", "Maladie", "Maternité", "Exceptionnel"]
    probation_duration_days: Optional[int] = 90
    contract_alert_days: Optional[int] = 30
    id_expiry_alert_days: Optional[int] = 60
    medical_alert_days: Optional[int] = 30
    overtime_threshold_hours: Optional[int] = 8
    late_alert_threshold_minutes: Optional[int] = 15
    late_count_alert_per_month: Optional[int] = 3

class CompanyConfigSetup(CompanyConfigBase):
    departments: List[str]
    job_titles: List[str]
    public_holidays: List[dict]

class CompanyConfigInDB(CompanyConfigBase):
    id: int = 1
    is_setup: bool = False
    public_holidays: Optional[List[dict]] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

# ✅ GET sans authentification
@router.get("/company-config", response_model=CompanyConfigInDB)
@retry_on_disconnect()
def get_company_config():
    """Récupère la configuration de l'entreprise avec fallback en cas d'erreur réseau"""
    try:
        if not supabase:
            raise Exception("Supabase client not initialized")
            
        response = supabase.table("company_config").select("*").eq("id", 1).limit(1).execute()
        config_data = response.data
        
        if not config_data:
            return CompanyConfigInDB(
                company_name="ICES BJ",
                primary_color="#3b82f6",
                id=1
            )
        return CompanyConfigInDB(**config_data[0])
    except Exception as e:
        print(f"CRITICAL ERROR: Failed to fetch company config: {e}")
        # Return fallback configuration instead of 500 error to keep the app running
        return CompanyConfigInDB(
            company_name="ICES BJ (Mode Dégradé)",
            primary_color="#3b82f6",
            id=1
        )

@router.post("/company-config", response_model=CompanyConfigInDB)
@retry_on_disconnect()
def set_company_config(
    config: CompanyConfigBase,
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["admin_rh", "direction"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Seul l'Admin RH ou la Direction peut configurer les paramètres"
        )

    try:
        data_to_upsert = config.dict(exclude_unset=True)
        data_to_upsert["id"] = 1
        data_to_upsert["updated_at"] = datetime.now().isoformat()

        response = supabase.table("company_config").upsert(data_to_upsert, on_conflict="id").execute()

        if not response.data:
            raise HTTPException(status_code=500, detail="Échec de la sauvegarde de la configuration")

        return CompanyConfigInDB(**response.data[0])
    except Exception as e:
        print(f"Error saving company config: {e}")
        raise HTTPException(status_code=503, detail=f"Service indisponible (Base de données) : {str(e)}")

@router.post("/company-config/setup", response_model=CompanyConfigInDB)
def setup_company_config(
    config: CompanyConfigSetup,
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["admin_rh", "direction"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Seul l'Admin RH ou la Direction peut effectuer la configuration initiale"
        )

    try:
        # 1. Handle Departments
        if config.departments:
            dept_data = [{"name": d} for d in config.departments]
            supabase.table("departments").upsert(dept_data, on_conflict="name").execute()

        # 2. Handle Job Titles
        if config.job_titles:
            jobs_data = [{"name": j} for j in config.job_titles]
            supabase.table("job_titles").upsert(jobs_data, on_conflict="name").execute()

        # 3. Handle Public Holidays
        if config.public_holidays:
            # Expected format: [{"date": "2025-01-01", "name": "Jour de l'An"}]
            supabase.table("public_holidays").upsert(config.public_holidays, on_conflict="date").execute()

        # 4. Handle Company Config
        config_dict = config.dict(exclude_unset=True)
        # Remove lists that don't belong in company_config table
        if "departments" in config_dict: del config_dict["departments"]
        if "job_titles" in config_dict: del config_dict["job_titles"]
        
        config_dict["id"] = 1
        config_dict["is_setup"] = True
        config_dict["updated_at"] = datetime.now().isoformat()

        response = supabase.table("company_config").upsert(config_dict, on_conflict="id").execute()

        if not response.data:
            raise HTTPException(status_code=500, detail="Échec de la configuration de l'entreprise")

        return CompanyConfigInDB(**response.data[0])
    except Exception as e:
        print(f"Error during company setup: {e}")
        raise HTTPException(status_code=503, detail=f"Erreur lors de la configuration : {str(e)}")
