import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
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
  Loader2,
  X,
} from "lucide-react";
import { useState, useDeferredValue } from "react";

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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const deferredSearch = useDeferredValue(search);

  // Build query params
  const params = new URLSearchParams();
  if (deferredSearch) params.set("search", deferredSearch);
  if (statusFilter) params.set("status", statusFilter);
  const query = params.toString();

  const { data: employees, isLoading, error } = useApi<Employee[]>(
      `/api/v1/resp-rh/employees${query ? `?${query}` : ""}`
    );
 
    const stats = {
      total: employees?.length || 0,
      active: employees?.filter(e => e.status !== "on_leave" && e.status !== "inactive").length || 0,
      on_leave: employees?.filter(e => e.status === "on_leave").length || 0,
      new_this_month: employees?.filter(e => {
        if (!e.hired) return false;
        const hireDate = new Date(e.hired);
        const now = new Date();
        return hireDate.getMonth() === now.getMonth() && hireDate.getFullYear() === now.getFullYear();
      }).length || 0
    };
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dossiers du personnel</h1>
          <p className="text-muted-foreground">Gérez les dossiers des collaborateurs</p>
        </div>
        <Button className="gap-2" onClick={() => navigate({ to: "/rh-employees/new" })}>
          <Plus className="h-4 w-4" />
          Nouveau collaborateur
        </Button>
      </div>

      {/* Filtres */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10 pr-8"
            placeholder="Rechercher un collaborateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setSearch("")}
            >
              <X size={14} />
            </button>
          )}
        </div>
        <select
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="on_leave">En congé</option>
          <option value="inactive">Inactif</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats?.total, color: "text-foreground", icon: Users },
          { label: "Actifs", value: stats?.active, color: "text-emerald-600", icon: Users },
          { label: "En congé", value: stats?.on_leave, color: "text-amber-600", icon: Users },
          { label: "Nouveaux", value: stats?.new_this_month, color: "text-blue-600", icon: Users },
        ].map(({ label, value, color, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${color}`}>{value ?? "—"}</div>
              <p className="text-xs text-muted-foreground">collaborateurs</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Liste */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Liste des collaborateurs
            {employees && (
              <span className="text-sm font-normal text-muted-foreground ml-auto">
                {employees.length} résultat{employees.length !== 1 ? "s" : ""}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : !employees?.length ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              {search || statusFilter ? "Aucun résultat pour ces critères" : "Aucun collaborateur trouvé"}
            </p>
          ) : (
            <div className="space-y-2">
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                      {emp.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">{emp.role} — {emp.dept}</p>
                      {emp.hired && (
                        <p className="text-xs text-muted-foreground">
                          Embauché le {new Date(emp.hired).toLocaleDateString("fr-FR")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <Badge variant={emp.contract === "CDI" ? "default" : "outline"} className="text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      {emp.contract}
                    </Badge>
                    {emp.status === "on_leave" ? (
                      <Badge variant="outline" className="text-amber-600 border-amber-400 text-xs">En congé</Badge>
                    ) : (
                      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs">Actif</Badge>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => navigate({ to: `/rh-employees/${emp.id}` })}
                    >
                      <Eye className="h-3 w-3" />
                      Voir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}