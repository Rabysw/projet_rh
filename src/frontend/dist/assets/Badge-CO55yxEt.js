import { j as jsxRuntimeExports, Z as cn } from "./index-BeBYdaDm.js";
const variantClasses = {
  default: "bg-muted text-foreground",
  success: "bg-accent/15 text-accent",
  warning: "bg-secondary/15 text-secondary",
  danger: "bg-destructive/15 text-destructive",
  info: "bg-accent/15 text-accent",
  secondary: "bg-secondary/15 text-secondary",
  outline: "border border-border text-muted-foreground",
  destructive: "bg-destructive/15 text-destructive"
};
function Badge({
  variant = "default",
  children,
  className,
  onClick
}) {
  const Tag = onClick ? "button" : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      onClick,
      className: cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        onClick && "cursor-pointer hover:bg-muted/80 transition-colors",
        className
      ),
      children
    }
  );
}
export {
  Badge as B
};
