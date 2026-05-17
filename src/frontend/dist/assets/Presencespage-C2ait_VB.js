import { c as createLucideIcon, a as useApi, j as jsxRuntimeExports, d as Clock } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { T as Timer } from "./timer-CWtkuxs1.js";
import { C as CircleAlert } from "./circle-alert-CIYviOcj.js";
import { T as TrendingDown } from "./trending-down-DBlZO5L8.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import { C as CircleCheck } from "./circle-check-O5P8UvY-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
function PresencesPage() {
  const { data, isLoading } = useApi("/api/v1/collaborateur/attendance");
  const stats = {
    heures_semaine: (data == null ? void 0 : data.heures_semaine) ?? 0,
    retards_mois: (data == null ? void 0 : data.retards_mois) ?? 0,
    absences_mois: (data == null ? void 0 : data.absences_mois) ?? 0,
    heures_supplementaires: (data == null ? void 0 : data.heures_supplementaires) ?? 0
  };
  const historique = (data == null ? void 0 : data.historique) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Mes présences" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Consultez vos heures de présence, retards et absences enregistrés par les RH." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-800 dark:text-blue-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Ces données sont en ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "lecture seule" }),
        ". Elles sont saisies par les RH à partir des registres de présence ou d'imports Excel. Pour toute anomalie, contactez votre responsable RH."
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-blue-500" }),
            label: "Heures cette semaine",
            value: `${stats.heures_semaine}h`,
            sub: "semaine en cours"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-4 w-4 text-purple-500" }),
            label: "Heures supplémentaires",
            value: `${stats.heures_supplementaires}h`,
            sub: "ce mois"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-amber-500" }),
            label: "Retards",
            value: stats.retards_mois,
            sub: "ce mois",
            warn: stats.retards_mois > 2
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-rose-500" }),
            label: "Absences",
            value: stats.absences_mois,
            sub: "ce mois",
            warn: stats.absences_mois > 0
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }),
          "Historique du mois"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: historique.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-8", children: "Aucune donnée de présence enregistrée pour ce mois." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-5 gap-4 px-3 pb-2 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Arrivée" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Départ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Heures" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Statut" })
          ] }),
          historique.map((record, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 items-center px-3 py-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: formatDate(record.date) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: record.heure_arrivee || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: record.heure_depart || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                  record.heures_travaillees ? `${record.heures_travaillees}h` : "—",
                  record.heures_supp > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-xs text-purple-500", children: [
                    "+",
                    record.heures_supp,
                    "h supp."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: record.absent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1 bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3 w-3" }),
                  "Absent"
                ] }) : record.retard ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1 bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                  "Retard"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gap-1 bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                  "Présent"
                ] }) })
              ]
            },
            idx
          ))
        ] }) })
      ] })
    ] })
  ] });
}
function StatCard({
  icon,
  label,
  value,
  sub,
  warn = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: warn ? "border-amber-300 dark:border-amber-700" : "", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground", children: label }),
      icon
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold ${warn ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`, children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] })
  ] });
}
function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "2-digit",
      month: "short"
    });
  } catch {
    return dateStr;
  }
}
export {
  PresencesPage as default
};
