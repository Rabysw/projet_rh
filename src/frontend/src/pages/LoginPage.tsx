import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useIcesAuth } from "@/contexts/AuthContext";
import { useRouter } from "@tanstack/react-router";
import { BarChart3, Shield, Star, Users, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  const { login, isAuthenticated, loginStatus } = useIcesAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Veuillez remplir tous les champs");
    }

    try {
      await login(email, password);
      toast.success("Connexion réussie");
    } catch (err: any) {
      toast.error(err.message || "Erreur de connexion");
    }
  };

  const isLoading = loginStatus === "logging-in";

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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Adresse e-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ices.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Mot de passe</label>
                <button type="button" className="text-xs text-primary hover:underline">
                  Oublié ?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
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
