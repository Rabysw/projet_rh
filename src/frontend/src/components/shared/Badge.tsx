import { cn } from "@/lib/utils";
import { EmploymentStatus, HRRole } from "@/types";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "secondary"
  | "outline"
  | "destructive";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-muted text-foreground",
  success: "bg-accent/15 text-accent",
  warning: "bg-secondary/15 text-secondary",
  danger: "bg-destructive/15 text-destructive",
  info: "bg-accent/15 text-accent",
  secondary: "bg-secondary/15 text-secondary",
  outline: "border border-border text-muted-foreground",
  destructive: "bg-destructive/15 text-destructive",
};

export function Badge({
  variant = "default",
  children,
  className,
  onClick,
}: BadgeProps) {
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        onClick && "cursor-pointer hover:bg-muted/80 transition-colors",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function StatusBadge({ status }: { status: EmploymentStatus }) {
  const config: Record<
    EmploymentStatus,
    { variant: BadgeVariant; label: string }
  > = {
    [EmploymentStatus.Active]: { variant: "success", label: "Actif" },
    [EmploymentStatus.Inactive]: { variant: "danger", label: "Inactif" },
    [EmploymentStatus.OnLeave]: { variant: "warning", label: "Suspendu" },
  };
  const { variant, label } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export function RoleBadge({ role }: { role: HRRole }) {
  const labels: Record<HRRole, string> = {
    [HRRole.HRAdmin]: "Administrateur RH",
    [HRRole.HRManager]: "Responsable RH",
    [HRRole.Manager]: "Manager / Chef de service",
    [HRRole.Employee]: "Collaborateur",
    [HRRole.Direction]: "Direction",
  };
  return <Badge variant="info">{labels[role]}</Badge>;
}

export function LeaveStatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.toLowerCase();
  
  const config: Record<string, { variant: BadgeVariant; label: string }> = {
    pending: { variant: "warning", label: "En attente" },
    approved: { variant: "success", label: "Approuvé" },
    validated: { variant: "success", label: "Validé" },
    rejected: { variant: "danger", label: "Refusé" },
    cancelled: { variant: "default", label: "Annulé" },
    // Fallback mappings
    en_attente: { variant: "warning", label: "En attente" },
    approuvé: { variant: "success", label: "Approuvé" },
    refusé: { variant: "danger", label: "Refusé" },
    annulé: { variant: "default", label: "Annulé" },
  };

  const { variant, label } = config[normalizedStatus] || { variant: "default", label: status };
  return <Badge variant={variant}>{label}</Badge>;
}
