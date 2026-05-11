import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  TrendingUp, 
  Activity,
  Trophy,
  AlertTriangle
} from "lucide-react";

export default function TeamProductivityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Productivité de l'Équipe</h1>
          <p className="text-muted-foreground">Module 08 — Indicateurs de performance et ranking collectif</p>
        </div>
        <Button className="gap-2">
          <TrendingUp className="h-4 w-4" />
          Éditer les cibles
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Score Global Équipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-6 text-center">Aucune donnée disponible pour le moment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              Meilleure Progression
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-6 text-center">Aucune donnée disponible pour le moment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              Alertes de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground py-6 text-center">Aucune donnée disponible pour le moment</p>
          </CardContent>
        </Card>
      </div>

      {/* Ranking Collectif */}
      <Card>
        <CardHeader>
          <CardTitle>Classement Collectif (Ranking)</CardTitle>
          <CardDescription>Performance globale basée sur les KPIs individuels</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-8 text-center">Aucune donnée disponible pour le moment</p>
        </CardContent>
      </Card>
    </div>
  );
}
