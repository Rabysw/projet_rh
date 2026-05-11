import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useApi } from "@/hooks/use-api";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Building2, 
  FileText,
  Loader2,
  ArrowLeft,
  Edit,
  Download,
  Shield,
  Heart,
  Users,
  CreditCard,
  Map,
  Fingerprint
} from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";

interface EmployeeDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dept: string;
  role: string;
  hired: string;
  contract: string;
  status: string;
  matricule: string;
  birth_date: string;
  birth_place: string;
  nationality: string;
  gender: string;
  marital_status: string;
  children_count: number;
  id_type: string;
  id_number: string;
  id_expiry: string;
  emergency_contact: string;
  emergency_relation: string;
  emergency_phone: string;
  personal_email: string;
  bank_account: string;
  salary_base: string;
  manager: string;
  work_location: string;
  cnss: string;
  ifu: string;
}

export default function EmployeeDetailPage() {
  const { id } = useParams({ from: '/protected/employees/$id' });
  const navigate = useNavigate();
  const { data: employee, isLoading, error } = useApi<EmployeeDetail>(`/api/v1/resp-rh/employees/${id}`);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-destructive font-medium">Erreur lors du chargement du dossier</p>
        <Button onClick={() => navigate({ to: '/rh-employees' })}>Retour à la liste</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/rh-employees' })}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{employee.name}</h1>
            <p className="text-muted-foreground">Module 01 — Dossier Administratif Complet</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter PDF
          </Button>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Modifier le dossier
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Infos */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mb-4">
                  {employee.name.charAt(0)}
                </div>
                <h2 className="font-bold text-lg text-center">{employee.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{employee.matricule}</p>
                <Badge className="bg-accent mb-2">ACTIF</Badge>
                <Badge variant="outline" className="text-[10px]">{employee.contract}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4" /> Sécurité & Légal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">CNSS</p>
                <p className="text-sm font-medium">{employee.cnss || "1234567890"}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">IFU</p>
                <p className="text-sm font-medium">{employee.ifu || "1202012345678"}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Lieu de travail</p>
                <p className="text-sm font-medium">{employee.work_location || "Cotonou"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {/* Section Identité */}
                <div className="bg-card p-6 space-y-4">
                  <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <User size={16} className="text-primary" /> État Civil & Identité
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Sexe" value={employee.gender || "M"} />
                    <Field label="Nationalité" value={employee.nationality || "Béninoise"} />
                    <Field label="Né(e) le" value={employee.birth_date} />
                    <Field label="À" value={employee.birth_place || "Cotonou"} />
                    <Field label="Pièce ID" value={employee.id_type || "CIP"} />
                    <Field label="Expire le" value={employee.id_expiry || "12/12/2028"} />
                  </div>
                </div>

                {/* Section Famille */}
                <div className="bg-card p-6 space-y-4">
                  <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <Heart size={16} className="text-rose-500" /> Situation Familiale
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Statut" value={employee.marital_status || "Marié(e)"} />
                    <Field label="Enfants" value={employee.children_count?.toString() || "2"} />
                    <Field label="Contact Urgence" value={employee.emergency_contact || "Jean Dupont"} />
                    <Field label="Relation" value={employee.emergency_relation || "Frère"} />
                    <Field label="Tél Urgence" value={employee.emergency_phone || "+229 97 00 00 00"} />
                  </div>
                </div>

                {/* Section Coordonnées */}
                <div className="bg-card p-6 space-y-4 border-t border-border">
                  <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-accent" /> Coordonnées
                  </h3>
                  <div className="space-y-3">
                    <Field label="Email Pro" value={employee.email} />
                    <Field label="Email Perso" value={employee.personal_email || "perso@mail.com"} />
                    <Field label="Téléphone" value={employee.phone} />
                    <Field label="Adresse" value={employee.address} />
                  </div>
                </div>

                {/* Section Poste & Finance */}
                <div className="bg-card p-6 space-y-4 border-t border-border">
                  <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <CreditCard size={16} className="text-emerald-500" /> Carrière & Finance
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Poste" value={employee.role} />
                    <Field label="Département" value={employee.dept} />
                    <Field label="Manager" value={employee.manager || "Sophie Martin"} />
                    <Field label="Entrée le" value={employee.hired} />
                    <Field label="Salaire Base" value={employee.salary_base || "450 000 FCFA"} />
                    <Field label="RIB" value={employee.bank_account || "BJ062 01001 1234567890 12"} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Administratifs (Module 01) */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" /> 13 Documents Requis
              </CardTitle>
              <CardDescription>Conformité du dossier administratif</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  'Contrat de travail', 'CIP / CNI', 'Passeport', 'Diplômes', 
                  'Certificat de travail', 'Attestation résidence', 'Casier judiciaire',
                  'Certificat médical', 'Photo identité', 'RIB', 'Relevé CNSS',
                  'Fiche IFU', 'Avenants'
                ].map(doc => (
                  <div key={doc} className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50">
                    <span className="text-xs truncate">{doc}</span>
                    <Badge className="h-4 px-1 text-[8px] bg-emerald-500">OK</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] text-muted-foreground uppercase font-semibold">{label}</p>
      <p className="text-xs font-medium">{value}</p>
    </div>
  );
}
