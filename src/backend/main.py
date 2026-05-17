from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import uvicorn
from datetime import datetime

from models.employee import (
    Employee, EmployeeInput, EmployeeFilter, 
    PaginatedEmployees, EmploymentStatus, ContractType, HRRole
)
from models.department import Department, DepartmentInput, DepartmentWithCount
from api.employees import router as employees_router
from api.departments import router as departments_router
from api.dashboard import router as dashboard_router
from auth.auth import get_current_user, User

app = FastAPI(
    title="ICES HR Platform API",
    description="HR management system for ICES platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://projet-rh-4.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth router
from api.auth import router as auth_router
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])

# Include roles router
from api.roles import router as roles_router
app.include_router(roles_router, prefix="/api/v1/roles", tags=["roles"])

# Include routers
app.include_router(employees_router, prefix="/api/v1/employees", tags=["employees"])
app.include_router(departments_router, prefix="/api/v1/departments", tags=["departments"])
app.include_router(dashboard_router, prefix="/api/v1/dashboard", tags=["dashboard"])

# Role-specific routers
from api.collaborateur import router as collab_router
app.include_router(collab_router, prefix="/api/v1/collaborateur", tags=["collaborateur"])

from api.manager import router as manager_router
app.include_router(manager_router, prefix="/api/v1/manager", tags=["manager"])

from api.resp_rh import router as resp_rh_router
app.include_router(resp_rh_router, prefix="/api/v1/resp-rh", tags=["resp_rh"])

from api.admin_rh import router as admin_rh_router
app.include_router(admin_rh_router, prefix="/api/v1/admin-rh", tags=["admin_rh"])

from api.admin import router as admin_router
app.include_router(admin_router, prefix="/api/v1/admin", tags=["admin"])

from api.direction import router as direction_router
app.include_router(direction_router, prefix="/api/v1/direction", tags=["direction"])

from api.communication import router as communication_router
app.include_router(communication_router, prefix="/api/v1/communication", tags=["communication"])

from api.projects import router as projects_router
app.include_router(projects_router, prefix="/api/v1/projects", tags=["projects"])

# Reports router (Module 05)
from api.reports import router as reports_router
app.include_router(reports_router, prefix="/api/v1/reports", tags=["reports"])

from api.evaluations import router as evaluations_router
app.include_router(evaluations_router, prefix="/api/v1/evaluations", tags=["evaluations"])

from api.trainings import router as trainings_router
app.include_router(trainings_router, prefix="/api/v1/trainings", tags=["trainings"])

from api.career import router as career_router
app.include_router(career_router, prefix="/api/v1/career", tags=["career"])

from api.attendance import router as attendance_router
app.include_router(attendance_router, prefix="/api/v1/attendance", tags=["attendance"])

from api.notifications import router as notifications_router
app.include_router(notifications_router, prefix="/api/v1/notifications", tags=["notifications"])

from api.leave import router as leave_router
app.include_router(leave_router, prefix="/api/v1/leave", tags=["leave"])

# Documents router (Module 01)
from api.documents import router as documents_router
app.include_router(documents_router, prefix="/api/v1/documents", tags=["documents"])

from api.ia import router as ia_router
app.include_router(ia_router, prefix="/api/v1/ia", tags=["ia"])

@app.get("/")
async def root():
    return {"message": "ICES HR Platform API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8005)
