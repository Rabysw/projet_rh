from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from enum import Enum

class EmploymentStatus(str, Enum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"
    ON_LEAVE = "OnLeave"

class ContractType(str, Enum):
    CDI = "CDI"
    CDD = "CDD"
    INTERNSHIP = "Internship"
    FREELANCE = "Freelance"
    PART_TIME = "PartTime"

class HRRole(str, Enum):
    HR_ADMIN = "HRAdmin"
    HR_MANAGER = "HRManager"
    MANAGER = "Manager"
    EMPLOYEE = "Employee"
    DIRECTION = "Direction"

class ProfilePicture(BaseModel):
    url: str
    filename: Optional[str] = None

class EmployeeBase(BaseModel):
    model_config = ConfigDict(extra='ignore', from_attributes=True)
    
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., pattern=r'^[^@]+@[^@]+\.[^@]+$')
    phone: str = Field(..., min_length=1, max_length=20)
    department_id: Optional[int] = None
    hr_role: Optional[HRRole] = None
    position: Optional[str] = None
    contract_type: Optional[str] = None
    status: Optional[str] = None
    hire_date: Optional[str] = None
    base_salary: Optional[float] = None
    birth_date: Optional[str] = None
    birth_place: Optional[str] = None
    gender: Optional[str] = None
    nationality: Optional[str] = None
    marital_status: Optional[str] = None
    children_count: Optional[int] = 0
    id_card_number: Optional[str] = None
    id_card_type: Optional[str] = None
    id_card_expiry: Optional[str] = None
    address: Optional[str] = None
    personal_phone: Optional[str] = None
    personal_email: Optional[str] = None
    professional_phone: Optional[str] = None
    professional_email: Optional[str] = None
    work_location: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_relation: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    diploma: Optional[str] = None
    contract_start: Optional[str] = None
    contract_end: Optional[str] = None
    manager_id: Optional[int] = None

class EmployeeInput(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int
    profile_picture: Optional[ProfilePicture] = None
    created_at: datetime
    updated_at: datetime

class EmployeeFilter(BaseModel):
    search: Optional[str] = None
    department_id: Optional[int] = None
    status: Optional[EmploymentStatus] = None
    hr_role: Optional[HRRole] = None

class PaginationParams(BaseModel):
    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=10, ge=1, le=100)

class PaginatedEmployees(BaseModel):
    employees: List[Employee]
    total: int
    page: int
    page_size: int
