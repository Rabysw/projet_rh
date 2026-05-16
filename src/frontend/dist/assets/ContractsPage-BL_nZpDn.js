import { r as reactExports, a as useApi, j as jsxRuntimeExports, d as Clock, F as FileText, k as apiFetch } from "./index-Wq93vx8q.js";
import { C as Card } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { L as LoaderCircle } from "./loader-circle-DBROso8Q.js";
import { P as Plus } from "./plus-CMUzI6kD.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./card-CVnFq3EB.js";
import { T as TriangleAlert } from "./triangle-alert-kCIhBUf5.js";
import { C as CircleCheck } from "./circle-check-DtBxltuf.js";
import { D as Download } from "./download-CEJWcwKg.js";
import { U as Upload } from "./upload-CicyoMpF.js";
import { X } from "./x-DJ1ld1ug.js";
function CreateContractModal({
  open,
  onClose,
  onCreated
}) {
  const [form, setForm] = reactExports.useState({
    employee_id: "",
    type: "CDI",
    start: "",
    end: "",
    salary_base: "",
    notes: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const { data: employees } = useApi(
    "/api/v1/resp-rh/employees"
  );
  const handleSubmit = async () => {
    if (!form.employee_id) return ue.error("Sélectionnez un employé");
    if (!form.start) return ue.error("La date de début est requise");
    if (form.type !== "CDI" && !form.end)
      return ue.error("La date de fin est requise pour ce type de contrat");
    setLoading(true);
    try {
      await apiFetch("/api/v1/resp-rh/contracts", {
        method: "POST",
        body: JSON.stringify({
          employee_id: form.employee_id,
          type: form.type,
          start: form.start,
          end: form.end || void 0,
          salary_base: form.salary_base ? parseFloat(form.salary_base) : void 0,
          notes: form.notes || void 0
        })
      });
      ue.success("Contrat créé avec succès");
      onCreated();
      onClose();
      setForm({ employee_id: "", type: "CDI", start: "", end: "", salary_base: "", notes: "" });
    } catch (e) {
      ue.error(e.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Nouveau contrat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Employé *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
            value: form.employee_id,
            onChange: (e) => setForm((f) => ({ ...f, employee_id: e.target.value })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Sélectionner un employé..." }),
              employees == null ? void 0 : employees.map((emp) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: emp.id, children: emp.name }, emp.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Type de contrat *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
            value: form.type,
            onChange: (e) => setForm((f) => ({ ...f, type: e.target.value })),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CDI", children: "CDI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CDD", children: "CDD" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Stage", children: "Stage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Prestation", children: "Prestation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Alternance", children: "Alternance" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Date de début *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
              value: form.start,
              onChange: (e) => setForm((f) => ({ ...f, start: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-medium", children: [
            "Date de fin ",
            form.type !== "CDI" && "*"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
              value: form.end,
              onChange: (e) => setForm((f) => ({ ...f, end: e.target.value })),
              disabled: form.type === "CDI"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Salaire de base (FCFA)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
            placeholder: "Ex : 450000",
            value: form.salary_base,
            onChange: (e) => setForm((f) => ({ ...f, salary_base: e.target.value }))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none",
            rows: 2,
            placeholder: "Remarques optionnelles...",
            value: form.notes,
            onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value }))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: onClose, children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1", onClick: handleSubmit, disabled: loading, children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
          "Créer le contrat"
        ] })
      ] })
    ] })
  ] });
}
function ContractsPage() {
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [uploadingId, setUploadingId] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const {
    data: contracts,
    isLoading,
    refetch
  } = useApi("/api/v1/resp-rh/contracts");
  const { data: alerts, refetch: refetchAlerts } = useApi(
    "/api/v1/resp-rh/contracts/alerts"
  );
  const handleCreated = () => {
    refetch();
    refetchAlerts();
  };
  const handleUploadClick = (id) => {
    var _a;
    setUploadingId(id);
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file || !uploadingId) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", "contract");
    formData.append("employee_id", uploadingId.toString());
    try {
      await apiFetch("/api/v1/documents/upload", {
        method: "POST",
        body: formData
      });
      ue.success("Contrat uploadé avec succès");
      refetch();
    } catch (err) {
      ue.error(err.message || "Erreur lors de l'upload");
    } finally {
      setUploadingId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "file",
        className: "hidden",
        ref: fileInputRef,
        onChange: handleFileChange,
        accept: ".pdf,.doc,.docx,.jpg,.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Contrats & avenants" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Gérez les contrats et suivez les échéances" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", onClick: () => setCreateOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Nouveau contrat"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-rose-200 bg-rose-50 dark:bg-rose-950/20 dark:border-rose-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-rose-700 dark:text-rose-400", children: "Échéances < 30 jours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-rose-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-rose-700 dark:text-rose-300", children: (alerts == null ? void 0 : alerts.expiring_30_days) ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-500", children: "contrats à traiter" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-amber-700 dark:text-amber-400", children: "Échéances < 60 jours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-amber-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-amber-700 dark:text-amber-300", children: (alerts == null ? void 0 : alerts.expiring_60_days) ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-500", children: "à planifier" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-emerald-700 dark:text-emerald-400", children: "Actifs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-emerald-700 dark:text-emerald-300", children: (alerts == null ? void 0 : alerts.active) ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-500", children: "contrats en cours" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
        "Contrats",
        contracts && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground ml-auto", children: [
          contracts.length,
          " contrat",
          contracts.length !== 1 ? "s" : ""
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: !(contracts == null ? void 0 : contracts.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-10", children: "Aucun contrat trouvé" }) : contracts.map((contract) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `p-4 rounded-lg border transition-colors ${contract.alert ? "bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900" : "bg-muted/30 border-border/50 hover:bg-muted/50"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0", children: contract.employee.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: contract.employee }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  contract.type,
                  contract.start && ` — à partir du ${new Date(contract.start).toLocaleDateString("fr-FR")}`,
                  contract.end && ` → ${new Date(contract.end).toLocaleDateString("fr-FR")}`
                ] }),
                contract.alert && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-rose-600 flex items-center gap-1 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
                  contract.alert
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
              contract.contract_url ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-2 text-emerald-600 hover:text-emerald-700",
                  onClick: () => window.open(contract.contract_url, "_blank"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                    "Télécharger"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-2",
                  onClick: () => handleUploadClick(contract.id),
                  disabled: uploadingId === contract.id,
                  children: [
                    uploadingId === contract.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                    "Upload"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "Voir" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "Renouveler" }),
              contract.alert && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "destructive", children: "Traiter" })
            ] })
          ] })
        },
        contract.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateContractModal,
      {
        open: createOpen,
        onClose: () => setCreateOpen(false),
        onCreated: handleCreated
      }
    )
  ] });
}
export {
  ContractsPage as default
};
