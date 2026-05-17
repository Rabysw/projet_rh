import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Target, Users, Search, Sparkles, BrainCircuit } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";

import { useApi } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function MatchingPage() {
  const { data: matches, isLoading } = useApi<any[]>("/api/v1/ia/matching/candidates");

  if (isLoading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Matching Compétences IA</h1>
        <p className="text-muted-foreground">Trouvez le candidat idéal pour vos postes ou projets internes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Lancer une recherche de matching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Décrivez le profil recherché ou le projet..." className="flex-1" />
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Analyser & Matcher
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          Meilleures correspondances
        </h2>
        
        {matches?.map((m) => (
          <Card key={m.name} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className="w-24 bg-primary flex flex-col items-center justify-center text-white p-4">
                  <span className="text-2xl font-bold">{m.score}%</span>
                  <span className="text-[10px] uppercase font-bold opacity-80">Match</span>
                </div>
                <div className="flex-1 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.position} • {m.status}</p>
                    <div className="flex gap-2 mt-2">
                      {(m.skills || ["Communication", "Leadership"]).map((s: string) => (
                        <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline">Voir le profil</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
