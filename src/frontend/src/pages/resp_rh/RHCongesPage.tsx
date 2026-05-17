import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Calendar, CheckCircle2, XCircle, Clock, Filter, Search } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useApi, apiFetch } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";
import { useState, useMemo } from "react";

export default function RHCongesPage() {
  const [search, setSearch] = useState("");
  const [contractFilter, setContractFilter] = useState("");
  const { data: leaves, isLoading, refetch } = useApi<any[]>(`/api/v1/resp-rh/conges${contractFilter ? `?contract_type=${contractFilter}` : ''}`);

  const filteredLeaves = useMemo(() => {
    if (!leaves) return [];
    return leaves.filter(l => l.employee.toLowerCase().includes(search.toLowerCase()));
  }, [leaves, search]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await apiFetch(`/api/v1/resp-rh/conges/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      toast.success(`Demande ${status === 'approved' ? 'approuvée' : 'rejetée'}`);
      refetch();
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestion des Congés (RH)</h1>
        <p className="text-muted-foreground">Validez et suivez l'ensemble des absences de l'entreprise</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaves?.filter(l => l.status === 'pending').length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approuvés (ce mois)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaves?.filter(l => l.status === 'approved').length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Effectif présent</CardTitle>
            <Badge className="bg-blue-100 text-blue-700">92%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">112 / 122</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un collaborateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select 
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={contractFilter}
            onChange={(e) => setContractFilter(e.target.value)}
          >
            <option value="">Tous les contrats</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Internship">Stage</option>
            <option value="Freelance">Freelance</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique & Demandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeaves?.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{leave.employee}</p>
                    <p className="text-sm text-muted-foreground">{leave.type} • {leave.days} jours • du {leave.start} au {leave.end}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={
                    leave.status === 'approved' ? 'bg-green-100 text-green-700' : 
                    leave.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                    'bg-orange-100 text-orange-700'
                  }>
                    {leave.status === 'pending' ? 'En attente' : leave.status === 'approved' ? 'Approuvé' : 'Refusé'}
                  </Badge>
                  {leave.status === 'pending' && (
                    <div className="flex gap-1 ml-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0 text-green-600"
                        onClick={() => handleStatusChange(leave.id, 'approved')}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0 text-red-600"
                        onClick={() => handleStatusChange(leave.id, 'rejected')}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
