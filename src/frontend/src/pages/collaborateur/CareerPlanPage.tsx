import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { Progress } from "@/components/ui/progress";
import { useApi, apiFetch } from "@/hooks/use-api";
import { useIcesAuth } from "@/contexts/AuthContext";
import { 
  TrendingUp,
  Target,
  Calendar,
  History,
  FileSignature,
  Award,
  ArrowRight,
  Loader2,
  Clock,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface CareerPlan {
  objectives: {
    short_term: Array<{ id: number; title: string; deadline: string; status: string }>;
    long_term: Array<{ id: number; title: string; deadline: string; status: string }>;
  };
  entretiens: Array<{
    id: number;
    date: string;
    type: string;
    manager: string;
    signed_employee: boolean;
    signed_manager: boolean;
    timestamp: string | null;
  }>;
  mobilites: Array<{
    date: string;
    type: string;
    poste: string;
    dept: string;
  }>;
}

export default function CareerPlanPage() {
  const { user } = useIcesAuth();
  const { data: career, isLoading, refetch } = useApi<CareerPlan>(`/api/v1/evaluations/career/${user?.id}`);
  const [isSigning, setIsSigning] = useState<number | null>(null);

  const handleSign = async (id: number) => {
    setIsSigning(id);
    try {
      await apiFetch(`/api/v1/evaluations/career/entretiens/${id}/signer`, { method: "POST" });
      toast.success("Signature enregistrée avec succès");
      refetch();
    } catch (err) {
      toast.error("Erreur lors de la signature");
    } finally {
      setIsSigning(null);
    }
  };

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
          <h1 className="text-3xl font-bold text-foreground">Mon Plan de Carrière</h1>
          <p className="text-muted-foreground">Module 04 — Projection et évolution professionnelle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Objectifs Professionnels */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Mes Objectifs (Court & Moyen Terme)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Court terme (1 an)</p>
              <div className="space-y-3">
                {career?.objectives.short_term.map(obj => (
                  <div key={obj.id} className="p-3 bg-muted/30 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{obj.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Échéance: {obj.deadline}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-accent border-accent">{obj.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Moyen terme (3 ans)</p>
              <div className="space-y-3">
                {career?.objectives.long_term.map(obj => (
                  <div key={obj.id} className="p-3 bg-primary/5 border border-primary/20 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{obj.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Projection: {obj.deadline}
                      </p>
                    </div>
                    <Badge variant="default" className="bg-primary">{obj.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historique des Mobilités (Timeline) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Parcours & Mobilités
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative border-l border-border ml-3 space-y-6 pb-2">
              {career?.mobilites.map((mob, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-primary" />
                  <p className="text-xs text-muted-foreground">{mob.date}</p>
                  <p className="text-sm font-bold text-foreground">{mob.type}</p>
                  <p className="text-sm text-muted-foreground">{mob.poste} — {mob.dept}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4 gap-2">
              <TrendingUp className="h-4 w-4" />
              Voir les opportunités internes
            </Button>
          </CardContent>
        </Card>

        {/* Entretiens de Carrière & Signatures */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="h-5 w-5" />
              Entretiens de Carrière
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">Manager</th>
                    <th className="px-4 py-3 text-left font-medium">Signatures</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {career?.entretiens.map(ent => (
                    <tr key={ent.id} className="hover:bg-muted/20">
                      <td className="px-4 py-3 font-medium">{ent.date}</td>
                      <td className="px-4 py-3">{ent.type}</td>
                      <td className="px-4 py-3">{ent.manager}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Badge variant={ent.signed_manager ? "secondary" : "outline"} className={`text-[10px] gap-1 ${ent.signed_manager ? 'bg-green-100 text-green-800' : ''}`}>
                            {ent.signed_manager ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />} Manager
                          </Badge>
                          <Badge variant={ent.signed_employee ? "secondary" : "outline"} className={`text-[10px] gap-1 ${ent.signed_employee ? 'bg-green-100 text-green-800' : ''}`}>
                            {ent.signed_employee ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />} Collaborateur
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {!ent.signed_employee ? (
                          <Button 
                            size="sm" 
                            onClick={() => handleSign(ent.id)}
                            disabled={isSigning === ent.id}
                          >
                            Signer
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">Consulter</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
