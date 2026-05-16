import { u as useIcesAuth, r as reactExports, a as useApi, j as jsxRuntimeExports, T as Target, W as Star, C as Calendar, F as FileText, d as Clock, e as TrendingUp, k as apiFetch } from "./index-Wq93vx8q.js";
import { C as Card } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { B as Badge } from "./Badge-BFQ_Hy0K.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { L as LoaderCircle } from "./loader-circle-DBROso8Q.js";
import { C as CardHeader, a as CardTitle, c as CardDescription, b as CardContent } from "./card-CVnFq3EB.js";
import { R as ResponsiveContainer, a as RadarChart, P as PolarGrid, b as PolarAngleAxis, c as PolarRadiusAxis, d as Radar } from "./RadarChart-DgcKdEgw.js";
import { C as ChevronRight } from "./chevron-right-BphBONtI.js";
import { C as CircleCheck } from "./circle-check-DtBxltuf.js";
import { C as CircleAlert } from "./circle-alert-Cb00aeSX.js";
function EvaluationsPage() {
  var _a;
  const { user } = useIcesAuth();
  const [selectedEval, setSelectedEval] = reactExports.useState(null);
  const employeeId = (user == null ? void 0 : user.id) || "";
  const { data: evaluations, isLoading: evalsLoading, refetch: refetchEvals } = useApi(`/api/v1/evaluations/list/${employeeId}`);
  const { data: skillsRadar } = useApi(`/api/v1/evaluations/competences/radar/${employeeId}`);
  const { data: skillGaps } = useApi(`/api/v1/evaluations/competences/gaps/${employeeId}`);
  const radarData = ((_a = skillsRadar == null ? void 0 : skillsRadar.labels) == null ? void 0 : _a.map((label, index) => ({
    subject: label,
    A: skillsRadar.data[index],
    fullMark: 100
  }))) || [];
  const handleSign = async (evalId) => {
    try {
      await apiFetch(`/api/v1/evaluations/${evalId}/signer`, { method: "POST" });
      ue.success("Évaluation signée avec succès");
      refetchEvals();
    } catch (err) {
      ue.error("Erreur lors de la signature");
    }
  };
  if (evalsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Mes Évaluations & Compétences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Suivez votre performance et l'évolution de vos compétences." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4" }),
        "Objectifs 2024"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-primary" }),
            "Radar de Compétences"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Visualisation de votre profil technique" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[300px] w-full", children: radarData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { cx: "50%", cy: "50%", outerRadius: "80%", data: radarData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "#e2e8f0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarAngleAxis, { dataKey: "subject", tick: { fill: "#64748b", fontSize: 10 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarRadiusAxis, { angle: 30, domain: [0, 100], tick: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Radar,
            {
              name: "Compétences",
              dataKey: "A",
              stroke: "#3b82f6",
              fill: "#3b82f6",
              fillOpacity: 0.5
            }
          )
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center text-muted-foreground text-sm", children: "Données non disponibles" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }),
          "Historique des entretiens"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: evaluations && evaluations.length > 0 ? evaluations.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/30 rounded-xl border border-border/50 flex items-center justify-between group hover:bg-muted/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: ev.evaluation_type }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Réalisé le ",
                new Date(ev.evaluation_date).toLocaleDateString("fr-FR")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-1", children: ev.employee_signed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] py-0 h-4 border-emerald-500/50 text-emerald-600 bg-emerald-500/5", children: "Signé" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] py-0 h-4 border-amber-500/50 text-amber-600 bg-amber-500/5", children: "En attente signature" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right hidden sm:block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold", children: [
                ev.score,
                "/100"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Score global" })
            ] }),
            !ev.employee_signed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => handleSign(ev.id), className: "h-8", children: "Signer" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 }) })
          ] })
        ] }, ev.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-8 w-8 text-muted-foreground/30 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun entretien passé répertorié." })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary" }),
            "Axe de progression"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Compétences à renforcer selon votre profil" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: skillGaps && skillGaps.length > 0 ? skillGaps.map((gap) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-muted/20 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: gap.skill }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Cible: ",
              gap.target,
              "% — Actuel: ",
              gap.current,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: gap.priority === "Haute" ? "destructive" : "outline", className: "text-[10px]", children: gap.priority })
        ] }, gap.skill)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-500 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-emerald-700", children: "Toutes vos compétences sont au niveau attendu !" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-primary" }),
            "Dernier PDI"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Plan de Développement Individuel" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Actions prévues :" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" }),
              "Formation avancée sur FastAPI et architectures microservices."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" }),
              "Passage de la certification AWS Cloud Practitioner."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" }),
              "Accompagnement (mentoring) d'un profil junior sur React."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "w-full mt-2 text-xs h-8", children: "Voir les détails du PDI" })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  EvaluationsPage as default
};
