import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { ClipboardList, Plus, BarChart, Users, Send } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";

import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function EnquetesPage() {
  const { data: surveys, isLoading } = useApi<any[]>("/api/v1/resp-rh/surveys");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Enquêtes & Sondages</h1>
          <p className="text-muted-foreground">Mesurez le climat social et recueillez les avis</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle Enquête
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {surveys?.map((s) => (
          <Card key={s.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-primary" />
                <CardTitle>{s.title}</CardTitle>
              </div>
              <Badge className={s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {s.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Taux de participation</span>
                    <span className="font-bold">{Math.round((s.responses/s.total)*100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${(s.responses/s.total)*100}%` }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.responses} réponses sur {s.total} collaborateurs</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <BarChart className="h-4 w-4" />
                    Analyses
                  </Button>
                  {s.status === 'Active' && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Send className="h-4 w-4" />
                      Relancer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
