import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { BarChart3, TrendingUp, TrendingDown, Users, Award, Calendar } from "lucide-react";

import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function KpiPage() {
  const { data: kpisData, isLoading } = useApi<any>("/api/v1/direction/kpis");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  const kpis = [
    { title: "Masse Salariale", value: kpisData?.masse_salariale || "0 FCFA", change: "+2.4%", trend: "up", icon: TrendingUp },
    { title: "Taux de Turnover", value: kpisData?.turnover || "0%", change: "-1.1%", trend: "down", icon: Users },
    { title: "Satisfaction Salariés", value: kpisData?.satisfaction || "0/5", change: "+0.3", trend: "up", icon: Award },
    { title: "Taux d'Absenteïsme", value: kpisData?.absenteisme || "0%", change: "-0.5%", trend: "down", icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">KPIs Stratégiques</h1>
        <p className="text-muted-foreground">Indicateurs de performance clés pour la Direction</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((k) => (
          <Card key={k.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{k.title}</CardTitle>
              <k.icon className={`h-4 w-4 ${k.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{k.value}</div>
              <p className={`text-xs mt-1 ${k.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {k.change} par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Évolution de l'effectif
          </CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-dashed border-2">
          <p className="text-muted-foreground">Graphique d'évolution en cours de chargement...</p>
        </CardContent>
      </Card>
    </div>
  );
}
