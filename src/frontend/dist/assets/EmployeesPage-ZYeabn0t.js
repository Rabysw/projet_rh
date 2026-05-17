import { r as reactExports, a as useApi, f as useNavigate, j as jsxRuntimeExports, U as Users, F as FileText, E as Eye } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { I as Input } from "./input-DJbT6S5r.js";
import { P as Plus } from "./plus-C9uXZ8Nl.js";
import { S as Search } from "./search-DAw-TzXT.js";
import { X } from "./x-Cq3J5Kxv.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import "./index-DPpzsANr.js";
function EmployeesPage() {
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("");
  const [contractFilter, setContractFilter] = reactExports.useState("");
  const deferredSearch = reactExports.useDeferredValue(search);
  const params = new URLSearchParams();
  if (deferredSearch) params.set("search", deferredSearch);
  if (statusFilter) params.set("status", statusFilter);
  if (contractFilter) params.set("contract_type", contractFilter);
  const query = params.toString();
  const { data: employees, isLoading } = useApi(
    `/api/v1/resp-rh/employees${query ? `?${query}` : ""}`
  );
  const stats = {
    total: (employees == null ? void 0 : employees.length) || 0,
    active: (employees == null ? void 0 : employees.filter((e) => e.status !== "on_leave" && e.status !== "inactive").length) || 0,
    on_leave: (employees == null ? void 0 : employees.filter((e) => e.status === "on_leave").length) || 0,
    new_this_month: (employees == null ? void 0 : employees.filter((e) => {
      if (!e.hired) return false;
      const hireDate = new Date(e.hired);
      const now = /* @__PURE__ */ new Date();
      return hireDate.getMonth() === now.getMonth() && hireDate.getFullYear() === now.getFullYear();
    }).length) || 0
  };
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Dossiers du personnel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Gérez les dossiers des collaborateurs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", onClick: () => navigate({ to: "/rh-employees/new" }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Nouveau collaborateur"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px] relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-10 pr-8",
            placeholder: "Rechercher un collaborateur...",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            onClick: () => setSearch(""),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: "px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
          value: statusFilter,
          onChange: (e) => setStatusFilter(e.target.value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tous les statuts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Actif" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "on_leave", children: "En congé" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Inactif" })
          ]
        }
      ),
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
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      { label: "Total", value: stats == null ? void 0 : stats.total, color: "text-foreground", icon: Users },
      { label: "Actifs", value: stats == null ? void 0 : stats.active, color: "text-emerald-600", icon: Users },
      { label: "En congé", value: stats == null ? void 0 : stats.on_leave, color: "text-amber-600", icon: Users },
      { label: "Nouveaux", value: stats == null ? void 0 : stats.new_this_month, color: "text-blue-600", icon: Users }
    ].map(({ label, value, color, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${color}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold ${color}`, children: value ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "collaborateurs" })
      ] })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
        "Liste des collaborateurs",
        employees && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground ml-auto", children: [
          employees.length,
          " résultat",
          employees.length !== 1 ? "s" : ""
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : !(employees == null ? void 0 : employees.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-10", children: search || statusFilter ? "Aucun résultat pour ces critères" : "Aucun collaborateur trouvé" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: employees.map((emp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0", children: emp.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: emp.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  emp.role,
                  " — ",
                  emp.dept
                ] }),
                emp.hired && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Embauché le ",
                  new Date(emp.hired).toLocaleDateString("fr-FR")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: emp.contract === "CDI" ? "default" : "outline", className: "text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3 mr-1" }),
                emp.contract
              ] }),
              emp.status === "on_leave" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-amber-600 border-amber-400 text-xs", children: "En congé" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500 hover:bg-emerald-600 text-white text-xs", children: "Actif" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1",
                  onClick: () => navigate({ to: `/rh-employees/${emp.id}` }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
                    "Voir"
                  ]
                }
              )
            ] })
          ]
        },
        emp.id
      )) }) })
    ] })
  ] });
}
export {
  EmployeesPage as default
};
