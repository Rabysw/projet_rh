import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { FileDown, FileText, Database, Shield, Download } from "lucide-react";
import { Button } from "@/components/shared/Button";

import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function ExportsPage() {
  const { data: exports, isLoading } = useApi<any[]>("/api/v1/direction/exports");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Exports & États Légaux</h1>
        <p className="text-muted-foreground">Générez vos documents administratifs et financiers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exports?.map((exp) => (
          <Card key={exp.name}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="p-3 bg-muted rounded-xl">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{exp.name}</h3>
                    <p className="text-sm text-muted-foreground">Format: {exp.format}</p>
                    <p className="text-xs text-muted-foreground mt-1 italic">Dernier export: {exp.last}</p>
                  </div>
                </div>
                <Button size="icon" variant="outline" className="rounded-full">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Conformité légale (Bénin)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Tous les exports sont conformes aux normes de l'ANIP, de la CNSS et du Code du Travail béninois.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
