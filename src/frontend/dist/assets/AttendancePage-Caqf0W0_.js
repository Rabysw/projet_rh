import { c as createLucideIcon, r as reactExports, a as useApi, j as jsxRuntimeExports, k as apiFetch } from "./index-Wq93vx8q.js";
import { C as Card } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { B as Badge } from "./Badge-BFQ_Hy0K.js";
import { I as Input } from "./input-Dqi26IOG.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { P as Plus } from "./plus-CMUzI6kD.js";
import { A as ArrowLeft } from "./arrow-left-BNPpw59r.js";
import { S as Search } from "./search-QiIA7WTc.js";
import { X } from "./x-DJ1ld1ug.js";
import { b as CardContent } from "./card-CVnFq3EB.js";
import { L as LoaderCircle } from "./loader-circle-DBROso8Q.js";
import { C as CircleCheck } from "./circle-check-DtBxltuf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "m15 15-3-3-3 3", key: "15xj92" }]
];
const FileUp = createLucideIcon("file-up", __iconNode);
function AddPointageModal({
  open,
  onClose,
  date,
  onCreated
}) {
  const { data: employees } = useApi(
    "/api/v1/resp-rh/employees"
  );
  const [form, setForm] = reactExports.useState({
    employee_id: "",
    arrival: "08:00",
    departure: "17:00",
    location: "Siège",
    status: "present"
  });
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = async () => {
    if (!form.employee_id) return ue.error("Sélectionnez un employé");
    setLoading(true);
    try {
      await apiFetch("/api/v1/resp-rh/pointage", {
        method: "POST",
        body: JSON.stringify({ ...form, date })
      });
      ue.success("Pointage enregistré");
      onCreated();
      onClose();
    } catch (e) {
      ue.error(e.message || "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Marquer une présence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Date : ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Employé *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
            value: form.employee_id,
            onChange: (e) => setForm((f) => ({ ...f, employee_id: e.target.value })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Sélectionner..." }),
              employees == null ? void 0 : employees.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: e.id, children: e.name }, e.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Statut *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
            value: form.status,
            onChange: (e) => setForm((f) => ({ ...f, status: e.target.value })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "present", children: "Présent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "absent", children: "Absent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "late", children: "Retard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "leave", children: "Congé" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mission", children: "Mission" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Arrivée" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "time",
              className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
              value: form.arrival,
              onChange: (e) => setForm((f) => ({ ...f, arrival: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Départ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "time",
              className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
              value: form.departure,
              onChange: (e) => setForm((f) => ({ ...f, departure: e.target.value }))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Lieu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
            value: form.location,
            onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Siège", children: "Siège" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Télétravail", children: "Télétravail" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Client", children: "Client" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Mission", children: "Mission" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: onClose, children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1", onClick: handleSubmit, disabled: loading, children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
          "Enregistrer"
        ] })
      ] })
    ] })
  ] });
}
function StatusBadge({ status }) {
  const map = {
    present: { label: "Présent", cls: "bg-emerald-500 text-white" },
    absent: { label: "Absent", cls: "bg-rose-500 text-white" },
    late: { label: "Retard", cls: "bg-amber-500 text-white" },
    leave: { label: "Congé", cls: "bg-blue-500 text-white" },
    mission: { label: "Mission", cls: "bg-purple-500 text-white" }
  };
  const s = map[status] ?? { label: status, cls: "" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: s.cls, children: s.label });
}
function AttendancePage() {
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [search, setSearch] = reactExports.useState("");
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const { data: pointages, isLoading, refetch } = useApi(
    `/api/v1/resp-rh/pointage?date=${date}`
  );
  const filtered = reactExports.useMemo(() => {
    if (!pointages) return [];
    if (!search) return pointages;
    const s = search.toLowerCase();
    return pointages.filter((p) => p.employee_name.toLowerCase().includes(s));
  }, [pointages, search]);
  const handleUpdatePointage = async (id, field, value) => {
    try {
      await apiFetch(`/api/v1/resp-rh/pointage/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ [field]: value })
      });
      ue.success("Pointage mis à jour");
      refetch();
    } catch (err) {
      ue.error("Erreur lors de la mise à jour");
    }
  };
  const shiftDate = (delta) => {
    const d = new Date(date);
    d.setDate(d.getDate() + delta);
    setDate(d.toISOString().split("T")[0]);
  };
  const stats = reactExports.useMemo(() => {
    if (!pointages) return null;
    return {
      total: pointages.length,
      present: pointages.filter((p) => p.status === "present").length,
      absent: pointages.filter((p) => p.status === "absent").length,
      late: pointages.filter((p) => p.status === "late").length
    };
  }, [pointages]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Présences & Horaires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Suivi des pointages et gestion du temps" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "h-4 w-4" }),
          "Importer CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", onClick: () => setAddOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "Marquer présence"
        ] })
      ] })
    ] }),
    stats && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 flex-wrap", children: [
      { label: "Total", value: stats.total, cls: "bg-muted/40 border-border" },
      { label: "Présents", value: stats.present, cls: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-400" },
      { label: "Absents", value: stats.absent, cls: "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-400" },
      { label: "Retards", value: stats.late, cls: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-400" }
    ].map(({ label, value, cls }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${cls}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: value })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-background border border-border rounded-lg p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => shiftDate(-1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            className: "bg-transparent border-none text-sm font-medium focus:ring-0 outline-none px-1",
            value: date,
            onChange: (e) => setDate(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => shiftDate(1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px] relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-10",
            placeholder: "Rechercher un employé...",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            onClick: () => setSearch(""),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : !filtered.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-12", children: search ? "Aucun résultat pour cette recherche" : "Aucun pointage pour cette date" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Collaborateur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Arrivée" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Départ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Lieu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Heures sup." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Justificatif" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/20 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: p.employee_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "time",
            className: "bg-muted/30 border border-transparent hover:border-border focus:border-primary rounded px-2 py-1 text-sm outline-none transition-colors",
            value: p.arrival || "",
            onChange: (e) => handleUpdatePointage(p.id, "arrival", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "time",
            className: "bg-muted/30 border border-transparent hover:border-border focus:border-primary rounded px-2 py-1 text-sm outline-none transition-colors",
            value: p.departure || "",
            onChange: (e) => handleUpdatePointage(p.id, "departure", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "bg-muted/30 border border-transparent hover:border-border focus:border-primary rounded px-2 py-1 text-xs outline-none transition-colors",
            value: p.location || "Siège",
            onChange: (e) => handleUpdatePointage(p.id, "location", e.target.value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Siège" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Télétravail" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Client" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Mission" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: p.overtime > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-600 font-bold", children: [
          "+",
          p.overtime,
          "h"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "gap-1.5 text-xs", children: p.has_justificatif ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, className: "text-emerald-500" }),
          "Voir"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { size: 12 }),
          "Upload"
        ] }) }) })
      ] }, p.id)) })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddPointageModal,
      {
        open: addOpen,
        onClose: () => setAddOpen(false),
        date,
        onCreated: refetch
      }
    )
  ] });
}
export {
  AttendancePage as default
};
