import { Card, StatCard } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { CardSkeleton } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { PageHeader } from "@/components/shared/PageHeader";
import { useApi } from "@/hooks/use-api";
import { useCompanyConfig } from "@/contexts/CompanyConfigContext";
import { downloadFile } from "@/lib/download";
import { toast } from "sonner";
import { 
  FileText, 
  Download,
  TrendingUp,
  Users,
  BookOpen,
  Smile,
  Shield
} from "lucide-react";
import { useMemo, useState } from "react";

interface Report {
  id: number;
  title: string;
  type: string;
  date: string;
  size: string;
  status: string;
}

interface KpiSnapshot {
  label: string;
  value: string;
  change: string;
}

export default function ReportsPage() {
  const { config } = useCompanyConfig();
  const currency = config?.currency || "FCFA";
  const { data: reports, isLoading, error, refetch } = useApi<Report[]>("/api/v1/direction/reports");
  const { data: kpis } = useApi<KpiSnapshot[]>("/api/v1/direction/kpis");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [year, setYear] = useState<string>("2024");

  const queryParams = useMemo(() => {
    const qs = new URLSearchParams();
    if (departmentId) qs.set("department_id", departmentId);
    if (year) qs.set("year", year);
    return qs.toString();
  }, [departmentId, year]);

  const handleExport = async (path: string, filename: string) => {
    try {
      const url = queryParams ? `${path}?${queryParams}` : path;
      await downloadFile(`/api/v1${url}`, filename);
      toast.success("Export lancé");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur d'export");
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage onRetry={refetch} title="Erreur de chargement des rapports" />;
  }

  return (
    <div className="space-y-6" data-ocid="reports.page">
      <PageHeader 
        title="Rapports & Exports" 
        subtitle="Consultez et téléchargez les rapports stratégiques et bilans sociaux"
      />

      {/* Filtres export */}
      <Card>
        <h3 className="font-display font-semibold text-sm text-foreground mb-4">Filtres d'export</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Département (optionnel)</label>
            <input
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
              placeholder="Saisir ID Département"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Année fiscale</label>
            <input
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => handleExport("/reports/export/etat-personnel/pdf", "etat_personnel.pdf")}
        >
          <FileText className="h-6 w-6" />
          <span className="text-xs font-semibold">Bilan social (PDF)</span>
        </Button>
        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => handleExport("/documents/generate/certificate", `rapport_formations_${year}.pdf`)}
        >
          <BookOpen className="h-6 w-6" />
          <span className="text-xs font-semibold">Rapport Formations</span>
        </Button>
        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => handleExport("/reports/export/conges/excel", `rapport_conges_${year}.xlsx`)}
        >
          <Smile className="h-6 w-6" />
          <span className="text-xs font-semibold">Enquêtes Satisfaction</span>
        </Button>
        <Button
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => handleExport("/reports/export/etat-personnel/excel", "etat_personnel.xlsx")}
        >
          <Shield className="h-6 w-6" />
          <span className="text-xs font-semibold">États légaux (Excel)</span>
        </Button>
      </div>

      {/* Liste rapports */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-display font-semibold text-sm text-foreground">Rapports générés disponibles</h3>
        </div>
        <div className="space-y-3">
          {(!reports || reports.length === 0) ? (
            <p className="text-sm text-muted-foreground py-8 text-center">Aucun rapport disponible pour cette période.</p>
          ) : reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{report.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {report.type} — Le {new Date(report.date).toLocaleDateString("fr-FR")} — {report.size}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => handleExport(`/reports/export/${report.id}/pdf`, `${report.title}.pdf`)}
                >
                  <Download className="h-3 w-3" />
                  PDF
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={() => handleExport(`/reports/export/${report.id}/excel`, `${report.title}.xlsx`)}
                >
                  <Download className="h-3 w-3" />
                  Excel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* KPIs snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Masse salariale annuelle"
          value={`4 200 000 ${currency}`}
          icon={<TrendingUp size={18} className="text-primary" />}
        />
        <StatCard 
          label="Coût moyen / collaborateur"
          value={`125 000 ${currency}`}
          icon={<Users size={18} className="text-primary" />}
        />
        <StatCard 
          label="Budget formation utilisé"
          value={`180 000 ${currency}`}
          icon={<BookOpen size={18} className="text-primary" />}
        />
      </div>
    </div>
  );
}
