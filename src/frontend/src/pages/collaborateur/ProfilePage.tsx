import { useIcesAuth } from "@/contexts/AuthContext";
import { useApi, apiFetch } from "@/hooks/use-api";
import { useCompanyConfig } from "@/contexts/CompanyConfigContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  User, 
  Mail, 
  Building2, 
  Calendar, 
  Phone, 
  MapPin,
  Briefcase,
  Award,
  FileText,
  Edit3,
  Loader2,
  Save,
  X
} from "lucide-react";

interface ProfileData {
  user: Record<string, unknown>;
  department: string;
  position: string;
  manager: string;
  hire_date: string;
  contract_type: string;
  phone: string;
  address: string;
  birth_date: string;
  matricule: string;
}

export default function ProfilePage() {
  const { user } = useIcesAuth();
  const { config } = useCompanyConfig();
  const { data: profile, isLoading, refetch } = useApi<ProfileData>("/api/v1/collaborateur/profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: ""
  });
  const phonePrefix = config?.phone_prefix || "+229";
  const companyName = config?.company_name || "ICES";

  useEffect(() => {
    if (profile) {
      setFormData({
        phone: profile.phone || "",
        address: profile.address || ""
      });
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/collaborateur/profile", {
        method: "PATCH",
        body: JSON.stringify(formData)
      });
      toast.success("Profil mis à jour avec succès");
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mon dossier personnel</h1>
          <p className="text-muted-foreground">Consultez et mettez à jour vos informations de contact.</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit3 className="h-4 w-4" />
            Modifier le profil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)} className="gap-2">
              <X className="h-4 w-4" />
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting} className="gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        )}
      </div>

      {/* Carte identité */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
              {user?.full_name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold">{user?.full_name || "Utilisateur"}</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Briefcase className="h-3 w-3" />
                  {user?.role === "collaborateur" ? "Collaborateur" : user?.role}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Building2 className="h-3 w-3" />
                  {profile?.department || "Département"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Matricule: {profile?.matricule || `${companyName}-0000`} | Date d'entrée: {profile?.hire_date || "15/03/2022"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coordonnées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Coordonnées
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email || "email@entreprise.local"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Téléphone</p>
                {isEditing ? (
                  <input
                    className="mt-1 w-full px-3 py-1 border border-border rounded-lg bg-background text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile?.phone || "Non renseigné"}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Adresse</p>
                {isEditing ? (
                  <input
                    className="mt-1 w-full px-3 py-1 border border-border rounded-lg bg-background text-sm"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile?.address || config?.country || "Adresse non renseignée"}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Date de naissance</p>
                <p className="text-sm text-muted-foreground">{profile?.birth_date || "12/06/1990"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contrat actuel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contrat actuel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="text-sm font-medium">CDI</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Poste</p>
                <p className="text-sm font-medium">Développeur Senior</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Département</p>
                <p className="text-sm font-medium">Technique</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Manager</p>
                <p className="text-sm font-medium">Jean Dupont</p>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Échéance prochaine</span>
                <span className="text-sm font-medium">Aucune (CDI)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compétences certifiées */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Compétences certifiées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Node.js", "Python", "FastAPI", "Docker", "AWS", "PostgreSQL"].map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
