import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, r as reactExports, X, b as ChevronDown, u as useQueryClient, d as useNavigate, L as Link, S as SkeletonRow, U as Users } from "./index-C9_e_yR_.js";
import { R as RoleBadge, S as StatusBadge } from "./Badge-DjlFEkmY.js";
import { u as useMutation, B as Button, a as ue } from "./index-DoCTDkKg.js";
import { E as ErrorMessage } from "./ErrorMessage-CRfBj40v.js";
import { P as Pen, T as Trash2, C as ConfirmDeleteModal } from "./Modal--IYsfH4z.js";
import { u as useBackend, a as useQuery, P as PageHeader, E as EmploymentStatus, H as HRRole } from "./use-backend-Pu7zigIS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function Pagination({
  page,
  totalPages,
  onPageChange,
  className
}) {
  if (totalPages <= 1) return null;
  const pages = buildPageRange(page, totalPages);
  let ellipsisCount = 0;
  const pageNodes = pages.map((p) => {
    if (p === "...") {
      ellipsisCount += 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-9 text-center text-muted-foreground text-sm",
          children: "…"
        },
        `ellipsis-${ellipsisCount}`
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaginationButton,
      {
        onClick: () => onPageChange(Number(p)),
        active: Number(p) === page,
        "data-ocid": `pagination.page.${p}`,
        children: p
      },
      p
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "aria-label": "Pagination",
      className: cn("flex items-center gap-1", className),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PaginationButton,
          {
            onClick: () => onPageChange(page - 1),
            disabled: page <= 1,
            "aria-label": "Previous page",
            "data-ocid": "pagination.pagination_prev",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
          }
        ),
        pageNodes,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PaginationButton,
          {
            onClick: () => onPageChange(page + 1),
            disabled: page >= totalPages,
            "aria-label": "Next page",
            "data-ocid": "pagination.pagination_next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
          }
        )
      ]
    }
  );
}
function PaginationButton({
  children,
  onClick,
  disabled,
  active,
  "aria-label": ariaLabel,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      "aria-label": ariaLabel,
      "aria-current": active ? "page" : void 0,
      "data-ocid": dataOcid,
      className: cn(
        "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "pointer-events-none opacity-40"
      ),
      children
    }
  );
}
function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}
function SearchInput({
  value: externalValue = "",
  onChange,
  placeholder = "Search…",
  debounce = 300,
  className
}) {
  const [localValue, setLocalValue] = reactExports.useState(externalValue);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setLocalValue(externalValue);
  }, [externalValue]);
  const handleChange = (e) => {
    const v = e.target.value;
    setLocalValue(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(v), debounce);
  };
  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative flex items-center", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Search,
      {
        size: 16,
        className: "absolute left-3 text-muted-foreground pointer-events-none"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "search",
        value: localValue,
        onChange: handleChange,
        placeholder,
        className: "w-full rounded-lg border border-input bg-card pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors",
        "data-ocid": "search.search_input",
        "aria-label": placeholder
      }
    ),
    localValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleClear,
        className: "absolute right-2.5 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors",
        "aria-label": "Clear search",
        "data-ocid": "search.clear_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
      }
    )
  ] });
}
function SelectFilter({
  value,
  onChange,
  options,
  placeholder = "All",
  className,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        className: "w-full appearance-none rounded-lg border border-input bg-card py-2 pl-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors cursor-pointer",
        "data-ocid": dataOcid,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: placeholder }),
          options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChevronDown,
      {
        size: 14,
        className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      }
    )
  ] });
}
const PAGE_SIZE = 20;
const statusOptions = [
  { value: EmploymentStatus.Active, label: "Active" },
  { value: EmploymentStatus.Inactive, label: "Inactive" },
  { value: EmploymentStatus.OnLeave, label: "On Leave" }
];
const roleOptions = [
  { value: HRRole.HRAdmin, label: "HR Admin" },
  { value: HRRole.HRManager, label: "HR Manager" },
  { value: HRRole.Manager, label: "Manager" },
  { value: HRRole.Employee, label: "Employee" },
  { value: HRRole.Direction, label: "Direction" }
];
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") ?? "",
    status: params.get("status") ?? "",
    role: params.get("role") ?? "",
    dept: params.get("dept") ?? "",
    page: Math.max(1, Number(params.get("page") ?? "1"))
  };
}
function setUrlParam(key, value) {
  const params = new URLSearchParams(window.location.search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  if (key !== "page") params.set("page", "1");
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
}
function EmployeesPage() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const urlState = getUrlParams();
  const [search, setSearch] = reactExports.useState(urlState.search);
  const [statusFilter, setStatusFilter] = reactExports.useState(urlState.status);
  const [roleFilter, setRoleFilter] = reactExports.useState(urlState.role);
  const [deptFilter, setDeptFilter] = reactExports.useState(urlState.dept);
  const [page, setPage] = reactExports.useState(urlState.page);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const handleSearch = (v) => {
    setSearch(v);
    setPage(1);
    setUrlParam("search", v);
  };
  const handleStatus = (v) => {
    setStatusFilter(v);
    setPage(1);
    setUrlParam("status", v);
  };
  const handleRole = (v) => {
    setRoleFilter(v);
    setPage(1);
    setUrlParam("role", v);
  };
  const handleDept = (v) => {
    setDeptFilter(v);
    setPage(1);
    setUrlParam("dept", v);
  };
  const handlePage = (p) => {
    setPage(p);
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(p));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };
  const filter = {
    ...search ? { search } : {},
    ...statusFilter ? { status: statusFilter } : {},
    ...roleFilter ? { hrRole: roleFilter } : {},
    ...deptFilter ? { departmentId: BigInt(deptFilter) } : {}
  };
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["employees", filter, page],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.listEmployees(filter, {
        page: BigInt(page - 1),
        pageSize: BigInt(PAGE_SIZE)
      });
    },
    enabled: !!actor && !isFetching,
    placeholderData: (prev) => prev
  });
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.listDepartments();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
  const deptMap = new Map(
    (departments ?? []).map((d) => [String(d.id), d.name])
  );
  const deptOptions = (departments ?? []).map((d) => ({
    value: String(d.id),
    label: d.name
  }));
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteEmployee(id);
    },
    onSuccess: () => {
      ue.success("Employee deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      setDeleteTarget(null);
    },
    onError: () => ue.error("Failed to delete employee")
  });
  const totalPages = data ? Math.ceil(Number(data.total) / PAGE_SIZE) : 0;
  const hasFilters = !!(search || statusFilter || roleFilter || deptFilter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "employees.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Employees",
        subtitle: data ? `${Number(data.total)} employee${Number(data.total) !== 1 ? "s" : ""}` : void 0,
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/employees/new", "data-ocid": "employees.add_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }), children: "Add Employee" }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-5 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchInput,
        {
          value: search,
          onChange: handleSearch,
          placeholder: "Search by name or email…",
          className: "flex-1 min-w-[200px]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectFilter,
        {
          value: deptFilter,
          onChange: handleDept,
          options: deptOptions,
          placeholder: "All departments",
          className: "sm:w-44",
          "data-ocid": "employees.dept_filter"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectFilter,
        {
          value: statusFilter,
          onChange: handleStatus,
          options: statusOptions,
          placeholder: "All statuses",
          className: "sm:w-40",
          "data-ocid": "employees.status_filter"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectFilter,
        {
          value: roleFilter,
          onChange: handleRole,
          options: roleOptions,
          placeholder: "All roles",
          className: "sm:w-40",
          "data-ocid": "employees.role_filter"
        }
      )
    ] }),
    isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { title: "Failed to load employees", onRetry: refetch }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden lg:table-cell", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden md:table-cell", children: "Department" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden md:table-cell", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden sm:table-cell", children: "Contract" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-display font-semibold text-foreground/80", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right font-display font-semibold text-foreground/80", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRow, { cols: 7 }, k)) : (data == null ? void 0 : data.employees.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 7,
          className: "px-4 py-16 text-center",
          "data-ocid": "employees.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 24, className: "text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: hasFilters ? "No employees match your filters" : "No employees yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: hasFilters ? "Try adjusting your search or filter criteria." : "Get started by adding your first team member." })
            ] }),
            !hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/employees/new", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 }), children: "Add first employee" }) })
          ] })
        }
      ) }) : ((data == null ? void 0 : data.employees) ?? []).map((emp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer",
          "data-ocid": `employees.item.${idx + 1}`,
          onClick: () => navigate({
            to: "/employees/$id",
            params: { id: String(emp.id) }
          }),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate({
                to: "/employees/$id",
                params: { id: String(emp.id) }
              });
            }
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeeAvatar, { employee: emp }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground truncate", children: [
                  emp.firstName,
                  " ",
                  emp.lastName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate lg:hidden", children: emp.email })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[200px] block", children: emp.email }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden md:table-cell", children: emp.departmentId ? deptMap.get(String(emp.departmentId)) ?? "—" : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: emp.hrRole }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden sm:table-cell", children: contractLabel(emp.contractType) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: emp.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: "px-4 py-3",
                onClick: (e) => e.stopPropagation(),
                onKeyDown: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/employees/$id",
                      params: { id: String(emp.id) },
                      className: "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                      "aria-label": "View employee",
                      "data-ocid": `employees.view_button.${idx + 1}`,
                      onClick: (e) => e.stopPropagation(),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/employees/$id/edit",
                      params: { id: String(emp.id) },
                      className: "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                      "aria-label": "Edit employee",
                      "data-ocid": `employees.edit_button.${idx + 1}`,
                      onClick: (e) => e.stopPropagation(),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 15 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.stopPropagation();
                        setDeleteTarget(emp);
                      },
                      className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
                      "aria-label": "Delete employee",
                      "data-ocid": `employees.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15 })
                    }
                  )
                ] })
              }
            )
          ]
        },
        String(emp.id)
      )) })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-5 gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Page ",
        page,
        " of ",
        totalPages,
        " — ",
        data ? Number(data.total) : 0,
        " ",
        "total employees"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pagination,
        {
          page,
          totalPages,
          onPageChange: handlePage
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDeleteModal,
      {
        open: deleteTarget !== null,
        onClose: () => setDeleteTarget(null),
        onConfirm: () => deleteTarget && deleteMutation.mutate(deleteTarget.id),
        entityName: deleteTarget ? `${deleteTarget.firstName} ${deleteTarget.lastName}` : "",
        isLoading: deleteMutation.isPending
      }
    )
  ] });
}
function EmployeeAvatar({ employee }) {
  if (employee.profilePicture) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: employee.profilePicture.getDirectURL(),
        alt: `${employee.firstName} ${employee.lastName}`,
        className: "w-9 h-9 rounded-full object-cover flex-shrink-0 border border-border"
      }
    );
  }
  const initials = `${employee.firstName[0] ?? ""}${employee.lastName[0] ?? ""}`;
  const colors = [
    "bg-primary/15 text-primary",
    "bg-accent/15 text-accent-foreground",
    "bg-secondary text-secondary-foreground",
    "bg-chart-4/20 text-foreground"
  ];
  const colorIndex = (employee.firstName.charCodeAt(0) ?? 0) % colors.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0 ${colors[colorIndex]}`,
      children: initials.toUpperCase()
    }
  );
}
function contractLabel(type) {
  const labels = {
    CDI: "CDI",
    CDD: "CDD",
    Internship: "Internship",
    PartTime: "Part-time",
    Freelance: "Freelance"
  };
  return labels[type] ?? type;
}
export {
  EmployeesPage as default
};
