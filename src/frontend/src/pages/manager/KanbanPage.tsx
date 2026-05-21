/**
 * KanbanPage.tsx — Page Projets & Tâches partagée
 * Manager : gestion complète (créer projet/tâche, gérer membres, voir stats)
 * Collaborateur : voir ses tâches, changer statut, commenter, joindre fichiers
 */
import { useApi, apiFetch } from "@/hooks/use-api";
import { useIcesAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Plus, X, ChevronDown, FolderKanban, Grip, Loader2,
  LayoutGrid, BarChart2, Calendar, CheckCircle2, Clock,
  AlertCircle, Flag, MessageSquare, Paperclip, Users,
  BarChart, Send, Trash2, Download, FileText, Image,
  UserPlus, ChevronRight, Eye, TrendingUp,
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
  category?: string;
  manager_id?: number;
}

interface Task {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  status: "À faire" | "En cours" | "Terminé" | "Bloqué";
  priority: "Haute" | "Normale" | "Basse";
  due_date?: string;
  deadline?: string;
  assigned_to?: number;
  employees?: { id: number; first_name: string; last_name: string };
}

interface Comment {
  id: number;
  content: string;
  created_at: string;
  employees?: { id: number; first_name: string; last_name: string; profile_picture_url?: string };
}

interface TaskFile {
  id: number;
  file_name: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  created_at: string;
  employees?: { id: number; first_name: string; last_name: string };
}

interface ProjectMember {
  id: number;
  employee_id: number;
  role_in_project: string;
  employees?: { id: number; first_name: string; last_name: string; position?: string };
}

interface ProjectStats {
  total: number;
  a_faire: number;
  en_cours: number;
  termine: number;
  bloque: number;
  en_retard: number;
  membres: number;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  position?: string;
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
  { id: "À faire",  title: "À faire",  icon: AlertCircle,  color: "text-slate-500",   bg: "bg-slate-50 dark:bg-slate-900/30",    border: "border-slate-200 dark:border-slate-700",   dot: "bg-slate-400" },
  { id: "En cours", title: "En cours", icon: Clock,         color: "text-amber-500",   bg: "bg-amber-50 dark:bg-amber-900/20",    border: "border-amber-200 dark:border-amber-700",   dot: "bg-amber-400" },
  { id: "Terminé",  title: "Terminé",  icon: CheckCircle2,  color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-200 dark:border-emerald-700", dot: "bg-emerald-400" },
  { id: "Bloqué",   title: "Bloqué",   icon: AlertCircle,   color: "text-rose-500",    bg: "bg-rose-50 dark:bg-rose-900/20",      border: "border-rose-200 dark:border-rose-700",     dot: "bg-rose-400" },
];

const PRIORITY_STYLES: Record<string, string> = {
  Haute:   "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  Normale: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Basse:   "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

// ─── Modal wrapper ─────────────────────────────────────────────────────────────

function Modal({ open, onClose, title, children, wide }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative z-10 bg-background border border-border rounded-2xl shadow-2xl w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Task Detail Modal (commentaires + fichiers) ───────────────────────────────

function TaskDetailModal({ open, onClose, task, projectId, isManager }: {
  open: boolean; onClose: () => void; task: Task | null; projectId: number; isManager: boolean;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [files, setFiles] = useState<TaskFile[]>([]);
  const [newComment, setNewComment] = useState("");
  const [tab, setTab] = useState<"comments" | "files">("comments");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchComments = useCallback(async () => {
    if (!task) return;
    try {
      const data = await apiFetch<Comment[]>(`/api/v1/projects/${projectId}/tasks/${task.id}/comments`);
      setComments(data);
    } catch { /* silencieux */ }
  }, [task, projectId]);

  const fetchFiles = useCallback(async () => {
    if (!task) return;
    try {
      const data = await apiFetch<TaskFile[]>(`/api/v1/projects/${projectId}/tasks/${task.id}/files`);
      setFiles(data);
    } catch { /* silencieux */ }
  }, [task, projectId]);

  useEffect(() => {
    if (open && task) {
      fetchComments();
      fetchFiles();
    }
  }, [open, task, fetchComments, fetchFiles]);

  const handleSendComment = async () => {
    if (!newComment.trim() || !task) return;
    setLoading(true);
    try {
      await apiFetch(`/api/v1/projects/${projectId}/tasks/${task.id}/comments`, {
        method: "POST",
        body: JSON.stringify({ content: newComment.trim() }),
      });
      setNewComment("");
      fetchComments();
      toast.success("Commentaire ajouté");
    } catch (e: any) {
      toast.error(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!task) return;
    try {
      await apiFetch(`/api/v1/projects/${projectId}/tasks/${task.id}/comments/${commentId}`, { method: "DELETE" });
      fetchComments();
      toast.success("Commentaire supprimé");
    } catch (e: any) {
      toast.error(e.message || "Erreur");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !task) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await apiFetch(`/api/v1/projects/${projectId}/tasks/${task.id}/files`, {
        method: "POST",
        body: formData,
      });
      fetchFiles();
      toast.success("Fichier joint avec succès");
    } catch (e: any) {
      toast.error(e.message || "Erreur upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    if (!task) return;
    try {
      await apiFetch(`/api/v1/projects/${projectId}/tasks/${task.id}/files/${fileId}`, { method: "DELETE" });
      fetchFiles();
      toast.success("Fichier supprimé");
    } catch (e: any) {
      toast.error(e.message || "Erreur");
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  const getFileIcon = (mime?: string) => {
    if (!mime) return FileText;
    if (mime.startsWith("image/")) return Image;
    return FileText;
  };

  if (!task) return null;

  const col = COLUMNS.find(c => c.id === task.status);

  return (
    <Modal open={open} onClose={onClose} title={task.title} wide>
      <div className="space-y-4">
        {/* Infos tâche */}
        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${PRIORITY_STYLES[task.priority]}`}>
            <Flag size={10} /> {task.priority}
          </span>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${col?.bg} ${col?.border} ${col?.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${col?.dot}`} />
            {task.status}
          </span>
          {(task.due_date || task.deadline) && (
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
              <Calendar size={10} />
              {new Date(task.due_date || task.deadline || "").toLocaleDateString("fr-FR")}
            </span>
          )}
        </div>

        {task.description && (
          <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">{task.description}</p>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/40 p-1 rounded-lg">
          <button
            onClick={() => setTab("comments")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${tab === "comments" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <MessageSquare size={14} /> Commentaires ({comments.length})
          </button>
          <button
            onClick={() => setTab("files")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${tab === "files" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Paperclip size={14} /> Fichiers ({files.length})
          </button>
        </div>

        {/* Comments tab */}
        {tab === "comments" && (
          <div className="space-y-3">
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Aucun commentaire</p>
              ) : comments.map(c => (
                <div key={c.id} className="flex gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {c.employees ? c.employees.first_name[0] + c.employees.last_name[0] : "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold">
                        {c.employees ? `${c.employees.first_name} ${c.employees.last_name}` : "Inconnu"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(c.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm mt-0.5 text-foreground/80">{c.content}</p>
                  </div>
                  {isManager && (
                    <button
                      onClick={() => handleDeleteComment(c.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded text-muted-foreground hover:text-rose-500 transition-all shrink-0"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {/* Input commentaire */}
            <div className="flex gap-2 pt-2 border-t border-border">
              <textarea
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                rows={2}
                placeholder="Écrire un commentaire..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendComment(); } }}
              />
              <Button onClick={handleSendComment} disabled={loading || !newComment.trim()} className="self-end px-3">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </Button>
            </div>
          </div>
        )}

        {/* Files tab */}
        {tab === "files" && (
          <div className="space-y-3">
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {files.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Aucun fichier joint</p>
              ) : files.map(f => {
                const Icon = getFileIcon(f.mime_type);
                return (
                  <div key={f.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-muted/20 group hover:bg-muted/40 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{f.file_name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {formatFileSize(f.file_size)} · {f.employees ? `${f.employees.first_name} ${f.employees.last_name}` : ""}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={f.file_url} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded hover:bg-background text-muted-foreground hover:text-foreground transition-colors">
                        <Download size={13} />
                      </a>
                      {isManager && (
                        <button onClick={() => handleDeleteFile(f.id)}
                          className="p-1.5 rounded hover:bg-background text-muted-foreground hover:text-rose-500 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Upload */}
            <div className="pt-2 border-t border-border">
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} />
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Paperclip size={14} />}
                {uploading ? "Envoi en cours..." : "Joindre un fichier"}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center mt-1.5">Max 10 Mo</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ─── Members Modal ─────────────────────────────────────────────────────────────

function MembersModal({ open, onClose, projectId }: {
  open: boolean; onClose: () => void; projectId: number;
}) {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmp, setSelectedEmp] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchMembers = useCallback(async () => {
    try {
      const data = await apiFetch<ProjectMember[]>(`/api/v1/projects/${projectId}/members`);
      setMembers(data);
    } catch { /* silencieux */ }
  }, [projectId]);

  useEffect(() => {
    if (open) {
      fetchMembers();
      apiFetch<{ employees: Employee[] }>("/api/v1/employees/").then(r => setEmployees(r.employees || [])).catch(() => {});
    }
  }, [open, fetchMembers]);

  const handleAdd = async () => {
    if (!selectedEmp) return;
    setLoading(true);
    try {
      await apiFetch(`/api/v1/projects/${projectId}/members`, {
        method: "POST",
        body: JSON.stringify({ employee_id: Number(selectedEmp) }),
      });
      setSelectedEmp("");
      fetchMembers();
      toast.success("Membre ajouté");
    } catch (e: any) {
      toast.error(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (empId: number) => {
    try {
      await apiFetch(`/api/v1/projects/${projectId}/members/${empId}`, { method: "DELETE" });
      fetchMembers();
      toast.success("Membre retiré");
    } catch (e: any) {
      toast.error(e.message || "Erreur");
    }
  };

  const memberIds = new Set(members.map(m => m.employee_id));
  const available = employees.filter(e => !memberIds.has(e.id));

  return (
    <Modal open={open} onClose={onClose} title="Membres du projet">
      <div className="space-y-4">
        {/* Liste membres */}
        <div className="space-y-2">
          {members.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Aucun membre ajouté</p>
          ) : members.map(m => (
            <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 group">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                {m.employees ? m.employees.first_name[0] + m.employees.last_name[0] : "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  {m.employees ? `${m.employees.first_name} ${m.employees.last_name}` : `Employé #${m.employee_id}`}
                </p>
                <p className="text-[10px] text-muted-foreground">{m.role_in_project}</p>
              </div>
              <button
                onClick={() => handleRemove(m.employee_id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-background text-muted-foreground hover:text-rose-500 transition-all"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>

        {/* Ajouter membre */}
        {available.length > 0 && (
          <div className="pt-3 border-t border-border space-y-3">
            <p className="text-sm font-medium">Ajouter un membre</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <select
                  className="w-full px-3 py-2 appearance-none rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  value={selectedEmp}
                  onChange={e => setSelectedEmp(e.target.value)}
                >
                  <option value="">Sélectionner un employé</option>
                  {available.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.first_name} {e.last_name}{e.position ? ` — ${e.position}` : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              <Button onClick={handleAdd} disabled={!selectedEmp || loading} className="gap-1.5 shrink-0">
                {loading ? <Loader2 size={13} className="animate-spin" /> : <UserPlus size={13} />}
                Ajouter
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ─── Create Project Modal ──────────────────────────────────────────────────────

function CreateProjectModal({ open, onClose, onCreated }: {
  open: boolean; onClose: () => void; onCreated: (newProject: Project) => void;
}) {
  const [form, setForm] = useState({ name: "", description: "", start_date: "", end_date_scheduled: "", category: "Général" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error("Le nom est requis");
    setLoading(true);
    try {
      const newProject = await apiFetch<Project>("/api/v1/projects/", { method: "POST", body: JSON.stringify(form) });
      toast.success("Projet créé avec succès");
      onClose();
      setForm({ name: "", description: "", start_date: "", end_date_scheduled: "", category: "Général" });
      onCreated(newProject);
    } catch (e: any) {
      toast.error(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Nouveau projet">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Nom du projet *</label>
          <input className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Ex: Refonte RH Q3" value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Description</label>
          <textarea className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            rows={3} placeholder="Description optionnelle..." value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Catégorie</label>
          <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {["Général", "RH", "Formation", "IT", "Communication", "Finance", "Autre"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date de début</label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Date de fin</label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.end_date_scheduled} onChange={e => setForm(f => ({ ...f, end_date_scheduled: e.target.value }))} />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>Annuler</Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 size={14} className="animate-spin mr-2" />} Créer
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Create Task Modal ─────────────────────────────────────────────────────────

function CreateTaskModal({ open, onClose, projectId, defaultStatus, onCreated }: {
  open: boolean; onClose: () => void; projectId: number; defaultStatus: Task["status"]; onCreated: () => void;
}) {
  const [form, setForm] = useState({
    title: "", description: "", priority: "Normale" as Task["priority"],
    due_date: "", status: defaultStatus, assigned_to: "",
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(f => ({ ...f, status: defaultStatus }));
  }, [defaultStatus]);

  useEffect(() => {
    if (open) {
      apiFetch<Employee[]>(`/api/v1/projects/${projectId}/members`)
        .then((data: any[]) => setEmployees(data.map(m => m.employees).filter(Boolean)))
        .catch(() => {});
    }
  }, [open, projectId]);

  const handleSubmit = async () => {
    if (!form.title.trim()) return toast.error("Le titre est requis");
    setLoading(true);
    try {
      await apiFetch(`/api/v1/projects/${projectId}/tasks`, {
        method: "POST",
        body: JSON.stringify({ ...form, assigned_to: form.assigned_to ? Number(form.assigned_to) : null }),
      });
      toast.success("Tâche créée");
      onCreated();
      onClose();
      setForm({ title: "", description: "", priority: "Normale", due_date: "", status: defaultStatus, assigned_to: "" });
    } catch (e: any) {
      toast.error(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Nouvelle tâche">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Titre *</label>
          <input className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Ex: Rédiger les specs" value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Description</label>
          <textarea className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            rows={2} placeholder="Description optionnelle..." value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Priorité</label>
            <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as Task["priority"] }))}>
              <option value="Haute">Haute</option>
              <option value="Normale">Normale</option>
              <option value="Basse">Basse</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Échéance</label>
            <input type="date" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Colonne</label>
            <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Task["status"] }))}>
              {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Assigner à</label>
            <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              value={form.assigned_to} onChange={e => setForm(f => ({ ...f, assigned_to: e.target.value }))}>
              <option value="">Non assigné</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.first_name} {e.last_name}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>Annuler</Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 size={14} className="animate-spin mr-2" />} Créer
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────

function StatsBar({ stats }: { stats: ProjectStats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      {[
        { label: "Total", value: stats.total, color: "text-foreground", bg: "bg-muted/40" },
        { label: "À faire", value: stats.a_faire, color: "text-slate-600", bg: "bg-slate-100 dark:bg-slate-900/40" },
        { label: "En cours", value: stats.en_cours, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
        { label: "Terminé", value: stats.termine, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
        { label: "Bloqué", value: stats.bloque, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
        { label: "En retard", value: stats.en_retard, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
      ].map(s => (
        <div key={s.label} className={`flex flex-col items-center py-2 px-3 rounded-xl border border-border ${s.bg}`}>
          <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
          <span className="text-[11px] text-muted-foreground mt-0.5">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Task Card ─────────────────────────────────────────────────────────────────

function TaskCard({ task, onDragStart, isManager, onOpenDetail, myEmployeeId }: {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: number) => void;
  isManager: boolean;
  onOpenDetail: (task: Task) => void;
  myEmployeeId?: number;
}) {
  const isOverdue = (task.due_date || task.deadline) && task.status !== "Terminé"
    && new Date(task.due_date || task.deadline || "") < new Date();
  const isMyTask = myEmployeeId && task.assigned_to === myEmployeeId;

  return (
    <div
      draggable={isManager}
      onDragStart={e => isManager && onDragStart(e, task.id)}
      onClick={() => onOpenDetail(task)}
      className={`group bg-background border rounded-xl p-3.5 space-y-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer
        ${isMyTask ? "border-primary/40 ring-1 ring-primary/20" : "border-border/70 hover:border-border"}
        ${isManager ? "active:cursor-grabbing active:opacity-60 active:scale-95" : ""}`}
    >
      <div className="flex items-start gap-2">
        {isManager && <Grip size={12} className="mt-0.5 text-muted-foreground/40 shrink-0 group-hover:text-muted-foreground transition-colors" />}
        <p className="text-sm font-medium leading-snug flex-1">{task.title}</p>
        <Eye size={12} className="mt-0.5 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-colors shrink-0" />
      </div>

      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 pl-4">{task.description}</p>
      )}

      {task.employees && (
        <div className="flex items-center gap-1.5 pl-4">
          <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold">
            {task.employees.first_name[0]}{task.employees.last_name[0]}
          </div>
          <span className="text-[10px] text-muted-foreground">{task.employees.first_name} {task.employees.last_name}</span>
        </div>
      )}

      <div className="flex items-center justify-between pl-4 gap-2">
        {(task.due_date || task.deadline) ? (
          <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
            isOverdue ? "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400" : "bg-muted text-muted-foreground"
          }`}>
            <Calendar size={9} />
            {new Date(task.due_date || task.deadline || "").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
          </div>
        ) : <div />}
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority] ?? ""}`}>
          <Flag size={8} className="inline mr-1" />{task.priority}
        </span>
      </div>
    </div>
  );
}

// ─── Kanban Column ─────────────────────────────────────────────────────────────

function KanbanColumn({ column, tasks, onDragStart, onDrop, onAddTask, isManager, onOpenDetail, myEmployeeId }: {
  column: typeof COLUMNS[number];
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: number) => void;
  onDrop: (e: React.DragEvent, status: Task["status"]) => void;
  onAddTask: (status: Task["status"]) => void;
  isManager: boolean;
  onOpenDetail: (task: Task) => void;
  myEmployeeId?: number;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl p-3 border transition-all ${column.bg} ${column.border} ${isDragOver && isManager ? "ring-2 ring-primary/30 scale-[1.01]" : ""}`}
      onDragOver={e => { if (isManager) { e.preventDefault(); setIsDragOver(true); } }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={e => { setIsDragOver(false); if (isManager) onDrop(e, column.id); }}
    >
      <div className="flex items-center justify-between px-1 py-0.5">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column.dot}`} />
          <span className="text-sm font-semibold">{column.title}</span>
          <span className="text-[11px] font-bold bg-background/80 text-muted-foreground px-1.5 py-0.5 rounded-full border border-border/50">
            {tasks.length}
          </span>
        </div>
        {isManager && (
          <button onClick={() => onAddTask(column.id)}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors"
            title="Ajouter une tâche">
            <Plus size={14} />
          </button>
        )}
      </div>

      <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[calc(100vh-310px)] pr-0.5">
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center opacity-40">
            <column.icon className={`h-6 w-6 mb-2 ${column.color}`} />
            <p className="text-xs text-muted-foreground">Aucune tâche</p>
          </div>
        )}
        {tasks.map(task => (
          <TaskCard
            key={task.id} task={task} onDragStart={onDragStart}
            isManager={isManager} onOpenDetail={onOpenDetail} myEmployeeId={myEmployeeId}
          />
        ))}
      </div>

      {isManager && (
        <button onClick={() => onAddTask(column.id)}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-dashed border-border/60 hover:border-border rounded-xl hover:bg-background/60 transition-all">
          <Plus size={12} /> Ajouter une tâche
        </button>
      )}
    </div>
  );
}

// ─── Gantt View ────────────────────────────────────────────────────────────────

function GanttView({ tasks, project }: { tasks: Task[]; project?: Project }) {
  const today = new Date();
  const startDate = project?.start_date ? new Date(project.start_date) : new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endDate = project?.end_date_scheduled ? new Date(project.end_date_scheduled) : new Date(today.getFullYear(), today.getMonth() + 4, 0);
  const totalDays = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));

  const months: { label: string; days: number }[] = [];
  const d = new Date(startDate);
  d.setDate(1);
  while (d <= endDate) {
    const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const rangeStart = d < startDate ? startDate : new Date(d);
    const rangeEnd = monthEnd > endDate ? endDate : monthEnd;
    const days = Math.ceil((rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    months.push({ label: d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }), days });
    d.setMonth(d.getMonth() + 1);
  }

  const getBar = (task: Task) => {
    const due = task.due_date || task.deadline;
    const taskEnd = due ? new Date(due) : endDate;
    const left = 0;
    const width = Math.min(100, Math.max(2, Math.ceil((taskEnd.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100));
    const progress = task.status === "Terminé" ? 100 : task.status === "En cours" ? 45 : task.status === "Bloqué" ? 20 : 0;
    return { left, width, progress };
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
            <div className="flex border-b border-border bg-muted/40">
              <div className="w-56 shrink-0 px-4 py-2.5 text-xs font-semibold border-r border-border text-muted-foreground">Tâche</div>
              <div className="flex-1 flex">
                {months.map((m, i) => (
                  <div key={i} className="text-[11px] font-semibold text-center py-2.5 border-r border-border last:border-r-0 text-muted-foreground" style={{ flex: m.days }}>
                    {m.label}
                  </div>
                ))}
              </div>
            </div>
            {tasks.length === 0 && <p className="text-sm text-muted-foreground py-12 text-center">Aucune tâche à afficher</p>}
            {tasks.map(task => {
              const bar = getBar(task);
              return (
                <div key={task.id} className="flex items-center group border-b border-border/40 hover:bg-muted/20 transition-colors">
                  <div className="w-56 shrink-0 px-4 py-3 border-r border-border">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${COLUMNS.find(c => c.id === task.status)?.dot ?? "bg-slate-400"}`} />
                      <span className="text-[10px] text-muted-foreground">{task.status}</span>
                    </div>
                  </div>
                  <div className="flex-1 h-12 relative">
                    {todayLeft >= 0 && todayLeft <= 100 && (
                      <div className="absolute top-0 bottom-0 w-px bg-primary/40 z-10" style={{ left: `${todayLeft}%` }} />
                    )}
                    <div className="absolute top-3 h-6 rounded-full overflow-hidden shadow-sm" style={{ left: `${bar.left}%`, width: `${bar.width}%` }}>
                      <div className={`h-full w-full rounded-full ${task.status === "Terminé" ? "bg-emerald-400" : task.status === "Bloqué" ? "bg-rose-400" : task.status === "En cours" ? "bg-amber-400" : "bg-slate-300"}`} />
                      <div className={`absolute inset-0 rounded-full opacity-60 ${task.status === "Terminé" ? "bg-emerald-600" : task.status === "Bloqué" ? "bg-rose-600" : "bg-amber-600"}`}
                        style={{ width: `${bar.progress}%` }} />
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white drop-shadow-sm">{bar.progress}%</span>
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
  const { user } = useIcesAuth();
  const isManager = user?.role === "manager" || user?.role === "resp_rh" || user?.role === "admin_rh";

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [view, setView] = useState<"kanban" | "gantt">("kanban");
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [createTaskStatus, setCreateTaskStatus] = useState<Task["status"] | null>(null);
  const [membersOpen, setMembersOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const dragTaskId = useRef<number | null>(null);

  const { data: projects, isLoading: projectsLoading, refetch: refetchProjects } = useApi<Project[]>("/api/v1/projects/");
  const { data: tasks, isLoading: tasksLoading, refetch: refetchTasks } = useApi<Task[]>(
    selectedProjectId ? `/api/v1/projects/${selectedProjectId}/tasks` : null
  );

  const selectedProject = projects?.find(p => p.id === selectedProjectId);
  const isLoading = projectsLoading || (!!selectedProjectId && tasksLoading);

  // Auto-select premier projet
  useEffect(() => {
    if (!selectedProjectId && projects?.length) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  // Charger les stats quand projet change
  useEffect(() => {
    if (!selectedProjectId) return;
    apiFetch<ProjectStats>(`/api/v1/projects/${selectedProjectId}/stats`)
      .then(setStats)
      .catch(() => setStats(null));
  }, [selectedProjectId, tasks]);

  // Drag & Drop (manager seulement)
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
    try {
      await apiFetch(`/api/v1/projects/${selectedProjectId}/tasks/${taskId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(`Tâche déplacée → ${newStatus}`);
      refetchTasks();
    } catch (err: any) {
      toast.error(err.message || "Erreur lors du déplacement");
    }
    dragTaskId.current = null;
  };

  // Pour collaborateur : changer son statut via click
  const handleStatusChange = async (task: Task, newStatus: Task["status"]) => {
    if (!selectedProjectId) return;
    try {
      await apiFetch(`/api/v1/projects/${selectedProjectId}/tasks/${task.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(`Statut mis à jour → ${newStatus}`);
      refetchTasks();
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    }
  };

  // Récupérer l'employee_id de l'utilisateur connecté (approximatif via tasks)
  const myEmployeeId = tasks?.find(t => t.assigned_to != null)?.assigned_to;

  return (
    <div className="space-y-5 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-primary" />
            {isManager ? "Gestion de Projets" : "Mes Projets"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isManager ? "Suivi des plans d'action — Kanban & Gantt" : "Consultez vos tâches et l'avancement des projets"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Vue toggle */}
          <div className="flex bg-muted p-0.5 rounded-lg border border-border">
            <button onClick={() => setView("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === "kanban" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <LayoutGrid size={13} /> Kanban
            </button>
            <button onClick={() => setView("gantt")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === "gantt" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <BarChart2 size={13} /> Gantt
            </button>
          </div>

          {/* Sélecteur projet */}
          {projects && projects.length > 0 && (
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 bg-background border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[180px]"
                value={selectedProjectId || ""}
                onChange={e => setSelectedProjectId(Number(e.target.value))}
              >
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          )}

          {/* Boutons manager */}
          {isManager && selectedProjectId && (
            <Button size="sm" variant="outline" onClick={() => setMembersOpen(true)} className="gap-1.5">
              <Users size={14} /> Membres {stats ? `(${stats.membres})` : ""}
            </Button>
          )}
          {isManager && (
            <Button size="sm" onClick={() => setCreateProjectOpen(true)} className="gap-1.5">
              <Plus size={14} /> Nouveau projet
            </Button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      {stats && <StatsBar stats={stats} />}

      {/* Bandeau collaborateur : rappel tâches en retard */}
      {!isManager && stats && stats.en_retard > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
          <AlertCircle size={16} className="text-rose-500 shrink-0" />
          <p className="text-sm text-rose-700 dark:text-rose-300 font-medium">
            {stats.en_retard} tâche{stats.en_retard > 1 ? "s" : ""} en retard sur ce projet
          </p>
        </div>
      )}

      {/* Contenu principal */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !projects?.length ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            <FolderKanban className="h-12 w-12 text-muted-foreground/30" />
            <div className="text-center">
              <p className="font-medium">{isManager ? "Aucun projet" : "Aucun projet assigné"}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {isManager ? "Créez votre premier projet pour commencer" : "Votre manager vous ajoutera à un projet bientôt"}
              </p>
            </div>
            {isManager && (
              <Button onClick={() => setCreateProjectOpen(true)} className="gap-2">
                <Plus size={16} /> Créer un projet
              </Button>
            )}
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
              isManager={isManager}
              onOpenDetail={setSelectedTask}
              myEmployeeId={myEmployeeId}
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
        onCreated={(newProject: Project) => {
          setSelectedProjectId(newProject.id);
          refetchProjects();
        }}
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

      {selectedProjectId && (
        <MembersModal
          open={membersOpen}
          onClose={() => setMembersOpen(false)}
          projectId={selectedProjectId}
        />
      )}

      {selectedTask && selectedProjectId && (
        <TaskDetailModal
          open={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          projectId={selectedProjectId}
          isManager={isManager}
        />
      )}
    </div>
  );
}
