import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApi, apiFetch } from "@/hooks/use-api";
import { toast } from "sonner";
import { 
  Calendar, 
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Loader2
} from "lucide-react";

interface TeamLeaveRequest {
  id: number;
  employee: string;
  type: string;
  start: string;
  end: string;
  days: number;
  status: string;
  reason: string;
}

export default function TeamLeavePage() {
  const [filter, setFilter] = useState("all");
  const { data: leaveRequests, isLoading, refetch } = useApi<TeamLeaveRequest[]>("/api/v1/manager/leaves");
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectComment, setRejectComment] = useState("");
  const [isRejectSubmitting, setIsRejectSubmitting] = useState(false);

  const handleAction = async (id: number, action: 'approve') => {
    try {
      await apiFetch(`/api/v1/manager/leaves/${id}/${action}`, {
        method: "POST"
      });
      toast.success(action === 'approve' ? "Demande approuvée" : "Demande rejetée");
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
      // Le backend actuel ne prend pas de body. On transmet le commentaire en query param.
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

  const filtered = filter === "all" 
    ? leaveRequests || [] 
    : (leaveRequests || []).filter(r => r.status === filter);

  const pendingCount = (leaveRequests || []).filter(r => r.status === "pending").length;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Congés & absences — Équipe</h1>
          <p className="text-muted-foreground">Validez ou refusez les demandes de votre équipe</p>
        </div>
        <Badge variant="outline" className="text-secondary border-secondary text-lg px-4 py-2">
          <Clock className="h-4 w-4 mr-2" />
          {pendingCount} demandes en attente
        </Badge>
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("all")}
          className="gap-1"
        >
          <Filter className="h-3 w-3" />
          Toutes
        </Button>
        <Button 
          variant={filter === "pending" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("pending")}
          className="gap-1"
        >
          <Clock className="h-3 w-3" />
          En attente
        </Button>
        <Button 
          variant={filter === "approved" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("approved")}
          className="gap-1"
        >
          <CheckCircle2 className="h-3 w-3" />
          Approuvées
        </Button>
      </div>

      {/* Liste des demandes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Demandes de congés
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rejectingId !== null && (
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 space-y-3">
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
          {filtered.map((request) => (
            <div key={request.id} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {request.employee.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{request.employee}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.type} — {request.start} → {request.end} ({request.days} jours)
                    </p>
                    <p className="text-xs text-muted-foreground">Motif: {request.reason}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {request.status === "pending" ? (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-1 text-destructive border-destructive hover:bg-destructive"
                        onClick={() => {
                          setRejectingId(request.id);
                          setRejectComment("");
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                        Refuser
                      </Button>
                      <Button 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleAction(request.id, 'approve')}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approuver
                      </Button>
                    </>
                  ) : (
                    <Badge className={`${request.status === 'approved' ? 'bg-accent text-accent' : 'bg-destructive text-destructive'} hover:bg-opacity-90 gap-1`}>
                      <CheckCircle2 className="h-3 w-3" />
                      {request.status === 'approved' ? 'Approuvée' : 'Refusée'}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calendrier visuel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Vue calendaire — Juin 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(d => (
              <div key={d} className="font-medium text-muted-foreground py-2">{d}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
              const isLeave = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].includes(day);
              const isRtt = [20].includes(day);
              return (
                <div 
                  key={day} 
                  className={`p-2 rounded-lg ${
                    isLeave ? 'bg-secondary text-secondary' : 
                    isRtt ? 'bg-secondary text-secondary' : 
                    'bg-muted/30'
                  }`}
                >
                  {day}
                  {isLeave && <p className="text-xs mt-1">S.Bernard</p>}
                  {isRtt && <p className="text-xs mt-1">N.Leroy</p>}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-secondary rounded"></div>
              <span>Congés</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-secondary rounded"></div>
              <span>RTT</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
