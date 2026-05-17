import { c as createLucideIcon, r as reactExports, a as useApi, j as jsxRuntimeExports, d as Clock, h as Book, p as User, k as apiFetch } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { F as Funnel } from "./funnel-BjqxzcTk.js";
import { C as CircleCheck } from "./circle-check-O5P8UvY-.js";
import { C as CircleX } from "./circle-x-BvqMMwvL.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import "./index-DPpzsANr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
const STATUS_LABELS = {
  pending: { label: "En attente", className: "bg-amber-100 text-amber-800" },
  validated: { label: "Validée", className: "bg-green-100 text-green-800" },
  rejected: { label: "Refusée", className: "bg-red-100 text-red-800" },
  completed: { label: "Terminée", className: "bg-blue-100 text-blue-800" }
};
function TeamTrainingsPage() {
  const [filter, setFilter] = reactExports.useState("all");
  const { data: enrollments, isLoading, refetch } = useApi("/api/v1/manager/trainings");
  const [rejectingId, setRejectingId] = reactExports.useState(null);
  const [rejectComment, setRejectComment] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const filtered = filter === "all" ? enrollments ?? [] : (enrollments ?? []).filter((e) => e.statut_inscription === filter);
  const pendingCount = (enrollments ?? []).filter(
    (e) => e.statut_inscription === "pending"
  ).length;
  const handleValidate = async (id) => {
    try {
      await apiFetch(`/api/v1/manager/trainings/${id}/validate`, { method: "POST" });
      ue.success("Inscription validée");
      refetch();
    } catch {
      ue.error("Erreur lors de la validation");
    }
  };
  const handleRejectSubmit = async () => {
    if (!rejectingId) return;
    if (!rejectComment.trim()) {
      ue.error("Un commentaire est obligatoire pour refuser");
      return;
    }
    setSubmitting(true);
    try {
      await apiFetch(
        `/api/v1/manager/trainings/${rejectingId}/reject?comment=${encodeURIComponent(rejectComment)}`,
        { method: "POST" }
      );
      ue.success("Inscription refusée");
      setRejectingId(null);
      setRejectComment("");
      refetch();
    } catch {
      ue.error("Erreur lors du refus");
    } finally {
      setSubmitting(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Formations équipe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Validez les demandes d'inscription de votre équipe" })
      ] }),
      pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-amber-600 border-amber-400 text-base px-4 py-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
        pendingCount,
        " inscription",
        pendingCount > 1 ? "s" : "",
        " à valider"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [
      { key: "all", label: "Toutes", icon: Funnel },
      { key: "pending", label: "En attente", icon: Clock },
      { key: "validated", label: "Validées", icon: CircleCheck },
      { key: "rejected", label: "Refusées", icon: CircleX }
    ].map(({ key, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "sm",
        variant: filter === key ? "default" : "outline",
        onClick: () => setFilter(key),
        className: "gap-1.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
          label
        ]
      },
      key
    )) }),
    rejectingId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg border border-destructive/30 bg-destructive/5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
        "Refuser l'inscription #",
        rejectingId,
        " — commentaire obligatoire"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-sm resize-none",
          rows: 3,
          value: rejectComment,
          onChange: (e) => setRejectComment(e.target.value),
          placeholder: "Ex: Le budget formation du trimestre est épuisé…"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => {
              setRejectingId(null);
              setRejectComment("");
            },
            disabled: submitting,
            children: "Annuler"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "destructive", onClick: handleRejectSubmit, disabled: submitting, children: submitting ? "Refus…" : "Confirmer le refus" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Book, { className: "h-5 w-5" }),
        "Inscriptions aux formations (",
        filtered.length,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-10", children: "Aucune inscription à afficher." }) : filtered.map((enrollment) => {
        const statusInfo = STATUS_LABELS[enrollment.statut_inscription] ?? STATUS_LABELS["pending"];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0", children: enrollment.employee.charAt(0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: enrollment.employee })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Book, { className: "h-3.5 w-3.5" }),
                    enrollment.formation
                  ] }),
                  enrollment.date_debut && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
                    enrollment.date_debut,
                    enrollment.date_fin ? ` → ${enrollment.date_fin}` : ""
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${statusInfo.className} text-xs`, children: statusInfo.label }),
                enrollment.statut_inscription === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "gap-1 text-destructive border-destructive hover:bg-destructive/10",
                      onClick: () => {
                        setRejectingId(enrollment.id);
                        setRejectComment("");
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" }),
                        "Refuser"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "gap-1",
                      onClick: () => handleValidate(enrollment.id),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
                        "Valider"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          },
          enrollment.id
        );
      }) })
    ] })
  ] });
}
export {
  TeamTrainingsPage as default
};
