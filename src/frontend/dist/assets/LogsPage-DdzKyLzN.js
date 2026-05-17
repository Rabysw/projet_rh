import { a as useApi, r as reactExports, j as jsxRuntimeExports, t as LoadingSpinner, F as FileText } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { I as Input } from "./input-DJbT6S5r.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./Card-D5DOr9y8.js";
import { S as Search } from "./search-DAw-TzXT.js";
function LogsPage() {
  const { data: logs, isLoading } = useApi("/api/v1/admin-rh/logs");
  const [search, setSearch] = reactExports.useState("");
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) });
  const filteredLogs = logs == null ? void 0 : logs.filter(
    (log) => log.action.toLowerCase().includes(search.toLowerCase()) || log.user.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Logs d'Audit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Historique des actions effectuées sur la plateforme" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Dernières activités" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Rechercher un log...",
              className: "pl-9",
              value: search,
              onChange: (e) => setSearch(e.target.value)
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filteredLogs == null ? void 0 : filteredLogs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-full ${log.type === "danger" ? "bg-red-100 text-red-600" : log.type === "auth" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: log.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: log.user })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: new Date(log.date).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "mt-1 capitalize", children: log.type })
        ] })
      ] }, log.id)) }) })
    ] })
  ] });
}
export {
  LogsPage as default
};
