import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, C as CardSkeleton, U as Users, L as Link } from "./index-C9_e_yR_.js";
import { S as StatusBadge } from "./Badge-DjlFEkmY.js";
import { R as RefreshCw, E as ErrorMessage } from "./ErrorMessage-CRfBj40v.js";
import { P as PageHeader, u as useBackend, a as useQuery } from "./use-backend-Pu7zigIS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
function Card({ children, className, hover, onClick }) {
  const Tag = onClick ? "button" : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      onClick,
      type: onClick ? "button" : void 0,
      className: cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        hover && "hover:shadow-md hover:-translate-y-0.5 transition-smooth cursor-pointer",
        onClick && "w-full text-left",
        className
      ),
      children
    }
  );
}
function StatCard({ label, value, icon, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-3xl text-foreground mt-1.5 tabular-nums", children: value })
    ] }),
    icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-wrap w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: icon })
  ] }) });
}
function useDashboardStats() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching
  });
}
function useRecentEmployees() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["recentEmployees"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      const result = await actor.listEmployees({}, { page: 0n, pageSize: 8n });
      return result.employees;
    },
    enabled: !!actor && !isFetching
  });
}
function DashboardPage() {
  var _a, _b, _c, _d;
  const stats = useDashboardStats();
  const recent = useRecentEmployees();
  const s = (_a = stats.data) == null ? void 0 : _a.statusSummary;
  const total = Number((s == null ? void 0 : s.total) ?? 0);
  const handleRefresh = () => {
    stats.refetch();
    recent.refetch();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Dashboard",
        subtitle: "Real-time overview of your workforce",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleRefresh,
            disabled: stats.isFetching || recent.isFetching,
            "data-ocid": "dashboard.refresh_button",
            className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  size: 14,
                  className: stats.isFetching ? "animate-spin" : ""
                }
              ),
              "Refresh"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8", children: stats.isLoading ? ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, k)) : stats.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        title: "Failed to load stats",
        onRetry: () => stats.refetch()
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Employees",
          value: total,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18, className: "text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Active",
          value: Number((s == null ? void 0 : s.active) ?? 0),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 18, className: "text-chart-4" }),
          className: "[&_.icon-wrap]:bg-chart-4/10 border-chart-4/20"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Inactive",
          value: Number((s == null ? void 0 : s.inactive) ?? 0),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { size: 18, className: "text-destructive" }),
          className: "[&_.icon-wrap]:bg-destructive/10 border-destructive/20"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "On Leave",
          value: Number((s == null ? void 0 : s.onLeave) ?? 0),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18, className: "text-chart-5" }),
          className: "[&_.icon-wrap]:bg-chart-5/10 border-chart-5/20"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8", children: [
      ((_b = stats.data) == null ? void 0 : _b.departmentStats) && stats.data.departmentStats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 rounded-xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Department Distribution" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stats.data.departmentStats.slice().sort(
          (a, b) => Number(b.employeeCount) - Number(a.employeeCount)
        ).map((dept) => {
          const count = Number(dept.employeeCount);
          const pct = total > 0 ? Math.round(count / total * 100) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `dashboard.dept.${String(dept.departmentId)}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate max-w-[180px]", children: dept.departmentName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm tabular-nums text-muted-foreground ml-2 flex-shrink-0", children: [
                    count,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", children: [
                      "(",
                      pct,
                      "%)"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full bg-primary transition-all duration-500",
                    style: { width: `${pct}%` }
                  }
                ) })
              ]
            },
            String(dept.departmentId)
          );
        }) })
      ] }),
      stats.data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-xl border border-border bg-card p-5 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 16, className: "text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Workforce Breakdown" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WorkforceBar,
            {
              label: "Active",
              count: Number((s == null ? void 0 : s.active) ?? 0),
              total,
              colorClass: "bg-chart-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WorkforceBar,
            {
              label: "On Leave",
              count: Number((s == null ? void 0 : s.onLeave) ?? 0),
              total,
              colorClass: "bg-chart-5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WorkforceBar,
            {
              label: "Inactive",
              count: Number((s == null ? void 0 : s.inactive) ?? 0),
              total,
              colorClass: "bg-destructive"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total headcount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg tabular-nums text-foreground", children: total })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Recent Employees" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/employees",
            className: "text-sm font-medium text-primary hover:underline",
            "data-ocid": "dashboard.employees_link",
            children: "View all"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden md:table-cell", children: "Department" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden sm:table-cell", children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recent.isLoading ? ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/60 animate-pulse",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-muted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-muted rounded w-28" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-muted rounded w-20" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-muted rounded w-24" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded-full w-16" }) })
            ]
          },
          `sk-${k}`
        )) : recent.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ErrorMessage,
          {
            title: "Failed to load employees",
            onRetry: () => recent.refetch(),
            "data-ocid": "dashboard.employees.error_state"
          }
        ) }) }) : ((_c = recent.data) == null ? void 0 : _c.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "td",
          {
            colSpan: 4,
            className: "px-4 py-10 text-center text-muted-foreground",
            "data-ocid": "dashboard.employees_empty_state",
            children: [
              "No employees yet.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/employees/new",
                  className: "text-primary hover:underline",
                  children: "Add the first one"
                }
              ),
              "."
            ]
          }
        ) }) : (_d = recent.data) == null ? void 0 : _d.map((emp, idx) => {
          var _a2, _b2;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors",
              "data-ocid": `dashboard.employees.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/employees/$id",
                    params: { id: String(emp.id) },
                    className: "flex items-center gap-2.5 font-medium text-foreground hover:text-primary transition-colors",
                    "data-ocid": `dashboard.employees.link.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeeAvatar, { employee: emp }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate max-w-[140px]", children: [
                        emp.firstName,
                        " ",
                        emp.lastName
                      ] })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: emp.departmentId ? ((_b2 = (_a2 = stats.data) == null ? void 0 : _a2.departmentStats.find(
                  (d) => d.departmentId === emp.departmentId
                )) == null ? void 0 : _b2.departmentName) ?? `Dept #${emp.departmentId}` : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden sm:table-cell", children: hrRoleLabel(emp.hrRole) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: emp.status }) })
              ]
            },
            String(emp.id)
          );
        }) })
      ] }) })
    ] })
  ] });
}
function WorkforceBar({
  label,
  count,
  total,
  colorClass
}) {
  const pct = total > 0 ? Math.round(count / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `w-2.5 h-2.5 rounded-full ${colorClass} flex-shrink-0`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm tabular-nums font-medium text-foreground", children: [
        count,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground", children: [
          "(",
          pct,
          "%)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full ${colorClass} transition-all duration-500`,
        style: { width: `${pct}%` }
      }
    ) })
  ] });
}
function EmployeeAvatar({ employee }) {
  if (employee.profilePicture) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: employee.profilePicture.getDirectURL(),
        alt: `${employee.firstName} ${employee.lastName}`,
        className: "w-8 h-8 rounded-full object-cover flex-shrink-0 border border-border"
      }
    );
  }
  const initials = `${employee.firstName[0] ?? ""}${employee.lastName[0] ?? ""}`;
  const colors = [
    "bg-primary/15 text-primary",
    "bg-accent/15 text-accent-foreground",
    "bg-secondary text-secondary-foreground"
  ];
  const colorIndex = (employee.firstName.charCodeAt(0) ?? 0) % colors.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0 ${colors[colorIndex]}`,
      children: initials.toUpperCase()
    }
  );
}
function hrRoleLabel(role) {
  const labels = {
    HRAdmin: "HR Admin",
    HRManager: "HR Manager",
    Manager: "Manager",
    Employee: "Employee",
    Direction: "Direction"
  };
  return labels[role] ?? role;
}
export {
  DashboardPage as default
};
