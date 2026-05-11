import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "@tanstack/react-router";
import { BarChart3, Shield, Star, Users } from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: Users,
    label: "Administration du personnel",
    desc: "Dossiers collaborateurs, contrats et historique centralisés",
  },
  {
    icon: BarChart3,
    label: "Tableaux de bord",
    desc: "KPIs et indicateurs RH par profil utilisateur",
  },
  {
    icon: Shield,
    label: "Accès par rôle",
    desc: "Sécurisation multi-profil pour Manager, RH, Direction et Collaborateur",
  },
  {
    icon: Star,
    label: "Compétences & évaluations",
    desc: "Suivi des compétences, plans de carrière et PDI",
  },
];

export default function LoginPage() {
  const { login, isAuthenticated, loginStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, router]);

  const isLoading =
    loginStatus === "logging-in" || loginStatus === "initializing";

  return (
    <div className="min-h-screen bg-background flex" data-ocid="login.page">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-between p-12 bg-primary relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-foreground/5" />
        <div className="absolute bottom-12 -left-16 w-64 h-64 rounded-full bg-primary-foreground/5" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/15 flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">
                IC
              </span>
            </div>
            <span className="text-primary-foreground font-display font-bold text-2xl">
              ICES
            </span>
          </div>

          <h1 className="text-4xl font-display font-bold text-primary-foreground leading-tight mb-4">
            Gestion des Ressources
            <br />
            Humaines & Compétences
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-sm">
            Integrated Consulting & Engineering Solutions — gérez vos ressources humaines avec confiance.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/15 flex items-center justify-center mb-3">
                <Icon size={16} className="text-primary-foreground" />
              </div>
              <p className="font-display font-semibold text-primary-foreground text-sm mb-1">
                {label}
              </p>
              <p className="text-primary-foreground/60 text-xs leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — login */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-12 lg:max-w-md xl:max-w-lg">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold">
                IC
              </span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              ICES
            </span>
          </div>

          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
              Bienvenue sur ICES
            </h2>
            <p className="text-muted-foreground text-sm">
              Connectez-vous pour accéder à la plateforme RH & Compétences d’ICES.
            </p>
          </div>

          <button
            type="button"
            onClick={() => login()}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3.5 font-display font-semibold text-primary-foreground text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            data-ocid="login.submit_button"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" className="text-primary-foreground" />
            ) : (
              <Shield size={18} />
            )}
            {isLoading ? "Authentification en cours…" : "Se connecter avec Internet Identity"}
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Document confidentiel — Usage interne — Tous droits réservés.
            <br />
            Plateforme RH & Compétences ICES
          </p>

          <div className="mt-10 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} ICES. Integrated Consulting & Engineering Solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
