import { j as jsxRuntimeExports, a as cn } from "./index-C9_e_yR_.js";
import { E as EmploymentStatus, H as HRRole } from "./use-backend-Pu7zigIS.js";
const variantClasses = {
  default: "bg-muted text-foreground",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-accent/15 text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground"
};
function Badge({
  variant = "default",
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      ),
      children
    }
  );
}
function StatusBadge({ status }) {
  const config = {
    [EmploymentStatus.Active]: { variant: "success", label: "Active" },
    [EmploymentStatus.Inactive]: { variant: "danger", label: "Inactive" },
    [EmploymentStatus.OnLeave]: { variant: "warning", label: "On Leave" }
  };
  const { variant, label } = config[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant, children: label });
}
function RoleBadge({ role }) {
  const labels = {
    [HRRole.HRAdmin]: "HR Admin",
    [HRRole.HRManager]: "HR Manager",
    [HRRole.Manager]: "Manager",
    [HRRole.Employee]: "Employee",
    [HRRole.Direction]: "Direction"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: labels[role] });
}
export {
  RoleBadge as R,
  StatusBadge as S
};
