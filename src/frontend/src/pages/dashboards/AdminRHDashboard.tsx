import { useIcesAuth } from "@/contexts/AuthContext";
import { useApi } from "@/hooks/use-api";
import { useCompanyConfig } from "@/contexts/CompanyConfigContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useNavigate } from "@tanstack/react-router";
import { 
  Users, 
  Settings,
  Shield,
  FileText,
  Key,
  Activity,
  Database,
  Loader2,
  Clock,
  FileDown
} from "lucide-react";

export default function AdminRHDashboard() {
  const { user } = useIcesAuth();
  const navigate = useNavigate();
  const { config } = useCompanyConfig();
  const { data, isLoading } = useApi<any>("/api/v1/dashboard/admin");

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const kpis = data?.kpis || { total_users: 0, active_users: 0, roles_configured: 0, conges_en_attente: 0 };

  return (
    <div className="space-y-6">
      {/* ... (Header et KPIs inchangés) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord global</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.full_name} - Espace Administrateur RH
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total collaborateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total_users}</div>
            <p className="text-xs text-muted-foreground">collaborateurs actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.active_users}</div>
            <p className="text-xs text-muted-foreground">comptes actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Congés en attente</CardTitle>
            <Shield className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.conges_en_attente || 0}</div>
            <p className="text-xs text-muted-foreground">demandes à valider</p>
          </CardContent>
        </Card>
      </div>

      {/* Administration système & Congés récents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Clock className="h-5 w-5" />
              Demandes de congés récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.pending_leaves?.length > 0 ? (
                data.pending_leaves.map((leave: any) => (
                  <div key={leave.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                    <div>
                      <p className="font-medium text-sm">{leave.collaborateur}</p>
                      <p className="text-xs text-muted-foreground">{leave.type} - {leave.jours} jours dès le {leave.date_debut}</p>
                    </div>
                    <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">En attente</Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4 text-sm">Aucune demande en attente</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Administration système
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center cursor-pointer hover:bg-muted transition-colors" onClick={() => navigate({ to: "/admin-logs" })}>
                <Database className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <p className="font-medium text-sm">Base de données</p>
                <p className="text-xs text-muted-foreground">Logs & Audit</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg text-center cursor-pointer hover:bg-muted transition-colors" onClick={() => navigate({ to: "/admin-securite" })}>
                <Shield className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="font-medium text-sm">Sécurité</p>
                <p className="text-xs text-muted-foreground">Politiques actives</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg text-center cursor-pointer hover:bg-muted transition-colors" onClick={() => navigate({ to: "/admin-users" })}>
                <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="font-medium text-sm">Utilisateurs</p>
                <p className="text-xs text-muted-foreground">{kpis.total_users} comptes</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg text-center cursor-pointer hover:bg-muted transition-colors" onClick={() => navigate({ to: "/admin-roles" })}>
                <Key className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <p className="font-medium text-sm">Permissions</p>
                <p className="text-xs text-muted-foreground">Rôles configurés</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" onClick={() => navigate({ to: "/rh-employees/new" })}>
              <Users className="h-6 w-6" />
              <span className="text-sm">Créer employé</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate({ to: "/admin-roles" })}>
              <Shield className="h-6 w-6" />
              <span className="text-sm">Gérer permissions</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate({ to: "/admin/configuration" })}>
              <Settings className="h-6 w-6" />
              <span className="text-sm">Configurer système</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate({ to: "/admin-sauvegardes" })}>
              <FileDown className="h-6 w-6" />
              <span className="text-sm">Backup données</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

