import { a as useApi, j as jsxRuntimeExports, t as LoadingSpinner } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { I as Input } from "./input-DJbT6S5r.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import { S as Search } from "./search-DAw-TzXT.js";
import { S as Sparkles } from "./sparkles-7CzR_OxM.js";
import { B as BrainCircuit } from "./brain-circuit-DDtbHjQ_.js";
import "./index-DPpzsANr.js";
function MatchingPage() {
  const { data: matches, isLoading } = useApi("/api/v1/ia/matching/candidates");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Matching Compétences IA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Trouvez le candidat idéal pour vos postes ou projets internes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" }),
        "Lancer une recherche de matching"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Décrivez le profil recherché ou le projet...", className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          "Analyser & Matcher"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "h-5 w-5 text-primary" }),
        "Meilleures correspondances"
      ] }),
      matches == null ? void 0 : matches.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-24 bg-primary flex flex-col items-center justify-center text-white p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold", children: [
            m.score,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold opacity-80", children: "Match" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              m.position,
              " • ",
              m.status
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-2", children: (m.skills || ["Communication", "Leadership"]).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px]", children: s }, s)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Voir le profil" })
        ] })
      ] }) }) }, m.name))
    ] })
  ] });
}
export {
  MatchingPage as default
};
