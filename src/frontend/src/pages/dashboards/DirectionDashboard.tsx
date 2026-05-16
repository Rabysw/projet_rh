import { useIcesAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/use-api";
import { useCompanyConfig } from "@/contexts/CompanyConfigContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { downloadFile } from "@/lib/download";
import { toast } from "sonner";
import { 
  TrendingUp, 
  Users, 
  Calendar,
  DollarSign,
  BarChart3,
  Eye,
  FileText,
  BookOpen,
  Smile,
  Gavel,
  Download,
  Activity,
  Target,
  Loader2
} from "lucide-react";

export default function DirectionDashboard() {
  const { user } = useIcesAuth();
  const { config } = useCompanyConfig();
  const currency = config?.currency || "FCFA";
  const { data, isLoading } = useApi<any>("/api/v1/dashboard/direction");

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const kpis = data?.kpis || { 
    effectif_total: 0, 
    taux_turnover: "0%", 
    taux_presence: "0%", 
    formations_realisees: "0/0",
    satisfaction: "0/5",
    suggestions_traitees: "0%"
  };

  const handleExport = async (type: string, format: "pdf" | "excel" = "pdf") => {
    try {
      const filename = `${type}_${new Date().toISOString().split('T')[0]}.${format}`;
      await downloadFile(`/reports/export/${type}/${format}`, filename);
      toast.success("Rapport généré avec succès");
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la génération du rapport");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vue d'ensemble stratégique</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.full_name} - Espace Direction
          </p>
        </div>
      </div>

      {/* KPIs stratégiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Effectif total actif</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.effectif_total}</div>
            <p className="text-xs text-muted-foreground">+2 vs mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de turnover</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{kpis.taux_turnover}</div>
            <p className="text-xs text-muted-foreground">Objectif: &lt;5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de présence moyen</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.taux_presence}</div>
            <p className="text-xs text-muted-foreground">Excellent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Formations réalisées / planifiées</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.formations_realisees}</div>
            <p className="text-xs text-muted-foreground">82% de complétion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score satisfaction moyen</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.satisfaction}</div>
            <p className="text-xs text-muted-foreground">+0.2 vs Q1</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suggestions traitées</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.suggestions_traitees}</div>
            <p className="text-xs text-muted-foreground">temps moyen: 48h</p>
          </CardContent>
        </Card>
      </div>

      {/* Vue stratégique */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Évolution de l'effectif - 12 mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Pyramide des âges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics détaillés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Taux de turnover mensuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Répartition par département
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Taux d'absentéisme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Évolution masse salariale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile className="h-5 w-5" />
              Satisfaction collaborateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Suggestions traitées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rapports & exports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Rapports & exports disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleExport("etat-personnel")}>
              <FileText className="h-5 w-5" />
              <span className="text-xs">Bilan social</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleExport("competences")}>
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Rapport compétences</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleExport("absenteisme")}>
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Rapport absentéisme</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleExport("formations")}>
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Rapport formations</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleExport("satisfaction")}>
              <Smile className="h-5 w-5" />
              <span className="text-xs">Rapport satisfaction</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleExport("turnover")}>
              <Activity className="h-5 w-5" />
              <span className="text-xs">Rapport turnover</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleExport("productivite")}>
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs">Rapport productivité</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1" onClick={() => handleExport("etats-legaux")}>
              <Gavel className="h-5 w-5" />
              <span className="text-xs">États légaux ({config?.country || "Pays"})</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}