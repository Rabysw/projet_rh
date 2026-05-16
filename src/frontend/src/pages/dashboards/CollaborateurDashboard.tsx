import { useIcesAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/use-api";
import { useNotifications } from "@/hooks/use-notifications";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { downloadFile } from "@/lib/download";
import { toast } from "sonner";
import {
  Bell,
  Calendar,
  TrendingUp,
  FileText,
  BookOpen,
  MessageSquare,
  Trophy,
  Loader2,
  Clock,
  Target,
  Timer,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function CollaborateurDashboard() {
  const { user } = useIcesAuth();
  const { data, isLoading } = useApi<any>("/api/v1/dashboard/collaborateur");
  const { data: payslips } = useApi<any[]>("/api/v1/collaborateur/payslips");
  const { data: palmares } = useApi<any>("/api/v1/communication/palmares");
  const { notifications, isLoading: notifLoading, markAsRead, markAllAsRead } = useNotifications();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const latestPayslip = payslips?.[0];

  const handleDownloadPayslip = async () => {
    if (!latestPayslip) return;
    try {
      await downloadFile(
        `/documents/generate/payslip/${latestPayslip.id}`,
        `bulletin_${String(latestPayslip.month ?? "dernier").replaceAll(" ", "_")}.pdf`,
      );
      toast.success("Téléchargement lancé");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur de téléchargement");
    }
  };

  const kpis = data?.kpis || {
    conges_restants: 0,
    formations_planifiees: 0,
    demandes_en_cours: 0,
    taux_objectifs_atteints: 0,
    heures_supplementaires: 0,
    notifications_non_lues: 0,
  };

  const solde = data?.solde_conges || { pris: 0, restants: 0, total: 25, exceptionnels: 0 };
  const presence = data?.presence || { heures_semaine: 0, retards_mois: 0, absences_mois: 0 };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Bonjour, {user?.full_name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Voici un résumé de votre espace collaborateur
          </p>
        </div>
        <div className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {kpis.notifications_non_lues > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
              {kpis.notifications_non_lues}
            </span>
          )}
        </div>
      </div>

      {/* ── KPI Cards (6 selon cahier des charges) ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard
          icon={<Calendar className="h-4 w-4 text-primary" />}
          label="Congés restants"
          value={kpis.conges_restants}
          unit="jours"
          color="primary"
        />
        <KpiCard
          icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
          label="Demandes en attente"
          value={kpis.demandes_en_cours}
          unit="demandes"
          color="amber"
        />
        <KpiCard
          icon={<BookOpen className="h-4 w-4 text-blue-500" />}
          label="Formations planifiées"
          value={kpis.formations_planifiees}
          unit="sessions"
          color="blue"
        />
        <KpiCard
          icon={<Target className="h-4 w-4 text-green-500" />}
          label="Objectifs atteints"
          value={kpis.taux_objectifs_atteints}
          unit="%"
          color="green"
        />
        <KpiCard
          icon={<Timer className="h-4 w-4 text-purple-500" />}
          label="Heures supp."
          value={kpis.heures_supplementaires}
          unit="h"
          color="purple"
        />
        <KpiCard
          icon={<Bell className="h-4 w-4 text-rose-500" />}
          label="Notifs non lues"
          value={kpis.notifications_non_lues}
          unit=""
          color="rose"
        />
      </div>

      {/* ── Widgets Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Notifications — col-span-2 */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4" />
                Notifications récentes
              </CardTitle>
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={markAllAsRead}
              >
                Tout marquer comme lu
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Chargement…
                </div>
              ) : notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  Aucune notification pour le moment
                </p>
              ) : (
                notifications.map((notif: any) => (
                  <button
                    type="button"
                    key={notif._key}
                    className="w-full text-left flex items-start gap-3 p-3 bg-muted/40 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => markAsRead(notif._key)}
                  >
                    <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${notif.lu ? "bg-muted-foreground/30" : "bg-primary"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{notif.type}</p>
                      <p className="text-xs text-muted-foreground truncate">{notif.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{notif.date}</span>
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Solde de congés */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" />
              Solde de congés
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Pris ({solde.pris}j)</span>
                <span>Restants ({solde.restants}j) / Total ({solde.total}j)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden flex">
                <div
                  className="bg-amber-400 h-2.5 transition-all"
                  style={{ width: `${solde.total > 0 ? (solde.pris / solde.total) * 100 : 0}%` }}
                />
                <div
                  className="bg-primary h-2.5 transition-all"
                  style={{ width: `${solde.total > 0 ? (solde.restants / solde.total) * 100 : 0}%` }}
                />
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Pris
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  Restants
                </span>
              </div>
            </div>
            <div className="pt-2 border-t space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exceptionnels</span>
                <span className="font-medium">{solde.exceptionnels ?? 0} j</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total restant</span>
                <span className="font-bold text-primary">{solde.restants ?? 0} j</span>
              </div>
            </div>
            <Link
              to="/leave"
              className="block w-full text-center text-xs text-primary hover:underline mt-1"
            >
              Faire une demande →
            </Link>
          </CardContent>
        </Card>

        {/* Présences (lecture seule — données RH) */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Mes présences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <PresenceStat
              label="Heures cette semaine"
              value={`${presence.heures_semaine}h`}
              icon={<Timer className="h-3.5 w-3.5 text-blue-500" />}
            />
            <PresenceStat
              label="Retards ce mois"
              value={presence.retards_mois}
              icon={<AlertCircle className="h-3.5 w-3.5 text-amber-500" />}
            />
            <PresenceStat
              label="Absences ce mois"
              value={presence.absences_mois}
              icon={<AlertCircle className="h-3.5 w-3.5 text-rose-500" />}
            />
            <p className="text-[10px] text-muted-foreground pt-1 border-t">
              Données en lecture seule — saisies par RH
            </p>
          </CardContent>
        </Card>

        {/* Prochaine formation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Prochaine formation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.prochaine_formation?.titre ? (
              <>
                <div>
                  <p className="font-medium text-sm">{data.prochaine_formation.titre}</p>
                  <p className="text-xs text-muted-foreground">{data.prochaine_formation.date_debut}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                    {data.prochaine_formation.statut || "Inscrit"}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune formation prévue</p>
            )}
            <Link
              to="/trainings"
              className="block w-full text-center text-xs text-primary hover:underline mt-1"
            >
              Voir toutes les formations →
            </Link>
          </CardContent>
        </Card>

        {/* Plan de carrière */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4" />
              Mon plan de carrière
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Objectif en cours</p>
              <p className="font-medium text-sm mt-0.5">
                {data?.plan_carriere?.dernier_objectif || "Aucun objectif défini"}
              </p>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${data?.plan_carriere?.progression ?? 0}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {data?.plan_carriere?.progression ?? 0}% complété
              </p>
            </div>
            <Link
              to="/career"
              className="block w-full text-center text-xs text-primary hover:underline"
            >
              Voir mon plan →
            </Link>
          </CardContent>
        </Card>

        {/* Dernière fiche de paie */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Dernière fiche de paie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium text-sm">{data?.derniere_fiche_paie?.mois || "—"}</p>
              <p className="text-xs text-muted-foreground">Disponible au téléchargement</p>
              <p className="text-xl font-bold text-primary mt-1">
                {data?.derniere_fiche_paie?.net
                  ? `${data.derniere_fiche_paie.net.toLocaleString("fr-FR")} FCFA`
                  : "—"}
              </p>
            </div>
            <button
              type="button"
              className="w-full px-3 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!latestPayslip}
              onClick={handleDownloadPayslip}
            >
              Télécharger PDF
            </button>
          </CardContent>
        </Card>

        {/* Actualités RH — col-span-2 */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" />
              Actualités RH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data?.actualites_rh?.length > 0 ? (
                data.actualites_rh.map((actu: any, idx: number) => (
                  <div key={idx} className="p-3 bg-muted/40 rounded-lg space-y-1">
                    <p className="text-sm font-medium">{actu.titre}</p>
                    <p className="text-xs text-muted-foreground">{actu.resume}</p>
                    <span className="text-[10px] text-muted-foreground">Publié le {actu.date}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-2 text-center">
                  Aucune actualité pour le moment
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Palmarès */}
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/10 dark:to-background border-amber-200">
          <CardHeader className="text-center pb-2">
            <Trophy className="h-7 w-7 text-amber-500 mx-auto mb-1" />
            <CardTitle className="text-base">Palmarès ASIN</CardTitle>
            <CardDescription className="text-xs">{palmares?.period}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            {palmares?.employee_name ? (
              <>
                <div className="relative mx-auto w-14 h-14">
                  <img
                    src={palmares.photo_url}
                    className="w-full h-full rounded-full object-cover border-2 border-amber-200 shadow"
                    alt={palmares.employee_name}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{palmares.employee_name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{palmares.position}</p>
                </div>
                <div className="bg-white/60 dark:bg-black/20 p-2 rounded-lg text-[11px] italic border border-amber-100">
                  "{palmares.reason}"
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground py-4">
                Aucune donnée disponible
              </p>
            )}
          </CardContent>
        </Card>

        {/* Boîte à suggestions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4" />
              Boîte à suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Vos suggestions</p>
              <p className="text-sm font-medium mt-0.5">
                {data?.suggestions?.resume || "Aucune suggestion en cours"}
              </p>
            </div>
            <div className="space-y-1.5">
              {data?.suggestions?.en_attente != null && (
                <SuggestionStat
                  label="En attente"
                  value={data.suggestions.en_attente}
                  color="amber"
                />
              )}
              {data?.suggestions?.traitees != null && (
                <SuggestionStat
                  label="Traitées"
                  value={data.suggestions.traitees}
                  color="green"
                />
              )}
            </div>
            <Link
              to="/suggestions"
              className="block w-full text-center px-3 py-2 bg-muted text-muted-foreground text-sm rounded-lg hover:bg-muted/80 transition-colors"
            >
              Nouvelle suggestion
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
  unit,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground leading-tight">{label}</span>
        {icon}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
    </Card>
  );
}

function PresenceStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function SuggestionStat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "amber" | "green";
}) {
  const colorMap = {
    amber: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    green: "text-green-600 bg-green-50 dark:bg-green-900/20",
  };
  return (
    <div className={`flex justify-between items-center px-2 py-1 rounded text-xs ${colorMap[color]}`}>
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}