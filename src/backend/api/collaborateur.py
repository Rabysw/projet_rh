from fastapi import APIRouter, Depends
from auth.auth import get_current_user, User
from data_store import (
    collab_leave_balance,
    collab_leave_requests,
    collab_payslips,
    collab_trainings,
    collab_available_trainings,
    collab_technical_skills,
    collab_soft_skills,
    collab_goals,
    collab_certificates,
    collab_suggestions,
    manager_leave_requests,
    LeaveRequest,
    TeamLeaveRequest,
)

router = APIRouter()

@router.get("/profile")
async def get_profile(current_user: User = Depends(get_current_user)):
    from data_store import rh_employees
    emp = next((e for e in rh_employees if e.id == current_user.id), None)
    return {
        "user": {"full_name": current_user.full_name, "email": current_user.email},
        "department": emp.department if emp else "Tech",
        "position": emp.role if emp else "Développeur",
        "manager": "Sophie Martin",
        "hire_date": emp.hired if emp else "15/03/2022",
        "contract_type": emp.contract if emp else "CDI",
        "phone": emp.personal_phone if emp else "+229 97 00 00 00",
        "address": emp.address if emp else "Cotonou, Bénin",
        "birth_date": "12/06/1990",
        "matricule": emp.matricule if emp else "EMP-001",
        "cnss": "1234567890",
        "ifu": "1202012345678",
        "situation_matrimoniale": "Marié(e)",
        "enfants": 2
    }

@router.get("/leave-balance")
async def get_leave_balance(current_user: User = Depends(get_current_user)):
    return collab_leave_balance

@router.get("/leave-requests")
async def get_leave_requests(current_user: User = Depends(get_current_user)):
    return collab_leave_requests

@router.get("/payslips")
async def get_payslips(current_user: User = Depends(get_current_user)):
    return collab_payslips

@router.get("/trainings")
async def get_trainings(current_user: User = Depends(get_current_user)):
    return collab_trainings

@router.get("/available-trainings")
async def get_available_trainings(current_user: User = Depends(get_current_user)):
    return collab_available_trainings

@router.get("/certificates")
async def get_certificates(current_user: User = Depends(get_current_user)):
    return collab_certificates

@router.get("/skills/technical")
async def get_technical_skills(current_user: User = Depends(get_current_user)):
    return collab_technical_skills

@router.get("/skills/soft")
async def get_soft_skills(current_user: User = Depends(get_current_user)):
    return collab_soft_skills

@router.get("/goals")
async def get_development_goals(current_user: User = Depends(get_current_user)):
    return collab_goals

@router.get("/suggestions")
async def get_suggestions(current_user: User = Depends(get_current_user)):
    return collab_suggestions

@router.post("/suggestions")
async def create_suggestion(suggestion: dict, current_user: User = Depends(get_current_user)):
    from data_store import Suggestion
    from datetime import datetime
    new_id = len(collab_suggestions) + 1
    new_sug = Suggestion(
        id=new_id,
        title=suggestion.get("title", "Sans titre"),
        category=suggestion.get("category", "Général"),
        date=datetime.now().strftime("%d/%m/%Y"),
        status="Soumis",
        likes=0,
        response=""
    )
    collab_suggestions.insert(0, new_sug)
    return new_sug

@router.patch("/profile")
async def update_profile(profile_data: dict, current_user: User = Depends(get_current_user)):
    # In a real app, update DB. 
    # For mock, we update the rh_employees list if found
    from data_store import rh_employees
    employee = next((e for e in rh_employees if e.id == current_user.id), None)
    if employee:
        if "phone" in profile_data:
            employee.personal_phone = profile_data["phone"]
        if "address" in profile_data:
            employee.address = profile_data["address"]
    return {"message": "Profil mis à jour avec succès"}

@router.put("/goals/{goal_id}")
async def update_goal(goal_id: int, goal_data: dict, current_user: User = Depends(get_current_user)):
    # Update progress of a goal
    for goal in collab_goals:
        if id(goal) == goal_id: # Simulating search by ID
            goal.progress = goal_data.get("progress", goal.progress)
            return goal
    return {"message": "Objectif mis à jour"}

@router.post("/trainings/inscription")
async def register_training(training_data: dict, current_user: User = Depends(get_current_user)):
    from data_store import Training
    from datetime import datetime
    tid = training_data.get("id")
    # Move from available to active
    training = next((t for t in collab_available_trainings if t.id == tid), None)
    if training:
        new_active = Training(
            id=training.id,
            title=training.title,
            status="Inscrit",
            date=datetime.now().strftime("%d/%m/%Y"),
            duration=training.duration,
            progress=0
        )
        collab_trainings.insert(0, new_active)
        # Remove from available (mock)
        return new_active
    return {"message": "Inscription réussie"}

@router.get("/notifications")
async def get_notifications(current_user: User = Depends(get_current_user)):
    # 3. Notifications (Générées depuis les statuts)
    notifications = []
    for req in collab_leave_requests:
        if req.status == 'approved':
            notifications.append({
                "type": "Validation",
                "message": f"Votre demande de {req.type} a été approuvée.",
                "date": "Aujourd'hui",
                "lu": False
            })
        elif req.status == 'rejected':
            notifications.append({
                "type": "Refus",
                "message": f"Votre demande de {req.type} a été refusée.",
                "date": "Aujourd'hui",
                "lu": False
            })
    return notifications

@router.post("/leave-requests")
async def create_leave_request(request: dict, current_user: User = Depends(get_current_user)):
    # In a real app, we would use a Pydantic model and save to DB
    new_id = len(collab_leave_requests) + 100 # Offset to avoid conflict with mock data
    
    # 1. Update collaborator's personal list
    new_request = LeaveRequest(
        id=new_id,
        type=request.get("type"),
        start=request.get("start"),
        end=request.get("end"),
        days=request.get("days"),
        status="pending",
        reason=request.get("reason", "")
    )
    collab_leave_requests.insert(0, new_request)
    
    # 2. ALSO update the manager's team leave request list
    manager_request = TeamLeaveRequest(
        id=new_id,
        employee=current_user.full_name,
        type=request.get("type"),
        start=request.get("start"),
        end=request.get("end"),
        days=request.get("days"),
        status="pending",
        reason=request.get("reason", "Aucun motif fourni")
    )
    manager_leave_requests.insert(0, manager_request)
    
    return new_request
