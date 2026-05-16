import { useIcesAuth } from "@/contexts/AuthContext";
import { useApi, apiFetch } from "@/hooks/use-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Briefcase,
  BarChart3,
  AlertTriangle,
  Loader2,
  Bell,
  Book,
  ChevronRight,
  Clock,
} from "lucide-react";

export default function ManagerDashboard() {
  const { user } = useIcesAuth();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useApi<any>("/api/v1/dashboard/manager");
  const { data: notifications } = useApi<any[]>("/api/v1/manager/notifications?unread_only=true" as any);
  const { data: trainings } = useApi<any[]>("/api/v1/manager/trainings");

  const unreadNotifs = (notifications ?? []).length;
  const pendingTrainings = (trainings ?? []).filter((t: any) => t.statut_inscription === "pending").length;

  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectComment, setRejectComment] = useState("");
  const [isRejectSubmitting, setIsRejectSubmitting] = useState(false);

  const handleApprove = async (id: number) => {
    try {
      await apiFetch(`/api/v1/manager/leaves/${id}/approve`, { method: "POST" });
      toast.success("Demande approuvée");
      refetch();
    } catch {
      toast.error("Erreur lors du traitement de la demande");
    }
  };

  const submitReject = async () => {
    if (!rejectingId) return;
    const comment = rejectComment.trim();
    if (!comment) {
      toast.error("Commentaire obligatoire pour refuser");
      return;
    }
    setIsRejectSubmitting(true);
    try {
      await apiFetch(
        `/api/v1/manager/leaves/${rejectingId}/reject?comment=${encodeURIComponent(comment)}`,
        { method: "POST" },
      );
      toast.success("Demande rejetée");
      setRejectingId(null);
      setRejectComment("");
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors du refus");
    } finally {
      setIsRejectSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord équipe</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.full_name} — Espace Manager
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collaborateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.kpis?.nb_collaborateurs ?? "—"}</div>
            <p className="text-xs text-muted-foreground">sous votre responsabilité</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Congés à valider</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.kpis?.conges_a_valider ?? "—"}</div>
            <p className="text-xs text-muted-foreground">en attente de validation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de présence</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.kpis?.taux_presence != null ? `${data.kpis.taux_presence}%` : "—"}
            </div>
            <p className="text-xs text-muted-foreground">ce mois-ci</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions en attente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Actions en attente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rejectingId !== null && (
            <div className="mb-4 p-4 rounded-lg border border-destructive/30 bg-destructive/5 space-y-3">
              <p className="text-sm font-medium text-foreground">
                Refuser la demande #{rejectingId} — commentaire obligatoire
              </p>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm resize-none"
                rows={3}
                value={rejectComment}
                onChange={(e) => setRejectComment(e.target.value)}
                placeholder="Ex: Période critique, merci de proposer une autre date."
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setRejectingId(null); setRejectComment(""); }}
                  disabled={isRejectSubmitting}
                >
                  Annuler
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={submitReject}
                  disabled={isRejectSubmitting}
                >
                  {isRejectSubmitting ? "Refus..." : "Confirmer le refus"}
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {data?.actions_en_attente?.map((action: any) => (
              <div
                key={action.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    Demande de {action.type_conge} — {action.collaborateur}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Du {action.date_debut} au {action.date_fin} ({action.nb_jours} jours)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Soumis il y a {action.soumis_il_y_a}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <Button
                    size="sm"
                    className="bg-accent hover:bg-accent"
                    onClick={() => handleApprove(action.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Approuver
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => { setRejectingId(action.id); setRejectComment(""); }}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Refuser
                  </Button>
                </div>
              </div>
            ))}
            {data?.actions_en_attente?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Aucune action en attente.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Calendrier équipe */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendrier équipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>

        {/* Évaluations en retard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              Évaluations en retard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>

        {/* Widget Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {unreadNotifs > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                  {unreadNotifs}
                </span>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              onClick={() => navigate({ to: "/team-notifications" })}
            >
              Voir tout
              <ChevronRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            {unreadNotifs === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                Aucune nouvelle notification
              </p>
            ) : (
              <div className="space-y-2">
                {(notifications ?? []).slice(0, 4).map((n: any) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/40"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {n.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Widget Formations équipe */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Formations équipe
              {pendingTrainings > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white">
                  {pendingTrainings}
                </span>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs gap-1"
              onClick={() => navigate({ to: "/team-trainings" })}
            >
              Gérer
              <ChevronRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            {!trainings || trainings.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                Aucune inscription en cours
              </p>
            ) : (
              <div className="space-y-2">
                {trainings.slice(0, 4).map((t: any) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/40"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{t.employee}</p>
                      <p className="text-xs text-muted-foreground truncate">{t.formation}</p>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                        t.statut_inscription === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : t.statut_inscription === "validated"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.statut_inscription === "pending"
                        ? "En attente"
                        : t.statut_inscription === "validated"
                        ? "Validée"
                        : "Refusée"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Avancement des Projets */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Avancement des Projets
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => navigate({ to: "/projects" })}
            >
              Voir Kanban
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}