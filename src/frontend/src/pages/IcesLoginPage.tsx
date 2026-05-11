import { useState } from "react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useIcesAuth } from "@/hooks/use-ices-auth";
import { useRouter } from "@tanstack/react-router";
import { BarChart3, Shield, Star, Users, Eye, EyeOff, MessageSquare } from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: Users,
    label: "Administration du Personnel",
    desc: "Dossier personnel, contrats, documents et historique collaborateur",
  },
  {
    icon: BarChart3,
    label: "Tableaux de Bord",
    desc: "KPIs par profil : Collaborateur, Manager, RH, Direction",
  },
  {
    icon: Shield,
    label: "Compétences & Évaluation",
    desc: "Plans de carrière, gaps, PDI et évaluations continues",
  },
  {
    icon: MessageSquare,
    label: "Suggestions & Communication",
    desc: "Boîte à suggestions, actualités RH et notes internes",
  },
];

export default function IcesLoginPage() {
  const { login, isAuthenticated, loginStatus, error } = useIcesAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password123"); // Pré-rempli pour la démo

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, router]);

  const isLoading = loginStatus === "logging-in";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      // Error is handled in the hook
    }
  };

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
            ICES
            <br />
            Integrated Consulting & Engineering Solutions
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-sm">
            Plateforme RH & Compétences — Spécifications par profil utilisateur et usage interne.
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
              Integrated Consulting & Engineering Solutions — connectez-vous pour accéder à la plateforme RH.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email professionnel
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ices.bj"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3.5 font-display font-semibold text-primary-foreground text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              data-ocid="login.submit_button"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" className="text-primary-foreground" />
              ) : (
                <Shield size={18} />
              )}
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground text-center mb-2">
              Identifiants de démonstration :
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Admin:</strong> admin@ices.bj</p>
              <p><strong>Direction:</strong> dir@ices.bj</p>
              <p><strong>RH:</strong> rh@ices.bj</p>
              <p><strong>Manager:</strong> manager@ices.bj</p>
              <p><strong>Collab:</strong> collab@ices.bj</p>
              <p><strong>Mot de passe:</strong> password123</p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Document confidentiel — Usage interne — Tous droits réservés
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