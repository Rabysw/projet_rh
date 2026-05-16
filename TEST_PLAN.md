# Plan de Test - Plateforme RH ICES

Ce document décrit les étapes de vérification pour s'assurer que toutes les fonctionnalités de la plateforme RH ICES sont opérationnelles.

## 1. Authentification & Accès

| Étape | Action | Résultat attendu |
| :--- | :--- | :--- |
| 1.1 | Se rendre sur `/login` | La page de connexion ICES s'affiche avec le formulaire Email/Password. |
| 1.2 | Connexion Admin (`admin@ices.com` / `password123`) | Redirection vers le dashboard Admin. Jeton stocké dans le localStorage. |
| 1.3 | Test Mot de passe oublié | Saisir un email, vérifier l'affichage du message de succès. |
| 1.4 | Déconnexion | Cliquer sur "Déconnexion" dans le menu utilisateur. Retour vers `/login`. |
| 1.5 | Accès non autorisé | Tenter d'accéder à `/admin-rh/users` avec un compte collaborateur. Message "Accès non autorisé" (403). |

## 2. Administration Système (Rôle: Admin RH)

| Étape | Action | Résultat attendu |
| :--- | :--- | :--- |
| 2.1 | Liste des utilisateurs | Accéder à "Gestion des utilisateurs". La liste des comptes s'affiche. |
| 2.2 | Création d'utilisateur | Cliquer sur "Créer un compte", remplir le formulaire. L'utilisateur apparaît dans la liste. |
| 2.3 | Suppression d'utilisateur | Cliquer sur l'icône poubelle, confirmer. L'utilisateur disparaît. |
| 2.4 | Configuration entreprise | Accéder à "Configuration". Modifier une couleur ou le logo. Vérifier l'impact visuel. |

## 3. Gestion du Personnel (Rôle: Resp RH)

| Étape | Action | Résultat attendu |
| :--- | :--- | :--- |
| 3.1 | Dossiers collaborateurs | Accéder à "Dossiers Personnel". La liste des employés s'affiche. |
| 3.2 | Détail employé | Cliquer sur "Voir" sur un employé. Les onglets (Profil, Documents, Contrats) sont chargés. |
| 3.3 | Upload de document | Dans le dossier employé, uploader un "CIP/CNI". Le statut passe à "OK" avec bouton téléchargement. |
| 3.4 | Gestion des contrats | Accéder à "Contrats". Vérifier les alertes d'expiration (en rouge si < 30j). |
| 3.5 | Dashboard RH | Vérifier que les KPIs (Collaborateurs actifs, Congés à valider) sont dynamiques. |

## 4. Gestion d'Équipe (Rôle: Manager)

| Étape | Action | Résultat attendu |
| :--- | :--- | :--- |
| 4.1 | Dashboard Manager | Voir les "Actions en attente". Le nom du collaborateur doit être visible (pas seulement l'ID). |
| 4.2 | Validation de congé | Cliquer sur "Approuver" sur une demande. La demande disparaît du dashboard et passe en `approved`. |
| 4.3 | Vue d'équipe | Accéder à "Mon Équipe". Vérifier que seuls les membres rattachés au manager sont visibles. |
| 4.4 | Compétences équipe | Consulter le tableau des compétences. Les scores globaux doivent être calculés. |

## 5. Espace Collaborateur (Rôle: Collaborateur)

| Étape | Action | Résultat attendu |
| :--- | :--- | :--- |
| 5.1 | Profil personnel | Accéder à "Mon Profil". Modifier le téléphone. Vérifier la persistance après rafraîchissement. |
| 5.2 | Demande de congé | Formuler une demande. Vérifier qu'elle apparaît dans l'historique avec le statut "En attente". |
| 5.3 | Évaluations | Consulter "Mes Évaluations". Le graphique Radar doit afficher les niveaux de compétences. |
| 5.4 | Notifications | Vérifier le badge de notifications dans la sidebar lors d'un changement de statut de congé. |

## 6. Analyses & Reporting (Rôle: Direction)

| Étape | Action | Résultat attendu |
| :--- | :--- | :--- |
| 6.1 | Dashboard Stratégique | Vérifier l'affichage des KPIs globaux (Turnover, Masse salariale, etc.). |
| 6.2 | Export PDF | Cliquer sur "Bilan Social". Un fichier PDF doit être généré et téléchargé automatiquement. |
| 6.3 | Rapports dynamiques | Filtrer l'état du personnel par département. La liste doit se mettre à jour. |

## 7. Vérifications Techniques (Logs Backend)

- [ ] Aucun `401 Unauthorized` après une connexion fraîche.
- [ ] Aucun `404 Not Found` sur `/api/v1/collaborateur/notifications`.
- [ ] Aucun `500 Internal Server Error` lors des appels Supabase (vérifier que les fonctions sont synchrones).
- [ ] Script de population : `python src/backend/populate_data.py` s'exécute sans erreur SQL.

---
*Date du dernier plan de test : 15 Mai 2026*
