# ICES HR Platform - Analyse Complète & Plan d'Implémentation

## Date d'analyse: 10 Mai 2026

---

## 1. STACK TECHNIQUE IDENTIFIÉ

### Backend
- **Framework**: FastAPI (Python 3.12)
- **Modèles**: Pydantic v2
- **Auth**: JWT-like token-based (à remplacer par vrai JWT en production)
- **Base de données**: 
  - In-memory (data_store.py) pour le développement
  - Supabase PostgreSQL configuré pour production
- **Dépendances**: psycopg2-binary, supabase-python

### Frontend
- **Framework**: React 18 + TypeScript
- **Router**: TanStack Router (@tanstack/react-router)
- **UI**: Tailwind CSS + shadcn/ui components
- **State**: React hooks (useApi custom hook)
- **Build**: Vite
- **Package Manager**: pnpm

### Structure des dossiers
```
src/
├── backend/
│   ├── api/              # Routes API (FastAPI routers)
│   ├── models/           # Pydantic models
│   ├── services/         # Business logic
│   ├── auth/             # Authentication
│   ├── data_store.py     # In-memory database + models
│   └── main.py           # Application entry point
└── frontend/
    └── src/
        ├── pages/         # Route components
        ├── components/    # UI components
        └── hooks/         # Custom hooks (useApi)
```

---

## 2. RÔLES UTILISATEURS (RBAC)

| Rôle | Email | Permissions |
|------|-------|-------------|
| Collaborateur | collab@ices.bj | Module 03 (Congés), Module 11 (PWA) |
| Manager | manager@ices.bj | Module 08 (Productivité), Module 09 (Projets), validation congés équipe |
| Resp. RH | rh@ices.bj | Module 01 (Admin Personnel), Module 02 (Compétences), Module 04 (Carrière) |
| Admin RH | admin@ices.bj | Module 05 (Reporting), Module 06 (Enquêtes), configuration système |
| Direction | dir@ices.bj | Module 05 (KPIs stratégiques), tous les rapports |

---

## 3. ÉTAT ACTUEL DES 12 MODULES

### ✅ MODULE 01 - Administration du Personnel
**Status**: Partiellement implémenté

**Existant**:
- Modèle Employee avec 30+ champs (data_store.py)
- Endpoints CRUD de base (/employees)
- Profil employé avec données personnelles et professionnelles

**Manquant**:
- Gestion des documents (upload, génération contrats/avenants/attestations)
- Demandes d'explications et sanctions
- Pointage & Présences (entrée/sortie)
- Alertes automatiques (fin contrat, pièces d'identité, visite médicale)

### 🟡 MODULE 02 - Compétences & Évaluation
**Status**: Modèles créés, endpoints partiels

**Existant**:
- Modèles: Skill, SoftSkill, Evaluation, CareerGoal, DevelopmentGoal
- Endpoints de base pour skills

**Manquant**:
- Référentiel des Métiers & Compétences complet
- Workflow d'évaluation périodique avec signatures
- Cartographie des gaps de compétences
- Plan de Développement Individuel (PDI) avec actions liées

### ✅ MODULE 03 - Congés & Absences
**Status**: Fonctionnel avec données Supabase

**Existant**:
- Table `soldes_conge` dans Supabase
- Table `conges` (demandes)
- Endpoints: /leave-balance, /leave-requests
- Workflow de validation

**Manquant**:
- Calendrier des absences (vue équipe)
- Gestion des soldes automatique (calcul mensuel prorata)
- Détection des chevauchements

### 🟡 MODULE 04 - Plan de Carrière
**Status**: Modèles créés, endpoints à compléter

**Existant**:
- Modèle CareerGoal
- Objectifs individuels

**Manquant**:
- Entretiens de carrière avec signatures employé/RH
- Mobilités internes & Promotions
- Historique des trajectoires
- Génération d'avenants de mobilité

### 🟡 MODULE 05 - Reporting & Analytics
**Status**: Dashboards de base, rapports à implémenter

**Existant**:
- Dashboards par rôle (Manager, Collaborateur, Resp RH, Admin, Direction)
- KPIs basiques

**Manquant**:
- Tous les rapports extractibles (PDF/Excel):
  - État du personnel
  - Salaires
  - Congés
  - Pointage
  - Compétences
  - Évaluations
  - Satisfaction
  - Doléances
  - Disciplinaire
  - États légaux (DSN)
  - PDI
  - Actions personnel

### 🟡 MODULE 06 - Enquêtes & Doléances
**Status**: Modèle créé, endpoints partiels

**Existant**:
- Modèle Survey
- Table `suggestions` dans Supabase
- Endpoint suggestions

**Manquant**:
- Création & Diffusion d'enquêtes
- Analyse des résultats avec graphiques
- Workflow de traitement des doléances (numéro de suivi)
- Plan d'actions associé aux rapports de satisfaction

### ✅ MODULE 07 - Communication Interne
**Status**: Fonctionnel

**Existant**:
- Modèles: Note, InternalEvent, Meeting
- Endpoints: /notes, /events, /palmares, /meetings
- Publication de notes & circulaires
- Palmarès collaborateur du mois

**Manquant**:
- Accusés de lecture pour les notes
- Rappels automatiques événements (J-7, J-1, H-1)

### 🟡 MODULE 08 - Suivi de la Productivité
**Status**: Modèle créé, Kanban à améliorer

**Existant**:
- Modèle Task avec statuts (À faire, En cours, Terminé, Bloqué)
- Endpoints de base

**Manquant**:
- Indicateurs de Performance Individuelle configurables
- Tableau de bord collectif avec ranking
- Alertes performance (seuils configurables)
- Liaison avec Module Évaluation

### 🟡 MODULE 09 - Gestion de Projets & Plans d'Actions
**Status**: Modèles créés, Gantt/Kanban à compléter

**Existant**:
- Modèles: Project, Task
- Endpoints de base

**Manquant**:
- Vue Kanban complète avec drag & drop
- Vue Gantt simplifiée
- Rapports d'avancement
- Types de plans d'actions spécifiques (sensibilisation, audit, contrôle)
- Suivi des décisions de réunions

### 🟡 MODULE 10 - Formation & Développement
**Status**: Modèles créés, endpoints à compléter

**Existant**:
- Modèle Training avec budget, formateur, participants
- Formations disponibles pour collaborateur

**Manquant**:
- Plan de formation légal (suivi budgétaire)
- Feuilles de présence (Excel)
- Évaluation post-formation
- Suivi d'efficacité à 3/6 mois
- Plan d'application des acquis
- Liaison avec Module Productivité

### 🟡 MODULE 11 - App Collaborateur PWA
**Status**: Structure frontend présente, Service Worker à configurer

**Existant**:
- Pages collaborateur fonctionnelles
- Responsive design

**Manquant**:
- Manifest.json complet
- Service Worker pour offline
- Notifications push
- Installation PWA

### 🟡 MODULE 12 - Modules Additionnels
**Status**: À implémenter (Phase 2)

---

## 4. PROBLÈMES CRITIQUES CORRIGÉS

### ✅ Corrigé: Bug resp_rh.py
- **Problème**: Références à `e.contract` et `e.dept` qui n'existent pas sur le modèle Employee
- **Solution**: Remplacé par `e.contract_type` et génération dynamique du nom de département

### ✅ Corrigé: Endpoints manquants 404
- **Problème**: `/employees`, `/employees/stats`, `/contracts`, `/contracts/alerts` retournaient 404
- **Solution**: Ajout des endpoints dans `api/resp_rh.py`

---

## 5. PLAN D'IMPLÉMENTATION PRIORISÉ

### Phase 1: Corrections Critiques (IMMÉDIAT)
1. ✅ Correction des bugs resp_rh.py
2. ✅ Ajout des endpoints manquants
3. ⏳ Vérification de tous les endpoints avec tests automatisés
4. ⏳ Mise à jour du frontend pour utiliser les nouveaux endpoints

### Phase 2: Fonctionnalités Essentielles (CETTE SEMAINE)
1. **Module 01**: Génération de documents (contrats, attestations)
2. **Module 03**: Calendrier des absences + calcul automatique soldes
3. **Module 05**: Export PDF/Excel pour les rapports principaux
4. **Module 07**: Accusés de lecture + rappels automatiques
5. **Module 11**: Configuration PWA complète

### Phase 3: Fonctionnalités Avancées (SEMAINE PROCHAINE)
1. **Module 02**: Workflow d'évaluation complet avec signatures
2. **Module 04**: Entretiens de carrière + mobilités
3. **Module 06**: Système d'enquêtes complet avec analytics
4. **Module 08**: KPIs productivité configurables
5. **Module 09**: Kanban + Gantt interactifs

### Phase 4: Automatisations (PLUS TARD)
1. Jobs planifiés pour alertes automatiques
2. WebSockets pour notifications temps réel
3. Intégrations email
4. Module 12 (Phase 2)

---

## 6. ARCHITECTURE RECOMMANDÉE POUR LA SUITE

### Backend - Structure API Complète
```
api/
├── v1/
│   ├── admin_personnel/      # Module 01
│   ├── competences/          # Module 02
│   ├── conges/               # Module 03
│   ├── carriere/             # Module 04
│   ├── reporting/            # Module 05
│   ├── enquetes/             # Module 06
│   ├── communication/        # Module 07
│   ├── productivite/         # Module 08
│   ├── projets/              # Module 09
│   ├── formations/           # Module 10
│   ├── pwa/                  # Module 11
│   └── auth/
```

### Frontend - Structure Pages
```
pages/
├── collaborateur/           # Module 11 + 03 perso
├── manager/                 # Modules 08, 09, 03 équipe
├── resp_rh/                 # Modules 01, 02, 04, 10
├── admin_rh/                # Modules 05, 06, config
└── direction/               # Module 05 (stratégique)
```

---

## 7. CONVENTIONS DE CODE À RESPECTER

### Backend (Python/FastAPI)
- Pydantic v2 pour tous les modèles
- Type hints obligatoires
- Docstrings pour chaque endpoint
- Gestion d'erreurs avec HTTPException
- RBAC avec `current_user: User = Depends(get_current_user)`

### Frontend (React/TypeScript)
- Composants fonctionnels avec hooks
- Props typées avec interfaces
- Chargement avec LoadingSpinner
- Erreurs affichées dans l'UI
- Utilisation du hook `useApi` pour les appels API

### Base de données (Supabase)
- Tables en snake_case
- Champs en français quand métier
- Clés étrangères nommées `{table}_id`
- Timestamps automatiques

---

## 8. PROCHAINES ACTIONS IMMÉDIATES

1. **Test complet** de tous les endpoints avec curl/scripts
2. **Documentation** des endpoints avec Swagger (déjà actif sur /docs)
3. **Implémentation** des exports PDF/Excel (librairies: reportlab, openpyxl)
4. **Configuration** PWA (manifest.json, service-worker.js)
5. **Tests frontend** des boutons et connexions API

---

## 9. ACCÈS RAPIDES

- **API Docs**: http://localhost:8000/docs
- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:8000

### Identifiants de test:
- collab@ices.bj / password123
- manager@ices.bj / password123
- rh@ices.bj / password123
- admin@ices.bj / password123
- dir@ices.bj / password123

---

*Document généré automatiquement après analyse complète du codebase.*
