import { c as createLucideIcon, r as reactExports, a as useApi, j as jsxRuntimeExports, M as MessageSquare, d as Clock, k as apiFetch } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { T as Textarea } from "./textarea-D6UpuBwr.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import { H as Heart } from "./heart-Ba1B3Xo4.js";
import { S as Send } from "./send-yezmYWzd.js";
import { C as CircleCheck } from "./circle-check-O5P8UvY-.js";
import "./index-DPpzsANr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
const categories = [
  { id: "work_env", label: "Environnement de travail", icon: Heart },
  { id: "process", label: "Process & Organisation", icon: Clock },
  { id: "wellness", label: "Bien-être", icon: Lightbulb },
  { id: "idea", label: "Idée & Innovation", icon: MessageSquare }
];
function SuggestionsPage() {
  const [selectedCategory, setSelectedCategory] = reactExports.useState("idea");
  const [message, setMessage] = reactExports.useState("");
  const [anonymous, setAnonymous] = reactExports.useState(false);
  const [mySuggestions, setMySuggestions] = reactExports.useState([]);
  const { data: suggestions, isLoading, refetch } = useApi("/api/v1/collaborateur/suggestions");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (suggestions) {
      setMySuggestions(suggestions);
    }
  }, [suggestions]);
  const handleSubmit = async (e) => {
    const text = message.trim();
    if (!text) {
      ue.error("Veuillez saisir votre suggestion");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/collaborateur/suggestions", {
        method: "POST",
        body: JSON.stringify({
          title: text.substring(0, 50) + (text.length > 50 ? "..." : ""),
          content: text,
          category: selectedCategory,
          anonymous
        })
      });
      ue.success("Votre suggestion a été envoyée avec succès !");
      setMessage("");
      refetch();
    } catch (err) {
      ue.error("Erreur lors de l'envoi de la suggestion");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Suggestions & Qualité de vie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Partagez vos idées et suivez leur traitement" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5" }),
        "Nouvelle suggestion"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        false,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSelectedCategory(cat.id),
            className: `p-3 rounded-lg border text-center transition-all ${selectedCategory === cat.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(cat.icon, { className: `h-5 w-5 mx-auto mb-1 ${selectedCategory === cat.id ? "text-primary" : "text-muted-foreground"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: cat.label })
            ]
          },
          cat.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Décrivez votre suggestion en détail...",
            value: message,
            onChange: (e) => setMessage(e.target.value),
            rows: 4
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: anonymous,
                onChange: (e) => setAnonymous(e.target.checked),
                className: "rounded border-border"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Envoyer anonymement" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "gap-2",
              onClick: handleSubmit,
              disabled: isSubmitting,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
                "Envoyer la suggestion"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-5 w-5" }),
        "Mes suggestions"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: suggestions == null ? void 0 : suggestions.map((suggestion) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/30 rounded-lg space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: suggestion.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: (_a = categories.find((c) => c.id === suggestion.category)) == null ? void 0 : _a.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: suggestion.date })
              ] })
            ] }),
            suggestion.status === "implemented" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
              "Implémenté"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-secondary border-secondary gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              "En étude"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-background rounded border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Réponse ICES: " }),
            suggestion.response
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "h-4 w-4" }),
            suggestion.likes,
            " soutiens"
          ] }) })
        ] }, suggestion.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-8 w-8 mx-auto mb-2 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: "3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Suggestions envoyées" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8 mx-auto mb-2 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Implémentées" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "h-8 w-8 mx-auto mb-2 text-secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: "58" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total soutiens reçus" })
      ] }) })
    ] })
  ] });
}
export {
  SuggestionsPage as default
};
