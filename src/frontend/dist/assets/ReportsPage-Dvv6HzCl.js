import { l as useCompanyConfig, a as useApi, r as reactExports, j as jsxRuntimeExports, a6 as CardSkeleton, F as FileText, S as Shield, e as TrendingUp, U as Users } from "./index-Wq93vx8q.js";
import { C as Card, S as StatCard } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { E as ErrorMessage } from "./ErrorMessage-DN9KnOIR.js";
import { P as PageHeader } from "./PageHeader-BvZCSHtX.js";
import { downloadFile } from "./download-B8AgO4BJ.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { B as BookOpen } from "./book-open-DqfOpDcs.js";
import { S as Smile } from "./smile-BVWGM35q.js";
import { D as Download } from "./download-CEJWcwKg.js";
import "./circle-alert-Cb00aeSX.js";
import "./refresh-cw-CGHREE1Q.js";
function ReportsPage() {
  const { config } = useCompanyConfig();
  const currency = (config == null ? void 0 : config.currency) || "FCFA";
  const { data: reports, isLoading, error, refetch } = useApi("/api/v1/direction/reports");
  useApi("/api/v1/direction/kpis");
  const [departmentId, setDepartmentId] = reactExports.useState("");
  const [year, setYear] = reactExports.useState("2024");
  const queryParams = reactExports.useMemo(() => {
    const qs = new URLSearchParams();
    if (departmentId) qs.set("department_id", departmentId);
    if (year) qs.set("year", year);
    return qs.toString();
  }, [departmentId, year]);
  const handleExport = async (path, filename) => {
    try {
      const url = queryParams ? `${path}?${queryParams}` : path;
      await downloadFile(`/api/v1${url}`, filename);
      ue.success("Export lancé");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Erreur d'export");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {})
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { onRetry: refetch, title: "Erreur de chargement des rapports" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Rapports & Exports",
        subtitle: "Consultez et téléchargez les rapports stratégiques et bilans sociaux"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-4", children: "Filtres d'export" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Département (optionnel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
              placeholder: "Saisir ID Département",
              value: departmentId,
              onChange: (e) => setDepartmentId(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-48", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Année fiscale" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
              value: year,
              onChange: (e) => setYear(e.target.value)
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "h-24 flex-col gap-2",
          onClick: () => handleExport("/reports/export/etat-personnel/pdf", "etat_personnel.pdf"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Bilan social (PDF)" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "h-24 flex-col gap-2",
          onClick: () => handleExport("/documents/generate/certificate", `rapport_formations_${year}.pdf`),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Rapport Formations" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "h-24 flex-col gap-2",
          onClick: () => handleExport("/reports/export/conges/excel", `rapport_conges_${year}.xlsx`),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Enquêtes Satisfaction" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "h-24 flex-col gap-2",
          onClick: () => handleExport("/reports/export/etat-personnel/excel", "etat_personnel.xlsx"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "États légaux (Excel)" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Rapports générés disponibles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: !reports || reports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucun rapport disponible pour cette période." }) : reports.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: report.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              report.type,
              " — Le ",
              new Date(report.date).toLocaleDateString("fr-FR"),
              " — ",
              report.size
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "gap-1",
              onClick: () => handleExport(`/reports/export/${report.id}/pdf`, `${report.title}.pdf`),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }),
                "PDF"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "gap-1",
              onClick: () => handleExport(`/reports/export/${report.id}/excel`, `${report.title}.xlsx`),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }),
                "Excel"
              ]
            }
          )
        ] })
      ] }, report.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Masse salariale annuelle",
          value: `4 200 000 ${currency}`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18, className: "text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Coût moyen / collaborateur",
          value: `125 000 ${currency}`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18, className: "text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Budget formation utilisé",
          value: `180 000 ${currency}`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 18, className: "text-primary" })
        }
      )
    ] })
  ] });
}
export {
  ReportsPage as default
};
