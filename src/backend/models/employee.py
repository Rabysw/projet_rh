from pydantic import BaseModel, Field
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
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., pattern=r'^[^@]+@[^@]+\.[^@]+$')
    phone: str = Field(..., min_length=10, max_length=20)
    department_id: Optional[int] = None
    hr_role: HRRole
    contract_type: ContractType
    status: EmploymentStatus

class EmployeeInput(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: int
    profile_picture: Optional[ProfilePicture] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

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
