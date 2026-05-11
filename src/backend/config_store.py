from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class CompanyConfig(BaseModel):
    id: Optional[int] = None
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
    public_holidays: List[dict] # {date: str, label: str}
    departments: List[str]
    job_titles: List[str]
    leave_types: List[str]
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

# Global storage for company config (In-memory for now, to be synced with DB)
company_config_store: Optional[CompanyConfig] = None
