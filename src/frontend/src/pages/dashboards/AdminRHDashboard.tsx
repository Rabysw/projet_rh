import { useIcesAuth } from "@/hooks/use-ices-auth";
import { useApi } from "@/hooks/use-api";
import { useCompanyConfig } from "@/contexts/CompanyConfigContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Settings,
  Shield,
  FileText,
  Key,
  Activity,
  Database,
  Loader2
} from "lucide-react";

export default function AdminRHDashboard() {
  const { user } = useIcesAuth();
  const { config } = useCompanyConfig();
  const { data, isLoading } = useApi<any>("/api/v1/dashboard/admin");

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const kpis = data?.kpis || { total_users: 0, active_users: 0, roles_configured: 0 };

  return (
    <div className="space-y-6">
      {/* Header */}
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
            <CardTitle className="text-sm font-medium">Rôles configurés</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.roles_configured}</div>
            <p className="text-xs text-muted-foreground">profils actifs</p>
          </CardContent>
        </Card>
      </div>

      {/* Administration système */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Administration système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <Database className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <p className="font-medium">Base de données</p>
              <p className="text-sm text-muted-foreground">Opérationnelle</p>
              <p className="text-xs text-accent">99.9% uptime</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="font-medium">Sécurité</p>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-xs text-accent">0 incidents</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-accent" />
              <p className="font-medium">Gestion utilisateurs</p>
              <p className="text-sm text-muted-foreground">105 comptes</p>
              <p className="text-xs text-muted-foreground">85 actifs</p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <Key className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <p className="font-medium">Permissions</p>
              <p className="text-sm text-muted-foreground">5 rôles</p>
              <p className="text-xs text-muted-foreground">12 modules</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Données d'administration détaillées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">
              Aucune donnée disponible pour le moment
            </p>
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
            <Button className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Créer utilisateur</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Shield className="h-6 w-6" />
              <span className="text-sm">Gérer permissions</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">Configurer système</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Database className="h-6 w-6" />
              <span className="text-sm">Backup données</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}