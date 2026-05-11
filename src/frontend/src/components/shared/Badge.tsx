import { cn } from "@/lib/utils";
import { EmploymentStatus, HRRole } from "@/types";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "secondary";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-muted text-foreground",
  success: "bg-accent/15 text-accent",
  warning: "bg-secondary/15 text-secondary",
  danger: "bg-destructive/15 text-destructive",
  info: "bg-accent/15 text-accent",
  secondary: "bg-secondary/15 text-secondary",
};

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
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
