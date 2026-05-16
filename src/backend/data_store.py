"""Central data store for ICES HR Platform - In-memory database simulation"""
from datetime import datetime, date
from typing import Dict, List, Optional
from pydantic import BaseModel

# ==================== COLLABORATEUR ====================

class LeaveBalance(BaseModel):
    type: str
    total: int
    used: int
    remaining: int

class LeaveRequest(BaseModel):
    id: int
    type: str
    start: str
    end: str
    days: int
    status: str
    reason: Optional[str] = None

class Attendance(BaseModel):
    """Module 01 - Suivi de présence"""
    id: int
    employee_id: int
    date: str
    clock_in: str
    clock_out: Optional[str] = None
    location: str = "Bureau" # Bureau / Télétravail / Client

class Payslip(BaseModel):
    id: int
    month: str
    gross: float
    net: float
    date: str
    deductions: List[dict]

class Training(BaseModel):
    id: int
    title: str
    status: str
    date: str
    duration: str
    progress: int

class AvailableTraining(BaseModel):
    id: int
    title: str
    category: str
    duration: str
    deadline: str

class Skill(BaseModel):
    name: str
    level: int
    category: str

class SoftSkill(BaseModel):
    name: str
    level: int

class DevelopmentGoal(BaseModel):
    title: str
    target: str
    progress: int

class Certificate(BaseModel):
    id: int
    title: str
    issuer: str
    date: str

class Suggestion(BaseModel):
    id: int
    title: str
    category: str
    date: str
    status: str
    likes: int
    response: str

# ==================== MANAGER ====================

class TeamMember(BaseModel):
    id: int
    name: str
    role: str
    email: str
    status: str
    skills: List[str]
    performance: int

class TeamLeaveRequest(BaseModel):
    id: int
    employee: str
    type: str
    start: str
    end: str
    days: int
    status: str
    reason: str

class TeamSkillStat(BaseModel):
    skill: str
    total: int
    certified: int
    in_progress: int

class MemberSkill(BaseModel):
    name: str
    role: str
    skills: int
    certifications: int
    gaps: List[str]
    performance: int

class Project(BaseModel):
    id: int
    name: str
    progress: int
    status: str
    deadline: str
    owner: str

class KpiData(BaseModel):
    label: str
    current: float
    target: float
    unit: str

# ==================== RESP RH ====================

class Employee(BaseModel):
    id: int
    matricule: str
    first_name: str
    last_name: str
    birth_date: str
    birth_place: str
    nationality: str
    gender: str
    marital_status: Optional[str] = None
    children_count: Optional[int] = 0
    id_card_number: str
    id_card_type: str
    id_card_expiry: Optional[str] = None
    address: Optional[str] = None
    personal_phone: Optional[str] = None
    
    # Champs spécifiques Bénin / Conformité
    num_cnss: Optional[str] = None
    ifu: Optional[str] = None
    situation_fiscale: Optional[str] = "Célibataire" # Pour calcul IRPP
    visite_medicale_date: Optional[str] = None
    
    # Disciplinaire
    sanctions: List[dict] = [] # {date, type, motif, statut}
    
    personal_email: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_relation: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    
    hire_date: str
    position: str
    diploma: Optional[str] = None
    department_id: int
    manager_id: Optional[int] = None
    contract_type: str
    contract_status: str = "actif" # Actif, Suspendu, Démissionnaire, Licencié
    contract_start: str
    contract_end: Optional[str] = None
    essai_fin_date: Optional[str] = None
    status: str
    professional_email: str
    professional_phone: Optional[str] = None
    work_location: Optional[str] = None
    base_salary: float # En FCFA
    
    profile_picture_url: Optional[str] = None
    created_at: str
    updated_at: str

class Contract(BaseModel):
    id: int
    employee: str
    type: str
    start: str
    end: Optional[str] = None
    status: str
    alert: Optional[str] = None

class PDI(BaseModel):
    """Plan de Développement Individuel (Module 02/10)"""
    id: int
    employee_id: int
    objectifs: List[str]
    actions: List[dict]
    echeance: str
    statut: str # En cours, Terminé, Reporté

# ==================== ADMIN RH ====================

class SystemUser(BaseModel):
    id: int
    name: str
    email: str
    role: str
    status: str
    last_login: str

class RoleStat(BaseModel):
    role: str
    count: int
    color: str

class Permission(BaseModel):
    module: str
    roles: List[str]

class LogEntry(BaseModel):
    timestamp: str
    user: str
    action: str
    details: str

# ==================== DIRECTION ====================

class Report(BaseModel):
    id: int
    title: str
    type: str
    date: str
    size: str
    status: str

class KpiSnapshot(BaseModel):
    label: str
    value: str
    change: str

class Evaluation(BaseModel):
    id: int
    employee_id: int
    period: str
    evaluator_id: int
    competencies: List[dict]  # List of {name: str, score: int, comment: str}
    objectives: List[dict]    # List of {title: str, result: str}
    global_score: float
    general_comment: Optional[str] = None
    actions: List[dict]       # List of {task: str, responsible: int, deadline: str, status: str}
    employee_signed: bool = False
    rh_signed: bool = False
    status: str               # Draft / In Progress / Validated / Archived

class CareerGoal(BaseModel):
    id: int
    employee_id: int
    short_term: str
    medium_term: str
    target_position: str
    required_skills: List[str]
    actions: List[dict]
    progress: int

class Survey(BaseModel):
    id: int
    title: str
    description: str
    questions: List[dict]
    target_audience: str
    is_anonymous: bool
    opening_date: str
    closing_date: str
    status: str

class Note(BaseModel):
    id: int
    title: str
    type: str  # Note interne / Circulaire / Communiqué / Document légal
    content: str
    attachments: List[str] = []
    target_audience: str  # Tous / Département / Profil / Individu
    publish_date: str
    is_immediate: bool
    requires_acknowledgment: bool
    is_pinned: bool
    status: str  # Brouillon / Publiée / Archivée

class InternalEvent(BaseModel):
    id: int
    title: str
    type: str  # Formation / Réunion / Anniversaire / Séminaire / Team Building / Fête
    date_time: str
    location: str
    participants: str
    description: str
    auto_reminder: bool

class Project(BaseModel):
    id: int
    name: str
    description: str = ""
    category: str = "Interne" # Interne / Client
    project_manager_id: int = 0
    team_ids: List[int] = []
    start_date: str = ""
    end_date_scheduled: str = ""
    priority: str = "Normale"
    status: str
    progress: int
    budget: float = 0.0
    attachments: List[str] = []
    deadline: str = "" # Legacy
    owner: str = "" # Legacy

class Task(BaseModel):
    id: int
    project_id: int
    title: str
    responsible_id: int
    deadline: str
    priority: str
    status: str  # À faire / En cours / Terminé / Bloqué
    dependencies: List[int] = []
    comments: List[str] = []
    is_milestone: bool = False

class Training(BaseModel):
    id: int
    title: str
    competency_id: Optional[int] = None
    type: str = "Interne" # Interne / Externe / En ligne / Self-study / Mentorat
    objectives: str = ""
    period_start: str = ""
    period_end: str = ""
    duration_hours: int = 0
    location: str = ""
    trainer_name: str = ""
    budget_planned: float = 0.0
    participant_ids: List[int] = []
    status: str
    progress: int = 0
    date: str = "" # Legacy support
    duration: str = "" # Legacy support

class Feedback(BaseModel):
    id: int
    employee_id: Optional[int] = None # None if anonymous
    tracking_number: str              # Numéro unique pour Module 06
    type: str                         # Suggestion / Doléance / Plainte / Alerte
    title: str
    description: str
    category: str
    priority: str
    status: str
    response: Optional[str] = None
    created_at: str

class Vehicle(BaseModel):
    """Module 12 - Gestion du parc automobile"""
    id: int
    brand: str
    model: str
    plate: str
    status: str # Disponible / En maintenance / Attribué
    assigned_to: Optional[int] = None
    assignment_history: List[dict] = [] # [{employee_id, date_start, date_end}]
    next_maintenance: str

class Badge(BaseModel):
    """Module 12 - Gestion des accès"""
    id: int
    employee_id: int
    uid: str
    status: str # Actif / Perdu / Désactivé

# ==================== DONNÉES ====================

# Solde congés collaborateur
collab_leave_balance = [
    LeaveBalance(type="Congés payés", total=25, used=12, remaining=13),
    LeaveBalance(type="RTT", total=12, used=5, remaining=7),
    LeaveBalance(type="Maladie", total=10, used=2, remaining=8),
]

# Suivi présence (Module 01)
attendance_logs = [
    Attendance(id=1, employee_id=5, date="15/05/2024", clock_in="07:55", clock_out="17:30", location="Bureau"),
    Attendance(id=2, employee_id=5, date="16/05/2024", clock_in="08:05", clock_out=None, location="Télétravail"),
]

# Demandes de congés collaborateur
collab_leave_requests = [
    LeaveRequest(id=1, type="Congés payés", start="10/06/2024", end="14/06/2024", days=5, status="approved"),
    LeaveRequest(id=2, type="RTT", start="20/05/2024", end="20/05/2024", days=1, status="approved"),
    LeaveRequest(id=3, type="Maladie", start="02/05/2024", end="03/05/2024", days=2, status="approved"),
    LeaveRequest(id=4, type="Congés payés", start="15/07/2024", end="26/07/2024", days=10, status="pending"),
]

# Fiches de paie collaborateur
collab_payslips = [
    Payslip(id=1, month="Mai 2024", gross=850000, net=680000, date="31/05/2024", deductions=[
        {"label": "CNSS", "amount": 42500, "percent": 5},
        {"label": "AMO", "amount": 25500, "percent": 3},
        {"label": "IRPP", "amount": 127500, "percent": 15},
        {"label": "Retenues diverses", "amount": 8500, "percent": 1},
    ]),
    Payslip(id=2, month="Avril 2024", gross=850000, net=680000, date="30/04/2024", deductions=[]),
    Payslip(id=3, month="Mars 2024", gross=850000, net=675000, date="31/03/2024", deductions=[]),
    Payslip(id=4, month="Février 2024", gross=850000, net=675000, date="29/02/2024", deductions=[]),
]

# Formations collaborateur
collab_trainings = [
    Training(id=1, title="Sécurité informatique — Niveau 1", status="completed", date="15/03/2024", duration="8h", progress=100),
    Training(id=2, title="Leadership & Management", status="in_progress", date="10/06/2024", duration="16h", progress=65),
    Training(id=3, title="Anglais professionnel — B2", status="in_progress", date="En cours", duration="24h", progress=40),
]

collab_available_trainings = [
    AvailableTraining(id=4, title="AWS Certified Solutions Architect", category="Cloud", duration="40h", deadline="30/09/2024"),
    AvailableTraining(id=5, title="Scrum Master Certification", category="Agile", duration="16h", deadline="15/08/2024"),
    AvailableTraining(id=6, title="Communication interculturelle", category="Soft Skills", duration="8h", deadline="30/06/2024"),
]

# Compétences collaborateur
collab_technical_skills = [
    Skill(name="React / Next.js", level=90, category="Frontend"),
    Skill(name="TypeScript", level=85, category="Langage"),
    Skill(name="Node.js", level=80, category="Backend"),
    Skill(name="Python / FastAPI", level=75, category="Backend"),
    Skill(name="PostgreSQL", level=70, category="Base de données"),
    Skill(name="Docker", level=65, category="DevOps"),
    Skill(name="AWS", level=60, category="Cloud"),
]

collab_soft_skills = [
    SoftSkill(name="Communication", level=85),
    SoftSkill(name="Travail d'équipe", level=90),
    SoftSkill(name="Résolution de problèmes", level=88),
    SoftSkill(name="Adaptabilité", level=82),
    SoftSkill(name="Leadership", level=70),
]

collab_goals = [
    DevelopmentGoal(title="AWS Solutions Architect", target="Q3 2024", progress=45),
    DevelopmentGoal(title="Anglais C1", target="Q4 2024", progress=60),
    DevelopmentGoal(title="Management d'équipe", target="2025", progress=30),
]

collab_certificates = [
    Certificate(id=1, title="React Advanced Patterns", issuer="ICES Academy", date="20/01/2024"),
    Certificate(id=2, title="Sécurité informatique N1", issuer="Cybersafe", date="15/03/2024"),
    Certificate(id=3, title="Docker & Kubernetes", issuer="CloudNative", date="10/11/2023"),
]

# Suggestions collaborateur
collab_suggestions = [
    Suggestion(id=1, title="Ajouter des casiers pour les vélos", category="work_env", date="15/05/2024", status="reviewed", likes=12, response="En cours d'étude pour juillet 2024"),
    Suggestion(id=2, title="Horaires flexibles le vendredi", category="process", date="02/04/2024", status="implemented", likes=28, response="Implémenté depuis mai 2024"),
    Suggestion(id=3, title="Fruits frais dans les cuisines", category="wellness", date="10/03/2024", status="reviewed", likes=18, response="Budget validé, démarrage juin"),
]

# ==================== MANAGER ====================

manager_team = [
    TeamMember(id=1, name="Marie Laurent", role="Développeuse", email="marie@ices.bj", status="active", skills=["React", "Node.js"], performance=92),
    TeamMember(id=2, name="Paul Martin", role="Designer UX", email="paul@ices.bj", status="active", skills=["Figma", "UI/UX"], performance=88),
    TeamMember(id=3, name="Sophie Bernard", role="QA Engineer", email="sophie@ices.bj", status="on_leave", skills=["Selenium", "Cypress"], performance=85),
    TeamMember(id=4, name="Lucas Petit", role="DevOps", email="lucas@ices.bj", status="active", skills=["Docker", "AWS"], performance=90),
    TeamMember(id=5, name="Emma Richard", role="Junior Dev", email="emma@ices.bj", status="active", skills=["JavaScript", "Python"], performance=78),
    TeamMember(id=6, name="Thomas Moreau", role="Backend Dev", email="thomas@ices.bj", status="active", skills=["Python", "PostgreSQL"], performance=94),
    TeamMember(id=7, name="Julie Dubois", role="Product Owner", email="julie@ices.bj", status="active", skills=["Agile", "Scrum"], performance=91),
    TeamMember(id=8, name="Nicolas Leroy", role="Data Analyst", email="nicolas@ices.bj", status="on_leave", skills=["SQL", "Python"], performance=87),
]

manager_leave_requests = [
    TeamLeaveRequest(id=1, employee="Sophie Bernard", type="Congés payés", start="15/06/2024", end="28/06/2024", days=10, status="pending", reason="Vacances famille"),
    TeamLeaveRequest(id=2, employee="Nicolas Leroy", type="RTT", start="20/05/2024", end="20/05/2024", days=1, status="approved", reason="Démarches admin."),
    TeamLeaveRequest(id=3, employee="Marie Laurent", type="Congés payés", start="01/07/2024", end="05/07/2024", days=5, status="pending", reason="Mariage"),
]

manager_team_skills = [
    TeamSkillStat(skill="React", total=8, certified=6, in_progress=2),
    TeamSkillStat(skill="TypeScript", total=8, certified=5, in_progress=3),
    TeamSkillStat(skill="Node.js", total=8, certified=4, in_progress=2),
    TeamSkillStat(skill="Python", total=8, certified=5, in_progress=1),
    TeamSkillStat(skill="Docker", total=8, certified=3, in_progress=3),
    TeamSkillStat(skill="AWS", total=8, certified=2, in_progress=4),
]

manager_member_skills = [
    MemberSkill(name="Marie Laurent", role="Développeuse", skills=12, certifications=5, gaps=["AWS", "DevOps"], performance=92),
    MemberSkill(name="Paul Martin", role="Designer UX", skills=8, certifications=3, gaps=["React", "TypeScript"], performance=88),
    MemberSkill(name="Lucas Petit", role="DevOps", skills=10, certifications=4, gaps=["Python"], performance=90),
    MemberSkill(name="Emma Richard", role="Junior Dev", skills=6, certifications=1, gaps=["React", "Node.js", "AWS"], performance=78),
    MemberSkill(name="Thomas Moreau", role="Backend Dev", skills=14, certifications=6, gaps=[], performance=94),
]

manager_projects = [
    Project(id=1, name="Migration AWS", progress=75, status="on_track", deadline="30/06/2024", owner="Lucas Petit"),
    Project(id=2, name="Refonte UI", progress=45, status="at_risk", deadline="15/07/2024", owner="Paul Martin"),
    Project(id=3, name="API v2", progress=90, status="on_track", deadline="20/05/2024", owner="Thomas Moreau"),
    Project(id=4, name="CI/CD Pipeline", progress=60, status="on_track", deadline="30/05/2024", owner="Lucas Petit"),
]

manager_kpis = [
    KpiData(label="Sprint velocity", current=42, target=45, unit="points"),
    KpiData(label="Taux de complétion", current=88, target=90, unit="%"),
    KpiData(label="Bugs résolus", current=24, target=20, unit=""),
    KpiData(label="Code review time", current=4, target=6, unit="h"),
]

# ==================== RESP RH ====================

rh_employees: List[Employee] = []

rh_contracts: List[Contract] = []

# ==================== ADMIN RH ====================

admin_users = [
    SystemUser(id=1, name="Admin Principal", email="admin@ices.bj", role="admin_rh", status="active", last_login="Aujourd'hui"),
    SystemUser(id=2, name="Marie Laurent", email="marie@ices.bj", role="collaborateur", status="active", last_login="Aujourd'hui"),
    SystemUser(id=3, name="Jean Dupont", email="jean@ices.bj", role="manager", status="active", last_login="Hier"),
    SystemUser(id=4, name="Sophie Bernard", email="sophie@ices.bj", role="resp_rh", status="active", last_login="Il y a 2 jours"),
    SystemUser(id=5, name="Pierre Martin", email="pierre@ices.bj", role="direction", status="active", last_login="Il y a 3 jours"),
    SystemUser(id=6, name="Ancien Collab", email="ancien@ices.bj", role="collaborateur", status="inactive", last_login="Il y a 45 jours"),
]

admin_roles = [
    RoleStat(role="direction", count=8, color="bg-purple-100 text-purple-800"),
    RoleStat(role="admin_rh", count=15, color="bg-blue-100 text-blue-800"),
    RoleStat(role="resp_rh", count=12, color="bg-green-100 text-green-800"),
    RoleStat(role="manager", count=25, color="bg-orange-100 text-orange-800"),
    RoleStat(role="collaborateur", count=364, color="bg-gray-100 text-gray-800"),
]

admin_permissions = [
    Permission(module="Dossiers personnel", roles=["admin_rh", "resp_rh", "manager"]),
    Permission(module="Contrats", roles=["admin_rh", "resp_rh"]),
    Permission(module="Congés", roles=["admin_rh", "resp_rh", "manager", "collaborateur"]),
    Permission(module="Fiches de paie", roles=["admin_rh", "resp_rh", "collaborateur"]),
    Permission(module="Admin système", roles=["admin_rh"]),
]

admin_logs = [
    LogEntry(timestamp="2024-05-07T14:30:00", user="Admin Principal", action="CREATE_USER", details="Création compte: emma@ices.bj"),
    LogEntry(timestamp="2024-05-07T12:15:00", user="Jean Dupont", action="APPROVE_LEAVE", details="Validation congé: Marie Laurent"),
    LogEntry(timestamp="2024-05-07T08:00:00", user="Système", action="BACKUP", details="Backup quotidien effectué"),
    LogEntry(timestamp="2024-05-06T16:45:00", user="Sophie Bernard", action="UPDATE_CONTRACT", details="Renouvellement CDD: Lucas Petit"),
]

# ==================== DIRECTION ====================

direction_reports = [
    Report(id=1, title="Bilan social 2023", type="Annuel", date="15/01/2024", size="2.4 MB", status="available"),
    Report(id=2, title="Rapport formations T1 2024", type="Trimestriel", date="05/04/2024", size="1.8 MB", status="available"),
    Report(id=3, title="Enquête satisfaction 2024", type="Annuel", date="20/03/2024", size="3.1 MB", status="available"),
    Report(id=4, title="États légaux — DSN", type="Mensuel", date="05/05/2024", size="890 KB", status="available"),
    Report(id=5, title="Analyse turnover", type="Trimestriel", date="01/04/2024", size="1.2 MB", status="available"),
]

direction_kpis = [
    KpiSnapshot(label="Masse salariale annuelle", value="4.2M €", change="+8% vs 2023"),
    KpiSnapshot(label="Coût moyen / collaborateur", value="9 905 €", change="annuel"),
    KpiSnapshot(label="Budget formation", value="180K €", change="65% utilisé"),
]

class Meeting(BaseModel):
    id: int
    date: str
    instance_type: str  # Délégués du personnel / Comité de direction / Autre
    participants: List[int]
    agenda: str
    report_url: Optional[str] = None
    decisions: List[str]
    follow_up: List[dict]  # {decision: str, responsible: int, deadline: str, status: str}
    status: str

notes = []
events = []
projects = []
tasks = []
trainings = []
meetings = []
collaborator_of_the_month = None

vehicles = [
    Vehicle(id=1, brand="Toyota", model="Hilux", plate="BJ-1234-AB", status="Disponible", next_maintenance="15/12/2024")
]
badges = []

# Doléances et Remontées (Module 06)
all_feedbacks = [
    Feedback(
        id=1, 
        employee_id=1, 
        tracking_number="DOL-2024-001", 
        type="Doléance", 
        title="Climatisation bureau 204", 
        description="La climatisation fait un bruit anormal et ne refroidit plus.",
        category="Environnement",
        priority="Moyenne",
        status="En cours",
        created_at="2024-05-10T10:00:00"
    )
]

# Initialize some mock data for the new modules
notes.append(Note(
    id=1,
    title="Mise à jour de la politique de télétravail",
    type="Note interne",
    content="Nous sommes heureux d'annoncer une flexibilité accrue...",
    target_audience="Tous",
    publish_date="2024-05-01T09:00:00",
    is_immediate=True,
    requires_acknowledgment=True,
    is_pinned=True,
    status="Publiée"
))

events.append(InternalEvent(
    id=1,
    title="Team Building - Sortie Annuelle",
    type="Team Building",
    date_time="2024-06-15T09:00:00",
    location="Plage de Fidjrossè",
    participants="Tous",
    description="Journée de détente et de renforcement d'équipe.",
    auto_reminder=True
))

projects.append(Project(
    id=1,
    name="Déploiement ICES HR",
    description="Migration de tous les processus RH vers la plateforme ICES.",
    category="Interne",
    project_manager_id=1,
    team_ids=[1, 5],
    start_date="2024-04-01",
    end_date_scheduled="2024-07-01",
    priority="Haute",
    status="En cours",
    progress=45
))

tasks.append(Task(
    id=1,
    project_id=1,
    title="Configuration du module Admin",
    responsible_id=1,
    deadline="2024-05-15",
    priority="Haute",
    status="Terminé"
))
