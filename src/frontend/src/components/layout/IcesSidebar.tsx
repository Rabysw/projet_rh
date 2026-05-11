import { useIcesAuth } from "@/hooks/use-ices-auth";
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
  Target
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon?: any;
  type?: "item" | "separator";
}

export function IcesSidebar({ open, onClose }: SidebarProps) {
  const { user } = useIcesAuth();
  const { config } = useCompanyConfig();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  const getSidebarItems = (): SidebarItem[] => {
    if (!user) return [];

    switch (user.role) {
      case "collaborateur":
        return [
          { id: "dashboard", label: "Tableau de bord", icon: Home },
          { id: "dossier_personnel", label: "Mon dossier personnel", icon: User },
          { id: "conges_absences", label: "Mes congés & absences", icon: Calendar },
          { id: "fiches_paie", label: "Mes fiches de paie", icon: FileText },
          { id: "plan_carriere", label: "Mon plan de carrière", icon: TrendingUp },
          { id: "formations", label: "Mes formations", icon: Book },
          { id: "suggestions", label: "Boîte à suggestions", icon: MessageSquare },
          { id: "communication_rh", label: "Communication RH", icon: Bell },
          { id: "parametres", label: "Paramètres du compte", icon: Settings },
        ];

      case "manager":
        return [
          { id: "dashboard_equipe", label: "Tableau de bord équipe", icon: Users },
          { id: "equipe", label: "Mon équipe", icon: Users },
          { id: "conges_equipe", label: "Congés & absences (équipe)", icon: Calendar },
          { id: "competences_equipe", label: "Compétences équipe", icon: Award },
          { id: "productivite", label: "Productivité", icon: BarChart3 },
          { id: "projets", label: "Projets", icon: Briefcase },
          { id: "separator", label: "Mon espace", type: "separator" },
          { id: "dossier_personnel", label: "Mon dossier", icon: User },
          { id: "conges_absences", label: "Mes congés", icon: Calendar },
        ];

      case "resp_rh":
        return [
          { id: "dashboard_rh", label: "Tableau de bord RH", icon: PieChart },
          { id: "separator_admin", label: "Administration", type: "separator" },
          { id: "dossiers_personnel", label: "Dossiers du personnel", icon: Users },
          { id: "contrats_avenants", label: "Contrats & avenants", icon: FileText },
          { id: "presence_horaires", label: "Présence & horaires", icon: Clock },
          { id: "conges_absences", label: "Congés & absences", icon: Calendar },
          { id: "separator_competences", label: "Compétences", type: "separator" },
          { id: "referentiel_metiers", label: "Référentiel métiers", icon: Briefcase },
          { id: "evaluations", label: "Évaluations", icon: Award },
          { id: "plans_carriere", label: "Plans de carrière", icon: TrendingUp },
          { id: "separator_formation", label: "Formation", type: "separator" },
          { id: "formation_developpement", label: "Formation & développement", icon: Book },
          { id: "separator_engagement", label: "Engagement", type: "separator" },
          { id: "enquetes_satisfaction", label: "Enquêtes satisfaction", icon: MessageSquare },
          { id: "suggestions_recues", label: "Suggestions reçues", icon: MessageSquare },
          { id: "communication_rh", label: "Communication RH", icon: Bell },
        ];

      case "admin_rh":
        return [
          { id: "dashboard_global", label: "Tableau de bord global", icon: PieChart },
          { id: "separator_modules", label: "Tous les modules", type: "separator" },
          // Inclut tous les éléments du Resp. RH
          { id: "dossiers_personnel", label: "Dossiers du personnel", icon: Users },
          { id: "contrats_avenants", label: "Contrats & avenants", icon: FileText },
          { id: "presence_horaires", label: "Présence & horaires", icon: Clock },
          { id: "conges_absences", label: "Congés & absences", icon: Calendar },
          { id: "referentiel_metiers", label: "Référentiel métiers", icon: Briefcase },
          { id: "evaluations", label: "Évaluations", icon: Award },
          { id: "plans_carriere", label: "Plans de carrière", icon: TrendingUp },
          { id: "formation_developpement", label: "Formation & développement", icon: Book },
          { id: "enquetes_satisfaction", label: "Enquêtes satisfaction", icon: MessageSquare },
          { id: "suggestions_recues", label: "Suggestions reçues", icon: MessageSquare },
          { id: "communication_rh", label: "Communication RH", icon: Bell },
          { id: "separator_system", label: "Administration système", type: "separator" },
          { id: "gestion_utilisateurs_roles", label: "Gestion des utilisateurs & rôles", icon: UserCog },
          { id: "securite_acces", label: "Sécurité & accès", icon: Shield },
          { id: "configuration_plateforme", label: "Configuration de la plateforme", icon: Settings },
          { id: "logs_audit", label: "Logs d'audit", icon: FileText },
          { id: "separator_ia", label: "IA (Phase 2)", type: "separator" },
          { id: "chatbot_rh", label: "Chatbot RH", icon: Bot },
          { id: "generation_documents", label: "Génération de documents", icon: FilePlus },
          { id: "prediction_turnover", label: "Prédiction turnover", icon: TrendingUp },
          { id: "matching_competences", label: "Matching compétences", icon: Target },
        ];

      case "direction":
        return [
          { id: "vue_strategique", label: "Vue d'ensemble stratégique", icon: Eye },
          { id: "separator_analytics", label: "Analytics", type: "separator" },
          { id: "kpis_rh_temps_reel", label: "KPIs RH temps réel", icon: BarChart3 },
          { id: "effectifs_turnover", label: "Effectifs & turnover", icon: Users },
          { id: "absenteisme", label: "Absentéisme", icon: Calendar },
          { id: "masse_salariale", label: "Masse salariale", icon: FileText },
          { id: "separator_rapports", label: "Rapports", type: "separator" },
          { id: "bilan_social", label: "Bilan social", icon: FileText },
          { id: "rapport_formations", label: "Rapport formations", icon: Book },
          { id: "satisfaction_collaborateurs", label: "Satisfaction collaborateurs", icon: MessageSquare },
          { id: "etats_legaux", label: "États légaux", icon: Shield },
          { id: "separator_exports", label: "Exports", type: "separator" },
          { id: "telecharger_rapport", label: "Télécharger un rapport", icon: FileDown },
        ];

      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  const handleItemClick = (itemId: string) => {
    const routeMap: Record<string, string> = {
      dashboard: "/",
      dashboard_equipe: "/team",
      dashboard_rh: "/rh-employees",
      dashboard_global: "/admin-users",
      vue_strategique: "/direction-reports",
      dossier_personnel: "/profile",
      conges_absences: "/leave",
      conges_equipe: "/team-leave",
      fiches_paie: "/payslips",
      formations: "/trainings",
      plan_carriere: "/career",
      skills: "/skills",
      suggestions: "/suggestions",
      communication_rh: "/communication",
      parametres: "/profile",
      equipe: "/team",
      competences_equipe: "/team-skills",
      productivite: "/team/productivity",
      projets: "/projects",
      dossiers_personnel: "/rh-employees",
      contrats_avenants: "/rh-contracts",
      presence_horaires: "/rh-attendance",
      referentiel_metiers: "/skills",
      evaluations: "/trainings",
      plans_carriere: "/career",
      formation_developpement: "/trainings",
      enquetes_satisfaction: "/suggestions",
      suggestions_recues: "/suggestions",
      gestion_utilisateurs_roles: "/admin-users",
      securite_acces: "/profile",
      configuration_plateforme: "/admin/configuration",
      logs_audit: "/",
      chatbot_rh: "/suggestions",
      generation_documents: "/payslips",
      prediction_turnover: "/",
      matching_competences: "/skills",
      kpis_rh_temps_reel: "/",
      effectifs_turnover: "/",
      absenteisme: "/leave",
      masse_salariale: "/payslips",
      telecharger_rapport: "/payslips",
      bilan_social: "/direction-reports",
      rapport_formations: "/direction-reports",
      satisfaction_collaborateurs: "/direction-reports",
      etats_legaux: "/direction-reports",
    };
    
    const route = routeMap[itemId] || "/";
    navigate({ to: route });
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
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
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-border px-6">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: config?.primary_color || 'var(--primary)' }}
            >
              {config?.company_logo_url ? (
                <img src={config.company_logo_url} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-primary-foreground font-display font-bold text-sm">
                  {config?.company_name?.substring(0, 2).toUpperCase() || "IC"}
                </span>
              )}
            </div>
            <span className="font-display font-bold text-lg text-foreground truncate">
              {config?.company_name || "ICES"}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                if (item.type === "separator") {
                  return (
                    <div key={item.id} className="my-4">
                      <div className="px-3 py-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  );
                }

                const Icon = item.icon;
                const showNotifBadge = user?.role === "collaborateur" && item.id === "communication_rh";
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {showNotifBadge && unreadCount > 0 && (
                      <span className="ml-auto inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-semibold text-accent-foreground">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* User info */}
          {user && (
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.full_name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.role === "admin_rh" && "Admin RH"}
                    {user.role === "direction" && "Direction"}
                    {user.role === "resp_rh" && "Responsable RH"}
                    {user.role === "manager" && "Manager"}
                    {user.role === "collaborateur" && "Collaborateur"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
