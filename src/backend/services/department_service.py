from datetime import datetime

from models.department import Department, DepartmentInput

class DepartmentService:
    def create_department(
        self, 
        department_data: DepartmentInput, 
        department_id: int, 
        created_at: datetime
    ) -> Department:
        """Create a new department"""
        return Department(
            id=department_id,
            name=department_data.name,
            description=department_data.description,
            created_at=created_at,
            updated_at=created_at
        )
    
    def update_department(
        self, 
        existing_department: Department, 
        department_data: DepartmentInput, 
        updated_at: datetime
    ) -> Department:
        """Update an existing department"""
        return Department(
            id=existing_department.id,
            name=department_data.name,
            description=department_data.description,
            created_at=existing_department.created_at,
            updated_at=updated_at
        )
