from datetime import datetime
from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from auth.auth import User, get_current_user
from supabase_client import supabase

router = APIRouter()


class PublicHoliday(BaseModel):
    date: str
    label: str


class CompanyConfigBase(BaseModel):
    company_name: str
    company_logo_url: Optional[str] = None
    primary_color: str
    country: str
    currency: str
    phone_prefix: str
    timezone: str
    working_days: List[str]
    working_hours_start: str
    working_hours_end: str
    overtime_threshold_hours: float
    leave_days_per_year: float
    leave_carry_over_max: float
    probation_duration_days: int
    contract_alert_days: int
    id_expiry_alert_days: int
    medical_alert_days: int
    late_alert_threshold_minutes: int
    late_count_alert_per_month: int
    public_holidays: List[PublicHoliday] = Field(default_factory=list)
    departments: List[str] = Field(default_factory=list)
    job_titles: List[str] = Field(default_factory=list)
    leave_types: List[str] = Field(default_factory=list)


class CompanyConfigCreate(CompanyConfigBase):
    pass


class CompanyConfigUpdate(BaseModel):
    company_name: Optional[str] = None
    company_logo_url: Optional[str] = None
    primary_color: Optional[str] = None
    country: Optional[str] = None
    currency: Optional[str] = None
    phone_prefix: Optional[str] = None
    timezone: Optional[str] = None
    working_days: Optional[List[str]] = None
    working_hours_start: Optional[str] = None
    working_hours_end: Optional[str] = None
    overtime_threshold_hours: Optional[float] = None
    leave_days_per_year: Optional[float] = None
    leave_carry_over_max: Optional[float] = None
    probation_duration_days: Optional[int] = None
    contract_alert_days: Optional[int] = None
    id_expiry_alert_days: Optional[int] = None
    medical_alert_days: Optional[int] = None
    late_alert_threshold_minutes: Optional[int] = None
    late_count_alert_per_month: Optional[int] = None
    public_holidays: Optional[List[PublicHoliday]] = None
    departments: Optional[List[str]] = None
    job_titles: Optional[List[str]] = None
    leave_types: Optional[List[str]] = None


def _check_admin_access(current_user: User) -> None:
    if current_user.role not in ["admin_rh", "resp_rh"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Accès réservé aux administrateurs RH",
        )


def _normalize_record(record: dict[str, Any]) -> dict[str, Any]:
    # Ensure time fields are serialized for JSON consumers
    for key in ("working_hours_start", "working_hours_end"):
        value = record.get(key)
        if value is not None:
            record[key] = str(value)
    return record


@router.get("/company-config")
async def get_company_config(current_user: User = Depends(get_current_user)):
    _check_admin_access(current_user)
    response = supabase.table("company_config").select("*").limit(1).execute()
    if not response.data:
        return None
    return _normalize_record(response.data[0])


@router.post("/company-config")
async def create_company_config(
    payload: CompanyConfigCreate, current_user: User = Depends(get_current_user)
):
    _check_admin_access(current_user)

    existing = supabase.table("company_config").select("id").limit(1).execute()
    if existing.data:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="La configuration entreprise existe déjà",
        )

    now = datetime.utcnow().isoformat()
    data = payload.model_dump()
    data["id"] = 1
    data["created_at"] = now
    data["updated_at"] = now

    result = supabase.table("company_config").insert(data).execute()
    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur de création de la configuration",
        )
    return _normalize_record(result.data[0])


@router.patch("/company-config")
async def update_company_config(
    payload: CompanyConfigUpdate, current_user: User = Depends(get_current_user)
):
    _check_admin_access(current_user)

    updates = payload.model_dump(exclude_unset=True)
    if not updates:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Aucune modification fournie",
        )
    updates["updated_at"] = datetime.utcnow().isoformat()

    result = supabase.table("company_config").update(updates).eq("id", 1).execute()
    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Configuration entreprise introuvable",
        )
    return _normalize_record(result.data[0])

