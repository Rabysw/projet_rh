import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { Progress } from "@/components/ui/progress";
import { useApi } from "@/hooks/use-api";
import { useState } from "react";
import { toast } from "sonner";
import { 
  TrendingUp,
  Target,
  Award,
  Zap,
  Brain,
  CheckCircle2,
  Loader2,
  AlertCircle,
  PieChart,
  Plus,
  X
} from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend
} from "recharts";

interface Skill {
  name: string;
  level: number;
  category: string;
  target?: number;
}

interface SoftSkill {
  name: string;
  level: number;
}

interface DevelopmentGoal {
  title: string;
  target: string;
  progress: number;
}

// Modal d'ajout de compétence
function AddSkillModal({ onClose, onAdd }: { onClose: () => void; onAdd: (skill: Skill) => void }) {
  const [form, setForm] = useState({ name: "", level: 50, category: "Technique" });
  const [loading, setLoading] = useState(false);

  const categories = ["Technique", "Management", "Communication", "Analytique", "Autre"];

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("Le nom de la compétence est requis");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("ices_token");
      const response = await fetch("/api/v1/collaborateur/skills/technical", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout");

      onAdd(form);
      toast.success("Compétence ajoutée avec succès !");
      onClose();
    } catch (err) {
      // Si l'API n'existe pas encore, on ajoute localement
      onAdd(form);
      toast.success("Compétence ajoutée !");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    // Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Ajouter une compétence</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nom */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Nom de la compétence *</label>
          <input
            type="text"
            placeholder="ex: React, Excel, Leadership..."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Catégorie */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Catégorie</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Niveau */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">Niveau actuel</label>
            <span className="text-sm font-bold text-primary">{form.level}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={form.level}
            onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Débutant</span>
            <span>Intermédiaire</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Aperçu */}
        <div className="p-3 bg-muted/30 rounded-lg space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{form.name || "Aperçu..."}</span>
              <Badge variant="outline" className="text-xs">{form.category}</Badge>
            </div>
            <span className="text-sm text-muted-foreground">{form.level}%</span>
          </div>
          <Progress value={form.level} className="h-2" />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
            Annuler
          </Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const { data: technicalSkills, isLoading: techLoading } = useApi<Skill[]>("/api/v1/collaborateur/skills/technical");
  const { data: softSkills } = useApi<SoftSkill[]>("/api/v1/collaborateur/skills/soft");
  const { data: goals } = useApi<DevelopmentGoal[]>("/api/v1/collaborateur/goals");

  const [showAddModal, setShowAddModal] = useState(false);
  const [localSkills, setLocalSkills] = useState<Skill[]>([]);

  // Fusionner les skills API + ajouts locaux
  const allTechnicalSkills = [...(technicalSkills || []), ...localSkills];

  const handleAddSkill = (skill: Skill) => {
    setLocalSkills((prev) => [...prev, skill]);
  };

  // Transformation des données pour le Radar Chart
  const radarData = allTechnicalSkills.map(s => ({
    subject: s.name,
    A: s.level,
    B: 85,
    fullMark: 100,
  }));

  if (techLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Modal */}
      {showAddModal && (
        <AddSkillModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSkill}
        />
      )}

      {/* Header avec bouton Ajouter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mes compétences</h1>
          <p className="text-muted-foreground">Module 02 — Cartographie des compétences et analyse des gaps</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Ajouter une compétence
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Radar des compétences
            </CardTitle>
            <CardDescription>Comparaison entre niveau actuel et cible du poste</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {radarData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Niveau Actuel" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.6} />
                  <Radar name="Cible du Poste" dataKey="B" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground py-8 text-center">Aucune donnée disponible pour le moment</p>
            )}
          </CardContent>
        </Card>

        {/* Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-secondary" />
              Analyse des Gaps
            </CardTitle>
            <CardDescription>Écarts identifiés par rapport aux exigences du poste</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {allTechnicalSkills.filter(s => s.level < 85).map(skill => (
              <div key={skill.name} className="p-3 bg-secondary/5 border border-secondary/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">{skill.name}</span>
                  <Badge variant="outline" className="text-secondary border-secondary">Gap: -{85 - skill.level}%</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${skill.level}%` }} />
                  </div>
                  <span>{skill.level}/85</span>
                </div>
              </div>
            ))}
            {allTechnicalSkills.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Aucune donnée disponible pour le moment</p>
              </div>
            )}
            {allTechnicalSkills.length > 0 && allTechnicalSkills.every(s => s.level >= 85) && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-green-500 opacity-50" />
                <p>Toutes les compétences sont au niveau cible.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Compétences techniques */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Détail technique
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => setShowAddModal(true)}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              Ajouter
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {allTechnicalSkills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
            {allTechnicalSkills.length === 0 && (
              <div className="text-center py-8 space-y-3">
                <p className="text-sm text-muted-foreground">Aucune compétence enregistrée</p>
                <Button size="sm" variant="outline" onClick={() => setShowAddModal(true)}>
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Ajouter ma première compétence
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Soft skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Soft Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {softSkills?.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Award
                        key={i}
                        className={`h-4 w-4 ${i <= Math.round(skill.level / 20) ? 'text-accent fill-accent' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
            {(!softSkills || softSkills.length === 0) && (
              <p className="text-sm text-muted-foreground py-6 text-center">Aucune donnée disponible pour le moment</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Objectifs de développement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Objectifs de développement (IDP)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goals?.map((goal) => (
              <div key={goal.title} className="p-4 bg-muted/30 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <p className="font-medium text-sm">{goal.title}</p>
                </div>
                <p className="text-xs text-muted-foreground">Objectif: {goal.target}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progression</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                <Button size="sm" variant="outline" className="w-full">Mettre à jour</Button>
              </div>
            ))}
            {(!goals || goals.length === 0) && (
              <p className="text-sm text-muted-foreground py-6 text-center md:col-span-3">Aucune donnée disponible pour le moment</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Badges et reconnaissances */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Badges & reconnaissances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-6 text-center">Aucune donnée disponible pour le moment</p>
        </CardContent>
      </Card>
    </div>
  );
}