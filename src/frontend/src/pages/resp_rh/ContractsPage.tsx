import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApi } from "@/hooks/use-api";
import { 
  FileText, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Loader2
} from "lucide-react";

interface Contract {
  id: number;
  employee: string;
  type: string;
  start: string;
  end: string | null;
  status: string;
  alert: string | null;
}

interface ContractAlerts {
  expiring_30_days: number;
  expiring_60_days: number;
  active: number;
}

export default function ContractsPage() {
  const { data: contracts, isLoading } = useApi<Contract[]>("/api/v1/resp-rh/contracts");
  const { data: alerts } = useApi<ContractAlerts>("/api/v1/resp-rh/contracts/alerts");

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
          <h1 className="text-3xl font-bold text-foreground">Contrats & avenants</h1>
          <p className="text-muted-foreground">Gérez les contrats et suivez les échéances</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau contrat
        </Button>
      </div>

      {/* Alertes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-destructive bg-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Échéances &lt; 30 jours</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">5</div>
            <p className="text-xs text-destructive">contrats à traiter</p>
          </CardContent>
        </Card>
        <Card className="border-secondary bg-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Échéances &lt; 60 jours</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">8</div>
            <p className="text-xs text-secondary">à planifier</p>
          </CardContent>
        </Card>
        <Card className="border-accent bg-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-accent">Actifs</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">410</div>
            <p className="text-xs text-accent">contrats en cours</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contrats récents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {contracts?.map((contract) => (
            <div key={contract.id} className={`p-4 rounded-lg ${contract.alert ? 'bg-destructive border border-destructive' : 'bg-muted/30'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {contract.employee.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{contract.employee}</p>
                    <p className="text-sm text-muted-foreground">
                      {contract.type} — {contract.start} {contract.end ? `→ ${contract.end}` : ""}
                    </p>
                    {contract.alert && (
                      <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                        <AlertTriangle className="h-3 w-3" />
                        {contract.alert}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Voir</Button>
                  <Button size="sm" variant="outline">Renouveler</Button>
                  {contract.alert && <Button size="sm" variant="destructive">Traiter</Button>}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
