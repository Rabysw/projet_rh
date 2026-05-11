import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/progress";
import { useApi } from "@/hooks/use-api";
import { 
  Award, 
  TrendingUp,
  Zap,
  Target,
  Loader2
} from "lucide-react";

interface TeamSkillStat {
  skill: string;
  total: number;
  certified: number;
  in_progress: number;
}

interface MemberSkill {
  name: string;
  role: string;
  skills: number;
  certifications: number;
  gaps: string[];
  performance: number;
}

export default function TeamSkillsPage() {
  const { data: teamSkills, isLoading } = useApi<TeamSkillStat[]>("/api/v1/manager/skills/stats");
  const { data: memberSkills } = useApi<MemberSkill[]>("/api/v1/manager/skills/members");

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
          <h1 className="text-3xl font-bold text-foreground">Compétences équipe</h1>
          <p className="text-muted-foreground">Cartographie des compétences et plan de développement</p>
        </div>
        <Button variant="outline">Exporter</Button>
      </div>

      {/* Vue globale */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compétences totales</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">dans l'équipe</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifiées</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">28% du total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En formation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">cette année</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition par compétence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Répartition par compétence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamSkills?.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <span className="text-xs text-muted-foreground">
                    {skill.certified}/{skill.total} certifiés
                  </span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: skill.total }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 flex-1 rounded-full ${
                        i < skill.certified ? 'bg-accent' : 
                        i < skill.certified + skill.in_progress ? 'bg-secondary' : 
                        'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-accent">{skill.certified} certifiés</span>
                  <span className="text-secondary">{skill.in_progress} en cours</span>
                  <span className="text-muted-foreground">{skill.total - skill.certified - skill.in_progress} à former</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Par membre */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Par membre — Gaps à combler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {memberSkills?.map((member) => (
              <div key={member.name} className="p-3 bg-muted/30 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{member.performance}%</p>
                    <p className="text-xs text-muted-foreground">perf.</p>
                  </div>
                </div>
                
                {member.gaps.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-muted-foreground">Gaps:</span>
                    {member.gaps.map((gap) => (
                      <Badge key={gap} variant="outline" className="text-xs text-destructive border-destructive">
                        {gap}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <Badge variant="default" className="bg-accent text-accent text-xs">
                    Compétences complètes
                  </Badge>
                )}
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{member.skills} compétences</span>
                  <span>{member.certifications} certifiées</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
