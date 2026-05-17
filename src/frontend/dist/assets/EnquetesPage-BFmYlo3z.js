import { c as createLucideIcon, a as useApi, j as jsxRuntimeExports, t as LoadingSpinner, aa as ClipboardList } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { P as Plus } from "./plus-C9uXZ8Nl.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import { S as Send } from "./send-yezmYWzd.js";
import "./index-DPpzsANr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "12", x2: "12", y1: "20", y2: "10", key: "1vz5eb" }],
  ["line", { x1: "18", x2: "18", y1: "20", y2: "4", key: "cun8e5" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "16", key: "hq0ia6" }]
];
const ChartNoAxesColumnIncreasing = createLucideIcon("chart-no-axes-column-increasing", __iconNode);
function EnquetesPage() {
  const { data: surveys, isLoading } = useApi("/api/v1/resp-rh/surveys");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Enquêtes & Sondages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Mesurez le climat social et recueillez les avis" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Nouvelle Enquête"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6", children: surveys == null ? void 0 : surveys.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: s.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: s.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700", children: s.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Taux de participation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
              Math.round(s.responses / s.total * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary h-2 rounded-full", style: { width: `${s.responses / s.total * 100}%` } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            s.responses,
            " réponses sur ",
            s.total,
            " collaborateurs"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumnIncreasing, { className: "h-4 w-4" }),
            "Analyses"
          ] }),
          s.status === "Active" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
            "Relancer"
          ] })
        ] })
      ] }) })
    ] }, s.id)) })
  ] });
}
export {
  EnquetesPage as default
};
