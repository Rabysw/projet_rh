import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { useApi } from "@/hooks/use-api";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  Timer,
  TrendingDown,
  Loader2,
  Info,
} from "lucide-react";

interface AttendanceRecord {
  date: string;
  heure_arrivee: string;
  heure_depart: string;
  heures_travaillees: number;
  retard: boolean;
  absent: boolean;
  heures_supp: number;
}

interface AttendanceData {
  heures_semaine: number;
  retards_mois: number;
  absences_mois: number;
  heures_supplementaires: number;
  historique: AttendanceRecord[];
}

export default function PresencesPage() {
  const { data, isLoading } = useApi<AttendanceData>("/api/v1/collaborateur/attendance");

  const stats = {
    heures_semaine: data?.heures_semaine ?? 0,
    retards_mois: data?.retards_mois ?? 0,
    absences_mois: data?.absences_mois ?? 0,
    heures_supplementaires: data?.heures_supplementaires ?? 0,
  };

  const historique: AttendanceRecord[] = data?.historique ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mes présences</h1>
        <p className="text-muted-foreground">
          Consultez vos heures de présence, retards et absences enregistrés par les RH.
        </p>
      </div>

      {/* Bandeau info lecture seule */}
      <div className="flex items-start gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-800 dark:text-blue-300">
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <span>
          Ces données sont en <strong>lecture seule</strong>. Elles sont saisies par les RH à partir des registres de présence ou d'imports Excel. Pour toute anomalie, contactez votre responsable RH.
        </span>
      </div>

      {/* KPIs */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Clock className="h-4 w-4 text-blue-500" />}
              label="Heures cette semaine"
              value={`${stats.heures_semaine}h`}
              sub="semaine en cours"
            />
            <StatCard
              icon={<Timer className="h-4 w-4 text-purple-500" />}
              label="Heures supplémentaires"
              value={`${stats.heures_supplementaires}h`}
              sub="ce mois"
            />
            <StatCard
              icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
              label="Retards"
              value={stats.retards_mois}
              sub="ce mois"
              warn={stats.retards_mois > 2}
            />
            <StatCard
              icon={<TrendingDown className="h-4 w-4 text-rose-500" />}
              label="Absences"
              value={stats.absences_mois}
              sub="ce mois"
              warn={stats.absences_mois > 0}
            />
          </div>

          {/* Historique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Historique du mois
              </CardTitle>
            </CardHeader>
            <CardContent>
              {historique.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Aucune donnée de présence enregistrée pour ce mois.
                </p>
              ) : (
                <div className="space-y-2">
                  {/* En-tête tableau */}
                  <div className="hidden md:grid grid-cols-5 gap-4 px-3 pb-2 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Date</span>
                    <span>Arrivée</span>
                    <span>Départ</span>
                    <span>Heures</span>
                    <span>Statut</span>
                  </div>

                  {historique.map((record, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 items-center px-3 py-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm font-medium">
                        {formatDate(record.date)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {record.heure_arrivee || "—"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {record.heure_depart || "—"}
                      </span>
                      <span className="text-sm font-medium">
                        {record.heures_travaillees
                          ? `${record.heures_travaillees}h`
                          : "—"}
                        {record.heures_supp > 0 && (
                          <span className="ml-1 text-xs text-purple-500">
                            +{record.heures_supp}h supp.
                          </span>
                        )}
                      </span>
                      <div>
                        {record.absent ? (
                          <Badge className="gap-1 bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-100">
                            <TrendingDown className="h-3 w-3" />
                            Absent
                          </Badge>
                        ) : record.retard ? (
                          <Badge className="gap-1 bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100">
                            <AlertCircle className="h-3 w-3" />
                            Retard
                          </Badge>
                        ) : (
                          <Badge className="gap-1 bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100">
                            <CheckCircle2 className="h-3 w-3" />
                            Présent
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

function StatCard({
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
        <CardTitle className="text-xs font-medium text-muted-foreground">{label}</CardTitle>
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

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  } catch {
    return dateStr;
  }
}