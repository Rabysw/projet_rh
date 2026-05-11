import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApi } from "@/hooks/use-api";
import { downloadFile } from "@/lib/download";
import { toast } from "sonner";
import { 
  FileText, 
  Download,
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Loader2
} from "lucide-react";

interface Payslip {
  id: number;
  month: string;
  gross: number;
  net: number;
  date: string;
  deductions: Array<{ label: string; amount: number; percent: number }>;
}

export default function PayslipsPage() {
  const { data: payslips, isLoading } = useApi<Payslip[]>("/api/v1/collaborateur/payslips");
  
  const latestPayslip = payslips?.[0];
  const deductions = latestPayslip?.deductions || [];
  const gross = latestPayslip?.gross ?? 0;
  const net = latestPayslip?.net ?? 0;

  const handleDownload = async (payslipId: number, month: string) => {
    try {
      await downloadFile(
        `/documents/generate/payslip/${payslipId}`,
        `bulletin_${month.replaceAll(" ", "_")}.pdf`,
      );
      toast.success("Téléchargement lancé");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur de téléchargement");
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
          <h1 className="text-3xl font-bold text-foreground">Mes fiches de paie</h1>
          <p className="text-muted-foreground">Consultez et téléchargez vos bulletins de paie</p>
        </div>
      </div>

      {/* Résumé salaire */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salaire brut mensuel</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gross.toLocaleString("fr-FR")} FCFA</div>
            <p className="text-xs text-muted-foreground">{latestPayslip?.month ?? "-"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salaire net mensuel</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{net.toLocaleString("fr-FR")} FCFA</div>
            <p className="text-xs text-muted-foreground">Après déductions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prime annuelle moy.</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(gross * 0.12).toLocaleString("fr-FR")} FCFA</div>
            <p className="text-xs text-muted-foreground">estimation (à confirmer RH)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des fiches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Historique des fiches de paie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payslips?.map((payslip) => (
                <div key={payslip.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{payslip.month}</p>
                      <p className="text-xs text-muted-foreground">Émise le {payslip.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{payslip.net.toLocaleString()} XOF</p>
                      <p className="text-xs text-muted-foreground">Net</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => handleDownload(payslip.id, payslip.month)}
                    >
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Décomposition du dernier salaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {latestPayslip?.month ?? "Dernier bulletin"} — Détail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Salaire brut</span>
                <span className="text-sm font-medium">{gross.toLocaleString("fr-FR")} FCFA</span>
              </div>
              <div className="pt-2 border-t space-y-2">
                {deductions.map((ded) => (
                  <div key={ded.label} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{ded.label} ({ded.percent}%)</span>
                    <span className="text-sm text-destructive">-{ded.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Total déductions</span>
                  <span className="text-sm font-bold text-destructive">
                    -{deductions.reduce((s, d) => s + d.amount, 0).toLocaleString("fr-FR")}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold">Salaire net</span>
                  <span className="text-base font-bold text-accent">{net.toLocaleString("fr-FR")} FCFA</span>
                </div>
              </div>
            </div>
            <Button
              className="w-full"
              variant="outline"
              disabled={!latestPayslip}
              onClick={() =>
                latestPayslip ? handleDownload(latestPayslip.id, latestPayslip.month) : undefined
              }
            >
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
