from pydantic import BaseModel
from typing import List, Optional
from datetime import date

# --- Manager Dashboard Schemas ---
class ManagerKPIs(BaseModel):
    nb_collaborateurs: int
    conges_a_valider: int
    taux_presence: float

class PendingAction(BaseModel):
    id: int
    type_conge: str
    collaborateur: str
    date_debut: str
    date_fin: str
    nb_jours: int
    soumis_il_y_a: str

class ManagerDashboardResponse(BaseModel):
    kpis: ManagerKPIs
    actions_en_attente: List[PendingAction]

# --- Collaborateur Dashboard Schemas ---
class CollaborateurKPIs(BaseModel):
    conges_restants: int
    formations_planifiees: int
    demandes_en_cours: int

class SoldeConges(BaseModel):
    total: int
    pris: int
    restants: int

class Notification(BaseModel):
    type: str
    message: str
    date: str
    lu: bool = False

class ProchaineFormation(BaseModel):
    titre: str
    date_debut: str
    statut: str

class ActualiteRH(BaseModel):
    titre: str
    resume: str
    date: str

class CollaborateurDashboardResponse(BaseModel):
    kpis: CollaborateurKPIs
    solde_conges: SoldeConges
    notifications: List[Notification]
    prochaine_formation: Optional[ProchaineFormation] = None
    actualites_rh: List[ActualiteRH] = []
    # Ajoute d'autres champs si nécessaire selon le frontend