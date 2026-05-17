import { j as jsxRuntimeExports, a9 as Bot, p as User } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { I as Input } from "./input-DJbT6S5r.js";
import { b as CardContent } from "./Card-D5DOr9y8.js";
import { S as Sparkles } from "./sparkles-7CzR_OxM.js";
import { S as Send } from "./send-yezmYWzd.js";
import "./index-DPpzsANr.js";
function ChatbotPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[calc(100vh-12rem)] space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold text-foreground flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-8 w-8 text-primary" }),
        "Assistant IA RH"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Posez vos questions sur la gestion du personnel, les congés ou le droit du travail." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex-1 flex flex-col overflow-hidden border-2 border-primary/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 p-6 overflow-y-auto space-y-6 bg-muted/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border rounded-2xl p-4 shadow-sm max-w-[80%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Bonjour ! Je suis votre assistant IA spécialisé en ressources humaines. Comment puis-je vous aider aujourd'hui ?" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start flex-row-reverse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary text-white rounded-2xl p-4 shadow-sm max-w-[80%]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Combien de jours de congés reste-t-il à Jean Dupont ?" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border rounded-2xl p-4 shadow-sm max-w-[80%]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm italic flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 animate-pulse" }),
            "Analyse des données en cours..."
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Tapez votre question ici...", className: "flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-center text-muted-foreground mt-2 italic", children: "Note: L'IA peut faire des erreurs. Vérifiez toujours les informations critiques." })
      ] })
    ] })
  ] });
}
export {
  ChatbotPage as default
};
