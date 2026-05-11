from fastapi import APIRouter, Depends
from typing import List, Dict, Any

from auth.auth import get_current_user, User, UserRole

router = APIRouter()

# ICES Platform role permissions configuration
ROLE_PERMISSIONS = {
    UserRole.COLLABORATEUR: {
        "modules": [
            "Module 01 Administration du Personnel",
            "Module 02 Compétences & Évaluation",
            "Module 03 Congés & Absences",
            "Module 04 Plan de Carrière",
            "Module 06 Enquêtes de Satisfaction & Remontées",
            "Module 07 Communication Interne",
            "Module 10 Formation & Développement",
            "Module 11 App Collaborateur PWA"
        ],
        "rights": ["read_own", "write_own"],
        "dashboard_type": "collaborateur"
    },
    UserRole.MANAGER: {
        "modules": [
            "Module 01 Administration du Personnel",
            "Module 02 Compétences & Évaluation",
            "Module 03 Congés & Absences",
            "Module 08 Suivi de la Productivité",
            "Module 09 Gestion de Projets & Plans d'Actions",
            "Module 10 Formation & Développement"
        ],
        "rights": ["read_team", "write_team", "read_own", "write_own"],
        "dashboard_type": "manager"
    },
    UserRole.RESP_RH: {
        "modules": [
            "Module 01 Administration du Personnel",
            "Module 02 Compétences & Évaluation",
            "Module 03 Congés & Absences",
            "Module 04 Plan de Carrière",
            "Module 05 Reporting & Analytics",
            "Module 06 Enquêtes de Satisfaction & Remontées",
            "Module 07 Communication Interne",
            "Module 08 Suivi de la Productivité",
            "Module 09 Gestion de Projets & Plans d'Actions",
            "Module 10 Formation & Développement",
            "Module 12 Modules Additionnels"
        ],
        "rights": ["read_all", "write_all"],
        "dashboard_type": "resp_rh"
    },
    UserRole.ADMIN_RH: {
        "modules": [
            "all_modules",  # Accès à tous les modules
            "gestion_utilisateurs_roles",
            "securite_acces",
            "configuration_plateforme",
            "logs_audit",
            "chatbot_rh",  # Phase 2 IA
            "generation_documents",
            "prediction_turnover",
            "matching_competences"
        ],
        "rights": ["read_all", "write_all", "configure_system", "manage_users"],
        "dashboard_type": "admin_rh"
    },
    UserRole.DIRECTION: {
        "modules": [
            "vue_strategique",
            "kpis_rh_temps_reel",
            "effectifs_turnover",
            "absenteisme", 
            "masse_salariale",
            "bilan_social",
            "rapport_formations",
            "satisfaction_collaborateurs",
            "etats_legaux",
            "exports"
        ],
        "rights": ["read_all"],  # Lecture seule
        "dashboard_type": "direction"
    }
}

@router.get("/permissions")
async def get_role_permissions(current_user: User = Depends(get_current_user)):
    """Get permissions for current user's role"""
    role = current_user.role
    permissions = ROLE_PERMISSIONS.get(role, {})
    
    return {
        "role": role,
        "modules": permissions.get("modules", []),
        "rights": permissions.get("rights", []),
        "dashboard_type": permissions.get("dashboard_type", "collaborateur")
    }

@router.get("/dashboard-config")
async def get_dashboard_config(current_user: User = Depends(get_current_user)):
    """Get dashboard configuration based on user role"""
    role = current_user.role
    
    if role == UserRole.COLLABORATEUR:
        return {
            "sidebar_items": [
                {"id": "dashboard", "label": "Tableau de bord", "icon": "home"},
                {"id": "dossier_personnel", "label": "Mon dossier personnel", "icon": "user"},
                {"id": "conges_absences", "label": "Mes congés & absences", "icon": "calendar"},
                {"id": "fiches_paie", "label": "Mes fiches de paie", "icon": "file-text"},
                {"id": "plan_carriere", "label": "Mon plan de carrière", "icon": "trending-up"},
                {"id": "formations", "label": "Mes formations", "icon": "book"},
                {"id": "suggestions", "label": "Boîte à suggestions", "icon": "message-square"},
                {"id": "communication_rh", "label": "Communication RH", "icon": "bell"},
                {"id": "parametres", "label": "Paramètres du compte", "icon": "settings"}
            ],
            "widgets": [
                {"id": "notifications", "title": "Notifications récentes"},
                {"id": "solde_conges", "title": "Solde de congés"},
                {"id": "prochaine_formation", "title": "Prochaine formation"},
                {"id": "plan_carriere", "title": "Mon plan de carrière"},
                {"id": "derniere_fiche_paie", "title": "Dernière fiche de paie"},
                {"id": "actualites_rh", "title": "Actualités RH"}
            ]
        }
    
    elif role == UserRole.MANAGER:
        return {
            "sidebar_items": [
                {"id": "dashboard_equipe", "label": "Tableau de bord équipe", "icon": "users"},
                {"id": "equipe", "label": "Mon équipe", "icon": "users"},
                {"id": "conges_equipe", "label": "Congés & absences (équipe)", "icon": "calendar"},
                {"id": "competences_equipe", "label": "Compétences équipe", "icon": "award"},
                {"id": "productivite", "label": "Productivité", "icon": "bar-chart"},
                {"id": "projets", "label": "Projets", "icon": "briefcase"},
                {"id": "separator", "label": "Mon espace", "type": "separator"},
                {"id": "dossier_personnel", "label": "Mon dossier", "icon": "user"},
                {"id": "conges_absences", "label": "Mes congés", "icon": "calendar"}
            ],
            "kpis": [
                {"id": "collaborateurs_equipe", "title": "Collaborateurs dans l'équipe", "value": 8},
                {"id": "conges_valider", "title": "Congés à valider", "value": 3},
                {"id": "taux_presence", "title": "Taux de présence", "value": "94%"}
            ],
            "widgets": [
                {"id": "actions_attente", "title": "Actions en attente"},
                {"id": "calendrier_equipe", "title": "Calendrier équipe"},
                {"id": "evaluations_retard", "title": "Évaluations en retard"},
                {"id": "competences_completer", "title": "Compétences à compléter"},
                {"id": "projets_cours", "title": "Projets en cours"},
                {"id": "alertes_productivite", "title": "Alertes productivité"}
            ]
        }
    
    elif role == UserRole.RESP_RH:
        return {
            "sidebar_items": [
                {"id": "dashboard_rh", "label": "Tableau de bord RH", "icon": "pie-chart"},
                {"id": "separator_admin", "label": "Administration", "type": "separator"},
                {"id": "dossiers_personnel", "label": "Dossiers du personnel", "icon": "users"},
                {"id": "contrats_avenants", "label": "Contrats & avenants", "icon": "file-text"},
                {"id": "presence_horaires", "label": "Présence & horaires", "icon": "clock"},
                {"id": "conges_absences", "label": "Congés & absences", "icon": "calendar"},
                {"id": "separator_competences", "label": "Compétences", "type": "separator"},
                {"id": "referentiel_metiers", "label": "Référentiel métiers", "icon": "briefcase"},
                {"id": "evaluations", "label": "Évaluations", "icon": "check-square"},
                {"id": "plans_carriere", "label": "Plans de carrière", "icon": "trending-up"},
                {"id": "separator_formation", "label": "Formation", "type": "separator"},
                {"id": "formation_developpement", "label": "Formation & développement", "icon": "book"},
                {"id": "separator_engagement", "label": "Engagement", "type": "separator"},
                {"id": "enquetes_satisfaction", "label": "Enquêtes satisfaction", "icon": "smile"},
                {"id": "suggestions_recues", "label": "Suggestions reçues", "icon": "message-square"},
                {"id": "communication_rh", "label": "Communication RH", "icon": "bell"}
            ],
            "kpis": [
                {"id": "collaborateurs_actifs", "title": "Collaborateurs actifs", "value": 42},
                {"id": "contrats_renouveler", "title": "Contrats à renouveler", "value": 5},
                {"id": "alertes_medicales", "title": "Alertes médicales", "value": 3},
                {"id": "formations_mois", "title": "Formations ce mois", "value": 7},
                {"id": "enquetes_cours", "title": "Enquêtes en cours", "value": 2},
                {"id": "suggestions_attente", "title": "Suggestions en attente", "value": 4}
            ]
        }
    
    elif role == UserRole.ADMIN_RH:
        return {
            "sidebar_items": [
                {"id": "dashboard_global", "label": "Tableau de bord global", "icon": "globe"},
                {"id": "separator_modules", "label": "Tous les modules", "type": "separator"},
                # Inclut tous les éléments du Resp. RH
                {"id": "separator_system", "label": "Administration système", "type": "separator"},
                {"id": "gestion_utilisateurs_roles", "label": "Gestion des utilisateurs & rôles", "icon": "user-cog"},
                {"id": "securite_acces", "label": "Sécurité & accès", "icon": "shield"},
                {"id": "configuration_plateforme", "label": "Configuration de la plateforme", "icon": "settings"},
                {"id": "logs_audit", "label": "Logs d'audit", "icon": "file-text"},
                {"id": "separator_ia", "label": "IA (Phase 2)", "type": "separator"},
                {"id": "chatbot_rh", "label": "Chatbot RH", "icon": "bot"},
                {"id": "generation_documents", "label": "Génération de documents", "icon": "file-plus"},
                {"id": "prediction_turnover", "label": "Prédiction turnover", "icon": "trending-down"},
                {"id": "matching_competences", "label": "Matching compétences", "icon": "target"}
            ],
            "kpis": [
                {"id": "total_collaborateurs", "title": "Total collaborateurs", "value": 423},
                {"id": "utilisateurs_actifs", "title": "Utilisateurs actifs", "value": 85},
                {"id": "roles_configures", "title": "Rôles configurés", "value": 5}
            ]
        }
    
    elif role == UserRole.DIRECTION:
        return {
            "sidebar_items": [
                {"id": "vue_strategique", "label": "Vue d'ensemble stratégique", "icon": "eye"},
                {"id": "separator_analytics", "label": "Analytics", "type": "separator"},
                {"id": "kpis_rh_temps_reel", "label": "KPIs RH temps réel", "icon": "activity"},
                {"id": "effectifs_turnover", "label": "Effectifs & turnover", "icon": "users"},
                {"id": "absenteisme", "label": "Absentéisme", "icon": "calendar-x"},
                {"id": "masse_salariale", "label": "Masse salariale", "icon": "dollar-sign"},
                {"id": "separator_rapports", "label": "Rapports", "type": "separator"},
                {"id": "bilan_social", "label": "Bilan social", "icon": "file-text"},
                {"id": "rapport_formations", "label": "Rapport formations", "icon": "book"},
                {"id": "satisfaction_collaborateurs", "label": "Satisfaction collaborateurs", "icon": "smile"},
                {"id": "etats_legaux", "label": "États légaux", "icon": "gavel"},
                {"id": "separator_exports", "label": "Exports", "type": "separator"},
                {"id": "telecharger_rapport", "label": "Télécharger un rapport", "icon": "download"}
            ],
            "kpis": [
                {"id": "effectif_total", "title": "Effectif total actif", "value": 424},
                {"id": "taux_turnover", "title": "Taux de turnover", "value": "2,4%"},
                {"id": "taux_presence_moyen", "title": "Taux de présence moyen", "value": "97%"},
                {"id": "formations_realisees_planifiees", "title": "Formations réalisées / planifiées", "value": "18/22"},
                {"id": "score_satisfaction_moyen", "title": "Score satisfaction moyen", "value": "3,8/5"},
                {"id": "suggestions_traitees", "title": "Suggestions traitées", "value": "85%"}
            ]
        }
    
    return {"error": "Role not configured"}
