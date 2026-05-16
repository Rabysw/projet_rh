import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { useIcesAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  User,
  FileText,
  CalendarDays,
  Clock,
  BookOpen,
  Star,
  TrendingUp,
  MessageSquare,
  Radio,
  Settings,
  // Manager
  Users,
  CheckSquare,
  BarChart2,
  Kanban,
  BrainCog,
  // RH
  FolderOpen,
  FileBadge,
  UserCheck,
  Megaphone,
  ClipboardList,
  // Admin
  ShieldCheck,
  KeyRound,
  Bell,
  Database,
  Bot,
  // Direction
  PieChart,
  Download,
  Scale,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

// ─── Navigation par rôle ─────────────────────────────────────────────────────

const navByRole: Record<string, NavSection[]> = {
  collaborateur: [
    {
      items: [
        { label: "Dashboard", to: "/", icon: LayoutDashboard },
        { label: "Mon profil", to: "/profile", icon: User },
        { label: "Mes documents", to: "/documents", icon: FileText },
      ],
    },
    {
      title: "Congés & Présences",
      items: [
        { label: "Mes congés", to: "/leave", icon: CalendarDays },
        { label: "Mes présences", to: "/presences", icon: Clock },
      ],
    },
    {
      title: "Développement",
      items: [
        { label: "Mes formations", to: "/trainings", icon: BookOpen },
        { label: "Mes évaluations", to: "/evaluations", icon: Star },
        { label: "Mon plan carrière", to: "/career", icon: TrendingUp },
      ],
    },
    {
      title: "Communication",
      items: [
        { label: "Suggestions", to: "/suggestions", icon: MessageSquare },
        { label: "Communication RH", to: "/communication", icon: Radio },
        { label: "Paramètres", to: "/settings", icon: Settings },
      ],
    },
  ],

  manager: [
    {
      items: [
        { label: "Dashboard équipe", to: "/", icon: LayoutDashboard },
        { label: "Mon équipe", to: "/team", icon: Users },
      ],
    },
    {
      title: "Gestion équipe",
      items: [
        { label: "Congés équipe", to: "/team-leave", icon: CalendarDays },
        { label: "Présences équipe", to: "/presences", icon: Clock },
        { label: "Évaluations", to: "/evaluations", icon: Star },
        { label: "Compétences", to: "/team-skills", icon: BrainCog },
      ],
    },
    {
      title: "Suivi & Performance",
      items: [
        { label: "Productivité", to: "/team/productivity", icon: BarChart2 },
        { label: "Projets", to: "/projects", icon: Kanban },
        { label: "Rapports", to: "/team-reports", icon: ClipboardList },
      ],
    },
    {
      title: "Mon espace",
      items: [
        { label: "Mon espace personnel", to: "/profile", icon: User },
        { label: "Paramètres", to: "/settings", icon: Settings },
      ],
    },
  ],

  resp_rh: [
    {
      items: [
        { label: "Dashboard RH", to: "/", icon: LayoutDashboard },
        { label: "Dossiers personnel", to: "/rh-employees", icon: FolderOpen },
        { label: "Contrats & avenants", to: "/rh-contracts", icon: FileBadge },
      ],
    },
    {
      title: "Gestion RH",
      items: [
        { label: "Présences", to: "/rh-attendance", icon: Clock },
        { label: "Congés", to: "/rh-conges", icon: CalendarDays },
        { label: "Compétences", to: "/team-skills", icon: BrainCog },
        { label: "Évaluations", to: "/evaluations", icon: Star },
      ],
    },
    {
      title: "Formation & Carrière",
      items: [
        { label: "Formation", to: "/trainings", icon: BookOpen },
        { label: "Plans carrière", to: "/career", icon: TrendingUp },
      ],
    },
    {
      title: "Communication",
      items: [
        { label: "Enquêtes", to: "/enquetes", icon: ClipboardList },
        { label: "Suggestions", to: "/suggestions", icon: MessageSquare },
        { label: "Communication", to: "/communication", icon: Megaphone },
        { label: "Rapports", to: "/reports", icon: BarChart2 },
      ],
    },
  ],

  admin_rh: [
    {
      items: [
        { label: "Dashboard Admin", to: "/", icon: LayoutDashboard },
        // Tous les modules RH (hérite de resp_rh)
        { label: "Dossiers personnel", to: "/rh-employees", icon: FolderOpen },
        { label: "Contrats & avenants", to: "/rh-contracts", icon: FileBadge },
        { label: "Présences", to: "/rh-attendance", icon: Clock },
        { label: "Congés", to: "/rh-conges", icon: CalendarDays },
        { label: "Formation", to: "/trainings", icon: BookOpen },
        { label: "Évaluations", to: "/evaluations", icon: Star },
        { label: "Plans carrière", to: "/career", icon: TrendingUp },
        { label: "Rapports", to: "/reports", icon: BarChart2 },
      ],
    },
    {
      title: "Administration",
      items: [
        { label: "Gestion utilisateurs", to: "/admin-users", icon: UserCheck },
        { label: "Rôles & permissions", to: "/admin-rh/roles", icon: ShieldCheck },
        { label: "Sécurité", to: "/admin-rh/securite", icon: KeyRound },
        { label: "Logs", to: "/admin-rh/logs", icon: ClipboardList },
        { label: "Configuration", to: "/admin/configuration", icon: Settings },
        { label: "Notifications", to: "/admin-rh/notifications", icon: Bell },
        { label: "Sauvegardes", to: "/admin-rh/sauvegardes", icon: Database },
        { label: "IA RH", to: "/admin-rh/ia", icon: Bot },
      ],
    },
  ],

  direction: [
    {
      items: [
        { label: "Vue stratégique", to: "/", icon: LayoutDashboard },
      ],
    },
    {
      title: "Analytics",
      items: [
        { label: "KPIs RH", to: "/direction-reports", icon: PieChart },
        { label: "Analytics", to: "/reports", icon: BarChart2 },
      ],
    },
    {
      title: "Rapports",
      items: [
        { label: "Rapports", to: "/direction-reports", icon: FileText },
        { label: "Exports", to: "/reports", icon: Download },
        { label: "États légaux", to: "/reports", icon: Scale },
      ],
    },
  ],
};

// ─── Composant principal ──────────────────────────────────────────────────────

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useIcesAuth();
  const role = user?.role ?? "collaborateur";
  const sections = navByRole[role] ?? navByRole["collaborateur"];

  // Labels lisibles par rôle
  const roleLabels: Record<string, string> = {
    collaborateur: "Collaborateur",
    manager: "Manager",
    resp_rh: "Responsable RH",
    admin_rh: "Administrateur RH",
    direction: "Direction",
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-card border-r border-border shadow-sm transition-transform duration-300 lg:relative lg:translate-x-0 lg:shadow-none",
        open ? "translate-x-0" : "-translate-x-full",
      )}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-sm">AR</span>
          </div>
          <div className="leading-tight">
            <span className="font-bold text-base text-foreground tracking-tight block">
              ASIN RH
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {roleLabels[role] ?? "Portail RH"}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Fermer le menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation scrollable */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4" aria-label="Navigation principale">
        {sections.map((section, idx) => (
          <div key={idx}>
            {section.title && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer utilisateur */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{user?.full_name || "Utilisateur"}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user?.email || ""}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({ label, to, icon: Icon }: NavItem) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isActive = to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon size={16} className="flex-shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}