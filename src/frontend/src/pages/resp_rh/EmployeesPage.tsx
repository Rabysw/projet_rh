import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/use-api";
import { useNavigate } from "@tanstack/react-router";
import { 
  Users, 
  Search,
  Filter,
  Plus,
  FileText,
  Eye,
  Loader2
} from "lucide-react";

interface Employee {
  id: number;
  name: string;
  role: string;
  dept: string;
  status: string;
  contract: string;
  hired: string;
}

interface EmployeeStats {
  total: number;
  active: number;
  on_leave: number;
  new_this_month: number;
}

export default function EmployeesPage() {
  const { data: employees, isLoading } = useApi<Employee[]>("/api/v1/resp-rh/employees");
  const { data: stats } = useApi<EmployeeStats>("/api/v1/resp-rh/employees/stats");
  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold text-foreground">Dossiers du personnel</h1>
          <p className="text-muted-foreground">Gérez les dossiers des collaborateurs</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau collaborateur
        </Button>
      </div>

      {/* Filtres */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Rechercher un collaborateur..." />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtrer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total || 424}</div>
            <p className="text-xs text-muted-foreground">collaborateurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats?.active || 398}</div>
            <p className="text-xs text-muted-foreground">ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En congé</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats?.on_leave || 18}</div>
            <p className="text-xs text-muted-foreground">actuellement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats?.new_this_month || 8}</div>
            <p className="text-xs text-muted-foreground">ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Liste des collaborateurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {employees?.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.role} — {emp.dept}</p>
                    <p className="text-xs text-muted-foreground">Embauché le {emp.hired}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={emp.contract === "CDI" ? "default" : "outline"} className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    {emp.contract}
                  </Badge>
                  {emp.status === "on_leave" ? (
                    <Badge variant="outline" className="text-secondary border-secondary text-xs">En congé</Badge>
                  ) : (
                    <Badge variant="default" className="bg-accent text-accent hover:bg-accent/90 text-xs">Actif</Badge>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="gap-1"
                    onClick={() => navigate({ to: `/employees/${emp.id}` })}
                  >
                    <Eye className="h-3 w-3" />
                    Voir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
