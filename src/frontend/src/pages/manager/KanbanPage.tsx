import { useApi, apiFetch } from "@/hooks/use-api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { useEffect, useState, useRef } from "react";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  LayoutGrid,
  BarChart2,
  User,
  Flag,
  X,
  ChevronDown,
  FolderKanban,
  Grip,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  name: string;
  description?: string;
  start_date?: string;
  end_date_scheduled?: string;
  status?: string;
}

interface Task {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  status: "À faire" | "En cours" | "Terminé" | "Bloqué";
  priority: "Haute" | "Normale" | "Basse";
  deadline?: string;
  assigned_to?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLUMNS: {
  id: Task["status"];
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  dot: string;
}[] = [
  {
    id: "À faire",
    title: "À faire",
    icon: AlertCircle,
    color: "text-slate-500",
    bg: "bg-slate-50 dark:bg-slate-900/30",
    border: "border-slate-200 dark:border-slate-700",
    dot: "bg-slate-400",
  },
  {
    id: "En cours",
    title: "En cours",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-700",
    dot: "bg-amber-400",
  },
  {
    id: "Terminé",
    title: "Terminé",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-700",
    dot: "bg-emerald-400",
  },
  {
    id: "Bloqué",
    title: "Bloqué",
    icon: AlertCircle,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-700",
    dot: "bg-rose-400",
  },
];

const PRIORITY_STYLES: Record<string, string> = {
  Haute: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  Normale: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Basse: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

// ─── Modal helper ─────────────────────────────────────────────────────────────

function Modal({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Create Project Modal ─────────────────────────────────────────────────────

function CreateProjectModal({ open, onClose, onCreated }: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({ name: "", description: "", start_date: "", end_date_scheduled: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error("Le nom est requis");
    setLoading(true);
    try {
      await apiFetch("/api/v1/projects/", {
        method: "POST",
        body: JSON.stringify(form),
      });
      toast.success("Projet créé avec succès");
      onCreated();
      onClose();
      setForm({ name: "", description: "", start_date: "", end_date_scheduled: "" });
    } catch (e: any) {
      toast.error(e.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Nouveau projet">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Nom du projet *</label>
          <input
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Ex: Refonte RH Q3"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            rows={3}
            placeholder="Description optionnelle..."
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date de début</label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.start_date}
              onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date de fin</label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.end_date_scheduled}
              onChange={e => setForm(f => ({ ...f, end_date_scheduled: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>Annuler</Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
            Créer
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Create Task Modal ────────────────────────────────────────────────────────

function CreateTaskModal({ open, onClose, projectId, defaultStatus, onCreated }: {
  open: boolean;
  onClose: () => void;
  projectId: number;
  defaultStatus: Task["status"];
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Normale" as Task["priority"],
    deadline: "",
    status: defaultStatus,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(f => ({ ...f, status: defaultStatus }));
  }, [defaultStatus]);

  const handleSubmit = async () => {
    if (!form.title.trim()) return toast.error("Le titre est requis");
    setLoading(true);
    try {
      await apiFetch(`/api/v1/projects/${projectId}/tasks`, {
        method: "POST",
        body: JSON.stringify({ ...form, project_id: projectId }),
      });
      toast.success("Tâche créée avec succès");
      onCreated();
      onClose();
      setForm({ title: "", description: "", priority: "Normale", deadline: "", status: defaultStatus });
    } catch (e: any) {
      toast.error(e.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Nouvelle tâche">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Titre *</label>
          <input
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Ex: Rédiger les specs"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            rows={2}
            placeholder="Description optionnelle..."
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Priorité</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.priority}
              onChange={e => setForm(f => ({ ...f, priority: e.target.value as Task["priority"] }))}
            >
              <option value="Haute">Haute</option>
              <option value="Normale">Normale</option>
              <option value="Basse">Basse</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Échéance</label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.deadline}
              onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Colonne</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as Task["status"] }))}
          >
            {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>Annuler</Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
            Créer
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Task Card ─────────────────────────────────────────────────────────────────

function TaskCard({
  task,
  onDragStart,
}: {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: number) => void;
}) {
  const isOverdue =
    task.deadline && task.status !== "Terminé" && new Date(task.deadline) < new Date();

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, task.id)}
      className="group bg-background border border-border/70 rounded-xl p-3.5 space-y-3 shadow-sm hover:shadow-md hover:border-border transition-all cursor-grab active:cursor-grabbing active:opacity-60 active:scale-95"
    >
      {/* Header */}
      <div className="flex items-start gap-2">
        <Grip size={12} className="mt-0.5 text-muted-foreground/40 shrink-0 group-hover:text-muted-foreground transition-colors" />
        <p className="text-sm font-medium leading-snug flex-1">{task.title}</p>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 pl-4">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pl-4 gap-2">
        {task.deadline ? (
          <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
            isOverdue
              ? "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400"
              : "bg-muted text-muted-foreground"
          }`}>
            <Calendar size={9} />
            {new Date(task.deadline).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
          </div>
        ) : (
          <div />
        )}

        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority] ?? ""}`}>
          <Flag size={8} className="inline mr-1" />
          {task.priority}
        </span>
      </div>
    </div>
  );
}

// ─── Kanban Column ─────────────────────────────────────────────────────────────

function KanbanColumn({
  column,
  tasks,
  onDragStart,
  onDrop,
  onAddTask,
}: {
  column: typeof COLUMNS[number];
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: number) => void;
  onDrop: (e: React.DragEvent, status: Task["status"]) => void;
  onAddTask: (status: Task["status"]) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl p-3 border transition-all ${column.bg} ${column.border} ${
        isDragOver ? "ring-2 ring-primary/30 scale-[1.01]" : ""
      }`}
      onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={e => { setIsDragOver(false); onDrop(e, column.id); }}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-1 py-0.5">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column.dot}`} />
          <span className="text-sm font-semibold">{column.title}</span>
          <span className="text-[11px] font-bold bg-background/80 text-muted-foreground px-1.5 py-0.5 rounded-full border border-border/50">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors"
          title="Ajouter une tâche"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[calc(100vh-310px)] pr-0.5">
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
            <column.icon className={`h-6 w-6 mb-2 ${column.color}`} />
            <p className="text-xs text-muted-foreground">Aucune tâche</p>
          </div>
        )}
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}
      </div>

      {/* Add button */}
      <button
        onClick={() => onAddTask(column.id)}
        className="flex items-center gap-2 w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-dashed border-border/60 hover:border-border rounded-xl hover:bg-background/60 transition-all"
      >
        <Plus size={12} />
        Ajouter une tâche
      </button>
    </div>
  );
}

// ─── Gantt View ───────────────────────────────────────────────────────────────

function GanttView({ tasks, project }: { tasks: Task[]; project?: Project }) {
  const today = new Date();
  const startDate = project?.start_date ? new Date(project.start_date) : new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endDate = project?.end_date_scheduled ? new Date(project.end_date_scheduled) : new Date(today.getFullYear(), today.getMonth() + 4, 0);

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  // Build month headers
  const months: { label: string; days: number }[] = [];
  const d = new Date(startDate);
  d.setDate(1);
  while (d <= endDate) {
    const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const rangeStart = d < startDate ? startDate : d;
    const rangeEnd = monthEnd > endDate ? endDate : monthEnd;
    const days = Math.ceil((rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    months.push({
      label: d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }),
      days,
    });
    d.setMonth(d.getMonth() + 1);
  }

  const getBar = (task: Task) => {
    const taskStart = startDate;
    const taskEnd = task.deadline ? new Date(task.deadline) : endDate;
    const left = Math.max(0, (taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;
    const width = Math.min(100 - left, Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100);
    const progress = task.status === "Terminé" ? 100 : task.status === "En cours" ? 45 : task.status === "Bloqué" ? 20 : 0;
    return { left, width: Math.max(width, 2), progress };
  };

  const todayLeft = ((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Planning Gantt</CardTitle>
        <CardDescription>
          {project?.start_date && project?.end_date_scheduled
            ? `${new Date(project.start_date).toLocaleDateString("fr-FR")} → ${new Date(project.end_date_scheduled).toLocaleDateString("fr-FR")}`
            : "Visualisation temporelle des tâches"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header: month labels */}
            <div className="flex border-b border-border bg-muted/40">
              <div className="w-56 shrink-0 px-4 py-2.5 text-xs font-semibold border-r border-border text-muted-foreground">
                Tâche
              </div>
              <div className="flex-1 flex">
                {months.map((m, i) => (
                  <div
                    key={i}
                    className="text-[11px] font-semibold text-center py-2.5 border-r border-border last:border-r-0 text-muted-foreground"
                    style={{ flex: m.days }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            {tasks.length === 0 && (
              <p className="text-sm text-muted-foreground py-12 text-center">Aucune tâche à afficher</p>
            )}
            {tasks.map(task => {
              const bar = getBar(task);
              return (
                <div key={task.id} className="flex items-center group border-b border-border/40 hover:bg-muted/20 transition-colors">
                  <div className="w-56 shrink-0 px-4 py-3 border-r border-border">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        COLUMNS.find(c => c.id === task.status)?.dot ?? "bg-slate-400"
                      }`} />
                      <span className="text-[10px] text-muted-foreground">{task.status}</span>
                    </div>
                  </div>
                  <div className="flex-1 h-12 relative">
                    {/* Today line */}
                    {todayLeft >= 0 && todayLeft <= 100 && (
                      <div
                        className="absolute top-0 bottom-0 w-px bg-primary/40 z-10"
                        style={{ left: `${todayLeft}%` }}
                      />
                    )}
                    {/* Bar */}
                    <div
                      className="absolute top-3 h-6 rounded-full overflow-hidden shadow-sm"
                      style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
                    >
                      <div className={`h-full w-full rounded-full ${
                        task.status === "Terminé" ? "bg-emerald-400" :
                        task.status === "Bloqué" ? "bg-rose-400" :
                        task.status === "En cours" ? "bg-amber-400" :
                        "bg-slate-300"
                      }`} />
                      <div
                        className={`absolute inset-0 rounded-full opacity-60 ${
                          task.status === "Terminé" ? "bg-emerald-600" :
                          task.status === "Bloqué" ? "bg-rose-600" :
                          "bg-amber-600"
                        }`}
                        style={{ width: `${bar.progress}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white drop-shadow-sm">
                        {bar.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function KanbanPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [view, setView] = useState<"kanban" | "gantt">("kanban");
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [createTaskStatus, setCreateTaskStatus] = useState<Task["status"] | null>(null);
  const dragTaskId = useRef<number | null>(null);

  const {
    data: projects,
    isLoading: projectsLoading,
    refetch: refetchProjects,
  } = useApi<Project[]>("/api/v1/projects/");

  const {
    data: tasks,
    isLoading: tasksLoading,
    refetch: refetchTasks,
  } = useApi<Task[]>(selectedProjectId ? `/api/v1/projects/${selectedProjectId}/tasks` : null);

  const selectedProject = projects?.find(p => p.id === selectedProjectId);

  useEffect(() => {
    if (!selectedProjectId && projects?.length) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  // ── Drag & Drop ───────────────────────────────────────────────────────────

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    dragTaskId.current = taskId;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = async (e: React.DragEvent, newStatus: Task["status"]) => {
    e.preventDefault();
    const taskId = dragTaskId.current;
    if (!taskId || !selectedProjectId) return;

    const task = tasks?.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Optimistic update via refetch
    try {
      await apiFetch(`/api/v1/projects/${selectedProjectId}/tasks/${taskId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(`Tâche déplacée vers « ${newStatus} »`);
      refetchTasks();
    } catch (err: any) {
      toast.error(err.message || "Erreur lors du déplacement");
    }
    dragTaskId.current = null;
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const isLoading = projectsLoading || (!!selectedProjectId && tasksLoading);

  return (
    <div className="space-y-5 h-full">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-primary" />
            Gestion de Projets
          </h1>
          <p className="text-sm text-muted-foreground">Suivi des plans d'action — Kanban & Gantt</p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* View toggle */}
          <div className="flex bg-muted p-0.5 rounded-lg border border-border">
            <button
              onClick={() => setView("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                view === "kanban" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid size={13} /> Kanban
            </button>
            <button
              onClick={() => setView("gantt")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                view === "gantt" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart2 size={13} /> Gantt
            </button>
          </div>

          {/* Project selector */}
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-8 py-2 bg-background border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[180px]"
              value={selectedProjectId || ""}
              onChange={e => setSelectedProjectId(Number(e.target.value))}
            >
              {!projects?.length && <option value="">Aucun projet</option>}
              {projects?.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* New project */}
          <Button size="sm" onClick={() => setCreateProjectOpen(true)} className="gap-1.5">
            <Plus size={14} />
            Nouveau projet
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      {tasks && tasks.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {COLUMNS.map(col => {
            const count = tasks.filter(t => t.status === col.id).length;
            return (
              <div key={col.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${col.bg} ${col.border}`}>
                <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                <span>{col.title}</span>
                <span className="font-bold">{count}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-muted/40 border-border text-xs font-medium ml-auto">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold">{tasks.length} tâches</span>
          </div>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !projects?.length ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            <FolderKanban className="h-12 w-12 text-muted-foreground/30" />
            <div className="text-center">
              <p className="font-medium">Aucun projet</p>
              <p className="text-sm text-muted-foreground mt-1">Créez votre premier projet pour commencer</p>
            </div>
            <Button onClick={() => setCreateProjectOpen(true)} className="gap-2">
              <Plus size={16} />
              Créer un projet
            </Button>
          </CardContent>
        </Card>
      ) : view === "kanban" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLUMNS.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasks?.filter(t => t.status === column.id) ?? []}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onAddTask={(status) => setCreateTaskStatus(status)}
            />
          ))}
        </div>
      ) : (
        <GanttView tasks={tasks ?? []} project={selectedProject} />
      )}

      {/* Modals */}
      <CreateProjectModal
        open={createProjectOpen}
        onClose={() => setCreateProjectOpen(false)}
        onCreated={() => { refetchProjects(); }}
      />

      {createTaskStatus && selectedProjectId && (
        <CreateTaskModal
          open={!!createTaskStatus}
          onClose={() => setCreateTaskStatus(null)}
          projectId={selectedProjectId}
          defaultStatus={createTaskStatus}
          onCreated={() => { refetchTasks(); }}
        />
      )}
    </div>
  );
}