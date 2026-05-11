import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApi, apiFetch } from "@/hooks/use-api";
import { useCompanyConfig } from "@/contexts/CompanyConfigContext";
import { toast } from "sonner";
import { 
  Calendar, 
  Clock, 
  Plus,
  CheckCircle2,
  XCircle,
  Hourglass,
  Loader2
} from "lucide-react";

interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}

interface LeaveRequest {
  id: number;
  type: string;
  start: string;
  end: string;
  days: number;
  status: string;
}

const balanceIcons: Record<string, typeof Calendar> = {
  "Congés payés": Calendar,
  "RTT": Clock,
  "Maladie": Hourglass,
};

export default function LeavePage() {
  const { config } = useCompanyConfig();
  const leaveTypeOptions =
    config?.leave_types?.length
      ? config.leave_types
      : ["Congé payé", "Maladie", "Sans solde", "Maternité", "Paternité", "Exceptionnel"];
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: leaveTypeOptions[0] ?? "",
    start: "",
    end: "",
    days: 0,
    reason: ""
  });

  useEffect(() => {
    if (!leaveTypeOptions.includes(formData.type)) {
      setFormData((prev) => ({ ...prev, type: leaveTypeOptions[0] ?? "" }));
    }
  }, [leaveTypeOptions, formData.type]);
  
  const { data: leaveBalance, isLoading: balanceLoading, refetch: refetchBalance } = useApi<LeaveBalance[]>("/api/v1/collaborateur/leave-balance");
  const { data: leaveRequests, isLoading: requestsLoading, refetch: refetchRequests } = useApi<LeaveRequest[]>("/api/v1/collaborateur/leave-requests");
  
  const isLoading = balanceLoading || requestsLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/collaborateur/leave-requests", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      toast.success("Demande soumise avec succès");
      setShowForm(false);
      refetchRequests();
    } catch (err) {
      toast.error("Erreur lors de la soumission");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes congés — Formulaire et suivi</h1>
          <p className="text-muted-foreground">Déposez une demande de congé et suivez l'historique de vos absences.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle demande
        </Button>
      </div>

      {/* Solde de congés */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : leaveBalance?.map((leave) => {
          const IconComp = balanceIcons[leave.type] || Calendar;
          return (
            <Card key={leave.type}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{leave.type}</CardTitle>
                <IconComp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leave.remaining}</div>
                <p className="text-xs text-muted-foreground">jours restants sur {leave.total}</p>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(leave.remaining / leave.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{leave.used} jours utilisés</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Formulaire de demande */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle demande de congés</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type de congé</label>
                <select 
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {leaveTypeOptions.map((leaveType) => (
                    <option key={leaveType} value={leaveType}>
                      {leaveType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date de début</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  value={formData.start}
                  onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date de fin</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  value={formData.end}
                  onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nombre de jours</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-border rounded-lg" 
                  placeholder="Auto-calculé" 
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Motif (optionnel)</label>
                <textarea 
                  className="w-full px-3 py-2 border border-border rounded-lg" 
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                ></textarea>
              </div>
              <div className="md:col-span-2 flex gap-2 justify-end">
                <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Annuler</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Soumettre la demande
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Historique des demandes */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des demandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requestsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : leaveRequests?.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{req.type}</p>
                    <p className="text-xs text-muted-foreground">{req.start} → {req.end} ({req.days} jours)</p>
                  </div>
                </div>
                {req.status === "approved" ? (
                  <Badge variant="default" className="gap-1 bg-accent text-accent hover:bg-accent">
                    <CheckCircle2 className="h-3 w-3" />
                    Approuvé
                  </Badge>
                ) : req.status === "pending" ? (
                  <Badge variant="outline" className="gap-1 text-secondary border-secondary">
                    <Hourglass className="h-3 w-3" />
                    En attente
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="h-3 w-3" />
                    Refusé
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
