import { a as useApi, j as jsxRuntimeExports, t as LoadingSpinner, F as FileText, S as Shield } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { b as CardContent, C as CardHeader, a as CardTitle } from "./Card-D5DOr9y8.js";
import { D as Download } from "./download-2RRxYHG6.js";
import "./index-DPpzsANr.js";
function ExportsPage() {
  const { data: exports, isLoading } = useApi("/api/v1/direction/exports");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Exports & États Légaux" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Générez vos documents administratifs et financiers" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: exports == null ? void 0 : exports.map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-muted rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: exp.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Format: ",
            exp.format
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 italic", children: [
            "Dernier export: ",
            exp.last
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) })
    ] }) }) }, exp.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-primary/5 border-primary/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-primary" }),
        "Conformité légale (Bénin)"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tous les exports sont conformes aux normes de l'ANIP, de la CNSS et du Code du Travail béninois." }) })
    ] })
  ] });
}
export {
  ExportsPage as default
};
