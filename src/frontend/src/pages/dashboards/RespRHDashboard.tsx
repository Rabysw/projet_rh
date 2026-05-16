import { useIcesAuth } from "@/contexts/AuthContext";
import { useApi, apiFetch } from "@/hooks/use-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import {
  Users,
  Calendar,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  Award,
  FileText,
  Bell,
  Loader2,
  CheckCircle2,
  Clock,
  TrendingDown,
  BarChart3,
  Link as LinkIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function RespRHDashboard() {
  const { user } = useIcesAuth();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useApi<any>("/api/v1/resp-rh/dashboard");

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

  const kpis = data?.kpis || {
    collaborateurs_actifs: 0,
    contrats_a_renouveler: 0,
    alertes_medicales: 0,
    formations_ce_mois: 0,
    suggestions_en_attente: 0,
    enquetes_actives: 0,
    taux_absenteisme: 0,
  };

  const alertes = data?.alertes_prioritaires || [];
  const stats_personnel = data?.stats_personnel || {};
  const budget_formation = data?.budget_formation || {};
  const presences = data?.presences || {};
  const conges = data?.conges || {};
  const suggestions = data?.suggestions || {};
  const evaluations = data?.evaluations || {};

  const handleValiderConge = async (id: string) => {
    try {
      await apiFetch(`/leave/${id}/statut`, {
        method: "PATCH",
        body: JSON.stringify({ status: "approved" }),
      });
      toast.success("Congé validé");
      refetch();
    } catch {
      toast.error("Erreur lors de la validation");
    }
  };

  const handleAlerteAction = (alerte: any) => {
    if (alerte.type_alerte === "Contrat") {
      navigate({ to: "/rh-contracts" });
    } else if (alerte.type_alerte === "Formation") {
      navigate({ to: "/trainings" });
    } else {
      toast.info("Action non configurée pour cette alerte");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord RH</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Bienvenue, {user?.full_name} — Espace Responsable RH
        </p>
      </div>

      {/* ── 7 KPIs (cahier des charges) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        <KpiCard
          icon={<Users className="h-4 w-4 text-blue-500" />}
          label="Collaborateurs actifs"
          value={kpis.collaborateurs_actifs}
          sub="effectif total"
        />
        <KpiCard
          icon={<FileText className="h-4 w-4 text-amber-500" />}
          label="Contrats à renouveler"
          value={kpis.contrats_a_renouveler}
          sub="dans 30 jours"
          warn={kpis.contrats_a_renouveler > 0}
        />
        <KpiCard
          icon={<AlertTriangle className="h-4 w-4 text-rose-500" />}
          label="Alertes médicales"
          value={kpis.alertes_medicales}
          sub="visites dues"
          warn={kpis.alertes_medicales > 0}
        />
        <KpiCard
          icon={<BookOpen className="h-4 w-4 text-green-500" />}
          label="Formations ce mois"
          value={kpis.formations_ce_mois}
          sub="planifiées"
        />
        <KpiCard
          icon={<Bell className="h-4 w-4 text-purple-500" />}
          label="Suggestions en attente"
          value={kpis.suggestions_en_attente}
          sub="à traiter"
          warn={kpis.suggestions_en_attente > 0}
        />
        <KpiCard
          icon={<MessageSquare className="h-4 w-4 text-indigo-500" />}
          label="Enquêtes actives"
          value={kpis.enquetes_actives}
          sub="en collecte"
        />
        <KpiCard
          icon={<TrendingDown className="h-4 w-4 text-orange-500" />}
          label="Taux absentéisme"
          value={`${kpis.taux_absenteisme}%`}
          sub="ce mois"
          warn={kpis.taux_absenteisme > 5}
        />
      </div>

      {/* ── Alertes prioritaires ── */}
      {alertes.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Alertes prioritaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {alertes.map((alerte: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-4 border rounded-lg ${
                    alerte.urgence === "high"
                      ? "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800"
                      : "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{alerte.titre}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alerte.description}</p>
                      {alerte.echeance && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Échéance : {alerte.echeance}
                        </p>
                      )}
                    </div>
                    <span
                      className={`flex-shrink-0 px-2 py-0.5 text-xs rounded-full font-medium ${
                        alerte.urgence === "high"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                      }`}
                    >
                      {alerte.type_alerte}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={() => handleAlerteAction(alerte)}>{alerte.action_bouton}</Button>
                    {alerte.action_secondaire && (
                      <Button size="sm" variant="outline">
                        {alerte.action_secondaire}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Widgets Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Présences du jour */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Présences aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <PresenceStat label="Présents" value={presences.presents ?? 0} color="green" />
            <PresenceStat label="Absents" value={presences.absents ?? 0} color="rose" />
            <PresenceStat label="Retards" value={presences.retards ?? 0} color="amber" />
            <PresenceStat label="Imports manquants" value={presences.imports_manquants ?? 0} color="gray" />
            <Link to="/rh-attendance">
              <Button size="sm" variant="outline" className="w-full mt-2">
                Gérer les présences
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Congés en attente */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" />
              Congés — Validation finale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {conges.demandes_en_attente?.length > 0 ? (
              conges.demandes_en_attente.slice(0, 4).map((req: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-muted/40 rounded-lg"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{req.collaborateur}</p>
                    <p className="text-xs text-muted-foreground">
                      {req.type} · {req.jours}j
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleValiderConge(req.id)}
                    className="flex-shrink-0 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md hover:bg-green-200 transition-colors"
                  >
                    Valider
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-4 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-500 mb-2 opacity-60" />
                <p className="text-sm text-muted-foreground">Aucune demande en attente</p>
              </div>
            )}
            <Link to="/rh-conges">
              <Button size="sm" variant="outline" className="w-full">
                Voir toutes les demandes
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Contrats & avenants */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Contrats & avenants
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg">
              <p className="text-xs font-medium text-rose-700 dark:text-rose-400">
                Échéances &lt; 30 jours
              </p>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                {kpis.contrats_a_renouveler}
              </p>
              <Link to="/rh-contracts">
                <Button size="sm" className="mt-2 w-full">
                  Traiter maintenant
                </Button>
              </Link>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                Échéances &lt; 60 jours
              </p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {data?.contrats_60_jours ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dossiers personnel — col-span-2 */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              Dossiers du personnel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-3 text-center">
              {[
                { label: "Actifs", value: stats_personnel.actifs ?? 0, color: "text-green-600" },
                { label: "CDI", value: stats_personnel.cdi ?? 0, color: "text-blue-600" },
                { label: "CDD", value: stats_personnel.cdd ?? 0, color: "text-amber-600" },
                { label: "Stage", value: stats_personnel.stages ?? 0, color: "text-purple-600" },
              ].map((s) => (
                <div key={s.label} className="p-3 bg-muted/40 rounded-lg">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            {stats_personnel.departements?.length > 0 && (
              <div className="space-y-1.5">
                {stats_personnel.departements.map((dept: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-3 py-2 bg-muted/30 rounded-lg"
                  >
                    <span className="text-sm">{dept.nom}</span>
                    <span className="text-sm font-medium">{dept.effectif} collaborateurs</span>
                  </div>
                ))}
              </div>
            )}

            <Link to="/rh-employees">
              <Button className="w-full" size="sm">
                Voir tous les dossiers
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Formation & budget */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Formation & développement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget annuel</span>
                <span className="font-medium">{budget_formation.total || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dépensé</span>
                <span className="font-medium text-amber-600">{budget_formation.depense || "0 FCFA"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Restant</span>
                <span className="font-medium text-green-600">{budget_formation.restant || "0 FCFA"}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${budget_formation.pourcentage ?? 0}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {budget_formation.pourcentage ?? 0}% du budget utilisé
              </p>
            </div>
            <Link to="/trainings">
              <Button size="sm" className="w-full">
                Gérer les formations
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Évaluations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Award className="h-4 w-4" />
              Compétences & évaluations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted/40 rounded-lg space-y-2">
              <p className="text-xs font-medium">Évaluations annuelles</p>
              <p className="text-xs text-muted-foreground">
                {evaluations.faites ?? 0}/{evaluations.total ?? 0} complétées
              </p>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${evaluations.pourcentage ?? 0}%` }}
                />
              </div>
            </div>
            {(evaluations.retard ?? 0) > 0 && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400">En retard</p>
                <p className="text-2xl font-bold text-amber-600">{evaluations.retard}</p>
                <Button size="sm" className="mt-2 w-full">Relancer managers</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Suggestions reçues */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" />
              Suggestions reçues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Nouvelles", value: suggestions.nouvelles ?? kpis.suggestions_en_attente, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
              { label: "En traitement", value: suggestions.traitement ?? 0, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
              { label: "Répondues", value: suggestions.repondues ?? 0, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex justify-between items-center p-2.5 bg-muted/40 rounded-lg"
              >
                <span className="text-sm">{s.label}</span>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${s.color}`}>
                  {s.value}
                </span>
              </div>
            ))}
            <Link to="/suggestions">
              <Button size="sm" className="w-full mt-2">
                Voir toutes
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Satisfaction */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4" />
              Satisfaction collaborateurs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center py-2">
              <p className="text-4xl font-bold text-primary">
                {data?.satisfaction?.score ?? "—"}
                <span className="text-lg text-muted-foreground">/5</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Score moyen satisfaction</p>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Enquêtes actives</span>
                <span className="font-medium">{kpis.enquetes_actives}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plaintes ouvertes</span>
                <span className={`font-medium ${(data?.satisfaction?.plaintes_ouvertes ?? 0) > 0 ? "text-rose-600" : ""}`}>
                  {data?.satisfaction?.plaintes_ouvertes ?? 0}
                </span>
              </div>
            </div>
            <Link to="/enquetes">
              <Button size="sm" variant="outline" className="w-full">
                Lancer une enquête
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

function KpiCard({
  icon,
  label,
  value,
  sub,
  warn = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: string;
  warn?: boolean;
}) {
  return (
    <Card className={warn ? "border-amber-300 dark:border-amber-700" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground leading-tight">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${warn ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
      </CardContent>
    </Card>
  );
}

function PresenceStat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "rose" | "amber" | "gray";
}) {
  const colorMap = {
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    gray: "bg-muted text-muted-foreground",
  };
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${colorMap[color]}`}>
        {value}
      </span>
    </div>
  );
}