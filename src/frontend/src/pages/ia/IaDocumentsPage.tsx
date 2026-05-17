import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { FilePlus, FileText, Sparkles, Wand2, Download } from "lucide-react";
import { Button } from "@/components/shared/Button";

import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function IaDocumentsPage() {
  const { data: templates, isLoading } = useApi<any[]>("/api/v1/ia/documents/templates");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Génération de Documents IA</h1>
        <p className="text-muted-foreground">Créez des documents juridiques et RH en quelques secondes grâce à l'IA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates?.map((t) => (
          <Card key={t.name} className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{t.name}</h3>
                    <p className="text-sm text-muted-foreground italic flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Généré en {t.time}
                    </p>
                  </div>
                </div>
                <Button size="sm" className="gap-2">
                  <Wand2 className="h-3 w-3" />
                  Générer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-dashed">
        <CardHeader>
          <CardTitle className="text-center">Assistant de rédaction personnalisé</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8">
          <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
            Décrivez le document que vous souhaitez créer et l'IA s'occupe de la structure et du contenu légal.
          </p>
          <Button variant="outline" size="lg" className="rounded-full px-8">
            Démarrer une rédaction libre
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
