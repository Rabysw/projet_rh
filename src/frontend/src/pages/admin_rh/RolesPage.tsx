import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Shield, Key, CheckCircle2, AlertCircle, Users } from "lucide-react";
import { Badge } from "@/components/shared/Badge";

import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function RolesPage() {
  const { data: roles, isLoading } = useApi<any[]>("/api/v1/admin-rh/roles");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rôles & Permissions</h1>
        <p className="text-muted-foreground">Gérez les niveaux d'accès et les responsabilités</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {roles?.map((role) => (
          <Card key={role.role}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="capitalize">{role.role.replace('_', ' ')}</CardTitle>
              </div>
              <Badge className={role.color}>{role.count} utilisateurs</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Accès configuré pour le profil {role.role}.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {["Lecture", "Écriture", "Export", "Validation"].map((perm) => (
                  <div key={perm} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{perm}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
