import { c as createLucideIcon, u as useIcesAuth, a as useApi, b as useNotifications, j as jsxRuntimeExports, B as Bell, C as Calendar, T as Target, L as Link, d as Clock, e as TrendingUp, F as FileText, M as MessageSquare, f as useNavigate, r as reactExports, U as Users, g as ChartColumn, h as Book, i as Briefcase, k as apiFetch, A as Award, l as useCompanyConfig, S as Shield, m as Settings, n as FileDown } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { downloadFile } from "./download-C8xds31Q.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { C as CircleAlert } from "./circle-alert-CIYviOcj.js";
import { B as BookOpen } from "./book-open-mWcDYzwA.js";
import { T as Timer } from "./timer-CWtkuxs1.js";
import { C as CardHeader, a as CardTitle, b as CardContent, c as CardDescription } from "./Card-D5DOr9y8.js";
import { T as Trophy } from "./trophy-DS28-9rD.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { T as TriangleAlert } from "./triangle-alert-C50AwoWJ.js";
import { C as CircleCheck } from "./circle-check-O5P8UvY-.js";
import { C as CircleX } from "./circle-x-BvqMMwvL.js";
import { C as ChevronRight } from "./chevron-right-Onv6hVY4.js";
import { T as TrendingDown } from "./trending-down-DBlZO5L8.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { D as Database } from "./database-Dsd4p7_Z.js";
import { K as Key } from "./key-Dbp4pecK.js";
import { S as Smile } from "./smile-CUGXZ9W1.js";
import { D as DollarSign } from "./dollar-sign-CV6nWGBO.js";
import { D as Download } from "./download-2RRxYHG6.js";
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
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8", key: "15492f" }],
  ["path", { d: "m16 16 6-6", key: "vzrcl6" }],
  ["path", { d: "m8 8 6-6", key: "18bi4p" }],
  ["path", { d: "m9 7 8 8", key: "5jnvq1" }],
  ["path", { d: "m21 11-8-8", key: "z4y7zo" }]
];
const Gavel = createLucideIcon("gavel", __iconNode);
function CollaborateurDashboard() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const { user } = useIcesAuth();
  const { data, isLoading } = useApi("/api/v1/dashboard/collaborateur");
  const { data: payslips } = useApi("/api/v1/collaborateur/payslips");
  const { data: palmares } = useApi("/api/v1/communication/palmares");
  const { notifications, isLoading: notifLoading, markAsRead, markAllAsRead } = useNotifications();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  const latestPayslip = payslips == null ? void 0 : payslips[0];
  const handleDownloadPayslip = async () => {
    if (!latestPayslip) return;
    try {
      await downloadFile(
        `/documents/generate/payslip/${latestPayslip.id}`,
        `bulletin_${String(latestPayslip.month ?? "dernier").replaceAll(" ", "_")}.pdf`
      );
      ue.success("Téléchargement lancé");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Erreur de téléchargement");
    }
  };
  const kpis = (data == null ? void 0 : data.kpis) || {
    conges_restants: 0,
    formations_planifiees: 0,
    demandes_en_cours: 0,
    taux_objectifs_atteints: 0,
    heures_supplementaires: 0,
    notifications_non_lues: 0
  };
  const solde = (data == null ? void 0 : data.solde_conges) || { pris: 0, restants: 0, total: 25, exceptionnels: 0 };
  const presence = (data == null ? void 0 : data.presence) || { heures_semaine: 0, retards_mois: 0, absences_mois: 0 };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground", children: [
          "Bonjour, ",
          (_a = user == null ? void 0 : user.full_name) == null ? void 0 : _a.split(" ")[0],
          " 👋"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Voici un résumé de votre espace collaborateur" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5 text-muted-foreground" }),
        kpis.notifications_non_lues > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center", children: kpis.notifications_non_lues })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard$1,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }),
          label: "Congés restants",
          value: kpis.conges_restants,
          unit: "jours",
          color: "primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard$1,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-amber-500" }),
          label: "Demandes en cours",
          value: kpis.demandes_en_cours,
          unit: "demandes",
          color: "warning"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard$1,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-blue-500" }),
          label: "Formations",
          value: kpis.formations_planifiees,
          unit: "session(s)",
          color: "info"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard$1,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-green-500" }),
          label: "Objectifs",
          value: kpis.taux_objectifs_atteints,
          unit: "%",
          color: "success"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard$1,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-4 w-4 text-purple-500" }),
          label: "Heures supp.",
          value: kpis.heures_supplementaires,
          unit: "h",
          color: "secondary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard$1,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-rose-500" }),
          label: "Notifications",
          value: kpis.notifications_non_lues,
          unit: "nouvelles",
          color: "danger"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
            "Notifications récentes"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs text-primary hover:underline",
              onClick: markAllAsRead,
              children: "Tout marquer comme lu"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: notifLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Chargement…"
        ] }) : notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-4 text-center", children: "Aucune notification pour le moment" }) : notifications.map((notif) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full text-left flex items-start gap-3 p-3 bg-muted/40 rounded-lg hover:bg-muted transition-colors",
            onClick: () => markAsRead(notif._key),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${notif.lu ? "bg-muted-foreground/30" : "bg-primary"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: notif.type }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: notif.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: notif.date })
            ]
          },
          notif._key
        )) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          "Solde de congés"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Pris (",
                solde.pris,
                "j)"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Restants (",
                solde.restants,
                "j) / Total (",
                solde.total,
                "j)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-muted rounded-full h-2.5 overflow-hidden flex", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "bg-amber-400 h-2.5 transition-all",
                  style: { width: `${solde.total > 0 ? solde.pris / solde.total * 100 : 0}%` }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "bg-primary h-2.5 transition-all",
                  style: { width: `${solde.total > 0 ? solde.restants / solde.total * 100 : 0}%` }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-amber-400 inline-block" }),
                "Pris"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary inline-block" }),
                "Restants"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Exceptionnels" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                solde.exceptionnels ?? 0,
                " j"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Total restant" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                solde.restants ?? 0,
                " j"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/leave",
              className: "block w-full text-center text-xs text-primary hover:underline mt-1",
              children: "Faire une demande →"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
          "Mes présences"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PresenceStat$1,
            {
              label: "Heures cette semaine",
              value: `${presence.heures_semaine}h`,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-3.5 w-3.5 text-blue-500" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PresenceStat$1,
            {
              label: "Retards ce mois",
              value: presence.retards_mois,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 text-amber-500" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PresenceStat$1,
            {
              label: "Absences ce mois",
              value: presence.absences_mois,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 text-rose-500" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground pt-1 border-t", children: "Données en lecture seule — saisies par RH" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
          "Prochaine formation"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          ((_b = data == null ? void 0 : data.prochaine_formation) == null ? void 0 : _b.titre) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: data.prochaine_formation.titre }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: data.prochaine_formation.date_debut })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full", children: data.prochaine_formation.statut || "Inscrit" }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune formation prévue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/trainings",
              className: "block w-full text-center text-xs text-primary hover:underline mt-1",
              children: "Voir toutes les formations →"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
          "Mon plan de carrière"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Objectif en cours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm mt-0.5", children: ((_c = data == null ? void 0 : data.plan_carriere) == null ? void 0 : _c.dernier_objectif) || "Aucun objectif défini" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-primary h-2 rounded-full transition-all",
                style: { width: `${((_d = data == null ? void 0 : data.plan_carriere) == null ? void 0 : _d.progression) ?? 0}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              ((_e = data == null ? void 0 : data.plan_carriere) == null ? void 0 : _e.progression) ?? 0,
              "% complété"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/career",
              className: "block w-full text-center text-xs text-primary hover:underline",
              children: "Voir mon plan →"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          "Dernière fiche de paie"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: ((_f = data == null ? void 0 : data.derniere_fiche_paie) == null ? void 0 : _f.mois) || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Disponible au téléchargement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-primary mt-1", children: ((_g = data == null ? void 0 : data.derniere_fiche_paie) == null ? void 0 : _g.net) ? `${data.derniere_fiche_paie.net.toLocaleString("fr-FR")} FCFA` : "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-full px-3 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
              disabled: !latestPayslip,
              onClick: handleDownloadPayslip,
              children: "Télécharger PDF"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
          "Actualités RH"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ((_h = data == null ? void 0 : data.actualites_rh) == null ? void 0 : _h.length) > 0 ? data.actualites_rh.map((actu, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/40 rounded-lg space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: actu.titre }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: actu.resume }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
            "Publié le ",
            actu.date
          ] })
        ] }, idx)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-2 text-center", children: "Aucune actualité pour le moment" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/10 dark:to-background border-amber-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-7 w-7 text-amber-500 mx-auto mb-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Palmarès ASIN" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-xs", children: palmares == null ? void 0 : palmares.period })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-center space-y-3", children: (palmares == null ? void 0 : palmares.employee_name) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto w-14 h-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: palmares.photo_url,
              className: "w-full h-full rounded-full object-cover border-2 border-amber-200 shadow",
              alt: palmares.employee_name
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm", children: palmares.employee_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: palmares.position })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/60 dark:bg-black/20 p-2 rounded-lg text-[11px] italic border border-amber-100", children: [
            '"',
            palmares.reason,
            '"'
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-4", children: "Aucune donnée disponible" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
          "Boîte à suggestions"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Vos suggestions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mt-0.5", children: ((_i = data == null ? void 0 : data.suggestions) == null ? void 0 : _i.resume) || "Aucune suggestion en cours" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            ((_j = data == null ? void 0 : data.suggestions) == null ? void 0 : _j.en_attente) != null && /* @__PURE__ */ jsxRuntimeExports.jsx(
              SuggestionStat,
              {
                label: "En attente",
                value: data.suggestions.en_attente,
                color: "amber"
              }
            ),
            ((_k = data == null ? void 0 : data.suggestions) == null ? void 0 : _k.traitees) != null && /* @__PURE__ */ jsxRuntimeExports.jsx(
              SuggestionStat,
              {
                label: "Traitées",
                value: data.suggestions.traitees,
                color: "green"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/suggestions",
              className: "block w-full text-center px-3 py-2 bg-muted text-muted-foreground text-sm rounded-lg hover:bg-muted/80 transition-colors",
              children: "Nouvelle suggestion"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function KpiCard$1({
  icon,
  label,
  value,
  unit,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-tight", children: label }),
      icon
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-foreground", children: value }),
      unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: unit })
    ] })
  ] });
}
function PresenceStat$1({
  label,
  value,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: value })
  ] });
}
function SuggestionStat({
  label,
  value,
  color
}) {
  const colorMap = {
    amber: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    green: "text-green-600 bg-green-50 dark:bg-green-900/20"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex justify-between items-center px-2 py-1 rounded text-xs ${colorMap[color]}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: value })
  ] });
}
function ManagerDashboard() {
  var _a, _b, _c, _d, _e, _f;
  const { user } = useIcesAuth();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useApi("/api/v1/dashboard/manager");
  const { data: notifications } = useApi("/api/v1/manager/notifications?unread_only=true");
  const { data: trainings } = useApi("/api/v1/manager/trainings");
  const unreadNotifs = (notifications ?? []).length;
  const pendingTrainings = (trainings ?? []).filter((t) => t.statut_inscription === "pending").length;
  const [rejectingId, setRejectingId] = reactExports.useState(null);
  const [rejectComment, setRejectComment] = reactExports.useState("");
  const [isRejectSubmitting, setIsRejectSubmitting] = reactExports.useState(false);
  const handleApprove = async (id) => {
    try {
      await apiFetch(`/api/v1/manager/leaves/${id}/approve`, { method: "POST" });
      ue.success("Demande approuvée");
      refetch();
    } catch {
      ue.error("Erreur lors du traitement de la demande");
    }
  };
  const submitReject = async () => {
    if (!rejectingId) return;
    const comment = rejectComment.trim();
    if (!comment) {
      ue.error("Commentaire obligatoire pour refuser");
      return;
    }
    setIsRejectSubmitting(true);
    try {
      await apiFetch(
        `/api/v1/manager/leaves/${rejectingId}/reject?comment=${encodeURIComponent(comment)}`,
        { method: "POST" }
      );
      ue.success("Demande rejetée");
      setRejectingId(null);
      setRejectComment("");
      refetch();
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Erreur lors du refus");
    } finally {
      setIsRejectSubmitting(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Tableau de bord équipe" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Bienvenue, ",
        user == null ? void 0 : user.full_name,
        " — Espace Manager"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Collaborateurs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: ((_a = data == null ? void 0 : data.kpis) == null ? void 0 : _a.nb_collaborateurs) ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "sous votre responsabilité" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Congés à valider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: ((_b = data == null ? void 0 : data.kpis) == null ? void 0 : _b.conges_a_valider) ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "en attente de validation" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Taux de présence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: ((_c = data == null ? void 0 : data.kpis) == null ? void 0 : _c.taux_presence) != null ? `${data.kpis.taux_presence}%` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "ce mois-ci" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
        "Actions en attente"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        rejectingId !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-4 rounded-lg border border-destructive/30 bg-destructive/5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
            "Refuser la demande #",
            rejectingId,
            " — commentaire obligatoire"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-sm resize-none",
              rows: 3,
              value: rejectComment,
              onChange: (e) => setRejectComment(e.target.value),
              placeholder: "Ex: Période critique, merci de proposer une autre date."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => {
                  setRejectingId(null);
                  setRejectComment("");
                },
                disabled: isRejectSubmitting,
                children: "Annuler"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "destructive",
                onClick: submitReject,
                disabled: isRejectSubmitting,
                children: isRejectSubmitting ? "Refus..." : "Confirmer le refus"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          (_d = data == null ? void 0 : data.actions_en_attente) == null ? void 0 : _d.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-4 bg-muted/50 rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium truncate", children: [
                    "Demande de ",
                    action.type_conge,
                    " — ",
                    action.collaborateur
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                    "Du ",
                    action.date_debut,
                    " au ",
                    action.date_fin,
                    " (",
                    action.nb_jours,
                    " jours)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Soumis il y a ",
                    action.soumis_il_y_a
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0 ml-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "bg-accent hover:bg-accent",
                      onClick: () => handleApprove(action.id),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mr-1" }),
                        "Approuver"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "destructive",
                      onClick: () => {
                        setRejectingId(action.id);
                        setRejectComment("");
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 mr-1" }),
                        "Refuser"
                      ]
                    }
                  )
                ] })
              ]
            },
            action.id
          )),
          ((_e = data == null ? void 0 : data.actions_en_attente) == null ? void 0 : _e.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "Aucune action en attente." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5 text-emerald-500" }),
          "Productivité de l'équipe"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-primary/5 border border-primary/10 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase text-primary mb-2", children: "Guide d'utilisation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: "Ce module analyse les performances basées sur les objectifs (KPIs) et le respect des délais projets (Kanban). Utilisez les graphiques pour identifier les goulots d'étranglement et planifier vos entretiens One-to-One." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [
            { label: "Taux de complétion projets", val: 78, color: "bg-emerald-500" },
            { label: "Respect des horaires (Moyenne)", val: 92, color: "bg-blue-500" },
            { label: "Engagement (Enquêtes)", val: 85, color: "bg-amber-500" }
          ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stat.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                stat.val,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: stat.color + " h-1.5 rounded-full", style: { width: `${stat.val}%` } }) })
          ] }, stat.label)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
          "Membres de l'équipe"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          (_f = data == null ? void 0 : data.team) == null ? void 0 : _f.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold", children: member.name ? member.name.charAt(0).toUpperCase() : "?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: member.name || "Inconnu" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase font-bold", children: member.skills && member.skills.length > 0 ? member.skills.slice(0, 2).join(", ") : "Aucune compétence" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-semibold px-2 py-0.5 rounded-full ${member.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`,
                children: member.status === "active" ? "Présent" : member.status
              }
            )
          ] }, member.id)),
          (!(data == null ? void 0 : data.team) || data.team.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucun membre d'équipe trouvé" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }),
          "Calendrier d'équipe"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Visualisez les absences et événements à venir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 max-w-xs", children: [...Array(31)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-8 w-8 flex items-center justify-center text-[10px] rounded ${[5, 12, 18].includes(i + 1) ? "bg-primary text-white font-bold" : [6, 7, 13, 14, 20, 21, 27, 28].includes(i + 1) ? "bg-muted text-muted-foreground" : "bg-muted/30"}`, children: i + 1 }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-4 text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-primary rounded" }),
              " Congés"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-muted rounded" }),
              " Weekend"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
            "Notifications",
            unreadNotifs > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground", children: unreadNotifs })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-xs gap-1",
              onClick: () => navigate({ to: "/team-notifications" }),
              children: [
                "Voir tout",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: unreadNotifs === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-6 text-center", children: "Aucune nouvelle notification" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (notifications ?? []).slice(0, 4).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 p-3 rounded-lg bg-muted/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: n.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1", children: n.message })
              ] })
            ]
          },
          n.id
        )) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Book, { className: "h-5 w-5" }),
            "Formations équipe",
            pendingTrainings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white", children: pendingTrainings })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-xs gap-1",
              onClick: () => navigate({ to: "/team-trainings" }),
              children: [
                "Gérer",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: !trainings || trainings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-6 text-center", children: "Aucune inscription en cours" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: trainings.slice(0, 4).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 rounded-lg bg-muted/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: t.employee }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.formation })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${t.statut_inscription === "pending" ? "bg-amber-100 text-amber-700" : t.statut_inscription === "validated" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`,
                  children: t.statut_inscription === "pending" ? "En attente" : t.statut_inscription === "validated" ? "Validée" : "Refusée"
                }
              )
            ]
          },
          t.id
        )) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5" }),
            "Avancement des Projets"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-xs",
              onClick: () => navigate({ to: "/projects" }),
              children: "Voir Kanban"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] })
    ] })
  ] });
}
function RespRHDashboard() {
  var _a, _b, _c, _d, _e;
  const { user } = useIcesAuth();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useApi("/api/v1/resp-rh/dashboard");
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center text-destructive", children: "Erreur de chargement des données RH." });
  }
  const kpis = (data == null ? void 0 : data.kpis) || {
    collaborateurs_actifs: 0,
    contrats_a_renouveler: 0,
    alertes_medicales: 0,
    formations_ce_mois: 0,
    suggestions_en_attente: 0,
    enquetes_actives: 0,
    taux_absenteisme: 0
  };
  const alertes = (data == null ? void 0 : data.alertes_prioritaires) || [];
  const stats_personnel = (data == null ? void 0 : data.stats_personnel) || {};
  const budget_formation = (data == null ? void 0 : data.budget_formation) || {};
  const presences = (data == null ? void 0 : data.presences) || {};
  const conges = (data == null ? void 0 : data.conges) || {};
  const suggestions = (data == null ? void 0 : data.suggestions) || {};
  const evaluations = (data == null ? void 0 : data.evaluations) || {};
  const handleValiderConge = async (id) => {
    try {
      await apiFetch(`/leave/${id}/statut`, {
        method: "PATCH",
        body: JSON.stringify({ status: "approved" })
      });
      ue.success("Congé validé");
      refetch();
    } catch {
      ue.error("Erreur lors de la validation");
    }
  };
  const handleAlerteAction = (alerte) => {
    if (alerte.type_alerte === "Contrat") {
      navigate({ to: "/rh-contracts" });
    } else if (alerte.type_alerte === "Formation") {
      navigate({ to: "/trainings" });
    } else {
      ue.info("Action non configurée pour cette alerte");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Tableau de bord RH" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
        "Bienvenue, ",
        user == null ? void 0 : user.full_name,
        " — Espace Responsable RH"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-blue-500" }),
          label: "Collaborateurs actifs",
          value: kpis.collaborateurs_actifs,
          sub: "effectif total"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-amber-500" }),
          label: "Contrats à renouveler",
          value: kpis.contrats_a_renouveler,
          sub: "dans 30 jours",
          warn: kpis.contrats_a_renouveler > 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-rose-500" }),
          label: "Alertes médicales",
          value: kpis.alertes_medicales,
          sub: "visites dues",
          warn: kpis.alertes_medicales > 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-green-500" }),
          label: "Formations ce mois",
          value: kpis.formations_ce_mois,
          sub: "planifiées"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-purple-500" }),
          label: "Suggestions en attente",
          value: kpis.suggestions_en_attente,
          sub: "à traiter",
          warn: kpis.suggestions_en_attente > 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-indigo-500" }),
          label: "Enquêtes actives",
          value: kpis.enquetes_actives,
          sub: "en collecte"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-orange-500" }),
          label: "Taux absentéisme",
          value: `${kpis.taux_absenteisme}%`,
          sub: "ce mois",
          warn: kpis.taux_absenteisme > 5
        }
      )
    ] }),
    alertes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-500" }),
        "Alertes prioritaires"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-3", children: alertes.map((alerte, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `p-4 border rounded-lg ${alerte.urgence === "high" ? "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800" : "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: alerte.titre }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: alerte.description }),
                alerte.echeance && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  "Échéance : ",
                  alerte.echeance
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `flex-shrink-0 px-2 py-0.5 text-xs rounded-full font-medium ${alerte.urgence === "high" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"}`,
                  children: alerte.type_alerte
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => handleAlerteAction(alerte), children: alerte.action_bouton }),
              alerte.action_secondaire && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: alerte.action_secondaire })
            ] })
          ]
        },
        idx
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
          "Présences aujourd'hui"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PresenceStat, { label: "Présents", value: presences.presents ?? 0, color: "green" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PresenceStat, { label: "Absents", value: presences.absents ?? 0, color: "rose" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PresenceStat, { label: "Retards", value: presences.retards ?? 0, color: "amber" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PresenceStat, { label: "Imports manquants", value: presences.imports_manquants ?? 0, color: "gray" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rh-attendance", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "w-full mt-2", children: "Gérer les présences" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          "Congés — Validation finale"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          ((_a = conges.demandes_en_attente) == null ? void 0 : _a.length) > 0 ? conges.demandes_en_attente.slice(0, 4).map((req, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-2 bg-muted/40 rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium truncate", children: req.collaborateur }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    req.type,
                    " · ",
                    req.jours,
                    "j"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleValiderConge(req.id),
                    className: "flex-shrink-0 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md hover:bg-green-200 transition-colors",
                    children: "Valider"
                  }
                )
              ]
            },
            idx
          )) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8 text-green-500 mb-2 opacity-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune demande en attente" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rh-conges", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "w-full", children: "Voir toutes les demandes" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          "Contrats & avenants"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-rose-700 dark:text-rose-400", children: "Échéances < 30 jours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-rose-600 dark:text-rose-400", children: kpis.contrats_a_renouveler }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rh-contracts", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "mt-2 w-full", children: "Traiter maintenant" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-amber-700 dark:text-amber-400", children: "Échéances < 60 jours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-amber-600 dark:text-amber-400", children: (data == null ? void 0 : data.contrats_60_jours) ?? 0 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
          "Dossiers du personnel"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3 text-center", children: [
            { label: "Actifs", value: stats_personnel.actifs ?? 0, color: "text-green-600" },
            { label: "CDI", value: stats_personnel.cdi ?? 0, color: "text-blue-600" },
            { label: "CDD", value: stats_personnel.cdd ?? 0, color: "text-amber-600" },
            { label: "Stage", value: stats_personnel.stages ?? 0, color: "text-purple-600" }
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/40 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${s.color}`, children: s.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label })
          ] }, s.label)) }),
          ((_b = stats_personnel.departements) == null ? void 0 : _b.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: stats_personnel.departements.map((dept, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between items-center px-3 py-2 bg-muted/30 rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: dept.nom }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                  dept.effectif,
                  " collaborateurs"
                ] })
              ]
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rh-employees", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", size: "sm", children: "Voir tous les dossiers" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
          "Formation & développement"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Budget annuel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: budget_formation.total || "N/A" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Dépensé" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-amber-600", children: budget_formation.depense || "0 FCFA" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Restant" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-green-600", children: budget_formation.restant || "0 FCFA" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-primary h-2 rounded-full transition-all",
                style: { width: `${budget_formation.pourcentage ?? 0}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              budget_formation.pourcentage ?? 0,
              "% du budget utilisé"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trainings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "w-full", children: "Gérer les formations" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4" }),
          "Compétences & évaluations"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/40 rounded-lg space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: "Évaluations annuelles" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              evaluations.faites ?? 0,
              "/",
              evaluations.total ?? 0,
              " complétées"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-green-500 h-2 rounded-full",
                style: { width: `${evaluations.pourcentage ?? 0}%` }
              }
            ) })
          ] }),
          (evaluations.retard ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-amber-700 dark:text-amber-400", children: "En retard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-amber-600", children: evaluations.retard }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "mt-2 w-full", children: "Relancer managers" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
          "Suggestions reçues"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          [
            { label: "Nouvelles", value: suggestions.nouvelles ?? kpis.suggestions_en_attente, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
            { label: "En traitement", value: suggestions.traitement ?? 0, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
            { label: "Répondues", value: suggestions.repondues ?? 0, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" }
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between items-center p-2.5 bg-muted/40 rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: s.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 text-xs font-semibold rounded-full ${s.color}`, children: s.value })
              ]
            },
            s.label
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/suggestions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "w-full mt-2", children: "Voir toutes" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }),
          "Satisfaction collaborateurs"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary", children: [
              ((_c = data == null ? void 0 : data.satisfaction) == null ? void 0 : _c.score) ?? "—",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-muted-foreground", children: "/5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Score moyen satisfaction" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Enquêtes actives" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: kpis.enquetes_actives })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Plaintes ouvertes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium ${(((_d = data == null ? void 0 : data.satisfaction) == null ? void 0 : _d.plaintes_ouvertes) ?? 0) > 0 ? "text-rose-600" : ""}`, children: ((_e = data == null ? void 0 : data.satisfaction) == null ? void 0 : _e.plaintes_ouvertes) ?? 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/enquetes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "w-full", children: "Lancer une enquête" }) })
        ] })
      ] })
    ] })
  ] });
}
function KpiCard({
  icon,
  label,
  value,
  sub,
  warn = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: warn ? "border-amber-300 dark:border-amber-700" : "", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground leading-tight", children: label }),
      icon
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold ${warn ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`, children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] })
  ] });
}
function PresenceStat({
  label,
  value,
  color
}) {
  const colorMap = {
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    gray: "bg-muted text-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 text-xs font-semibold rounded-full ${colorMap[color]}`, children: value })
  ] });
}
function AdminRHDashboard() {
  var _a;
  const { user } = useIcesAuth();
  const navigate = useNavigate();
  const { config } = useCompanyConfig();
  const { data, isLoading } = useApi("/api/v1/dashboard/admin");
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  const kpis = (data == null ? void 0 : data.kpis) || { total_users: 0, active_users: 0, conges_en_attente: 0 };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Tableau de bord global" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Bienvenue, ",
        user == null ? void 0 : user.full_name,
        " - Espace Administrateur RH"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total collaborateurs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: kpis.total_users }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "collaborateurs actifs" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Utilisateurs actifs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: kpis.active_users }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "comptes actifs" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Congés en attente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-orange-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: kpis.conges_en_attente || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "demandes à valider" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-orange-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }),
          "Demandes de congés récentes"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ((_a = data == null ? void 0 : data.pending_leaves) == null ? void 0 : _a.length) > 0 ? data.pending_leaves.map((leave) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: leave.collaborateur }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              leave.type,
              " - ",
              leave.jours,
              " jours dès le ",
              leave.date_debut
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-orange-600 border-orange-200 bg-orange-50", children: "En attente" })
        ] }, leave.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-4 text-sm", children: "Aucune demande en attente" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5" }),
          "Administration système"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/50 rounded-lg text-center cursor-pointer hover:bg-muted transition-colors", onClick: () => navigate({ to: "/admin-logs" }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-8 w-8 mx-auto mb-2 text-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "Base de données" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Logs & Audit" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/50 rounded-lg text-center cursor-pointer hover:bg-muted transition-colors", onClick: () => navigate({ to: "/admin-securite" }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 mx-auto mb-2 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "Sécurité" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Politiques actives" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/50 rounded-lg text-center cursor-pointer hover:bg-muted transition-colors", onClick: () => navigate({ to: "/admin-users" }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 mx-auto mb-2 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "Utilisateurs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              kpis.total_users,
              " comptes"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/50 rounded-lg text-center cursor-pointer hover:bg-muted transition-colors", onClick: () => navigate({ to: "/admin-roles" }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "h-8 w-8 mx-auto mb-2 text-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "Permissions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Rôles configurés" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-5 w-5" }),
        "Actions rapides"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-20 flex-col gap-2", onClick: () => navigate({ to: "/rh-employees/new" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Créer employé" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-20 flex-col gap-2", onClick: () => navigate({ to: "/admin-roles" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Gérer permissions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-20 flex-col gap-2", onClick: () => navigate({ to: "/admin/configuration" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Configurer système" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-20 flex-col gap-2", onClick: () => navigate({ to: "/admin-sauvegardes" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Backup données" })
        ] })
      ] }) })
    ] })
  ] });
}
function DirectionDashboard() {
  const { user } = useIcesAuth();
  const { config } = useCompanyConfig();
  (config == null ? void 0 : config.currency) || "FCFA";
  const { data, isLoading } = useApi("/api/v1/dashboard/direction");
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  const kpis = (data == null ? void 0 : data.kpis) || {
    effectif_total: 0,
    taux_turnover: "0%",
    taux_presence: "0%",
    formations_realisees: "0/0",
    satisfaction: "0/5",
    suggestions_traitees: "0%"
  };
  const handleExport = async (type, format = "pdf") => {
    try {
      const filename = `${type}_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.${format}`;
      await downloadFile(`/reports/export/${type}/${format}`, filename);
      ue.success("Rapport généré avec succès");
    } catch (err) {
      ue.error(err.message || "Erreur lors de la génération du rapport");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Vue d'ensemble stratégique" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Bienvenue, ",
        user == null ? void 0 : user.full_name,
        " - Espace Direction"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Effectif total actif" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: kpis.effectif_total }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "+2 vs mois dernier" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Taux de turnover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-accent", children: kpis.taux_turnover }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Objectif: <5%" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Taux de présence moyen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: kpis.taux_presence }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Excellent" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Formations réalisées / planifiées" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: kpis.formations_realisees }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "82% de complétion" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Score satisfaction moyen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: kpis.satisfaction }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "+0.2 vs Q1" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Suggestions traitées" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: kpis.suggestions_traitees }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "temps moyen: 48h" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
          "Évolution de l'effectif - 12 mois"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5" }),
          "Pyramide des âges"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }),
          "Taux de turnover mensuel"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5" }),
          "Répartition par département"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }),
          "Taux d'absentéisme"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5" }),
          "Évolution masse salariale"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "h-5 w-5" }),
          "Satisfaction collaborateurs"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5" }),
          "Suggestions traitées"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5" }),
        "Rapports & exports disponibles"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-16 flex-col gap-1", onClick: () => handleExport("etat-personnel"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Bilan social" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-16 flex-col gap-1", onClick: () => handleExport("competences"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Rapport compétences" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-16 flex-col gap-1", onClick: () => handleExport("absenteisme"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Rapport absentéisme" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-16 flex-col gap-1", onClick: () => handleExport("formations"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Rapport formations" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-16 flex-col gap-1", onClick: () => handleExport("satisfaction"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Rapport satisfaction" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-16 flex-col gap-1", onClick: () => handleExport("turnover"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Rapport turnover" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-16 flex-col gap-1", onClick: () => handleExport("productivite"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Rapport productivité" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-16 flex-col gap-1", onClick: () => handleExport("etats-legaux"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "h-5 w-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", children: [
            "États légaux (",
            (config == null ? void 0 : config.country) || "Pays",
            ")"
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function DashboardPage() {
  const { user } = useIcesAuth();
  if (!user) return null;
  switch (user.role) {
    case "collaborateur":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollaborateurDashboard, {});
    case "manager":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ManagerDashboard, {});
    case "resp_rh":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(RespRHDashboard, {});
    case "admin_rh":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminRHDashboard, {});
    case "direction":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DirectionDashboard, {});
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollaborateurDashboard, {});
  }
}
export {
  DashboardPage as default
};
