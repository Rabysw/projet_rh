import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/progress";
import { useApi, apiFetch } from "@/hooks/use-api";
import { useState } from "react";
import { toast } from "sonner";
import { 
  BookOpen, 
  CheckCircle2, 
  Clock,
  Award,
  Play,
  Plus,
  Loader2,
  PlayCircle,
  GraduationCap,
  Star,
  MessageSquare
} from "lucide-react";

interface Training {
  id: number;
  title: string;
  status: string;
  date: string;
  duration: string;
  progress: number;
  evaluated?: boolean;
}

interface AvailableTraining {
  id: number;
  title: string;
  category: string;
  duration: string;
  deadline: string;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
}

export default function TrainingsPage() {
  const { data: myTrainings, isLoading: trainingsLoading, refetch } = useApi<Training[]>("/api/v1/collaborateur/trainings");
  const { data: availableTrainings } = useApi<AvailableTraining[]>("/api/v1/collaborateur/available-trainings");
  const { data: certificates } = useApi<Certificate[]>("/api/v1/collaborateur/certificates");
  const [isSubmitting, setIsSubmitting] = useState<number | null>(null);
  const [showEvaluation, setShowEvaluation] = useState<number | null>(null);

  const handleRegister = async (trainingId: number) => {
    setIsSubmitting(trainingId);
    try {
      await apiFetch("/api/v1/collaborateur/trainings/inscription", {
        method: "POST",
        body: JSON.stringify({ id: trainingId })
      });
      toast.success("Inscription réussie !");
      refetch();
    } catch (err) {
      toast.error("Erreur lors de l'inscription");
    } finally {
      setIsSubmitting(null);
    }
  };

  const handleDownloadCertificate = async (id: number, title: string) => {
    try {
      const { downloadFile } = await import("@/lib/download");
      await downloadFile(`/api/v1/documents/generate/training/${id}`, `certificat_${title.replaceAll(" ", "_")}.pdf`);
      toast.success("Téléchargement lancé");
    } catch (err) {
      toast.error("Erreur lors du téléchargement");
    }
  };

  const handleSubmitEvaluation = async (trainingId: number) => {
    try {
      await apiFetch(`/api/v1/collaborateur/trainings/${trainingId}/evaluate`, {
        method: "POST",
        body: JSON.stringify({ rating: 5, comment: "Excellente formation" })
      });
      toast.success("Évaluation envoyée. Merci pour votre retour !");
      setShowEvaluation(null);
      refetch();
    } catch (err) {
      toast.error("Erreur lors de l'envoi");
    }
  };

  if (trainingsLoading) {
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
          <h1 className="text-3xl font-bold text-foreground">Mes formations</h1>
          <p className="text-muted-foreground">Module 10 — Développement des compétences et évaluation post-formation</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Formations complétées</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">depuis 2022</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <PlayCircle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">40h restantes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heures de formation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86h</div>
            <p className="text-xs text-muted-foreground">cette année</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mes formations en cours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5" />
              Mes formations en cours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myTrainings?.filter(t => t.status !== "Terminée").map((training) => (
              <div key={training.id} className="p-3 bg-muted/30 rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{training.title}</p>
                    <p className="text-xs text-muted-foreground">{training.duration} — {training.date}</p>
                  </div>
                  <Badge variant="outline" className="text-secondary border-secondary">
                    {training.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progression</span>
                    <span>{training.progress}%</span>
                  </div>
                  <Progress value={training.progress} className="h-2" />
                </div>
                <Button size="sm" variant="outline" className="w-full">Continuer</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Formations disponibles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Formations recommandées
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableTrainings?.map((training) => (
              <div key={training.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{training.title}</p>
                  <p className="text-xs text-muted-foreground">{training.category} — {training.duration}</p>
                  <p className="text-xs text-secondary">Inscription avant {training.deadline}</p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleRegister(training.id)}
                  disabled={isSubmitting === training.id}
                >
                  {isSubmitting === training.id ? "..." : "S'inscrire"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Formations Complétées & Évaluation (Module 10) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            Formations Complétées
          </CardTitle>
          <CardDescription>Évaluez vos formations pour nous aider à nous améliorer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myTrainings?.filter(t => t.status === "Terminée").map(training => (
              <div key={training.id} className="p-4 border border-border rounded-lg bg-card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-sm">{training.title}</h4>
                    <p className="text-xs text-muted-foreground">Complétée le {training.date}</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 border-none">100%</Badge>
                </div>
                
                {showEvaluation === training.id ? (
                  <div className="space-y-3 bg-muted/30 p-3 rounded-md animate-in fade-in slide-in-from-top-1">
                    <p className="text-xs font-medium">Quelle note donneriez-vous à cette formation ?</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="h-4 w-4 text-amber-500 fill-amber-500 cursor-pointer" />
                      ))}
                    </div>
                    <textarea 
                      className="w-full text-xs p-2 rounded border border-border bg-background"
                      placeholder="Votre commentaire (facultatif)..."
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSubmitEvaluation(training.id)}>Envoyer</Button>
                      <Button size="sm" variant="ghost" onClick={() => setShowEvaluation(null)}>Annuler</Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => setShowEvaluation(training.id)}
                    disabled={training.evaluated}
                  >
                    <MessageSquare size={14} />
                    {training.evaluated ? "Déjà évaluée" : "Évaluer la formation"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Mes certificats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certificates?.map((cert) => (
              <div key={cert.id} className="p-4 bg-muted/30 rounded-lg text-center">
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium text-sm">{cert.title}</p>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground">Obtenu le {cert.date}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => handleDownloadCertificate(cert.id, cert.title)}
                >
                  Télécharger
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
