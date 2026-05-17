import { r as reactExports, j as jsxRuntimeExports, t as LoadingSpinner, Z as cn } from "./index-BeBYdaDm.js";
import { S as Slot } from "./index-DPpzsANr.js";
const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  outline: "border border-border bg-card text-foreground hover:bg-muted",
  link: "bg-transparent text-primary underline-offset-4 hover:underline",
  default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
};
const sizeClasses = {
  sm: "px-3 py-1.5 text-xs gap-1.5 h-8",
  md: "px-4 py-2 text-sm gap-2 h-9",
  lg: "px-5 py-2.5 text-sm gap-2.5 h-11",
  icon: "h-9 w-9 p-0",
  default: "px-4 py-2 text-sm gap-2 h-9"
};
const Button = reactExports.forwardRef(({
  variant = "primary",
  size = "md",
  loading,
  icon,
  children,
  className,
  disabled,
  asChild = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Comp,
    {
      ...props,
      ref,
      disabled: disabled || loading,
      className: cn(
        "inline-flex items-center justify-center rounded-lg font-display font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        className
      ),
      children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          LoadingSpinner,
          {
            size: "sm",
            className: variant === "primary" || variant === "danger" || variant === "destructive" ? "text-primary-foreground" : "text-foreground"
          }
        ) : icon,
        children
      ]
    }
  );
});
Button.displayName = "Button";
export {
  Button as B
};
