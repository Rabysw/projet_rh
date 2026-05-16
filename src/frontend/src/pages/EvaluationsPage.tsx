import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useApi, apiFetch } from "@/hooks/use-api";
import { useIcesAuth } from "@/contexts/AuthContext";
import { 
  Award, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Loader2, 
  Star,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Target
} from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { toast } from "sonner";

interface Evaluation {
  id: string;
  evaluation_date: string;
  evaluation_type: string;
  score: number;
  status: string;
  comment_manager?: string;
  employee_signed?: boolean;
  rh_signed?: boolean;
}

interface SkillData {
  skill: string;
  current: number;
  target: number;
  gap: number;
  priority: string;
}

export default function EvaluationsPage() {
  const { user } = useIcesAuth();
  const [selectedEval, setSelectedEval] = useState<Evaluation | null>(null);

  // Pour la démo, on utilise l'ID de l'utilisateur s'il est collaborateur
  const employeeId = user?.id || "";

  const { data: evaluations, isLoading: evalsLoading, refetch: refetchEvals } = 
    useApi<Evaluation[]>(`/api/v1/evaluations/list/${employeeId}`);
  
  const { data: skillsRadar } = 
    useApi<any>(`/api/v1/evaluations/competences/radar/${employeeId}`);
  
  const { data: skillGaps } = 
    useApi<SkillData[]>(`/api/v1/evaluations/competences/gaps/${employeeId}`);

  const radarData = skillsRadar?.labels?.map((label: string, index: number) => ({
    subject: label,
    A: skillsRadar.data[index],
    fullMark: 100,
  })) || [];

  const handleSign = async (evalId: string) => {
    try {
      await apiFetch(`/api/v1/evaluations/${evalId}/signer`, { method: "POST" });
      toast.success("Évaluation signée avec succès");
      refetchEvals();
    } catch (err) {
      toast.error("Erreur lors de la signature");
    }
  };

  if (evalsLoading) {
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
          <h1 className="text-3xl font-bold text-foreground">Mes Évaluations & Compétences</h1>
          <p className="text-muted-foreground">Suivez votre performance et l'évolution de vos compétences.</p>
        </div>
        <Button className="gap-2">
          <Target className="h-4 w-4" />
          Objectifs 2024
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar de compétences */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Star className="h-4 w-4 text-primary" />
              Radar de Compétences
            </CardTitle>
            <CardDescription>Visualisation de votre profil technique</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {radarData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Compétences"
                      dataKey="A"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Données non disponibles
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Historique des évaluations */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-primary" />
              Historique des entretiens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evaluations && evaluations.length > 0 ? (
                evaluations.map((ev) => (
                  <div key={ev.id} className="p-4 bg-muted/30 rounded-xl border border-border/50 flex items-center justify-between group hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{ev.evaluation_type}</p>
                        <p className="text-xs text-muted-foreground">
                          Réalisé le {new Date(ev.evaluation_date).toLocaleDateString('fr-FR')}
                        </p>
                        <div className="flex gap-2 mt-1">
                          {ev.employee_signed ? (
                            <Badge variant="outline" className="text-[10px] py-0 h-4 border-emerald-500/50 text-emerald-600 bg-emerald-500/5">Signé</Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] py-0 h-4 border-amber-500/50 text-amber-600 bg-amber-500/5">En attente signature</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold">{ev.score}/100</p>
                        <p className="text-[10px] text-muted-foreground">Score global</p>
                      </div>
                      {!ev.employee_signed ? (
                        <Button size="sm" onClick={() => handleSign(ev.id)} className="h-8">Signer</Button>
                      ) : (
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <ChevronRight size={18} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <Clock className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Aucun entretien passé répertorié.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Analyse des écarts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" />
              Axe de progression
            </CardTitle>
            <CardDescription>Compétences à renforcer selon votre profil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skillGaps && skillGaps.length > 0 ? (
                skillGaps.map((gap) => (
                  <div key={gap.skill} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{gap.skill}</p>
                      <p className="text-xs text-muted-foreground">Cible: {gap.target}% — Actuel: {gap.current}%</p>
                    </div>
                    <Badge variant={gap.priority === "Haute" ? "destructive" : "outline"} className="text-[10px]">
                      {gap.priority}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-sm text-emerald-700">Toutes vos compétences sont au niveau attendu !</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dernier PDI */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertCircle className="h-4 w-4 text-primary" />
              Dernier PDI
            </CardTitle>
            <CardDescription>Plan de Développement Individuel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
              <p className="text-sm font-medium">Actions prévues :</p>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                  Formation avancée sur FastAPI et architectures microservices.
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                  Passage de la certification AWS Cloud Practitioner.
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                  Accompagnement (mentoring) d'un profil junior sur React.
                </li>
              </ul>
              <Button variant="outline" size="sm" className="w-full mt-2 text-xs h-8">
                Voir les détails du PDI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}