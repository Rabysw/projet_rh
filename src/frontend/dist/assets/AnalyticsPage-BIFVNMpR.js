import { a as useApi, j as jsxRuntimeExports, t as LoadingSpinner, Y as ChartPie, T as Target } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import { B as Brain } from "./brain-Dr59YZU7.js";
function AnalyticsPage() {
  const { data: analytics, isLoading } = useApi("/api/v1/direction/analytics");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Analyses Avancées" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Analyses prédictives et répartitions de l'effectif" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "h-5 w-5" }),
          "Répartition par département"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-64 flex items-center justify-center bg-muted/30 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic mb-2", children: "Répartition basée sur l'effectif actuel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: Object.entries((analytics == null ? void 0 : analytics.department_distribution) || {}).map(([dept, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
            dept,
            ": ",
            count
          ] }, dept)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5" }),
          "Objectifs stratégiques"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: ((analytics == null ? void 0 : analytics.objectives) || []).map((obj) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: obj.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
              obj.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary h-2 rounded-full", style: { width: `${obj.progress}%` } }) })
        ] }, obj.label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5" }),
        "Insights IA : Prédiction de départ"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Basé sur les données d'engagement et de présence, l'IA identifie les zones de risque de turnover." }),
        ((analytics == null ? void 0 : analytics.risk_analysis) || []).map((risk, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-orange-200 bg-orange-50 rounded-lg flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5 text-orange-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-orange-800 font-medium", children: [
            "Risque ",
            risk.risk,
            " détecté dans le département ",
            risk.dept,
            " (Score: ",
            risk.score,
            "%)"
          ] })
        ] }, i))
      ] })
    ] })
  ] });
}
export {
  AnalyticsPage as default
};
