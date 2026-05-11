import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/use-api";
import { 
  Users, 
  Search,
  Plus,
  Shield,
  Key,
  Mail,
  Loader2
} from "lucide-react";

interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  last_login: string;
}

interface RoleStat {
  role: string;
  count: number;
  color: string;
}

export default function UsersPage() {
  const { data: users, isLoading } = useApi<SystemUser[]>("/api/v1/admin-rh/users");
  const { data: roles } = useApi<RoleStat[]>("/api/v1/admin-rh/roles");

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
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Créer un compte
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
              <Input className="pl-10" placeholder="Rechercher un utilisateur..." />
            </div>
            <div className="space-y-3">
              {users?.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
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
                      <Badge className="bg-accent text-accent text-xs">Actif</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground text-xs">Inactif</Badge>
                    )}
                    <Button size="sm" variant="outline">
                      <Key className="h-3 w-3" />
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
              Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { module: "Dossiers personnel", roles: ["Admin", "Resp RH", "Manager"] },
              { module: "Contrats", roles: ["Admin", "Resp RH"] },
              { module: "Congés", roles: ["Admin", "Resp RH", "Manager", "Collab"] },
              { module: "Fiches de paie", roles: ["Admin", "Resp RH", "Collab"] },
              { module: "Admin système", roles: ["Admin"] },
            ].map((perm) => (
              <div key={perm.module} className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium">{perm.module}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {perm.roles.map((role) => (
                    <Badge key={role} variant="secondary" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            <Button size="sm" variant="outline" className="w-full">Configurer les rôles</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
