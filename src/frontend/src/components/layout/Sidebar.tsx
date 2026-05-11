import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BrainCog,
  CalendarDays,
  LayoutDashboard,
  Settings2,
  Users,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard, enabled: true },
  { label: "Employees", to: "/employees", icon: Users, enabled: true },
  { label: "Leave", to: "/leave", icon: CalendarDays, enabled: false },
  { label: "Skills", to: "/skills", icon: BrainCog, enabled: false },
  {
    label: "Configuration",
    to: "/admin-configuration",
    icon: Settings2,
    enabled: true,
  },
] as const;

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-card border-r border-border shadow-sm transition-transform duration-300 lg:relative lg:translate-x-0 lg:shadow-none",
        open ? "translate-x-0" : "-translate-x-full",
      )}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">
              IC
            </span>
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            ICES
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close sidebar"
          data-ocid="sidebar.close_button"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 px-3 py-4 space-y-0.5"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border space-y-1">
        <p className="text-xs text-muted-foreground">ICES HR Platform</p>
      </div>
    </aside>
  );
}

function NavItem({
  label,
  to,
  icon: Icon,
  enabled,
}: {
  label: string;
  to: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  enabled: boolean;
}) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isActive =
    to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  if (!enabled) {
    return (
      <div
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground/50 cursor-not-allowed select-none"
        title="Coming soon"
      >
        <Icon size={18} className="flex-shrink-0" />
        <span className="text-sm font-medium">{label}</span>
        <span className="ml-auto text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-medium">
          Soon
        </span>
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      data-ocid={`nav.${label.toLowerCase()}.link`}
    >
      <Icon size={18} className="flex-shrink-0" />
      <span>{label}</span>
    </Link>
  );
}
