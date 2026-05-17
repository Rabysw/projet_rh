import { a as useApi, j as jsxRuntimeExports, t as LoadingSpinner, e as TrendingUp } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import { B as BrainCircuit } from "./brain-circuit-DDtbHjQ_.js";
import { T as TriangleAlert } from "./triangle-alert-C50AwoWJ.js";
function TurnoverPage() {
  var _a, _b;
  const { data: turnover, isLoading } = useApi("/api/v1/ia/turnover/prediction");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Prédiction du Turnover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Anticipez les départs et fidélisez vos talents grâce à l'analyse prédictive" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-orange-50 border-orange-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-orange-800", children: "Indice de risque global" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-orange-600", children: (turnover == null ? void 0 : turnover.global_risk) || "0%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-orange-700 mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
            "Analyse en temps réel"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Salariés à risque (IA)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: ((_a = turnover == null ? void 0 : turnover.risk_by_dept) == null ? void 0 : _a.length) || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 italic", children: [
            "Score ",
            ">",
            " 70/100"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-primary flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "h-4 w-4" }),
          "Précision modèle"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: "94%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 italic", children: "Basé sur 12 mois de données" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-orange-500" }),
        "Analyse par département"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: (_b = turnover == null ? void 0 : turnover.risk_by_dept) == null ? void 0 : _b.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-12 h-12 rounded-full border-4 border-muted flex items-center justify-center text-xs font-bold", style: {
            borderColor: r.score > 70 ? "#ef4444" : r.score > 40 ? "#f97316" : "#22c55e"
          }, children: [
            r.score,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: r.reason })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: r.risk === "Élevé" ? "bg-red-100 text-red-700" : r.risk === "Modéré" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700", children: r.risk }) })
      ] }, r.name)) }) })
    ] })
  ] });
}
export {
  TurnoverPage as default
};
