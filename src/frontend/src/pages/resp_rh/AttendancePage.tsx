import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/input";
import { useApi, apiFetch } from "@/hooks/use-api";
import { 
  Clock, 
  Search,
  Calendar,
  Filter,
  ArrowRight,
  ArrowLeft,
  FileUp,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Pointage {
  id: number;
  employee_id: number;
  employee_name: string;
  date: string;
  arrival: string;
  departure: string;
  location: string;
  status: "present" | "absent" | "late" | "leave" | "mission";
  overtime: number;
  has_justificatif: boolean;
}

export default function AttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { data: pointages, isLoading, refetch } = useApi<Pointage[]>(`/api/v1/resp-rh/pointage?date=${date}`);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdatePointage = async (id: number, field: string, value: string) => {
    try {
      await apiFetch(`/api/v1/resp-rh/pointage/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: value })
      });
      toast.success("Pointage mis à jour");
      refetch();
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present": return <Badge className="bg-green-500 text-white">Présent</Badge>;
      case "absent": return <Badge variant="destructive">Absent</Badge>;
      case "late": return <Badge className="bg-yellow-500 text-white">Retard</Badge>;
      case "leave": return <Badge className="bg-blue-500 text-white">Congé</Badge>;
      case "mission": return <Badge className="bg-purple-500 text-white">Mission</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Présences & Horaires</h1>
          <p className="text-muted-foreground">Suivi des pointages et gestion du temps</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileUp className="h-4 w-4" />
            Importer CSV
          </Button>
          <Button className="gap-2">
            Valider la journée
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2 bg-card p-1 rounded-lg border border-border">
          <Button variant="ghost" size="sm" onClick={() => {
            const d = new Date(date);
            d.setDate(d.getDate() - 1);
            setDate(d.toISOString().split('T')[0]);
          }}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <input 
            type="date" 
            className="bg-transparent border-none text-sm font-medium focus:ring-0"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button variant="ghost" size="sm" onClick={() => {
            const d = new Date(date);
            d.setDate(d.getDate() + 1);
            setDate(d.toISOString().split('T')[0]);
          }}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Rechercher un employé..." />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtrer
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Collaborateur</th>
                  <th className="px-4 py-3 text-left font-medium">Arrivée</th>
                  <th className="px-4 py-3 text-left font-medium">Départ</th>
                  <th className="px-4 py-3 text-left font-medium">Lieu</th>
                  <th className="px-4 py-3 text-left font-medium">Statut</th>
                  <th className="px-4 py-3 text-left font-medium">Heures Sup.</th>
                  <th className="px-4 py-3 text-left font-medium">Justificatif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pointages?.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{p.employee_name}</td>
                    <td className="px-4 py-3">
                      <input 
                        type="time" 
                        className="bg-muted/30 border-none rounded px-2 py-1"
                        value={p.arrival}
                        onChange={(e) => handleUpdatePointage(p.id, "arrival", e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="time" 
                        className="bg-muted/30 border-none rounded px-2 py-1"
                        value={p.departure}
                        onChange={(e) => handleUpdatePointage(p.id, "departure", e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select 
                        className="bg-muted/30 border-none rounded px-2 py-1 text-xs"
                        value={p.location || "Siège"}
                        onChange={(e) => handleUpdatePointage(p.id, "location", e.target.value)}
                      >
                        <option value="Siège">Siège</option>
                        <option value="Télétravail">Télétravail</option>
                        <option value="Client">Client</option>
                        <option value="Mission">Mission</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(p.status)}</td>
                    <td className="px-4 py-3 text-accent font-bold">+{p.overtime}h</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="gap-2">
                        {p.has_justificatif ? <CheckCircle2 size={14} className="text-emerald-500" /> : <FileUp size={14} />}
                        {p.has_justificatif ? "Voir" : "Upload"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
