import { j as jsxRuntimeExports, Y as cn } from "./index-Wq93vx8q.js";
const variantClasses = {
  default: "bg-muted text-foreground",
  success: "bg-accent/15 text-accent",
  warning: "bg-secondary/15 text-secondary",
  danger: "bg-destructive/15 text-destructive",
  info: "bg-accent/15 text-accent",
  secondary: "bg-secondary/15 text-secondary"
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
export {
  Badge as B
};
