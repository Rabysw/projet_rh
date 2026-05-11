from typing import List, Optional
from datetime import datetime

from models.employee import (
    Employee, EmployeeInput, EmployeeFilter, 
    PaginatedEmployees, EmploymentStatus, ContractType, HRRole
)

class EmployeeService:
    def create_employee(
        self, 
        employee_data: EmployeeInput, 
        employee_id: int, 
        created_at: datetime
    ) -> Employee:
        """Create a new employee"""
        return Employee(
            id=employee_id,
            first_name=employee_data.first_name,
            last_name=employee_data.last_name,
            email=employee_data.email,
            phone=employee_data.phone,
            department_id=employee_data.department_id,
            hr_role=employee_data.hr_role,
            contract_type=employee_data.contract_type,
            status=employee_data.status,
            profile_picture=None,
            created_at=created_at,
            updated_at=created_at
        )
    
    def list_employees(
        self, 
        employees: List[Employee], 
        filter: EmployeeFilter, 
        pagination
    ) -> PaginatedEmployees:
        """List employees with filtering and pagination"""
        filtered_employees = self._filter_employees(employees, filter)
        
        # Calculate pagination
        total = len(filtered_employees)
        start = (pagination.page - 1) * pagination.page_size
        end = start + pagination.page_size
        paginated_employees = filtered_employees[start:end]
        
        return PaginatedEmployees(
            employees=paginated_employees,
            total=total,
            page=pagination.page,
            page_size=pagination.page_size
        )
    
    def update_employee(
        self, 
        existing_employee: Employee, 
        employee_data: EmployeeInput, 
        updated_at: datetime
    ) -> Employee:
        """Update an existing employee"""
        return Employee(
            id=existing_employee.id,
            first_name=employee_data.first_name,
            last_name=employee_data.last_name,
            email=employee_data.email,
            phone=employee_data.phone,
            department_id=employee_data.department_id,
            hr_role=employee_data.hr_role,
            contract_type=employee_data.contract_type,
            status=employee_data.status,
            profile_picture=existing_employee.profile_picture,
            created_at=existing_employee.created_at,
            updated_at=updated_at
        )
    
    def _filter_employees(
        self, 
        employees: List[Employee], 
        filter: EmployeeFilter
    ) -> List[Employee]:
        """Filter employees based on filter criteria"""
        filtered = employees
        
        if filter.search:
            search_lower = filter.search.lower()
            filtered = [
                emp for emp in filtered
                if search_lower in emp.first_name.lower()
                or search_lower in emp.last_name.lower()
                or search_lower in emp.email.lower()
            ]
        
        if filter.department_id is not None:
            filtered = [
                emp for emp in filtered
                if emp.department_id == filter.department_id
            ]
        
        if filter.status:
            filtered = [
                emp for emp in filtered
                if emp.status == filter.status
            ]
        
        if filter.hr_role:
            filtered = [
                emp for emp in filtered
                if emp.hr_role == filter.hr_role
            ]
        
        return filtered
