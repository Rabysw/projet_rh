import { cn } from "@/lib/utils";
import { LoadingSpinner } from "./LoadingSpinner";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  outline: "border border-border bg-card text-foreground hover:bg-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5 h-8",
  md: "px-4 py-2 text-sm gap-2 h-9",
  lg: "px-5 py-2.5 text-sm gap-2.5 h-11",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-display font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {loading ? (
        <LoadingSpinner
          size="sm"
          className={
            variant === "primary" || variant === "danger"
              ? "text-primary-foreground"
              : "text-foreground"
          }
        />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
