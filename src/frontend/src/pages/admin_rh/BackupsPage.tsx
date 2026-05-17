import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Database, RefreshCw, CheckCircle2, History, Cloud } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";

import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function BackupsPage() {
  const { data: backups, isLoading } = useApi<any[]>("/api/v1/admin-rh/backups");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sauvegardes & Restauration</h1>
          <p className="text-muted-foreground">Sécurisez vos données RH avec des backups réguliers</p>
        </div>
        <Button className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Lancer une sauvegarde
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statut global</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Protégé</div>
            <p className="text-xs text-muted-foreground mt-1">Dernier backup réussi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stockage Cloud</CardTitle>
            <Cloud className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Supabase S3</div>
            <p className="text-xs text-muted-foreground mt-1">Réplication activée</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prochaine sauvegarde</CardTitle>
            <Database className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">00:00</div>
            <p className="text-xs text-muted-foreground mt-1">Planifiée (Journalier)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historique des sauvegardes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {backups?.map((b) => (
              <div key={b.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{b.name}</p>
                  <p className="text-sm text-muted-foreground">{b.date} • {b.size}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-700">{b.status}</Badge>
                  <Button variant="ghost" size="sm">Restaurer</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
