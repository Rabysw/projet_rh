import { c as createLucideIcon, r as reactExports, a as useApi, j as jsxRuntimeExports, a3 as ChevronDown, d as Clock, k as apiFetch, C as Calendar } from "./index-Wq93vx8q.js";
import { C as Card } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { P as Plus } from "./plus-CMUzI6kD.js";
import { C as CircleAlert } from "./circle-alert-Cb00aeSX.js";
import { C as CircleCheck } from "./circle-check-DtBxltuf.js";
import { L as LoaderCircle } from "./loader-circle-DBROso8Q.js";
import { b as CardContent, C as CardHeader, a as CardTitle, c as CardDescription } from "./card-CVnFq3EB.js";
import { X } from "./x-DJ1ld1ug.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
];
const Flag = createLucideIcon("flag", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
      key: "1fr9dc"
    }
  ],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M12 10v2", key: "hh53o1" }],
  ["path", { d: "M16 10v6", key: "1d6xys" }]
];
const FolderKanban = createLucideIcon("folder-kanban", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "19", cy: "5", r: "1", key: "w8mnmm" }],
  ["circle", { cx: "5", cy: "5", r: "1", key: "lttvr7" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }],
  ["circle", { cx: "19", cy: "19", r: "1", key: "shf9b7" }],
  ["circle", { cx: "5", cy: "19", r: "1", key: "bfqh0e" }]
];
const Grip = createLucideIcon("grip", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode);
const COLUMNS = [
  {
    id: "À faire",
    title: "À faire",
    icon: CircleAlert,
    color: "text-slate-500",
    bg: "bg-slate-50 dark:bg-slate-900/30",
    border: "border-slate-200 dark:border-slate-700",
    dot: "bg-slate-400"
  },
  {
    id: "En cours",
    title: "En cours",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-700",
    dot: "bg-amber-400"
  },
  {
    id: "Terminé",
    title: "Terminé",
    icon: CircleCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-700",
    dot: "bg-emerald-400"
  },
  {
    id: "Bloqué",
    title: "Bloqué",
    icon: CircleAlert,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-700",
    dot: "bg-rose-400"
  }
];
const PRIORITY_STYLES = {
  Haute: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  Normale: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Basse: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
};
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/40 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
          }
        )
      ] }),
      children
    ] })
  ] });
}
function CreateProjectModal({ open, onClose, onCreated }) {
  const [form, setForm] = reactExports.useState({ name: "", description: "", start_date: "", end_date_scheduled: "" });
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = async () => {
    if (!form.name.trim()) return ue.error("Le nom est requis");
    setLoading(true);
    try {
      await apiFetch("/api/v1/projects/", {
        method: "POST",
        body: JSON.stringify(form)
      });
      ue.success("Projet créé avec succès");
      onCreated();
      onClose();
      setForm({ name: "", description: "", start_date: "", end_date_scheduled: "" });
    } catch (e) {
      ue.error(e.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { open, onClose, title: "Nouveau projet", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Nom du projet *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
          placeholder: "Ex: Refonte RH Q3",
          value: form.name,
          onChange: (e) => setForm((f) => ({ ...f, name: e.target.value }))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none",
          rows: 3,
          placeholder: "Description optionnelle...",
          value: form.description,
          onChange: (e) => setForm((f) => ({ ...f, description: e.target.value }))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Date de début" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
            value: form.start_date,
            onChange: (e) => setForm((f) => ({ ...f, start_date: e.target.value }))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Date de fin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
            value: form.end_date_scheduled,
            onChange: (e) => setForm((f) => ({ ...f, end_date_scheduled: e.target.value }))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: onClose, children: "Annuler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1", onClick: handleSubmit, disabled: loading, children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }) : null,
        "Créer"
      ] })
    ] })
  ] }) });
}
function CreateTaskModal({ open, onClose, projectId, defaultStatus, onCreated }) {
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    priority: "Normale",
    deadline: "",
    status: defaultStatus
  });
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setForm((f) => ({ ...f, status: defaultStatus }));
  }, [defaultStatus]);
  const handleSubmit = async () => {
    if (!form.title.trim()) return ue.error("Le titre est requis");
    setLoading(true);
    try {
      await apiFetch(`/api/v1/projects/${projectId}/tasks`, {
        method: "POST",
        body: JSON.stringify({ ...form, project_id: projectId })
      });
      ue.success("Tâche créée avec succès");
      onCreated();
      onClose();
      setForm({ title: "", description: "", priority: "Normale", deadline: "", status: defaultStatus });
    } catch (e) {
      ue.error(e.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { open, onClose, title: "Nouvelle tâche", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Titre *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
          placeholder: "Ex: Rédiger les specs",
          value: form.title,
          onChange: (e) => setForm((f) => ({ ...f, title: e.target.value }))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none",
          rows: 2,
          placeholder: "Description optionnelle...",
          value: form.description,
          onChange: (e) => setForm((f) => ({ ...f, description: e.target.value }))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Priorité" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
            value: form.priority,
            onChange: (e) => setForm((f) => ({ ...f, priority: e.target.value })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Haute", children: "Haute" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Normale", children: "Normale" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Basse", children: "Basse" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Échéance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
            value: form.deadline,
            onChange: (e) => setForm((f) => ({ ...f, deadline: e.target.value }))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Colonne" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
          value: form.status,
          onChange: (e) => setForm((f) => ({ ...f, status: e.target.value })),
          children: COLUMNS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.title }, c.id))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: onClose, children: "Annuler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1", onClick: handleSubmit, disabled: loading, children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }) : null,
        "Créer"
      ] })
    ] })
  ] }) });
}
function TaskCard({
  task,
  onDragStart
}) {
  const isOverdue = task.deadline && task.status !== "Terminé" && new Date(task.deadline) < /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      draggable: true,
      onDragStart: (e) => onDragStart(e, task.id),
      className: "group bg-background border border-border/70 rounded-xl p-3.5 space-y-3 shadow-sm hover:shadow-md hover:border-border transition-all cursor-grab active:cursor-grabbing active:opacity-60 active:scale-95",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Grip, { size: 12, className: "mt-0.5 text-muted-foreground/40 shrink-0 group-hover:text-muted-foreground transition-colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-snug flex-1", children: task.title })
        ] }),
        task.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 pl-4", children: task.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pl-4 gap-2", children: [
          task.deadline ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${isOverdue ? "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400" : "bg-muted text-muted-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 9 }),
            new Date(task.deadline).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[10px] font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority] ?? ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { size: 8, className: "inline mr-1" }),
            task.priority
          ] })
        ] })
      ]
    }
  );
}
function KanbanColumn({
  column,
  tasks,
  onDragStart,
  onDrop,
  onAddTask
}) {
  const [isDragOver, setIsDragOver] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col gap-3 rounded-2xl p-3 border transition-all ${column.bg} ${column.border} ${isDragOver ? "ring-2 ring-primary/30 scale-[1.01]" : ""}`,
      onDragOver: (e) => {
        e.preventDefault();
        setIsDragOver(true);
      },
      onDragLeave: () => setIsDragOver(false),
      onDrop: (e) => {
        setIsDragOver(false);
        onDrop(e, column.id);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1 py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${column.dot}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: column.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold bg-background/80 text-muted-foreground px-1.5 py-0.5 rounded-full border border-border/50", children: tasks.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => onAddTask(column.id),
              className: "p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors",
              title: "Ajouter une tâche",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2.5 overflow-y-auto max-h-[calc(100vh-310px)] pr-0.5", children: [
          tasks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-center opacity-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(column.icon, { className: `h-6 w-6 mb-2 ${column.color}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Aucune tâche" })
          ] }),
          tasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskCard, { task, onDragStart }, task.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onAddTask(column.id),
            className: "flex items-center gap-2 w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground border border-dashed border-border/60 hover:border-border rounded-xl hover:bg-background/60 transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
              "Ajouter une tâche"
            ]
          }
        )
      ]
    }
  );
}
function GanttView({ tasks, project }) {
  const today = /* @__PURE__ */ new Date();
  const startDate = (project == null ? void 0 : project.start_date) ? new Date(project.start_date) : new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endDate = (project == null ? void 0 : project.end_date_scheduled) ? new Date(project.end_date_scheduled) : new Date(today.getFullYear(), today.getMonth() + 4, 0);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1e3 * 60 * 60 * 24));
  const months = [];
  const d = new Date(startDate);
  d.setDate(1);
  while (d <= endDate) {
    const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const rangeStart = d < startDate ? startDate : d;
    const rangeEnd = monthEnd > endDate ? endDate : monthEnd;
    const days = Math.ceil((rangeEnd.getTime() - rangeStart.getTime()) / (1e3 * 60 * 60 * 24)) + 1;
    months.push({
      label: d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }),
      days
    });
    d.setMonth(d.getMonth() + 1);
  }
  const getBar = (task) => {
    const taskStart = startDate;
    const taskEnd = task.deadline ? new Date(task.deadline) : endDate;
    const left = Math.max(0, (taskStart.getTime() - startDate.getTime()) / (1e3 * 60 * 60 * 24)) / totalDays * 100;
    const width = Math.min(100 - left, Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1e3 * 60 * 60 * 24)) / totalDays * 100);
    const progress = task.status === "Terminé" ? 100 : task.status === "En cours" ? 45 : task.status === "Bloqué" ? 20 : 0;
    return { left, width: Math.max(width, 2), progress };
  };
  const todayLeft = (today.getTime() - startDate.getTime()) / (1e3 * 60 * 60 * 24) / totalDays * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Planning Gantt" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: (project == null ? void 0 : project.start_date) && (project == null ? void 0 : project.end_date_scheduled) ? `${new Date(project.start_date).toLocaleDateString("fr-FR")} → ${new Date(project.end_date_scheduled).toLocaleDateString("fr-FR")}` : "Visualisation temporelle des tâches" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[700px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-56 shrink-0 px-4 py-2.5 text-xs font-semibold border-r border-border text-muted-foreground", children: "Tâche" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex", children: months.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-[11px] font-semibold text-center py-2.5 border-r border-border last:border-r-0 text-muted-foreground",
            style: { flex: m.days },
            children: m.label
          },
          i
        )) })
      ] }),
      tasks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-12 text-center", children: "Aucune tâche à afficher" }),
      tasks.map((task) => {
        var _a;
        const bar = getBar(task);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center group border-b border-border/40 hover:bg-muted/20 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-56 shrink-0 px-4 py-3 border-r border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: task.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${((_a = COLUMNS.find((c) => c.id === task.status)) == null ? void 0 : _a.dot) ?? "bg-slate-400"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: task.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 h-12 relative", children: [
            todayLeft >= 0 && todayLeft <= 100 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0 bottom-0 w-px bg-primary/40 z-10",
                style: { left: `${todayLeft}%` }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute top-3 h-6 rounded-full overflow-hidden shadow-sm",
                style: { left: `${bar.left}%`, width: `${bar.width}%` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full w-full rounded-full ${task.status === "Terminé" ? "bg-emerald-400" : task.status === "Bloqué" ? "bg-rose-400" : task.status === "En cours" ? "bg-amber-400" : "bg-slate-300"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `absolute inset-0 rounded-full opacity-60 ${task.status === "Terminé" ? "bg-emerald-600" : task.status === "Bloqué" ? "bg-rose-600" : "bg-amber-600"}`,
                      style: { width: `${bar.progress}%` }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white drop-shadow-sm", children: [
                    bar.progress,
                    "%"
                  ] })
                ]
              }
            )
          ] })
        ] }, task.id);
      })
    ] }) }) })
  ] });
}
function KanbanPage() {
  const [selectedProjectId, setSelectedProjectId] = reactExports.useState(null);
  const [view, setView] = reactExports.useState("kanban");
  const [createProjectOpen, setCreateProjectOpen] = reactExports.useState(false);
  const [createTaskStatus, setCreateTaskStatus] = reactExports.useState(null);
  const dragTaskId = reactExports.useRef(null);
  const {
    data: projects,
    isLoading: projectsLoading,
    refetch: refetchProjects
  } = useApi("/api/v1/projects/");
  const {
    data: tasks,
    isLoading: tasksLoading,
    refetch: refetchTasks
  } = useApi(selectedProjectId ? `/api/v1/projects/${selectedProjectId}/tasks` : null);
  const selectedProject = projects == null ? void 0 : projects.find((p) => p.id === selectedProjectId);
  reactExports.useEffect(() => {
    if (!selectedProjectId && (projects == null ? void 0 : projects.length)) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);
  const handleDragStart = (e, taskId) => {
    dragTaskId.current = taskId;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = dragTaskId.current;
    if (!taskId || !selectedProjectId) return;
    const task = tasks == null ? void 0 : tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;
    try {
      await apiFetch(`/api/v1/projects/${selectedProjectId}/tasks/${taskId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus })
      });
      ue.success(`Tâche déplacée vers « ${newStatus} »`);
      refetchTasks();
    } catch (err) {
      ue.error(err.message || "Erreur lors du déplacement");
    }
    dragTaskId.current = null;
  };
  const isLoading = projectsLoading || !!selectedProjectId && tasksLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "h-6 w-6 text-primary" }),
          "Gestion de Projets"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Suivi des plans d'action — Kanban & Gantt" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-muted p-0.5 rounded-lg border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setView("kanban"),
              className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === "kanban" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { size: 13 }),
                " Kanban"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setView("gantt"),
              className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === "gantt" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 13 }),
                " Gantt"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              className: "appearance-none pl-3 pr-8 py-2 bg-background border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[180px]",
              value: selectedProjectId || "",
              onChange: (e) => setSelectedProjectId(Number(e.target.value)),
              children: [
                !(projects == null ? void 0 : projects.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Aucun projet" }),
                projects == null ? void 0 : projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setCreateProjectOpen(true), className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
          "Nouveau projet"
        ] })
      ] })
    ] }),
    tasks && tasks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
      COLUMNS.map((col) => {
        const count = tasks.filter((t) => t.status === col.id).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${col.bg} ${col.border}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${col.dot}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: col.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: count })
        ] }, col.id);
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-muted/40 border-border text-xs font-medium ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
          tasks.length,
          " tâches"
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : !(projects == null ? void 0 : projects.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-16 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "h-12 w-12 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Aucun projet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Créez votre premier projet pour commencer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setCreateProjectOpen(true), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
        "Créer un projet"
      ] })
    ] }) }) : view === "kanban" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: COLUMNS.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      KanbanColumn,
      {
        column,
        tasks: (tasks == null ? void 0 : tasks.filter((t) => t.status === column.id)) ?? [],
        onDragStart: handleDragStart,
        onDrop: handleDrop,
        onAddTask: (status) => setCreateTaskStatus(status)
      },
      column.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GanttView, { tasks: tasks ?? [], project: selectedProject }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateProjectModal,
      {
        open: createProjectOpen,
        onClose: () => setCreateProjectOpen(false),
        onCreated: () => {
          refetchProjects();
        }
      }
    ),
    createTaskStatus && selectedProjectId && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateTaskModal,
      {
        open: !!createTaskStatus,
        onClose: () => setCreateTaskStatus(null),
        projectId: selectedProjectId,
        defaultStatus: createTaskStatus,
        onCreated: () => {
          refetchTasks();
        }
      }
    )
  ] });
}
export {
  KanbanPage as default
};
