import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useApi, apiFetch } from "@/hooks/use-api";
import { downloadFile } from "@/lib/download";
import { toast } from "sonner";
import {
  FileDown,
  FileText,
  Users,
  BarChart3,
  Calendar,
  TrendingUp,
  Loader2,
  RefreshCw,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface TeamSummary {
  generated_at: string;
  departement: string;
  nb_membres: number;
  membres: {
    id: number;
    nom: string;
    poste: string;
    statut: string;
    conges_pris_mois: number;
    demandes_en_attente: number;
  }[];
  stats: {
    actifs: number;
    en_conge: number;
    total_jours_conges_mois: number;
  };
}

export default function TeamReportsPage() {
  const { data: summary, isLoading, refetch } =
    useApi<TeamSummary>("/api/v1/manager/reports/team-summary");
  const [exporting, setExporting] = useState(false);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const token = localStorage.getItem("ices_token");
      const response = await fetch(
        "/api/v1/manager/reports/export/team-summary/pdf",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Erreur export");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rapport_equipe.pdf";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Rapport PDF téléchargé");
    } catch {
      toast.error("Erreur lors de l'export PDF");
    } finally {
      setExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const membres = summary?.membres ?? [];
  const stats = summary?.stats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Rapports équipe
          </h1>
          <p className="text-muted-foreground">
            Synthèse et exports de votre équipe
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Button
            size="sm"
            onClick={handleExportPDF}
            disabled={exporting}
            className="gap-2"
          >
            {exporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            Exporter PDF
          </Button>
        </div>
      </div>

      {/* KPIs synthèse */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{summary?.nb_membres ?? 0}</p>
                <p className="text-xs text-muted-foreground">Membres</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats?.actifs ?? 0}</p>
                <p className="text-xs text-muted-foreground">Actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats?.en_conge ?? 0}</p>
                <p className="text-xs text-muted-foreground">En congé</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-2xl font-bold">
                  {stats?.total_jours_conges_mois ?? 0}j
                </p>
                <p className="text-xs text-muted-foreground">Congés ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau membres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Détail par membre — {summary?.departement ?? "Équipe"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {membres.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              Aucune donnée disponible.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">
                      Collaborateur
                    </th>
                    <th className="text-left py-3 px-3 text-muted-foreground font-medium">
                      Poste
                    </th>
                    <th className="text-center py-3 px-3 text-muted-foreground font-medium">
                      Statut
                    </th>
                    <th className="text-center py-3 px-3 text-muted-foreground font-medium">
                      Congés (mois)
                    </th>
                    <th className="text-center py-3 px-3 text-muted-foreground font-medium">
                      Dem. en attente
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {membres.map((m, i) => (
                    <tr
                      key={m.id}
                      className={`border-b border-border/40 hover:bg-muted/20 transition-colors ${
                        i % 2 === 0 ? "" : "bg-muted/10"
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                            {m.nom.charAt(0)}
                          </div>
                          <span className="font-medium">{m.nom}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">
                        {m.poste || "—"}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge
                          className={
                            m.statut === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {m.statut === "active" ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                              Actif
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1 inline" />
                              En congé
                            </>
                          )}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-center font-medium">
                        {m.conges_pris_mois}j
                      </td>
                      <td className="py-3 px-3 text-center">
                        {m.demandes_en_attente > 0 ? (
                          <Badge className="bg-amber-100 text-amber-800">
                            {m.demandes_en_attente}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info génération */}
      {summary?.generated_at && (
        <p className="text-xs text-muted-foreground text-right">
          Données générées le{" "}
          {new Date(summary.generated_at).toLocaleString("fr-FR")}
        </p>
      )}
    </div>
  );
}