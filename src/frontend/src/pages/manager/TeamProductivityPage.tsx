import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { TrendingUp } from "lucide-react";

interface KPI {
  label: string;
  current: number;
  target: number;
  unit: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  progress: number;
  deadline: string;
}

export default function TeamProductivityPage() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedKpis, setEditedKpis] = useState<KPI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("ices_token");
        const response = await fetch("/api/v1/manager/team/productivity", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        setKpis(data.kpis);
        setEditedKpis(data.kpis);
        setProjects(data.projects);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Productivité de l'Équipe</h1>
          <p className="text-muted-foreground">Module 08 — Indicateurs de performance et ranking collectif</p>
        </div>
        <Button className="gap-2" onClick={() => setShowModal(true)}>
          <TrendingUp className="h-4 w-4" />
          Éditer les cibles
        </Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Éditer les cibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedKpis.map((kpi, index) => (
                <div key={kpi.label}>
                  <label className="text-sm font-medium">{kpi.label}</label>
                  <input
                    type="number"
                    value={kpi.target}
                    onChange={(e) => {
                      const updated = [...editedKpis];
                      updated[index] = { ...updated[index], target: Number(e.target.value) };
                      setEditedKpis(updated);
                    }}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </div>
              ))}
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>Annuler</Button>
                <Button onClick={() => { setKpis(editedKpis); setShowModal(false); }}>Sauvegarder</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-2xl font-bold">{kpi.current}{kpi.unit}</p>
                  <p className="text-xs text-muted-foreground">Cible: {kpi.target}{kpi.unit}</p>
                </div>
                <div className="text-sm">
                  {kpi.current >= kpi.target ? (
                    <span className="text-green-600">✓ OK</span>
                  ) : (
                    <span className="text-red-600">✗ À atteindre</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projets */}
      <Card>
        <CardHeader>
          <CardTitle>Projets en cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{project.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.status === "on_track" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div className="bg-blue-500 h-2 rounded" style={{ width: `${project.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{project.progress}% • Deadline: {project.deadline}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}