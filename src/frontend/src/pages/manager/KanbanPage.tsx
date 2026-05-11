import { useApi, apiFetch } from "@/hooks/use-api";
import { Project, Task } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2,
  LayoutGrid,
  BarChart,
  ArrowRight,
  User
} from "lucide-react";
import { toast } from "sonner";

const COLUMNS = [
  { id: "À faire", title: "À faire", icon: AlertCircle, color: "text-slate-500" },
  { id: "En cours", title: "En cours", icon: Clock, color: "text-amber-500" },
  { id: "Terminé", title: "Terminé", icon: CheckCircle2, color: "text-emerald-500" },
  { id: "Bloqué", title: "Bloqué", icon: AlertCircle, color: "text-rose-500" },
];

export default function KanbanPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [view, setView] = useState<"kanban" | "gantt">("kanban");
  const { data: projects, isLoading: projectsLoading } = useApi<Project[]>("/api/v1/projects/");
  const { data: tasks, isLoading: tasksLoading, refetch: refetchTasks } = useApi<Task[]>(
    selectedProjectId ? `/api/v1/projects/${selectedProjectId}/tasks` : ""
  );

  const isLoading = projectsLoading || tasksLoading;

  useEffect(() => {
    if (!selectedProjectId && projects?.length) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const handleMoveTask = async (taskId: number, newStatus: string) => {
    try {
      await apiFetch(`/api/v1/manager/projects/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus })
      });
      toast.success("Tâche déplacée avec succès");
      refetchTasks();
    } catch (err) {
      toast.error("Erreur lors du déplacement");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion de Projets</h1>
          <p className="text-muted-foreground">Module 09 — Suivi des plans d'action (Kanban & Gantt)</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-muted p-1 rounded-lg">
            <Button 
              variant={view === "kanban" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setView("kanban")}
              className="gap-2"
            >
              <LayoutGrid size={14} /> Kanban
            </Button>
            <Button 
              variant={view === "gantt" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setView("gantt")}
              className="gap-2"
            >
              <BarChart size={14} className="rotate-90" /> Gantt
            </Button>
          </div>
          <select 
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
            value={selectedProjectId || ""}
            onChange={(e) => setSelectedProjectId(Number(e.target.value))}
          >
            {!projects?.length && <option value="">Aucun projet</option>}
            {projects?.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <Button>
            <Plus size={16} />
            Nouveau Projet
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !projects?.length ? (
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground py-8 text-center">Aucune donnée disponible pour le moment</p>
          </CardContent>
        </Card>
      ) : view === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)] overflow-hidden">
          {COLUMNS.map(column => (
            <div key={column.id} className="flex flex-col gap-4 bg-muted/30 rounded-xl p-4 border border-border/50">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <column.icon className={`h-4 w-4 ${column.color}`} />
                  <h3 className="font-semibold text-sm">{column.title}</h3>
                  <Badge variant="secondary" className="ml-1 text-[10px]">
                    {tasks?.filter(t => t.status === column.id).length || 0}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal size={14} />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {tasks?.filter(t => t.status === column.id).map(task => (
                  <TaskCard key={task.id} task={task} onMove={handleMoveTask} />
                ))}
                <Button variant="ghost" className="w-full justify-start text-muted-foreground text-xs h-9 border-dashed border border-border hover:bg-background">
                  <Plus size={12} className="mr-2" />
                  Ajouter une tâche
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <GanttView tasks={tasks || []} />
      )}
    </div>
  );
}

function GanttView({ tasks }: { tasks: Task[] }) {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planning (Gantt Simplifié)</CardTitle>
        <CardDescription>Visualisation temporelle des tâches et jalons</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="flex border-b border-border bg-muted/50">
              <div className="w-64 p-3 font-semibold text-sm border-r border-border">Tâche / Responsable</div>
              {months.map(m => (
                <div key={m} className="flex-1 p-3 font-semibold text-xs text-center border-r border-border last:border-r-0">{m}</div>
              ))}
            </div>
            <div className="divide-y divide-border">
              {tasks.length === 0 && (
                <p className="text-sm text-muted-foreground py-8 text-center">Aucune donnée disponible pour le moment</p>
              )}
              {tasks.map(task => (
                <div key={task.id} className="flex items-center group hover:bg-muted/20 transition-colors">
                  <div className="w-64 p-3 border-r border-border">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <User size={12} className="text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">Collaborateur</span>
                    </div>
                  </div>
                  <div className="flex-1 h-14 relative flex items-center px-4">
                    <div 
                      className={`h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm ${
                        task.status === "Terminé" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{ 
                        width: task.status === "Terminé" ? "100%" : "40%",
                        marginLeft: "0%"
                      }}
                    >
                      {task.status === "Terminé" ? "100%" : "40%"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskCard({ task, onMove }: { task: Task, onMove: (id: number, status: string) => void }) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing border-border/60">
      <CardContent className="p-3 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium leading-tight">{task.title}</h4>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
            <Calendar size={10} />
            {task.deadline}
          </div>
          <Badge 
            variant="outline" 
            className={`text-[10px] px-1.5 py-0 border-none ${
              task.priority === "Haute" ? "bg-rose-50 text-rose-600" : 
              task.priority === "Normale" ? "bg-amber-50 text-amber-600" : 
              "bg-slate-50 text-slate-600"
            }`}
          >
            {task.priority}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
