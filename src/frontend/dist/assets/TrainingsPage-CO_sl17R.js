const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/download-B8AgO4BJ.js","assets/index-Wq93vx8q.js","assets/index-C4WxnLS7.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, a as useApi, r as reactExports, j as jsxRuntimeExports, d as Clock, W as Star, M as MessageSquare, k as apiFetch, _ as __vitePreload } from "./index-Wq93vx8q.js";
import { C as Card } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { B as Badge } from "./Badge-BFQ_Hy0K.js";
import { P as Progress } from "./progress-G76mRsz-.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { L as LoaderCircle } from "./loader-circle-DBROso8Q.js";
import { C as CardHeader, a as CardTitle, b as CardContent, c as CardDescription } from "./card-CVnFq3EB.js";
import { C as CircleCheck } from "./circle-check-DtBxltuf.js";
import { B as BookOpen } from "./book-open-DqfOpDcs.js";
import "./index-DXWCajUK.js";
import "./index-Bu-Umka4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode$1);
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
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode);
function TrainingsPage() {
  const { data: myTrainings, isLoading: trainingsLoading, refetch } = useApi("/api/v1/collaborateur/trainings");
  const { data: availableTrainings } = useApi("/api/v1/collaborateur/available-trainings");
  const { data: certificates } = useApi("/api/v1/collaborateur/certificates");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(null);
  const [showEvaluation, setShowEvaluation] = reactExports.useState(null);
  const handleRegister = async (trainingId) => {
    setIsSubmitting(trainingId);
    try {
      await apiFetch("/api/v1/collaborateur/trainings/inscription", {
        method: "POST",
        body: JSON.stringify({ id: trainingId })
      });
      ue.success("Inscription réussie !");
      refetch();
    } catch (err) {
      ue.error("Erreur lors de l'inscription");
    } finally {
      setIsSubmitting(null);
    }
  };
  const handleDownloadCertificate = async (id, title) => {
    try {
      const { downloadFile } = await __vitePreload(async () => {
        const { downloadFile: downloadFile2 } = await import("./download-B8AgO4BJ.js");
        return { downloadFile: downloadFile2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      await downloadFile(`/api/v1/documents/generate/training/${id}`, `certificat_${title.replaceAll(" ", "_")}.pdf`);
      ue.success("Téléchargement lancé");
    } catch (err) {
      ue.error("Erreur lors du téléchargement");
    }
  };
  const handleSubmitEvaluation = async (trainingId) => {
    try {
      await apiFetch(`/api/v1/collaborateur/trainings/${trainingId}/evaluate`, {
        method: "POST",
        body: JSON.stringify({ rating: 5, comment: "Excellente formation" })
      });
      ue.success("Évaluation envoyée. Merci pour votre retour !");
      setShowEvaluation(null);
      refetch();
    } catch (err) {
      ue.error("Erreur lors de l'envoi");
    }
  };
  if (trainingsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Mes formations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Module 10 — Développement des compétences et évaluation post-formation" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Formations complétées" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-accent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: "12" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "depuis 2022" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "En cours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-4 w-4 text-secondary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "40h restantes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Heures de formation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: "86h" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "cette année" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5" }),
          "Mes formations en cours"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: myTrainings == null ? void 0 : myTrainings.filter((t) => t.status !== "Terminée").map((training) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/30 rounded-lg space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: training.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                training.duration,
                " — ",
                training.date
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-secondary border-secondary", children: training.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progression" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                training.progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: training.progress, className: "h-2" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "w-full", children: "Continuer" })
        ] }, training.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
          "Formations recommandées"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: availableTrainings == null ? void 0 : availableTrainings.map((training) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: training.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              training.category,
              " — ",
              training.duration
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-secondary", children: [
              "Inscription avant ",
              training.deadline
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: () => handleRegister(training.id),
              disabled: isSubmitting === training.id,
              children: isSubmitting === training.id ? "..." : "S'inscrire"
            }
          )
        ] }, training.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-500" }),
          "Formations Complétées"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Évaluez vos formations pour nous aider à nous améliorer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: myTrainings == null ? void 0 : myTrainings.filter((t) => t.status === "Terminée").map((training) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-border rounded-lg bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: training.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Complétée le ",
              training.date
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-100 text-emerald-800 border-none", children: "100%" })
        ] }),
        showEvaluation === training.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 bg-muted/30 p-3 rounded-md animate-in fade-in slide-in-from-top-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: "Quelle note donneriez-vous à cette formation ?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-amber-500 fill-amber-500 cursor-pointer" }, star)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "w-full text-xs p-2 rounded border border-border bg-background",
              placeholder: "Votre commentaire (facultatif)..."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => handleSubmitEvaluation(training.id), children: "Envoyer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setShowEvaluation(null), children: "Annuler" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "w-full gap-2",
            onClick: () => setShowEvaluation(training.id),
            disabled: training.evaluated,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 14 }),
              training.evaluated ? "Déjà évaluée" : "Évaluer la formation"
            ]
          }
        )
      ] }, training.id)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5" }),
        "Mes certificats"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: certificates == null ? void 0 : certificates.map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/30 rounded-lg text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-8 w-8 mx-auto mb-2 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: cert.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: cert.issuer }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Obtenu le ",
          cert.date
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "mt-2",
            onClick: () => handleDownloadCertificate(cert.id, cert.title),
            children: "Télécharger"
          }
        )
      ] }, cert.id)) }) })
    ] })
  ] });
}
export {
  TrainingsPage as default
};
