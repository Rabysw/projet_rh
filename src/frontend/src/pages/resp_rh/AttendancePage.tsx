import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { Input } from "@/components/ui/input";
import { useApi, apiFetch } from "@/hooks/use-api";
import {
  Search,
  ArrowRight,
  ArrowLeft,
  FileUp,
  Loader2,
  CheckCircle2,
  Plus,
  X,
  Clock,
  Calendar,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useMemo } from "react";
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

const STATUS_OPTIONS = ["present", "absent", "late", "leave", "mission"] as const;

// ─── Add Pointage Modal ───────────────────────────────────────────────────────

function AddPointageModal({
  open,
  onClose,
  date,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  date: string;
  onCreated: () => void;
}) {
  const { data: employees } = useApi<{ id: number; name: string }[]>(
    "/api/v1/resp-rh/employees"
  );
  const [form, setForm] = useState({
    employee_id: "",
    arrival: "08:00",
    departure: "17:00",
    location: "Siège",
    status: "present",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.employee_id) return toast.error("Sélectionnez un employé");
    setLoading(true);
    try {
      await apiFetch("/api/v1/resp-rh/pointage", {
        method: "POST",
        body: JSON.stringify({ ...form, date }),
      });
      toast.success("Pointage enregistré");
      onCreated();
      onClose();
    } catch (e: any) {
      toast.error(e.message || "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Marquer une présence</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-muted-foreground">
          Date : <strong>{new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</strong>
        </p>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Employé *</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={form.employee_id}
            onChange={(e) => setForm((f) => ({ ...f, employee_id: e.target.value }))}
          >
            <option value="">Sélectionner...</option>
            {employees?.map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Statut *</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="present">Présent</option>
            <option value="absent">Absent</option>
            <option value="late">Retard</option>
            <option value="leave">Congé</option>
            <option value="mission">Mission</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Arrivée</label>
            <input
              type="time"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.arrival}
              onChange={(e) => setForm((f) => ({ ...f, arrival: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Départ</label>
            <input
              type="time"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.departure}
              onChange={(e) => setForm((f) => ({ ...f, departure: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Lieu</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          >
            <option value="Siège">Siège</option>
            <option value="Télétravail">Télétravail</option>
            <option value="Client">Client</option>
            <option value="Mission">Mission</option>
          </select>
        </div>

        <div className="flex gap-3 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>Annuler</Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 size={14} className="animate-spin mr-2" />}
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    present: { label: "Présent", cls: "bg-emerald-500 text-white" },
    absent: { label: "Absent", cls: "bg-rose-500 text-white" },
    late: { label: "Retard", cls: "bg-amber-500 text-white" },
    leave: { label: "Congé", cls: "bg-blue-500 text-white" },
    mission: { label: "Mission", cls: "bg-purple-500 text-white" },
  };
  const s = map[status] ?? { label: status, cls: "" };
  return <Badge className={s.cls}>{s.label}</Badge>;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const { data: pointages, isLoading, refetch } = useApi<Pointage[]>(
    `/api/v1/resp-rh/pointage?date=${date}`
  );
  const { data: employees } = useApi<any[]>("/api/v1/resp-rh/managers");

  const filtered = useMemo(() => {
    if (!pointages) return [];
    if (!search) return pointages;
    const s = search.toLowerCase();
    return pointages.filter((p) => p.employee_name.toLowerCase().includes(s));
  }, [pointages, search]);

  const missingEmployees = useMemo(() => {
    if (!employees || !pointages) return [];
    const pointedIds = new Set(pointages.map((p) => p.employee_id));
    return employees.filter((e) => !pointedIds.has(e.id));
  }, [employees, pointages]);

  const handleUpdatePointage = async (id: number, field: string, value: string) => {
    try {
      await apiFetch(`/api/v1/resp-rh/pointage/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: value }),
      });
      toast.success("Pointage mis à jour");
      refetch();
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleMarkPresent = async (employeeId: number) => {
    try {
      await apiFetch("/api/v1/resp-rh/pointage", {
        method: "POST",
        body: JSON.stringify({ 
          employee_id: employeeId, 
          date: date,
          arrival: "08:00",
          status: "present"
        }),
      });
      toast.success("Employé marqué comme présent");
      refetch();
    } catch (err) {
      toast.error("Erreur lors du marquage");
    }
  };

  const shiftDate = (delta: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + delta);
    setDate(d.toISOString().split("T")[0]);
  };

  const stats = useMemo(() => {
    if (!pointages) return null;
    return {
      total: pointages.length,
      present: pointages.filter((p) => p.status === "present").length,
      absent: pointages.filter((p) => p.status === "absent").length,
      late: pointages.filter((p) => p.status === "late").length,
    };
  }, [pointages]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Présences & Horaires</h1>
          <p className="text-muted-foreground">Suivi des pointages et gestion du temps</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FileUp className="h-4 w-4" />
            Importer CSV
          </Button>
          <Button className="gap-2" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Marquer présence
          </Button>
        </div>
      </div>

      {/* Stats rapides */}
      {stats && (
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Total", value: stats.total, cls: "bg-muted/40 border-border" },
            { label: "Présents", value: stats.present, cls: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400" },
            { label: "Absents", value: stats.absent, cls: "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-400" },
            { label: "Retards", value: stats.late, cls: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400" },
          ].map(({ label, value, cls }) => (
            <div key={label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${cls}`}>
              <span>{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3 items-center flex-wrap">
        {/* Date picker */}
        <div className="flex items-center gap-1 bg-background border border-border rounded-lg p-1">
          <Button variant="ghost" size="sm" onClick={() => shiftDate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <input
            type="date"
            className="bg-transparent border-none text-sm font-medium focus:ring-0 outline-none px-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button variant="ghost" size="sm" onClick={() => shiftDate(1)}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Rechercher un employé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearch("")}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : !filtered.length ? (
            <p className="text-sm text-muted-foreground text-center py-12">
              {search ? "Aucun résultat pour cette recherche" : "Aucun pointage pour cette date"}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Collaborateur</th>
                    <th className="px-4 py-3 text-left font-medium">Arrivée</th>
                    <th className="px-4 py-3 text-left font-medium">Départ</th>
                    <th className="px-4 py-3 text-left font-medium">Lieu</th>
                    <th className="px-4 py-3 text-left font-medium">Statut</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{p.employee_name}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase text-muted-foreground font-bold">Matin (Entrée)</label>
                          <input
                            type="time"
                            className="bg-muted/30 border border-transparent hover:border-border focus:border-primary rounded px-2 py-1 text-sm outline-none transition-colors"
                            value={p.arrival || ""}
                            onChange={(e) => handleUpdatePointage(p.id, "arrival", e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase text-muted-foreground font-bold">Soir (Sortie)</label>
                          <input
                            type="time"
                            className="bg-muted/30 border border-transparent hover:border-border focus:border-primary rounded px-2 py-1 text-sm outline-none transition-colors"
                            value={p.departure || ""}
                            onChange={(e) => handleUpdatePointage(p.id, "departure", e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className="bg-muted/30 border border-transparent hover:border-border focus:border-primary rounded px-2 py-1 text-xs outline-none transition-colors"
                          value={p.location || "Siège"}
                          onChange={(e) => handleUpdatePointage(p.id, "location", e.target.value)}
                        >
                          <option>Siège</option>
                          <option>Télétravail</option>
                          <option>Client</option>
                          <option>Mission</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs text-muted-foreground italic">Pointé</span>
                      </td>
                    </tr>
                  ))}
                  {missingEmployees.map((emp) => (
                    <tr key={`missing-${emp.id}`} className="hover:bg-muted/20 transition-colors opacity-80">
                      <td className="px-4 py-3 font-medium">{emp.first_name} {emp.last_name}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">—</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">—</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">—</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Absent</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 gap-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          onClick={() => handleMarkPresent(emp.id)}
                        >
                          <CheckCircle2 size={14} />
                          Présent
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <AddPointageModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        date={date}
        onCreated={refetch}
      />
    </div>
  );
}