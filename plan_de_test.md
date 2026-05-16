# 📋 PLAN DE TEST — ICES HR Platform

## 🔐 Identifiants de test
| Rôle | Email | Mot de passe | Token |
|------|-------|--------------|-------|
| Admin RH | admin@ices.bj | password123 | admin-token |
| Direction | dir@ices.bj | password123 | direction-token |
| Resp RH | rh@ices.bj | password123 | resp_rh-token |
| Manager | manager@ices.bj | password123 | manager-token |
| Collaborateur | collab@ices.bj | password123 | collaborateur-token |

---

## 1️⃣ TEST AUTHENTIFICATION (tous les rôles)
| # | Test | Attendu | Statut |
|---|------|---------|--------|
| 1.1 | Se connecter avec admin@ices.bj | Redirigé vers dashboard | ⬜ |
| 1.2 | Se connecter avec dir@ices.bj | Redirigé vers dashboard | ⬜ |
| 1.3 | Se connecter avec rh@ices.bj | Redirigé vers dashboard | ⬜ |
| 1.4 | Se connecter avec manager@ices.bj | Redirigé vers dashboard | ⬜ |
| 1.5 | Se connecter avec collab@ices.bj | Redirigé vers dashboard | ⬜ |
| 1.6 | Mauvais mot de passe | Message d'erreur affiché | ⬜ |
| 1.7 | Email inexistant | Message d'erreur affiché | ⬜ |
| 1.8 | Se déconnecter | Redirigé vers login | ⬜ |

---

## 2️⃣ TEST COLLABORATEUR (collab@ices.bj)
| # | Page | Test | Attendu | Statut |
|---|------|------|---------|--------|
| 2.1 | ProfilePage | Afficher le profil | Infos du collaborateur visibles | ⬜ |
| 2.2 | ProfilePage | Modifier les infos | Sauvegarde OK | ⬜ |
| 2.3 | LeavePage | Voir les congés | Liste des congés visible | ⬜ |
| 2.4 | LeavePage | Faire une demande de congé | Demande soumise avec succès | ⬜ |
| 2.5 | PayslipsPage | Voir les fiches de paie | Liste des fiches visible | ⬜ |
| 2.6 | SkillsPage | Voir les compétences | Liste des compétences visible | ⬜ |
| 2.7 | SkillsPage | Ajouter une compétence | Compétence ajoutée | ⬜ |
| 2.8 | TrainingsPage | Voir les formations | Liste des formations visible | ⬜ |
| 2.9 | CareerPlanPage | Voir le plan de carrière | Plan visible | ⬜ |
| 2.10 | SuggestionsPage | Soumettre une suggestion | Suggestion envoyée | ⬜ |
| 2.11 | — | Accéder à /admin-rh | Accès refusé (403) | ⬜ |
| 2.12 | — | Accéder à /direction | Accès refusé (403) | ⬜ |

---

## 3️⃣ TEST MANAGER (manager@ices.bj)
| # | Page | Test | Attendu | Statut |
|---|------|------|---------|--------|
| 3.1 | TeamPage | Voir l'équipe | Liste des membres visible | ⬜ |
| 3.2 | TeamLeavePage | Voir les congés de l'équipe | Liste des congés visible | ⬜ |
| 3.3 | TeamLeavePage | Approuver un congé | Congé approuvé | ⬜ |
| 3.4 | TeamLeavePage | Refuser un congé | Congé refusé | ⬜ |
| 3.5 | TeamSkillsPage | Voir les compétences équipe | Compétences visibles | ⬜ |
| 3.6 | TeamProductivityPage | Voir la productivité | Données visibles | ⬜ |
| 3.7 | KanbanPage | Voir le kanban | Board visible | ⬜ |
| 3.8 | KanbanPage | Déplacer une carte | Carte déplacée | ⬜ |
| 3.9 | — | Accéder à /admin-rh | Accès refusé (403) | ⬜ |
| 3.10 | — | Accéder à /direction | Accès refusé (403) | ⬜ |

---

## 4️⃣ TEST RESPONSABLE RH (rh@ices.bj)
| # | Page | Test | Attendu | Statut |
|---|------|------|---------|--------|
| 4.1 | EmployeesPage | Voir tous les employés | Liste complète visible | ⬜ |
| 4.2 | EmployeesPage | Rechercher un employé | Résultats filtrés | ⬜ |
| 4.3 | EmployeeDetailPage | Voir le détail d'un employé | Infos complètes visibles | ⬜ |
| 4.4 | ContractsPage | Voir les contrats | Liste des contrats visible | ⬜ |
| 4.5 | ContractsPage | Ajouter un contrat | Contrat créé | ⬜ |
| 4.6 | AttendancePage | Voir les présences | Données visibles | ⬜ |
| 4.7 | AttendancePage | Marquer une présence | Présence enregistrée | ⬜ |
| 4.8 | — | Accéder à /admin-rh/config | Accès refusé (403) | ⬜ |
| 4.9 | — | Accéder à /direction | Accès refusé (403) | ⬜ |

---

## 5️⃣ TEST ADMIN RH (admin@ices.bj)
| # | Page | Test | Attendu | Statut |
|---|------|------|---------|--------|
| 5.1 | ConfigPage | Voir la configuration | Config actuelle visible | ⬜ |
| 5.2 | ConfigPage | Modifier la configuration | Config sauvegardée | ⬜ |
| 5.3 | UsersPage | Voir les utilisateurs | Liste des users visible | ⬜ |
| 5.4 | UsersPage | Créer un utilisateur | User créé avec succès | ⬜ |
| 5.5 | UsersPage | Modifier un utilisateur | Modifications sauvegardées | ⬜ |
| 5.6 | UsersPage | Désactiver un utilisateur | User désactivé | ⬜ |
| 5.7 | — | Accéder à toutes les pages | Accès autorisé | ⬜ |

---

## 6️⃣ TEST DIRECTION (dir@ices.bj)
| # | Page | Test | Attendu | Statut |
|---|------|------|---------|--------|
| 6.1 | ReportsPage | Voir les rapports | Rapports visibles | ⬜ |
| 6.2 | ReportsPage | Exporter un rapport | Fichier téléchargé | ⬜ |
| 6.3 | Dashboard | Voir les KPIs | Données visibles | ⬜ |
| 6.4 | — | Accéder à /admin-rh/config | Accès autorisé | ⬜ |

---

## 7️⃣ TEST SETUP INITIAL
| # | Test | Attendu | Statut |
|---|------|---------|--------|
| 7.1 | Vider la DB et accéder à l'app | Redirigé vers /setup | ⬜ |
| 7.2 | Remplir le setup étape 1 (Entreprise) | Continuer vers étape 2 | ⬜ |
| 7.3 | Remplir le setup étape 2 (Structure) | Continuer vers étape 3 | ⬜ |
| 7.4 | Remplir le setup étape 3 (Calendrier) | Continuer vers étape 4 | ⬜ |
| 7.5 | Remplir le setup étape 4 (Politiques) | Continuer vers résumé | ⬜ |
| 7.6 | Cliquer Terminer | Config sauvegardée, redirigé | ⬜ |
| 7.7 | Vérifier que le nom s'affiche sur le login | Nom entreprise visible | ⬜ |

---

## 📊 RÉSUMÉ
| Rôle | Total | ✅ OK | ❌ KO | ⬜ Non testé |
|------|-------|-------|-------|-------------|
| Authentification | 8 | 0 | 0 | 8 |
| Collaborateur | 12 | 0 | 0 | 12 |
| Manager | 10 | 0 | 0 | 10 |
| Resp RH | 9 | 0 | 0 | 9 |
| Admin RH | 7 | 0 | 0 | 7 |
| Direction | 4 | 0 | 0 | 4 |
| Setup Initial | 7 | 0 | 0 | 7 |
| **TOTAL** | **57** | **0** | **0** | **57** |

---
## Légende
- ✅ OK — Fonctionne correctement
- ❌ KO — Ne fonctionne pas
- ⚠️ PARTIEL — Fonctionne partiellement
- ⬜ Non testé
