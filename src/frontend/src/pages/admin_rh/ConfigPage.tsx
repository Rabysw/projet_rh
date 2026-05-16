import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/shared/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, FileSpreadsheet, Loader2, Plus, Save, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useCompanyConfig } from "@/contexts/CompanyConfigContext";

type ImportReport = {
  imported: number;
  errors: string[];
};

const REQUIRED_COLUMNS = [
  "Nom",
  "Prénom",
  "Email pro",
  "Poste",
  "Département",
  "Type contrat",
  "Date embauche",
  "Salaire de base",
  "Email manager",
];

export default function AdminConfigPage() {
  const { config, refreshConfig, updateConfig } = useCompanyConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [newDept, setNewDept] = useState("");
  const [newJob, setNewJob] = useState("");
  const [newHoliday, setNewHoliday] = useState({ date: "", label: "" });
  const [importReport, setImportReport] = useState<ImportReport | null>(null);

  useEffect(() => {
    if (config) setFormData({ ...config });
  }, [config]);

  const canSave = !!formData?.company_name && formData?.departments?.length > 0 && formData?.job_titles?.length > 0;

  const handleSave = async () => {
    if (!canSave) {
      toast.error("Veuillez renseigner les champs obligatoires (nom, départements, postes)");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateConfig(formData);
      await refreshConfig();
      toast.success("Configuration mise à jour avec succès");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur de mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([REQUIRED_COLUMNS]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employes");
    XLSX.writeFile(wb, "template_import_employes.xlsx");
    toast.success("Template téléchargé");
  };

  const validateImportRows = (rows: Record<string, any>[]): ImportReport => {
    const errors: string[] = [];
    let imported = 0;
    rows.forEach((row, idx) => {
      const line = idx + 2;
      for (const col of REQUIRED_COLUMNS) {
        if (row[col] === undefined || row[col] === null || String(row[col]).trim() === "") {
          errors.push(`Ligne ${line}: colonne '${col}' manquante`);
        }
      }

      if (
        row["Département"] &&
        Array.isArray(formData?.departments) &&
        !formData.departments.includes(String(row["Département"]))
      ) {
        errors.push(`Ligne ${line}: département inconnu (${row["Département"]})`);
      }

      if (
        row["Poste"] &&
        Array.isArray(formData?.job_titles) &&
        !formData.job_titles.includes(String(row["Poste"]))
      ) {
        errors.push(`Ligne ${line}: poste inconnu (${row["Poste"]})`);
      }
      if (errors.length === 0 || !errors.some((e) => e.startsWith(`Ligne ${line}:`))) {
        imported += 1;
      }
    });
    return { imported, errors };
  };

  const handleUploadTemplate = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: "" });
      const report = validateImportRows(rows);
      setImportReport(report);
      if (report.errors.length === 0) {
        toast.success(`${report.imported} employé(s) prêt(s) à être importé(s)`);
      } else {
        toast.error("Des erreurs ont été détectées dans le fichier");
      }
    } catch {
      toast.error("Fichier Excel invalide");
    }
  };

  if (!formData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuration entreprise</h1>
          <p className="text-muted-foreground">Modifiez les paramètres globaux et les règles RH.</p>
        </div>
        <Button onClick={handleSave} disabled={isSubmitting} className="gap-2">
          {isSubmitting ? <Loader2 className="animate-spin size-4" /> : <Save size={18} />}
          Sauvegarder les modifications
        </Button>
      </div>

      <Tabs defaultValue="identite" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="identite">Identité</TabsTrigger>
          <TabsTrigger value="travail">Travail</TabsTrigger>
          <TabsTrigger value="regles">Congés & alertes</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="identite">
            <Card>
              <CardHeader>
                <CardTitle>Identité de l'entreprise</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Nom entreprise *">
                  <Input value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} />
                </Field>
                <Field label="Logo URL">
                  <Input value={formData.company_logo_url || ""} onChange={(e) => setFormData({ ...formData, company_logo_url: e.target.value })} />
                </Field>
                <Field label="Couleur principale *">
                  <div className="flex gap-2">
                    <Input type="color" className="w-12 h-10 p-1" value={formData.primary_color} onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })} />
                    <Input value={formData.primary_color} onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })} />
                  </div>
                </Field>
                <Field label="Pays *">
                  <Input value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                </Field>
                <Field label="Devise *">
                  <Input value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })} />
                </Field>
                <Field label="Préfixe téléphone *">
                  <Input value={formData.phone_prefix} onChange={(e) => setFormData({ ...formData, phone_prefix: e.target.value })} />
                </Field>
                <Field label="Fuseau horaire *">
                  <Input value={formData.timezone} onChange={(e) => setFormData({ ...formData, timezone: e.target.value })} />
                </Field>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="travail">
            <Card>
              <CardHeader>
                <CardTitle>Règles de travail</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Heure début *">
                  <Input type="time" value={formData.working_hours_start} onChange={(e) => setFormData({ ...formData, working_hours_start: e.target.value })} />
                </Field>
                <Field label="Heure fin *">
                  <Input type="time" value={formData.working_hours_end} onChange={(e) => setFormData({ ...formData, working_hours_end: e.target.value })} />
                </Field>
                <Field label="Seuil heures sup (h/jour) *">
                  <Input type="number" value={formData.overtime_threshold_hours} onChange={(e) => setFormData({ ...formData, overtime_threshold_hours: Number(e.target.value) })} />
                </Field>
                <Field label="Tolérance retard (min) *">
                  <Input type="number" value={formData.late_alert_threshold_minutes} onChange={(e) => setFormData({ ...formData, late_alert_threshold_minutes: Number(e.target.value) })} />
                </Field>
                <Field label="Retards/mois avant alerte *">
                  <Input type="number" value={formData.late_count_alert_per_month} onChange={(e) => setFormData({ ...formData, late_count_alert_per_month: Number(e.target.value) })} />
                </Field>
                <Field label="Période d'essai (jours) *">
                  <Input type="number" value={formData.probation_duration_days} onChange={(e) => setFormData({ ...formData, probation_duration_days: Number(e.target.value) })} />
                </Field>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regles">
            <Card>
              <CardHeader>
                <CardTitle>Congés & alertes</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Congés payés/an *">
                  <Input type="number" value={formData.leave_days_per_year} onChange={(e) => setFormData({ ...formData, leave_days_per_year: Number(e.target.value) })} />
                </Field>
                <Field label="Report N-1 max *">
                  <Input type="number" value={formData.leave_carry_over_max} onChange={(e) => setFormData({ ...formData, leave_carry_over_max: Number(e.target.value) })} />
                </Field>
                <Field label="Alerte fin contrat (jours) *">
                  <Input type="number" value={formData.contract_alert_days} onChange={(e) => setFormData({ ...formData, contract_alert_days: Number(e.target.value) })} />
                </Field>
                <Field label="Alerte expiration pièce (jours) *">
                  <Input type="number" value={formData.id_expiry_alert_days} onChange={(e) => setFormData({ ...formData, id_expiry_alert_days: Number(e.target.value) })} />
                </Field>
                <Field label="Alerte visite médicale (jours) *">
                  <Input type="number" value={formData.medical_alert_days} onChange={(e) => setFormData({ ...formData, medical_alert_days: Number(e.target.value) })} />
                </Field>
                <Field label="Types de congés actifs">
                  <div className="flex flex-wrap gap-2">
                    {(formData.leave_types || []).map((t: string, i: number) => (
                      <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => setFormData({ ...formData, leave_types: formData.leave_types.filter((x: string) => x !== t) })}>
                        {t} ×
                      </Badge>
                    ))}
                  </div>
                </Field>
                <Field label="Nouveau type congé">
                  <Input
                    placeholder="Ex: Congé sabbatique"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const value = (e.currentTarget.value || "").trim();
                        if (!value) return;
                        if (!formData.leave_types.includes(value)) {
                          setFormData({ ...formData, leave_types: [...formData.leave_types, value] });
                        }
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </Field>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Départements</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input value={newDept} onChange={(e) => setNewDept(e.target.value)} placeholder="Nouveau département" />
                    <Button
                      size="icon"
                      onClick={() => {
                        const v = newDept.trim();
                        if (!v) return;
                        setFormData({ ...formData, departments: [...formData.departments, v] });
                        setNewDept("");
                      }}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  {(formData.departments || []).map((d: string, i: number) => (
                    <RowTag key={`${d}-${i}`} label={d} onDelete={() => setFormData({ ...formData, departments: formData.departments.filter((_: string, idx: number) => idx !== i) })} />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">Postes</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input value={newJob} onChange={(e) => setNewJob(e.target.value)} placeholder="Nouveau poste" />
                    <Button
                      size="icon"
                      onClick={() => {
                        const v = newJob.trim();
                        if (!v) return;
                        setFormData({ ...formData, job_titles: [...formData.job_titles, v] });
                        setNewJob("");
                      }}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  {(formData.job_titles || []).map((j: string, i: number) => (
                    <RowTag key={`${j}-${i}`} label={j} onDelete={() => setFormData({ ...formData, job_titles: formData.job_titles.filter((_: string, idx: number) => idx !== i) })} />
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader><CardTitle className="text-lg">Jours fériés</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input type="date" value={newHoliday.date} onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })} />
                  <Input value={newHoliday.label} onChange={(e) => setNewHoliday({ ...newHoliday, label: e.target.value })} placeholder="Libellé" />
                  <Button
                    onClick={() => {
                      if (!newHoliday.date || !newHoliday.label.trim()) return;
                      setFormData({ ...formData, public_holidays: [...(formData.public_holidays || []), { ...newHoliday }] });
                      setNewHoliday({ date: "", label: "" });
                    }}
                  >
                    Ajouter
                  </Button>
                </div>
                {(formData.public_holidays || []).map((h: any, i: number) => (
                  <RowTag key={`${h.date}-${i}`} label={`${h.date} - ${h.label}`} onDelete={() => setFormData({ ...formData, public_holidays: formData.public_holidays.filter((_: any, idx: number) => idx !== i) })} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import">
            <Card className="border-dashed border-2">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <FileSpreadsheet size={18} /> Import des employés
                </CardTitle>
                <CardDescription>Template Excel + vérification locale des erreurs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="outline" className="gap-2" onClick={handleDownloadTemplate}>
                    <Download size={16} />
                    Télécharger le template Excel
                  </Button>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input cursor-pointer hover:bg-muted">
                    <Upload size={16} />
                    Charger le fichier rempli
                    <input
                      type="file"
                      className="hidden"
                      accept=".xlsx,.xls"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        void handleUploadTemplate(file);
                      }}
                    />
                  </label>
                </div>

                {importReport && (
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm font-semibold">
                      {importReport.imported} importé(s) · {importReport.errors.length} erreur(s)
                    </p>
                    {importReport.errors.length > 0 && (
                      <ul className="mt-2 text-sm text-destructive space-y-1">
                        {importReport.errors.slice(0, 20).map((err, idx) => (
                          <li key={idx}>- {err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}

function RowTag({ label, onDelete }: { label: string; onDelete: () => void }) {
  return (
    <div className="flex items-center justify-between p-2 bg-muted/30 rounded border">
      <span className="text-sm">{label}</span>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDelete}>
        <Trash2 size={14} />
      </Button>
    </div>
  );
}
