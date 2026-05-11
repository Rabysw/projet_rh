import { c as createLucideIcon, e as useParams, d as useNavigate, u as useQueryClient, r as reactExports, j as jsxRuntimeExports, f as LoadingSpinner, L as Link, g as User } from "./index-C9_e_yR_.js";
import { S as StatusBadge, R as RoleBadge } from "./Badge-DjlFEkmY.js";
import { u as useMutation, B as Button, a as ue } from "./index-DoCTDkKg.js";
import { E as ErrorMessage, R as RefreshCw } from "./ErrorMessage-CRfBj40v.js";
import { P as Pen, T as Trash2, C as ConfirmDeleteModal } from "./Modal--IYsfH4z.js";
import { u as useBackend, a as useQuery, H as HRRole, P as PageHeader } from "./use-backend-Pu7zigIS.js";
import { A as ArrowLeft } from "./arrow-left-CdLuYVY7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function EmployeeDetailPage() {
  var _a;
  const { id } = useParams({ from: "/protected/employees/$id" });
  const navigate = useNavigate();
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const [showDelete, setShowDelete] = reactExports.useState(false);
  const {
    data: employee,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getEmployee(BigInt(id));
    },
    enabled: !!actor && !isFetching && !!id
  });
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.listDepartments();
    },
    enabled: !!actor && !isFetching
  });
  const { data: callerIsAdmin } = useQuery({
    queryKey: ["callerIsAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching
  });
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !id) throw new Error("No actor");
      return actor.deleteEmployee(BigInt(id));
    },
    onSuccess: () => {
      ue.success("Employee deleted");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      navigate({ to: "/employees" });
    },
    onError: () => ue.error("Failed to delete employee")
  });
  const departmentName = (employee == null ? void 0 : employee.departmentId) ? (_a = departments == null ? void 0 : departments.find((d) => d.id === employee.departmentId)) == null ? void 0 : _a.name : void 0;
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  if (isError || !employee)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorMessage,
      {
        title: "Employee not found",
        message: "This employee record does not exist or could not be loaded.",
        onRetry: refetch
      }
    );
  const canEdit = callerIsAdmin || employee.hrRole !== HRRole.HRAdmin;
  const canDelete = callerIsAdmin === true;
  const joinedDate = new Date(
    Number(employee.createdAt) / 1e6
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const updatedDate = new Date(
    Number(employee.updatedAt) / 1e6
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const contractLabels = {
    CDI: "CDI — Permanent Contract",
    CDD: "CDD — Fixed-Term Contract",
    Internship: "Internship",
    PartTime: "Part-Time",
    Freelance: "Freelance / Contractor"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "employee_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: `${employee.firstName} ${employee.lastName}`,
        subtitle: `Employee #${employee.id}`,
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/employees", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }), size: "sm", children: "Back" }) }),
          canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/employees/$id/edit",
              params: { id: String(employee.id) },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 15 }),
                  size: "sm",
                  "data-ocid": "employee_detail.edit_button",
                  children: "Edit"
                }
              )
            }
          ),
          canDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "danger",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15 }),
              size: "sm",
              onClick: () => setShowDelete(true),
              "data-ocid": "employee_detail.delete_button",
              children: "Delete"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 -mt-10 flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(EmployeeAvatar, { employee, size: "lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground mt-3", children: [
              employee.firstName,
              " ",
              employee.lastName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: employee.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: employee.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: employee.hrRole })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider", children: "Quick Info" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickFact,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 14 }),
              label: "Contract",
              value: contractLabels[employee.contractType] ?? employee.contractType
            }
          ),
          departmentName && /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickFact,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 14 }),
              label: "Department",
              value: departmentName
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickFact,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }),
              label: "Joined",
              value: joinedDate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuickFact,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 }),
              label: "Last updated",
              value: updatedDate
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15 }),
              title: "Contact Information"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15 }),
                label: "Email address",
                value: employee.email
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15 }),
                label: "Phone number",
                value: employee.phone || "Not provided"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 15 }),
              title: "Employment Details"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 15 }),
                label: "Contract type",
                value: contractLabels[employee.contractType] ?? employee.contractType
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15 }),
                label: "HR role",
                value: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: employee.hrRole })
              }
            ),
            departmentName && /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 15 }),
                label: "Department",
                value: departmentName
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 15 }),
                label: "Joined",
                value: joinedDate
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 }),
                label: "Record updated",
                value: updatedDate
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDeleteModal,
      {
        open: showDelete,
        onClose: () => setShowDelete(false),
        onConfirm: () => deleteMutation.mutate(),
        entityName: `${employee.firstName} ${employee.lastName}`,
        isLoading: deleteMutation.isPending
      }
    )
  ] });
}
function SectionHeading({
  icon,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground", children: title })
  ] });
}
function DetailRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-muted-foreground flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      typeof value === "string" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-0.5 break-words", children: value }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: value })
    ] })
  ] });
}
function QuickFact({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        label,
        ": "
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: value })
    ] })
  ] });
}
function EmployeeAvatar({
  employee,
  size = "md"
}) {
  const dim = size === "lg" ? "w-24 h-24 text-2xl border-4" : "w-8 h-8 text-xs border-2";
  if (employee.profilePicture) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: employee.profilePicture.getDirectURL(),
        alt: `${employee.firstName} ${employee.lastName}`,
        className: `${dim} rounded-full object-cover border-card shadow-md`
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
      className: `${dim} rounded-full flex items-center justify-center font-display font-bold border-card shadow-md ${colors[colorIndex]}`,
      children: initials.toUpperCase()
    }
  );
}
export {
  EmployeeDetailPage as default
};
