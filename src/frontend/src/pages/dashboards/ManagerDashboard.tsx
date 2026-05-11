import { useIcesAuth } from "@/hooks/use-ices-auth";
import { useApi, apiFetch } from "@/hooks/use-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { useState } from "react";
import {
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Briefcase,
  BarChart3,
  AlertTriangle,
  Loader2
} from "lucide-react";

export default function ManagerDashboard() {
  const { user } = useIcesAuth();
  // Appel API dynamique vers le backend
  const { data, isLoading, refetch } = useApi<any>("/api/v1/dashboard/manager");
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectComment, setRejectComment] = useState("");
  const [isRejectSubmitting, setIsRejectSubmitting] = useState(false);

  const handleApprove = async (id: number) => {
    try {
      await apiFetch(`/api/v1/manager/leaves/${id}/approve`, {
        method: "POST"
      });
      toast.success("Demande approuvée");
      refetch();
    } catch (err) {
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
            Bienvenue, {user?.full_name} - Espace Manager
          </p>
        </div>
      </div>

      {/* KPI Cards Dynamiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collaborateurs dans l'équipe</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.kpis?.nb_collaborateurs}</div>
            <p className="text-xs text-muted-foreground">sous votre responsabilité</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Congés à valider</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.kpis?.conges_a_valider}</div>
            <p className="text-xs text-muted-foreground">en attente de validation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de présence</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.kpis?.taux_presence}%</div>
            <p className="text-xs text-muted-foreground">ce mois-ci</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions en attente Dynamiques */}
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
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                rows={3}
                value={rejectComment}
                onChange={(e) => setRejectComment(e.target.value)}
                placeholder="Ex: Période critique, merci de proposer une autre date."
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRejectingId(null);
                    setRejectComment("");
                  }}
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
              <div key={action.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Demande de {action.type_conge} - {action.collaborateur}</p>
                  <p className="text-sm text-muted-foreground">Du {action.date_debut} au {action.date_fin} ({action.nb_jours} jours)</p>
                  <p className="text-xs text-muted-foreground">Soumis il y a {action.soumis_il_y_a}</p>
                </div>
                <div className="flex gap-2">
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
                    onClick={() => {
                      setRejectingId(action.id);
                      setRejectComment("");
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Refuser
                  </Button>
                </div>
              </div>
            ))}
            {data?.actions_en_attente?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Aucune action en attente.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Avancement des Projets
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">Voir Kanban</Button>
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