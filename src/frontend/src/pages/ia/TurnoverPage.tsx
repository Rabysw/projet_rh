import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { TrendingUp, AlertTriangle, CheckCircle2, Info, BrainCircuit } from "lucide-react";
import { Badge } from "@/components/shared/Badge";

import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function TurnoverPage() {
  const { data: turnover, isLoading } = useApi<any>("/api/v1/ia/turnover/prediction");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Prédiction du Turnover</h1>
        <p className="text-muted-foreground">Anticipez les départs et fidélisez vos talents grâce à l'analyse prédictive</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Indice de risque global</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{turnover?.global_risk || "0%"}</div>
            <p className="text-xs text-orange-700 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Analyse en temps réel
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Salariés à risque (IA)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{turnover?.risk_by_dept?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1 italic">Score {'>'} 70/100</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" />
              Précision modèle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground mt-1 italic">Basé sur 12 mois de données</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Analyse par département
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {turnover?.risk_by_dept?.map((r: any) => (
              <div key={r.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full border-4 border-muted flex items-center justify-center text-xs font-bold" style={{
                    borderColor: r.score > 70 ? '#ef4444' : r.score > 40 ? '#f97316' : '#22c55e'
                  }}>
                    {r.score}%
                  </div>
                  <div>
                    <h3 className="font-bold">{r.name}</h3>
                    <p className="text-xs text-muted-foreground">{r.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={r.risk === 'Élevé' ? 'bg-red-100 text-red-700' : r.risk === 'Modéré' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}>
                    {r.risk}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
