import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { Textarea } from "@/components/ui/textarea";
import { useApi, apiFetch } from "@/hooks/use-api";
import { toast } from "sonner";
import { 
  MessageSquare, 
  ThumbsUp,
  Send,
  Clock,
  CheckCircle2,
  Lightbulb,
  Heart,
  Loader2,
  Plus
} from "lucide-react";

interface Suggestion {
  id: number;
  title: string;
  category: string;
  date: string;
  status: string;
  likes: number;
  response: string;
}

interface Category {
  id: string;
  label: string;
  icon: any;
}

const categories: Category[] = [
  { id: "work_env", label: "Environnement de travail", icon: Heart },
  { id: "process", label: "Process & Organisation", icon: Clock },
  { id: "wellness", label: "Bien-être", icon: Lightbulb },
  { id: "idea", label: "Idée & Innovation", icon: MessageSquare },
];

export default function SuggestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("idea");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [mySuggestions, setMySuggestions] = useState<Suggestion[]>([]);
  const { data: suggestions, isLoading, error, refetch } = useApi<Suggestion[]>("/api/v1/collaborateur/suggestions");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Backend: il n'existe pas de POST /api/v1/collaborateur/suggestions (lecture seule).
  // Un endpoint "feedback/doleances" existe en backend mais n'est pas exposé dans main.py.
  const canSubmit = true;

  useEffect(() => {
    if (suggestions) {
      setMySuggestions(suggestions);
    }
  }, [suggestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    const text = message.trim();
    if (!text) {
      toast.error("Veuillez saisir votre suggestion");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/collaborateur/suggestions", {
        method: "POST",
        body: JSON.stringify({
          title: text.substring(0, 50) + (text.length > 50 ? "..." : ""),
          content: text,
          category: selectedCategory,
          anonymous: anonymous
        })
      });
      toast.success("Votre suggestion a été envoyée avec succès !");
      setMessage("");
      refetch();
    } catch (err) {
      toast.error("Erreur lors de l'envoi de la suggestion");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-foreground">Suggestions & Qualité de vie</h1>
          <p className="text-muted-foreground">Partagez vos idées et suivez leur traitement</p>
        </div>
      </div>

      {/* Formulaire de suggestion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Nouvelle suggestion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!canSubmit && (
            <div className="p-3 rounded-lg border border-secondary/30 bg-secondary/10 text-sm text-muted-foreground">
              La soumission est temporairement indisponible: aucun endpoint backend exposé pour envoyer une suggestion.
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-lg border text-center transition-all ${
                  selectedCategory === cat.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <cat.icon className={`h-5 w-5 mx-auto mb-1 ${selectedCategory === cat.id ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className="text-xs font-medium">{cat.label}</p>
              </button>
            ))}
          </div>
          
          <Textarea 
            placeholder="Décrivez votre suggestion en détail..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm text-muted-foreground">Envoyer anonymement</span>
            </label>
            <Button
              className="gap-2"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
              Envoyer la suggestion
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mes suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Mes suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions?.map((suggestion) => (
            <div key={suggestion.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{suggestion.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {categories.find(c => c.id === suggestion.category)?.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{suggestion.date}</span>
                  </div>
                </div>
                {suggestion.status === "implemented" ? (
                  <Badge className="bg-accent text-accent gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Implémenté
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-secondary border-secondary gap-1">
                    <Clock className="h-3 w-3" />
                    En étude
                  </Badge>
                )}
              </div>
              
              <div className="p-3 bg-background rounded border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Réponse ICES: </span>
                  {suggestion.response}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  {suggestion.likes} soutiens
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">Suggestions envoyées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-muted-foreground">Implémentées</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <ThumbsUp className="h-8 w-8 mx-auto mb-2 text-secondary" />
            <p className="text-2xl font-bold">58</p>
            <p className="text-xs text-muted-foreground">Total soutiens reçus</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
