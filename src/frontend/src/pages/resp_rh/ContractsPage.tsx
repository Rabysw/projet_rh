import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useApi, apiFetch } from "@/hooks/use-api";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Loader2,
  X,
  Upload,
  Download,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface Contract {
  id: number;
  employee: string;
  type: string;
  start: string;
  end: string | null;
  status: string;
  alert: string | null;
  contract_url?: string;
}

interface ContractAlerts {
  expiring_30_days: number;
  expiring_60_days: number;
  active: number;
}

// ─── Create Contract Modal ────────────────────────────────────────────────────

function CreateContractModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    employee_id: "",
    type: "CDI",
    start: "",
    end: "",
    salary_base: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch employees for the select
  const { data: employees } = useApi<{ id: number; name: string }[]>(
    "/api/v1/resp-rh/employees"
  );

  const handleSubmit = async () => {
    if (!form.employee_id) return toast.error("Sélectionnez un employé");
    if (!form.start) return toast.error("La date de début est requise");
    if (form.type !== "CDI" && !form.end)
      return toast.error("La date de fin est requise pour ce type de contrat");

    setLoading(true);
    try {
      await apiFetch("/api/v1/resp-rh/contracts", {
        method: "POST",
        body: JSON.stringify({
          employee_id: form.employee_id,
          type: form.type,
          start: form.start,
          end: form.end || undefined,
          salary_base: form.salary_base ? parseFloat(form.salary_base) : undefined,
          notes: form.notes || undefined,
        }),
      });
      toast.success("Contrat créé avec succès");
      onCreated();
      onClose();
      setForm({ employee_id: "", type: "CDI", start: "", end: "", salary_base: "", notes: "" });
    } catch (e: any) {
      toast.error(e.message || "Erreur lors de la création");
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
          <h2 className="text-lg font-semibold">Nouveau contrat</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Employé */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Employé *</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={form.employee_id}
            onChange={(e) => setForm((f) => ({ ...f, employee_id: e.target.value }))}
          >
            <option value="">Sélectionner un employé...</option>
            {employees?.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Type de contrat *</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
          >
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Prestation">Prestation</option>
            <option value="Alternance">Alternance</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date de début *</label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.start}
              onChange={(e) => setForm((f) => ({ ...f, start: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              Date de fin {form.type !== "CDI" && "*"}
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.end}
              onChange={(e) => setForm((f) => ({ ...f, end: e.target.value }))}
              disabled={form.type === "CDI"}
            />
          </div>
        </div>

        {/* Salaire */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Salaire de base (FCFA)</label>
          <input
            type="number"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Ex : 450000"
            value={form.salary_base}
            onChange={(e) => setForm((f) => ({ ...f, salary_base: e.target.value }))}
          />
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Notes</label>
          <textarea
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            rows={2}
            placeholder="Remarques optionnelles..."
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
        </div>

        <div className="flex gap-3 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Annuler
          </Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 size={14} className="animate-spin mr-2" />}
            Créer le contrat
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ContractsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: contracts,
    isLoading,
    refetch,
  } = useApi<Contract[]>("/api/v1/resp-rh/contracts");
  const { data: alerts, refetch: refetchAlerts } = useApi<ContractAlerts>(
    "/api/v1/resp-rh/contracts/alerts"
  );

  const handleCreated = () => {
    refetch();
    refetchAlerts();
  };

  const handleUploadClick = (id: number) => {
    setUploadingId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingId) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", "contract");
    formData.append("employee_id", uploadingId.toString());

    try {
      await apiFetch("/api/v1/documents/upload", {
        method: "POST",
        body: formData,
      });
      toast.success("Contrat uploadé avec succès");
      refetch();
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de l'upload");
    } finally {
      setUploadingId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.png"
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contrats & avenants</h1>
          <p className="text-muted-foreground">Gérez les contrats et suivez les échéances</p>
        </div>
        <Button className="gap-2" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          Nouveau contrat
        </Button>
      </div>

      {/* Alertes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-rose-200 bg-rose-50 dark:bg-rose-950/20 dark:border-rose-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-rose-700 dark:text-rose-400">
              Échéances &lt; 30 jours
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700 dark:text-rose-300">
              {alerts?.expiring_30_days ?? "—"}
            </div>
            <p className="text-xs text-rose-500">contrats à traiter</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400">
              Échéances &lt; 60 jours
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">
              {alerts?.expiring_60_days ?? "—"}
            </div>
            <p className="text-xs text-amber-500">à planifier</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Actifs
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              {alerts?.active ?? "—"}
            </div>
            <p className="text-xs text-emerald-500">contrats en cours</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contrats
            {contracts && (
              <span className="text-sm font-normal text-muted-foreground ml-auto">
                {contracts.length} contrat{contracts.length !== 1 ? "s" : ""}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!contracts?.length ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              Aucun contrat trouvé
            </p>
          ) : (
            contracts.map((contract) => (
              <div
                key={contract.id}
                className={`p-4 rounded-lg border transition-colors ${
                  contract.alert
                    ? "bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900"
                    : "bg-muted/30 border-border/50 hover:bg-muted/50"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                      {contract.employee.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{contract.employee}</p>
                      <p className="text-sm text-muted-foreground">
                        {contract.type}
                        {contract.start && ` — à partir du ${new Date(contract.start).toLocaleDateString("fr-FR")}`}
                        {contract.end && ` → ${new Date(contract.end).toLocaleDateString("fr-FR")}`}
                      </p>
                      {contract.alert && (
                        <p className="text-sm text-rose-600 flex items-center gap-1 mt-1">
                          <AlertTriangle className="h-3 w-3" />
                          {contract.alert}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {contract.contract_url ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 text-emerald-600 hover:text-emerald-700"
                        onClick={() => window.open(contract.contract_url, "_blank")}
                      >
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleUploadClick(contract.id)}
                        disabled={uploadingId === contract.id}
                      >
                        {uploadingId === contract.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        Upload
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Voir
                    </Button>
                    <Button size="sm" variant="outline">
                      Renouveler
                    </Button>
                    {contract.alert && (
                      <Button size="sm" variant="destructive">
                        Traiter
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <CreateContractModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}