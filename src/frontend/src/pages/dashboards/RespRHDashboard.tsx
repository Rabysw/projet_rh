import { useIcesAuth } from "@/hooks/use-ices-auth";
import { useApi } from "@/hooks/use-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Calendar, 
  AlertTriangle,
  BookOpen,
  MessageSquare,
  Briefcase,
  Award,
  FileText,
  Bell,
  Loader2,
  CheckCircle
} from "lucide-react";

export default function RespRHDashboard() {
  const { user } = useIcesAuth();
  
  // Appel API pour récupérer les vraies données
  const { data, isLoading, error } = useApi<any>("/api/v1/dashboard/resp-rh");

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-destructive">
        Erreur de chargement des données RH.
      </div>
    );
  }

  // Sécurisation des données avec des valeurs par défaut si l'API ne renvoie rien
  const kpis = data?.kpis || {
    collaborateurs_actifs: 0,
    contrats_a_renouveler: 0,
    alertes_medicales: 0,
    formations_ce_mois: 0,
    enquetes_en_cours: 0,
    suggestions_en_attente: 0
  };

  const alertes = data?.alertes_prioritaires || [];
  const stats_personnel = data?.stats_personnel || {};
  const budget_formation = data?.budget_formation || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord RH</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.full_name} - Espace Responsable RH
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collaborateurs actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.collaborateurs_actifs}</div>
            <p className="text-xs text-muted-foreground">Total effectif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contrats à renouveler</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.contrats_a_renouveler}</div>
            <p className="text-xs text-muted-foreground">dans 30 jours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes médicales</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.alertes_medicales}</div>
            <p className="text-xs text-muted-foreground">visites dues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Formations ce mois</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.formations_ce_mois}</div>
            <p className="text-xs text-muted-foreground">planifiées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enquêtes en cours</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.enquetes_en_cours}</div>
            <p className="text-xs text-muted-foreground">en collecte</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suggestions en attente</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.suggestions_en_attente}</div>
            <p className="text-xs text-muted-foreground">à traiter</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertes prioritaires (Dynamiques) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-secondary" />
            Alertes prioritaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {alertes.length > 0 ? (
              alertes.map((alerte: any, idx: number) => (
                <div key={idx} className={`p-4 border rounded-lg ${alerte.urgence === 'high' ? 'bg-destructive/10 border-destructive' : 'bg-secondary/10 border-secondary'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{alerte.titre}</p>
                      <p className="text-xs text-muted-foreground">{alerte.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Échéance: {alerte.echeance}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${alerte.urgence === 'high' ? 'bg-destructive text-white' : 'bg-secondary text-secondary-foreground'}`}>
                      {alerte.type_alerte}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">{alerte.action_bouton}</Button>
                    {alerte.action_secondaire && (
                      <Button size="sm" variant="outline">{alerte.action_secondaire}</Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500 opacity-50" />
                <p>Aucune alerte prioritaire pour le moment.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Dossiers du personnel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Dossiers du personnel - Vue d'ensemble
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-accent">{stats_personnel.actifs || 0}</p>
                  <p className="text-xs text-muted-foreground">Actifs</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">{stats_personnel.cdi || 0}</p>
                  <p className="text-xs text-muted-foreground">CDI</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">{stats_personnel.cdd || 0}</p>
                  <p className="text-xs text-muted-foreground">CDD</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-accent">{stats_personnel.stages || 0}</p>
                  <p className="text-xs text-muted-foreground">Stage</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {stats_personnel.departements?.length ? (
                  stats_personnel.departements.map((dept: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm">{dept.nom}</span>
                      <span className="text-sm font-medium">{dept.effectif} collaborateurs</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    Aucune donnée disponible pour le moment
                  </p>
                )}
              </div>

              <Button className="w-full">Voir tous les dossiers</Button>
            </div>
          </CardContent>
        </Card>

        {/* Contrats & avenants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contrats & avenants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="font-medium text-sm">Échéances &lt; 30 jours</p>
                <p className="text-2xl font-bold text-destructive">{kpis.contrats_a_renouveler}</p>
                <Button size="sm" className="mt-2 w-full">Traiter maintenant</Button>
              </div>
              <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                <p className="font-medium text-sm">Échéances &lt; 60 jours</p>
                <p className="text-2xl font-bold text-secondary">{data?.contrats_60_jours || 0}</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">Planifier</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formation & développement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Formation & développement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Budget annuel</span>
                <span className="font-medium">{budget_formation.total || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Dépensé</span>
                <span className="font-medium text-secondary">{budget_formation.depense || "0 FCFA"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Restant</span>
                <span className="font-medium text-accent">{budget_formation.restant || "0 FCFA"}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-secondary h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${budget_formation.pourcentage || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">{budget_formation.pourcentage || 0}% du budget utilisé</p>
              <Button size="sm" className="w-full">Gérer les formations</Button>
            </div>
          </CardContent>
        </Card>

        {/* Compétences & évaluations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Compétences & évaluations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-sm">Évaluations annuelles</p>
                <p className="text-xs text-muted-foreground">{data?.evaluations?.faites || 0}/{data?.evaluations?.total || 0} complétées</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-accent h-2 rounded-full" 
                    style={{ width: `${data?.evaluations?.pourcentage || 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                <p className="font-medium text-sm">En retard</p>
                <p className="text-2xl font-bold text-secondary">{data?.evaluations?.retard || 0}</p>
                <Button size="sm" className="mt-2 w-full">Relancer managers</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions reçues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Suggestions reçues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nouvelles</span>
                  <span className="px-2 py-1 bg-secondary text-secondary text-xs rounded-full">{kpis.suggestions_en_attente}</span>
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">En traitement</span>
                  <span className="px-2 py-1 bg-secondary text-secondary text-xs rounded-full">{data?.suggestions?.traitement || 0}</span>
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Répondues</span>
                  <span className="px-2 py-1 bg-accent text-accent text-xs rounded-full">{data?.suggestions?.repondues || 0}</span>
                </div>
              </div>
              <Button size="sm" className="w-full">Voir toutes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}