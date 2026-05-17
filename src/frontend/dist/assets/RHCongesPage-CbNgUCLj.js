import { r as reactExports, a as useApi, j as jsxRuntimeExports, t as LoadingSpinner, d as Clock, C as Calendar, k as apiFetch } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import { C as CircleCheck } from "./circle-check-O5P8UvY-.js";
import { S as Search } from "./search-DAw-TzXT.js";
import { F as Funnel } from "./funnel-BjqxzcTk.js";
import { C as CircleX } from "./circle-x-BvqMMwvL.js";
import "./index-DPpzsANr.js";
function RHCongesPage() {
  const [search, setSearch] = reactExports.useState("");
  const [contractFilter, setContractFilter] = reactExports.useState("");
  const { data: leaves, isLoading, refetch } = useApi(`/api/v1/resp-rh/conges${contractFilter ? `?contract_type=${contractFilter}` : ""}`);
  const filteredLeaves = reactExports.useMemo(() => {
    if (!leaves) return [];
    return leaves.filter((l) => l.employee.toLowerCase().includes(search.toLowerCase()));
  }, [leaves, search]);
  const handleStatusChange = async (id, status) => {
    try {
      await apiFetch(`/api/v1/resp-rh/conges/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      ue.success(`Demande ${status === "approved" ? "approuvée" : "rejetée"}`);
      refetch();
    } catch (err) {
      ue.error("Erreur lors de la mise à jour");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Gestion des Congés (RH)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Validez et suivez l'ensemble des absences de l'entreprise" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "En attente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-orange-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: (leaves == null ? void 0 : leaves.filter((l) => l.status === "pending").length) || 0 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Approuvés (ce mois)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: (leaves == null ? void 0 : leaves.filter((l) => l.status === "approved").length) || 0 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Effectif présent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-100 text-blue-700", children: "92%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: "112 / 122" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-96", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Rechercher un collaborateur...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: "px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
            value: contractFilter,
            onChange: (e) => setContractFilter(e.target.value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tous les contrats" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CDI", children: "CDI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CDD", children: "CDD" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Internship", children: "Stage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Freelance", children: "Freelance" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
          "Filtres"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Historique & Demandes" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filteredLeaves == null ? void 0 : filteredLeaves.map((leave) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-muted rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: leave.employee }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              leave.type,
              " • ",
              leave.days,
              " jours • du ",
              leave.start,
              " au ",
              leave.end
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: leave.status === "approved" ? "bg-green-100 text-green-700" : leave.status === "rejected" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700", children: leave.status === "pending" ? "En attente" : leave.status === "approved" ? "Approuvé" : "Refusé" }),
          leave.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 ml-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 w-8 p-0 text-green-600",
                onClick: () => handleStatusChange(leave.id, "approved"),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-8 w-8 p-0 text-red-600",
                onClick: () => handleStatusChange(leave.id, "rejected"),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" })
              }
            )
          ] })
        ] })
      ] }, leave.id)) }) })
    ] })
  ] });
}
export {
  RHCongesPage as default
};
