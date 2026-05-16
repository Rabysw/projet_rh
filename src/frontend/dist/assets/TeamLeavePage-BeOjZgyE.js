import { r as reactExports, a as useApi, j as jsxRuntimeExports, d as Clock, C as Calendar, k as apiFetch } from "./index-Wq93vx8q.js";
import { C as Card } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { B as Badge } from "./Badge-BFQ_Hy0K.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { L as LoaderCircle } from "./loader-circle-DBROso8Q.js";
import { F as Funnel } from "./funnel-MwUGR9xD.js";
import { C as CircleCheck } from "./circle-check-DtBxltuf.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./card-CVnFq3EB.js";
import { C as CircleX } from "./circle-x-Dn0QSfuW.js";
function TeamLeavePage() {
  const [filter, setFilter] = reactExports.useState("all");
  const { data: leaveRequests, isLoading, refetch } = useApi("/api/v1/manager/leaves");
  const [rejectingId, setRejectingId] = reactExports.useState(null);
  const [rejectComment, setRejectComment] = reactExports.useState("");
  const [isRejectSubmitting, setIsRejectSubmitting] = reactExports.useState(false);
  const handleAction = async (id, action) => {
    try {
      await apiFetch(`/api/v1/manager/leaves/${id}/${action}`, {
        method: "POST"
      });
      ue.success(action === "approve" ? "Demande approuvée" : "Demande rejetée");
      refetch();
    } catch (err) {
      ue.error("Erreur lors du traitement de la demande");
    }
  };
  const submitReject = async () => {
    if (!rejectingId) return;
    const comment = rejectComment.trim();
    if (!comment) {
      ue.error("Commentaire obligatoire pour refuser");
      return;
    }
    setIsRejectSubmitting(true);
    try {
      await apiFetch(
        `/api/v1/manager/leaves/${rejectingId}/reject?comment=${encodeURIComponent(comment)}`,
        { method: "POST" }
      );
      ue.success("Demande rejetée");
      setRejectingId(null);
      setRejectComment("");
      refetch();
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Erreur lors du refus");
    } finally {
      setIsRejectSubmitting(false);
    }
  };
  const filtered = filter === "all" ? leaveRequests || [] : (leaveRequests || []).filter((r) => r.status === filter);
  const pendingCount = (leaveRequests || []).filter((r) => r.status === "pending").length;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Congés & absences — Équipe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Validez ou refusez les demandes de votre équipe" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-secondary border-secondary text-lg px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 mr-2" }),
        pendingCount,
        " demandes en attente"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: filter === "all" ? "default" : "outline",
          size: "sm",
          onClick: () => setFilter("all"),
          className: "gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3 w-3" }),
            "Toutes"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: filter === "pending" ? "default" : "outline",
          size: "sm",
          onClick: () => setFilter("pending"),
          className: "gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            "En attente"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: filter === "approved" ? "default" : "outline",
          size: "sm",
          onClick: () => setFilter("approved"),
          className: "gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
            "Approuvées"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }),
        "Demandes de congés"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        rejectingId !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg border border-destructive/30 bg-destructive/5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
            "Refuser la demande #",
            rejectingId,
            " — commentaire obligatoire"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
              rows: 3,
              value: rejectComment,
              onChange: (e) => setRejectComment(e.target.value),
              placeholder: "Ex: Période critique, merci de proposer une autre date."
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
                disabled: isRejectSubmitting,
                children: "Annuler"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "destructive",
                onClick: submitReject,
                disabled: isRejectSubmitting,
                children: isRejectSubmitting ? "Refus..." : "Confirmer le refus"
              }
            )
          ] })
        ] }),
        filtered.map((request) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-muted/30 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary", children: request.employee.charAt(0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: request.employee }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                request.type,
                " — ",
                request.start,
                " → ",
                request.end,
                " (",
                request.days,
                " jours)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Motif: ",
                request.reason
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: request.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1 text-destructive border-destructive hover:bg-destructive",
                onClick: () => {
                  setRejectingId(request.id);
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
                onClick: () => handleAction(request.id, "approve"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
                  "Approuver"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${request.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} gap-1`, children: request.status === "approved" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
            "Approuvée"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
            "Refusée"
          ] }) }) })
        ] }) }, request.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }),
        "Vue calendaire — Juin 2024"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-2 text-center text-sm", children: [
          ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-muted-foreground py-2", children: d }, d)),
          Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isLeave = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].includes(day);
            const isRtt = [20].includes(day);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `p-2 rounded-lg ${isLeave ? "bg-secondary text-secondary" : isRtt ? "bg-secondary text-secondary" : "bg-muted/30"}`,
                children: [
                  day,
                  isLeave && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "S.Bernard" }),
                  isRtt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "N.Leroy" })
                ]
              },
              day
            );
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-4 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-secondary rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Congés" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-secondary rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "RTT" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  TeamLeavePage as default
};
