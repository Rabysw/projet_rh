from pydantic import BaseModel
from typing import List

class EmployeeStatusSummary(BaseModel):
    active: int
    inactive: int
    on_leave: int
    total: int

class DepartmentStat(BaseModel):
    department_id: int
    department_name: str
    employee_count: int

class DashboardStats(BaseModel):
    status_summary: EmployeeStatusSummary
    department_stats: List[DepartmentStat]
