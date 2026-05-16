import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { Input } from "@/components/ui/input";
import { useApi, apiFetch } from "@/hooks/use-api";
import { Department, ContractType } from "@/types/api";
import { 
  Users, 
  Search,
  Plus,
  Shield,
  Key,
  Mail,
  Loader2,
  Trash2,
  X,
  User as UserIcon,
  Phone,
  Briefcase,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  FileText,
  AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

interface SystemUser {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  role: string;
  status: string;
}

interface RoleStat {
  role: string;
  count: number;
  color: string;
}

export default function UsersPage() {
  const navigate = useNavigate();
  const { data: users, isLoading, refetch } = useApi<SystemUser[]>("/api/v1/admin-rh/users");
  const { data: roles, refetch: refetchRoles } = useApi<RoleStat[]>("/api/v1/admin-rh/roles");

  const [search, setSearch] = useState("");

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    try {
      await apiFetch(`/api/v1/admin-rh/users/${id}`, { method: "DELETE" });
      toast.success("Utilisateur supprimé");
      refetch();
      refetchRoles();
    } catch (err: any) {
      toast.error(err.message || "Erreur de suppression");
    }
  };

  const filteredUsers = users?.filter(u => 
    `${u.prenom} ${u.nom}`.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-foreground">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Administrez les comptes et les rôles</p>
        </div>
        <Button className="gap-2" onClick={() => navigate({ to: "/rh-employees/new" })}>
          <Plus className="h-4 w-4" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Stats rôles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {roles?.map((r) => (
          <Card key={r.role}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{r.count}</p>
              <Badge className={`mt-1 ${r.color}`}>{r.role}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste utilisateurs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Utilisateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10" 
                placeholder="Rechercher un utilisateur..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              {filteredUsers?.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {user.prenom?.charAt(0) || user.email.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.prenom} {user.nom}</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      {user.role}
                    </Badge>
                    {user.status === "active" ? (
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">Actif</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground text-xs">Inactif</Badge>
                    )}
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permissions par rôle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { module: "Dossiers personnel", roles: ["Admin RH", "Resp RH", "Manager"] },
              { module: "Contrats", roles: ["Admin RH", "Resp RH"] },
              { module: "Congés", roles: ["Admin RH", "Resp RH", "Manager", "Collab"] },
              { module: "Fiches de paie", roles: ["Admin RH", "Resp RH", "Collab"] },
              { module: "Admin système", roles: ["Admin RH"] },
            ].map((perm) => (
              <div key={perm.module} className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium">{perm.module}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {perm.roles.map((role) => (
                    <Badge key={role} variant="secondary" className="text-[10px]">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            <Button size="sm" variant="outline" className="w-full">Configuration avancée</Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}