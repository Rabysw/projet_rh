import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useApi } from "@/hooks/use-api";
import { useNavigate } from "@tanstack/react-router";
import { 
  Users, 
  Mail, 
  Calendar,
  Phone,
  TrendingUp,
  Award,
  Loader2
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  status: string;
  skills: string[];
  performance: number;
}

interface TeamStats {
  total_members: number;
  active: number;
  on_leave: number;
  total_skills_certified: number;
  avg_performance: number;
  attendance_rate: number;
  performance_change: string;
}

export default function TeamPage() {
  const { data: teamMembers, isLoading } = useApi<TeamMember[]>("/api/v1/manager/team");
  const { data: teamStats } = useApi<TeamStats>("/api/v1/manager/stats");
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleSeeProfile = (id: number) => {
    navigate({ to: `/rh-employees/${id}` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mon équipe</h1>
          <p className="text-muted-foreground">{teamStats?.total_members || 8} collaborateurs — Département Technique</p>
        </div>
        <Button>Ajouter un membre</Button>
      </div>

      {/* KPIs équipe */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Effectif</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.total_members || 8}</div>
            <p className="text-xs text-muted-foreground">{teamStats?.on_leave || 2} en congés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance moy.</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.avg_performance || 88}%</div>
            <p className="text-xs text-muted-foreground">{teamStats?.performance_change || "+3%"} vs trimestre dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux présence</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.attendance_rate || 94}%</div>
            <p className="text-xs text-muted-foreground">Mai 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compétences clés</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.total_skills_certified || 24}</div>
            <p className="text-xs text-muted-foreground">certifiées</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des membres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Membres de l'équipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers?.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{member.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-right min-w-[80px]">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-accent" />
                      <span className="text-sm font-medium">{member.performance}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">performance</p>
                  </div>
                  {member.status === "on_leave" ? (
                    <Badge variant="outline" className="text-secondary border-secondary">
                      <Calendar className="h-3 w-3 mr-1" />
                      Congé
                    </Badge>
                  ) : (
                    <Badge variant="default" className="bg-accent text-accent hover:bg-accent">
                      Actif
                    </Badge>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleSeeProfile(member.id)}
                  >
                    Voir profil
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
