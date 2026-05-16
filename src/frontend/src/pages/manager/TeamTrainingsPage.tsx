import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useApi, apiFetch } from "@/hooks/use-api";
import { toast } from "sonner";
import {
  Book,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Loader2,
  CalendarDays,
  User,
} from "lucide-react";

interface TeamEnrollment {
  id: string;
  employee: string;
  formation: string;
  date_debut: string | null;
  date_fin: string | null;
  statut_formation: string | null;
  statut_inscription: string;
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending:   { label: "En attente",  className: "bg-amber-100 text-amber-800" },
  validated: { label: "Validée",     className: "bg-green-100 text-green-800" },
  rejected:  { label: "Refusée",     className: "bg-red-100 text-red-800" },
  completed: { label: "Terminée",    className: "bg-blue-100 text-blue-800" },
};

export default function TeamTrainingsPage() {
  const [filter, setFilter] = useState("all");
  const { data: enrollments, isLoading, refetch } =
    useApi<TeamEnrollment[]>("/api/v1/manager/trainings");

  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectComment, setRejectComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filtered =
    filter === "all"
      ? enrollments ?? []
      : (enrollments ?? []).filter((e) => e.statut_inscription === filter);

  const pendingCount = (enrollments ?? []).filter(
    (e) => e.statut_inscription === "pending"
  ).length;

  const handleValidate = async (id: string) => {
    try {
      await apiFetch(`/api/v1/manager/trainings/${id}/validate`, { method: "POST" });
      toast.success("Inscription validée");
      refetch();
    } catch {
      toast.error("Erreur lors de la validation");
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectingId) return;
    if (!rejectComment.trim()) {
      toast.error("Un commentaire est obligatoire pour refuser");
      return;
    }
    setSubmitting(true);
    try {
      await apiFetch(
        `/api/v1/manager/trainings/${rejectingId}/reject?comment=${encodeURIComponent(rejectComment)}`,
        { method: "POST" }
      );
      toast.success("Inscription refusée");
      setRejectingId(null);
      setRejectComment("");
      refetch();
    } catch {
      toast.error("Erreur lors du refus");
    } finally {
      setSubmitting(false);
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
          <h1 className="text-3xl font-bold text-foreground">
            Formations équipe
          </h1>
          <p className="text-muted-foreground">
            Validez les demandes d'inscription de votre équipe
          </p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="outline" className="text-amber-600 border-amber-400 text-base px-4 py-2 gap-2">
            <Clock className="h-4 w-4" />
            {pendingCount} inscription{pendingCount > 1 ? "s" : ""} à valider
          </Badge>
        )}
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all",       label: "Toutes",      icon: Filter },
          { key: "pending",   label: "En attente",  icon: Clock },
          { key: "validated", label: "Validées",    icon: CheckCircle2 },
          { key: "rejected",  label: "Refusées",    icon: XCircle },
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            size="sm"
            variant={filter === key ? "default" : "outline"}
            onClick={() => setFilter(key)}
            className="gap-1.5"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </Button>
        ))}
      </div>

      {/* Formulaire de refus */}
      {rejectingId && (
        <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 space-y-3">
          <p className="text-sm font-medium">
            Refuser l'inscription #{rejectingId} — commentaire obligatoire
          </p>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm resize-none"
            rows={3}
            value={rejectComment}
            onChange={(e) => setRejectComment(e.target.value)}
            placeholder="Ex: Le budget formation du trimestre est épuisé…"
          />
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setRejectingId(null); setRejectComment(""); }}
              disabled={submitting}
            >
              Annuler
            </Button>
            <Button size="sm" variant="destructive" onClick={handleRejectSubmit} disabled={submitting}>
              {submitting ? "Refus…" : "Confirmer le refus"}
            </Button>
          </div>
        </div>
      )}

      {/* Liste des inscriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Inscriptions aux formations ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              Aucune inscription à afficher.
            </p>
          ) : (
            filtered.map((enrollment) => {
              const statusInfo =
                STATUS_LABELS[enrollment.statut_inscription] ??
                STATUS_LABELS["pending"];
              return (
                <div
                  key={enrollment.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                      {enrollment.employee.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="font-medium text-sm">{enrollment.employee}</p>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Book className="h-3.5 w-3.5" />
                        {enrollment.formation}
                      </p>
                      {enrollment.date_debut && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <CalendarDays className="h-3 w-3" />
                          {enrollment.date_debut}
                          {enrollment.date_fin ? ` → ${enrollment.date_fin}` : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className={`${statusInfo.className} text-xs`}>
                      {statusInfo.label}
                    </Badge>
                    {enrollment.statut_inscription === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-destructive border-destructive hover:bg-destructive/10"
                          onClick={() => {
                            setRejectingId(enrollment.id);
                            setRejectComment("");
                          }}
                        >
                          <XCircle className="h-4 w-4" />
                          Refuser
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => handleValidate(enrollment.id)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Valider
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}