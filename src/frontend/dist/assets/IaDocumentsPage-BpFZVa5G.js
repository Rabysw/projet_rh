import { c as createLucideIcon, a as useApi, j as jsxRuntimeExports, t as LoadingSpinner, F as FileText } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { b as CardContent, C as CardHeader, a as CardTitle } from "./Card-D5DOr9y8.js";
import { S as Sparkles } from "./sparkles-7CzR_OxM.js";
import "./index-DPpzsANr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
const WandSparkles = createLucideIcon("wand-sparkles", __iconNode);
function IaDocumentsPage() {
  const { data: templates, isLoading } = useApi("/api/v1/ia/documents/templates");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Génération de Documents IA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Créez des documents juridiques et RH en quelques secondes grâce à l'IA" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: templates == null ? void 0 : templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover:border-primary/50 transition-colors cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground italic flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            "Généré en ",
            t.time
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-3 w-3" }),
        "Générer"
      ] })
    ] }) }) }, t.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-gradient-to-br from-primary/5 to-secondary/5 border-dashed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-center", children: "Assistant de rédaction personnalisé" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 text-center max-w-md", children: "Décrivez le document que vous souhaitez créer et l'IA s'occupe de la structure et du contenu légal." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "lg", className: "rounded-full px-8", children: "Démarrer une rédaction libre" })
      ] })
    ] })
  ] });
}
export {
  IaDocumentsPage as default
};
