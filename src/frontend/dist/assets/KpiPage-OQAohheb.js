import { a as useApi, j as jsxRuntimeExports, t as LoadingSpinner, e as TrendingUp, U as Users, A as Award, C as Calendar, g as ChartColumn } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
function KpiPage() {
  const { data: kpisData, isLoading } = useApi("/api/v1/direction/kpis");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  const kpis = [
    { title: "Masse Salariale", value: (kpisData == null ? void 0 : kpisData.masse_salariale) || "0 FCFA", change: "+2.4%", trend: "up", icon: TrendingUp },
    { title: "Taux de Turnover", value: (kpisData == null ? void 0 : kpisData.turnover) || "0%", change: "-1.1%", trend: "down", icon: Users },
    { title: "Satisfaction Salariés", value: (kpisData == null ? void 0 : kpisData.satisfaction) || "0/5", change: "+0.3", trend: "up", icon: Award },
    { title: "Taux d'Absenteïsme", value: (kpisData == null ? void 0 : kpisData.absenteisme) || "0%", change: "-0.5%", trend: "down", icon: Calendar }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "KPIs Stratégiques" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Indicateurs de performance clés pour la Direction" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: kpis.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: k.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(k.icon, { className: `h-4 w-4 ${k.trend === "up" ? "text-green-500" : "text-red-500"}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: k.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-xs mt-1 ${k.trend === "up" ? "text-green-600" : "text-red-600"}`, children: [
          k.change,
          " par rapport au mois dernier"
        ] })
      ] })
    ] }, k.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5" }),
        "Évolution de l'effectif"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-64 flex items-center justify-center bg-muted/30 rounded-lg border-dashed border-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Graphique d'évolution en cours de chargement..." }) })
    ] })
  ] });
}
export {
  KpiPage as default
};
