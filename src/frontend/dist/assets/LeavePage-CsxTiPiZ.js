import { c as createLucideIcon, l as useCompanyConfig, r as reactExports, a as useApi, j as jsxRuntimeExports, d as Clock, C as Calendar, k as apiFetch } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { P as Plus } from "./plus-C9uXZ8Nl.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import "./index-DPpzsANr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 22h14", key: "ehvnwv" }],
  ["path", { d: "M5 2h14", key: "pdyrp9" }],
  [
    "path",
    {
      d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
      key: "1d314k"
    }
  ],
  [
    "path",
    { d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2", key: "1vvvr6" }
  ]
];
const Hourglass = createLucideIcon("hourglass", __iconNode);
const balanceIcons = {
  "Congés payés": Calendar,
  "RTT": Clock,
  "Maladie": Hourglass
};
function LeavePage() {
  var _a;
  const { config } = useCompanyConfig();
  const leaveTypeOptions = ((_a = config == null ? void 0 : config.leave_types) == null ? void 0 : _a.length) ? config.leave_types : ["Congé payé", "Maladie", "Sans solde", "Maternité", "Paternité", "Exceptionnel"];
  const [showForm, setShowForm] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    type: leaveTypeOptions[0] ?? "",
    start: "",
    end: "",
    days: 0,
    reason: ""
  });
  reactExports.useEffect(() => {
    if (!leaveTypeOptions.includes(formData.type)) {
      setFormData((prev) => ({ ...prev, type: leaveTypeOptions[0] ?? "" }));
    }
  }, [leaveTypeOptions, formData.type]);
  const { data: leaveBalance, isLoading: balanceLoading, refetch: refetchBalance } = useApi("/api/v1/collaborateur/leave-balance");
  const { data: leaveRequests, isLoading: requestsLoading, refetch: refetchRequests } = useApi("/api/v1/collaborateur/leave-requests");
  const isLoading = balanceLoading || requestsLoading;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/collaborateur/leave-requests", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      ue.success("Demande soumise avec succès");
      setShowForm(false);
      refetchRequests();
      refetchBalance();
    } catch (err) {
      ue.error("Erreur lors de la soumission");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Mes congés" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Déposez une demande de congé et suivez l'historique de vos absences." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowForm(!showForm), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Nouvelle demande"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) }) : leaveBalance == null ? void 0 : leaveBalance.map((leave) => {
      const IconComp = balanceIcons[leave.type] || Calendar;
      const pct = leave.total > 0 ? leave.remaining / leave.total * 100 : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: leave.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconComp, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: leave.remaining }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "jours restants sur ",
            leave.total
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 w-full bg-muted rounded-full h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-primary h-2 rounded-full transition-all",
              style: { width: `${pct}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            leave.used,
            " jours utilisés"
          ] })
        ] })
      ] }, leave.type);
    }) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Nouvelle demande de congés" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Type de congé" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground",
              value: formData.type,
              onChange: (e) => setFormData({ ...formData, type: e.target.value }),
              children: leaveTypeOptions.map((leaveType) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: leaveType, children: leaveType }, leaveType))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Date de début" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              required: true,
              className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground",
              value: formData.start,
              onChange: (e) => setFormData({ ...formData, start: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Date de fin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "date",
              required: true,
              className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground",
              value: formData.end,
              onChange: (e) => setFormData({ ...formData, end: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Nombre de jours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 1,
              className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground",
              placeholder: "Auto-calculé",
              value: formData.days || "",
              onChange: (e) => setFormData({ ...formData, days: parseInt(e.target.value) || 0 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Motif (optionnel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground",
              rows: 3,
              value: formData.reason,
              onChange: (e) => setFormData({ ...formData, reason: e.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", type: "button", onClick: () => setShowForm(false), children: "Annuler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: isSubmitting, children: [
            isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }),
            "Soumettre la demande"
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Mes demandes récentes" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: requestsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-32 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : !(leaveRequests == null ? void 0 : leaveRequests.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Vous n'avez aucune demande de congé." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: leaveRequests.map((leave) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-muted rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: leave.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              leave.days,
              " jours • du ",
              leave.start,
              " au ",
              leave.end
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: leave.status === "approved" ? "bg-green-100 text-green-700" : leave.status === "rejected" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700", children: leave.status === "pending" ? "En attente" : leave.status === "approved" ? "Approuvé" : "Refusé" })
      ] }, leave.id)) }) })
    ] })
  ] });
}
export {
  LeavePage as default
};
