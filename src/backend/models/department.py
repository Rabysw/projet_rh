from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class DepartmentBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1, max_length=500)

class DepartmentInput(DepartmentBase):
    pass

class Department(DepartmentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class DepartmentWithCount(Department):
    employee_count: int
