import { useIcesAuth } from "@/contexts/AuthContext";
import { useCompanyConfig } from "@/contexts/CompanyConfigContext";
import { useNotifications } from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  Calendar,
  FileText,
  TrendingUp,
  Book,
  MessageSquare,
  Bell,
  Settings,
  Users,
  BarChart3,
  Award,
  Clock,
  Briefcase,
  PieChart,
  Eye,
  FileDown,
  Shield,
  UserCog,
  Bot,
  FilePlus,
  Target,
  BrainCog,
  ClipboardList,
  Star,
} from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon?: any;
  route?: string;
  type?: "item" | "separator";
}

// ─── Navigation par rôle ─────────────────────────────────────────────────────

const getSidebarItems = (role: string): SidebarItem[] => {
  switch (role) {
    case "collaborateur":
      return [
        { id: "dashboard",         label: "Tableau de bord",        icon: Home,          route: "/" },
        { id: "dossier_personnel", label: "Mon profil",              icon: User,          route: "/profile" },
        { id: "fiches_paie",       label: "Mes fiches de paie",      icon: FileText,      route: "/payslips" },
        { id: "sep1",              label: "Congés & Présences",       type: "separator" },
        { id: "conges_absences",   label: "Mes congés",              icon: Calendar,      route: "/leave" },
        { id: "presences",         label: "Mes présences",           icon: Clock,         route: "/presences" },
        { id: "sep2",              label: "Développement",           type: "separator" },
        { id: "formations",        label: "Mes formations",          icon: Book,          route: "/trainings" },
        { id: "evaluations_collab",label: "Mes évaluations",         icon: Star,          route: "/evaluations" },
        { id: "plan_carriere",     label: "Mon plan de carrière",    icon: TrendingUp,    route: "/career" },
        { id: "skills",            label: "Mes compétences",         icon: BrainCog,      route: "/skills" },
        { id: "sep3",              label: "Communication",           type: "separator" },
        { id: "suggestions",       label: "Boîte à suggestions",     icon: MessageSquare, route: "/suggestions" },
        { id: "communication_rh",  label: "Communication RH",        icon: Bell,          route: "/communication" },
        { id: "parametres",        label: "Paramètres",              icon: Settings,      route: "/profile" },
      ];

    case "manager":
      return [
        { id: "dashboard_equipe",  label: "Tableau de bord équipe",  icon: Home,          route: "/" },
        { id: "equipe",            label: "Mon équipe",              icon: Users,         route: "/team" },
        { id: "sep1",              label: "Gestion équipe",          type: "separator" },
        { id: "conges_equipe",     label: "Congés équipe",           icon: Calendar,      route: "/team-leave" },
        { id: "presences_equipe",  label: "Présences équipe",        icon: Clock,         route: "/presences" },
        { id: "evaluations",       label: "Évaluations",             icon: Award,         route: "/evaluations" },
        { id: "competences_equipe",label: "Compétences équipe",      icon: BrainCog,      route: "/team-skills" },
        // ── NOUVEAUX ──────────────────────────────────────────────────────────
        { id: "formations_equipe", label: "Formations équipe",       icon: Book,          route: "/team-trainings" },
        { id: "sep2",              label: "Suivi & Performance",     type: "separator" },
        { id: "productivite",      label: "Productivité",            icon: BarChart3,     route: "/team/productivity" },
        { id: "projets",           label: "Projets",                 icon: Briefcase,     route: "/projects" },
        { id: "rapports",          label: "Rapports équipe",         icon: ClipboardList, route: "/team-reports" },
        { id: "sep3",              label: "Communication",           type: "separator" },
        { id: "notifications_mgr", label: "Notifications",           icon: Bell,          route: "/team-notifications" },
        { id: "communication_rh",  label: "Communication RH",        icon: MessageSquare, route: "/communication" },
        { id: "sep4",              label: "Mon espace",              type: "separator" },
        { id: "dossier_personnel", label: "Mon espace personnel",    icon: User,          route: "/profile" },
        { id: "parametres",        label: "Paramètres",              icon: Settings,      route: "/profile" },
      ];

    case "resp_rh":
      return [
        { id: "dashboard_rh",      label: "Tableau de bord RH",      icon: PieChart,      route: "/" },
        { id: "dossiers_personnel",label: "Dossiers du personnel",    icon: Users,         route: "/rh-employees" },
        { id: "contrats_avenants", label: "Contrats & avenants",      icon: FileText,      route: "/rh-contracts" },
        { id: "sep1",              label: "Gestion RH",              type: "separator" },
        { id: "presence_horaires", label: "Présences",               icon: Clock,         route: "/rh-attendance" },
        { id: "conges_absences",   label: "Congés",                  icon: Calendar,      route: "/rh-conges" },
        { id: "competences",       label: "Compétences",             icon: BrainCog,      route: "/skills" },
        { id: "evaluations",       label: "Évaluations",             icon: Award,         route: "/evaluations" },
        { id: "sep2",              label: "Formation & Carrière",    type: "separator" },
        { id: "formation",         label: "Formation",               icon: Book,          route: "/trainings" },
        { id: "plans_carriere",    label: "Plans de carrière",        icon: TrendingUp,    route: "/career" },
        { id: "sep3",              label: "Communication",           type: "separator" },
        { id: "enquetes",          label: "Enquêtes",                icon: ClipboardList, route: "/enquetes" },
        { id: "suggestions_recues",label: "Suggestions",             icon: MessageSquare, route: "/suggestions" },
        { id: "communication_rh",  label: "Communication",           icon: Bell,          route: "/communication" },
        { id: "rapports",          label: "Rapports",                icon: BarChart3,     route: "/reports" },
      ];

    case "admin_rh":
      return [
        { id: "dashboard_global",  label: "Tableau de bord Admin",   icon: PieChart,      route: "/" },
        // Tous les modules RH
        { id: "dossiers_personnel",label: "Dossiers du personnel",    icon: Users,         route: "/rh-employees" },
        { id: "contrats_avenants", label: "Contrats & avenants",      icon: FileText,      route: "/rh-contracts" },
        { id: "presence_horaires", label: "Présences",               icon: Clock,         route: "/rh-attendance" },
        { id: "conges_absences",   label: "Congés",                  icon: Calendar,      route: "/leave" },
        { id: "formation",         label: "Formation",               icon: Book,          route: "/trainings" },
        { id: "evaluations",       label: "Évaluations",             icon: Award,         route: "/evaluations" },
        { id: "plans_carriere",    label: "Plans de carrière",        icon: TrendingUp,    route: "/career" },
        { id: "rapports",          label: "Rapports",                icon: BarChart3,     route: "/reports" },
        { id: "sep1",              label: "Administration",          type: "separator" },
        { id: "gestion_utilisateurs_roles", label: "Gestion utilisateurs", icon: UserCog, route: "/admin-users" },
        { id: "roles_permissions", label: "Rôles & permissions",      icon: Shield,        route: "/admin-roles" },
        { id: "securite",          label: "Sécurité",                icon: Shield,        route: "/admin-securite" },
        { id: "logs_audit",        label: "Logs",                    icon: FileText,      route: "/admin-logs" },
        { id: "configuration",     label: "Configuration",           icon: Settings,      route: "/admin/configuration" },
        { id: "notifications_cfg", label: "Notifications",           icon: Bell,          route: "/admin-notifications" },
        { id: "sauvegardes",       label: "Sauvegardes",             icon: FilePlus,      route: "/admin-sauvegardes" },
        { id: "sep2",              label: "IA RH (Phase 2)",         type: "separator" },
        { id: "chatbot_rh",        label: "Chatbot RH",              icon: Bot,           route: "/ia-chatbot" },
        { id: "generation_documents",label: "Génération documents",  icon: FilePlus,      route: "/ia-documents" },
        { id: "prediction_turnover",label: "Prédiction turnover",    icon: TrendingUp,    route: "/ia-turnover" },
        { id: "matching_competences",label: "Matching compétences",  icon: Target,        route: "/ia-matching" },
      ];

    case "direction":
      return [
        { id: "vue_strategique",   label: "Vue stratégique",         icon: Eye,           route: "/" },
        { id: "sep1",              label: "Analytics",               type: "separator" },
        { id: "kpis_rh",          label: "KPIs RH",                 icon: BarChart3,     route: "/direction-kpis" },
        { id: "analytics",         label: "Analytics",               icon: PieChart,      route: "/direction-analytics" },
        { id: "sep2",              label: "Rapports",                type: "separator" },
        { id: "rapports",          label: "Rapports",                icon: FileText,      route: "/direction-reports" },
        { id: "exports",           label: "Exports",                 icon: FileDown,      route: "/direction-exports" },
        { id: "etats_legaux",      label: "États légaux",            icon: Shield,        route: "/direction-reports" },
      ];

    default:
      return [];
  }
};

// ─── Composant ────────────────────────────────────────────────────────────────

export function IcesSidebar({ open, onClose }: SidebarProps) {
  const { user } = useIcesAuth();
  const { config } = useCompanyConfig();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { unreadCount } = useNotifications();

  const currentPath = routerState.location.pathname;
  const role = user?.role ?? "collaborateur";
  const sidebarItems = user ? getSidebarItems(role) : [];

  const handleItemClick = (item: SidebarItem) => {
    if (!item.route) return;
    navigate({ to: item.route });
    onClose();
  };

  const isActive = (item: SidebarItem): boolean => {
    if (!item.route) return false;
    if (item.route === "/") return currentPath === "/";
    return currentPath.startsWith(item.route);
  };

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">

          {/* Logo + nom entreprise */}
          <div className="flex h-16 items-center gap-3 border-b border-border px-5 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
              style={{ backgroundColor: config?.primary_color || "var(--primary)" }}
            >
              {config?.company_logo_url ? (
                <img src={config.company_logo_url} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-primary-foreground font-bold text-sm">
                  {config?.company_name?.substring(0, 2).toUpperCase() || "AR"}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <span className="font-bold text-base text-foreground truncate block">
                {config?.company_name || "ASIN RH"}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {role === "admin_rh" && "Administrateur RH"}
                {role === "direction" && "Direction"}
                {role === "resp_rh" && "Responsable RH"}
                {role === "manager" && "Manager"}
                {role === "collaborateur" && "Collaborateur"}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-3">
            <div className="space-y-0.5">
              {sidebarItems.map((item) => {
                // Séparateur de section
                if (item.type === "separator") {
                  return (
                    <div key={item.id} className="pt-4 pb-1 px-3">
                      <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
                        {item.label}
                      </p>
                    </div>
                  );
                }

                const Icon = item.icon;
                const active = isActive(item);
                const showBadge = role === "collaborateur" && item.id === "communication_rh" && unreadCount > 0;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                      active
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon size={16} className="flex-shrink-0" />
                    <span className="truncate text-left">{item.label}</span>
                    {showBadge && (
                      <span className="ml-auto inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer utilisateur */}
          {user && (
            <div className="border-t border-border p-4 flex-shrink-0 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User size={15} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.full_name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              
              {user.role === 'admin_rh' && (
                <button
                  onClick={() => {
                    localStorage.setItem('force_setup', 'true');
                    window.location.href = '/setup';
                  }}
                  className="w-full flex items-center justify-center gap-2 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 py-2 rounded-md transition-colors"
                >
                  Relancer l'assistant Setup
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}