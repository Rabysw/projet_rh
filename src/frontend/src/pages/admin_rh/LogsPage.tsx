import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { FileText, Search, Filter, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/shared/Badge";
import { useState } from "react";
import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function LogsPage() {
  const { data: logs, isLoading } = useApi<any[]>("/api/v1/admin-rh/logs");
  const [search, setSearch] = useState("");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  const filteredLogs = logs?.filter(log => 
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Logs d'Audit</h1>
          <p className="text-muted-foreground">Historique des actions effectuées sur la plateforme</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>Dernières activités</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un log..." 
                className="pl-9" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs?.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    log.type === 'danger' ? 'bg-red-100 text-red-600' : 
                    log.type === 'auth' ? 'bg-blue-100 text-blue-600' : 
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">{log.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">{new Date(log.date).toLocaleString()}</p>
                  <Badge variant="outline" className="mt-1 capitalize">{log.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
