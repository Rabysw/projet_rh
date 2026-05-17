import { a as useApi, r as reactExports, j as jsxRuntimeExports, n as FileDown, U as Users, C as Calendar, g as ChartColumn, F as FileText, d as Clock } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { R as RefreshCw } from "./refresh-cw-a95jL2eU.js";
import { b as CardContent, C as CardHeader, a as CardTitle } from "./Card-D5DOr9y8.js";
import { C as CircleCheck } from "./circle-check-O5P8UvY-.js";
import "./index-DPpzsANr.js";
function TeamReportsPage() {
  const { data: summary, isLoading, refetch } = useApi("/api/v1/manager/reports/team-summary");
  const [exporting, setExporting] = reactExports.useState(false);
  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const token = localStorage.getItem("ices_token");
      const response = await fetch(
        "/api/v1/manager/reports/export/team-summary/pdf",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error("Erreur export");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rapport_equipe.pdf";
      a.click();
      URL.revokeObjectURL(url);
      ue.success("Rapport PDF téléchargé");
    } catch {
      ue.error("Erreur lors de l'export PDF");
    } finally {
      setExporting(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  const membres = (summary == null ? void 0 : summary.membres) ?? [];
  const stats = summary == null ? void 0 : summary.stats;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Rapports équipe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Synthèse et exports de votre équipe" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => refetch(),
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
              "Actualiser"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: handleExportPDF,
            disabled: exporting,
            className: "gap-2",
            children: [
              exporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
              "Exporter PDF"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: (summary == null ? void 0 : summary.nb_membres) ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Membres" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-green-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: (stats == null ? void 0 : stats.actifs) ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Actifs" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-blue-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: (stats == null ? void 0 : stats.en_conge) ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "En congé" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-5 w-5 text-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold", children: [
            (stats == null ? void 0 : stats.total_jours_conges_mois) ?? 0,
            "j"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Congés ce mois" })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
        "Détail par membre — ",
        (summary == null ? void 0 : summary.departement) ?? "Équipe"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: membres.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-10", children: "Aucune donnée disponible." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-muted-foreground font-medium", children: "Collaborateur" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-3 text-muted-foreground font-medium", children: "Poste" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-3 px-3 text-muted-foreground font-medium", children: "Statut" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-3 px-3 text-muted-foreground font-medium", children: "Congés (mois)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-3 px-3 text-muted-foreground font-medium", children: "Dem. en attente" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: membres.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-b border-border/40 hover:bg-muted/20 transition-colors ${i % 2 === 0 ? "" : "bg-muted/10"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0", children: m.nom.charAt(0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: m.nom })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-muted-foreground", children: m.poste || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: m.statut === "active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800",
                  children: m.statut === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 mr-1 inline" }),
                    "Actif"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 mr-1 inline" }),
                    "En congé"
                  ] })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-3 text-center font-medium", children: [
                m.conges_pris_mois,
                "j"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-center", children: m.demandes_en_attente > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-100 text-amber-800", children: m.demandes_en_attente }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) })
            ]
          },
          m.id
        )) })
      ] }) }) })
    ] }),
    (summary == null ? void 0 : summary.generated_at) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
      "Données générées le",
      " ",
      new Date(summary.generated_at).toLocaleString("fr-FR")
    ] })
  ] });
}
export {
  TeamReportsPage as default
};
