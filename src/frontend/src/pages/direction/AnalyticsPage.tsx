import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { PieChart, BarChart3, LineChart, Target, Brain } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useApi<any>("/api/v1/direction/analytics");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analyses Avancées</h1>
        <p className="text-muted-foreground">Analyses prédictives et répartitions de l'effectif</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Répartition par département
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground italic mb-2">Répartition basée sur l'effectif actuel</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.entries(analytics?.department_distribution || {}).map(([dept, count]) => (
                  <Badge key={dept} variant="outline">{dept}: {count as number}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Objectifs stratégiques
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(analytics?.objectives || []).map((obj: any) => (
              <div key={obj.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{obj.label}</span>
                  <span className="font-bold">{obj.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${obj.progress}%` }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary">
            <Brain className="h-5 w-5" />
            Insights IA : Prédiction de départ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Basé sur les données d'engagement et de présence, l'IA identifie les zones de risque de turnover.
          </p>
          {(analytics?.risk_analysis || []).map((risk: any, i: number) => (
            <div key={i} className="p-4 border border-orange-200 bg-orange-50 rounded-lg flex items-center gap-3">
              <Target className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-orange-800 font-medium">Risque {risk.risk} détecté dans le département {risk.dept} (Score: {risk.score}%)</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
