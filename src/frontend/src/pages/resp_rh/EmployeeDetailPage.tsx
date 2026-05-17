import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { useApi, apiFetch } from "@/hooks/use-api";
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
  Fingerprint,
  Upload,
  CheckCircle2
} from "lucide-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { toast } from "sonner";

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
  const { id } = useParams({ from: '/protected/rh-employees/$id' });
  const navigate = useNavigate();
  const { data: employee, isLoading, error, refetch: refetchEmployee } = useApi<EmployeeDetail>(`/api/v1/resp-rh/employees/${id}`);
  
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: documentsData, refetch: refetchDocs } = useApi<{ documents: any[] }>(`/api/v1/documents/employee/${id}`);
  const documents = documentsData?.documents || [];

  const handleUploadClick = (docType: string) => {
    setUploadingDoc(docType);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingDoc) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", uploadingDoc);
    formData.append("employee_id", id.toString());

    try {
      await apiFetch("/api/v1/documents/upload", {
        method: "POST",
        body: formData,
      });
      toast.success(`${uploadingDoc} uploadé avec succès`);
      refetchDocs();
      if (uploadingDoc === "contract") refetchEmployee();
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de l'upload");
    } finally {
      setUploadingDoc(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const getDocStatus = (docName: string) => {
    const typeMap: Record<string, string> = {
      'Contrat de travail': 'contract',
      'CIP / CNI': 'id_card',
      'Passeport': 'passport',
      'Diplômes': 'diploma',
      'Certificat de travail': 'work_certificate',
      'Attestation résidence': 'residence_cert',
      'Casier judiciaire': 'criminal_record',
      'Certificat médical': 'medical_cert',
      'Photo identité': 'photo',
      'RIB': 'rib',
      'Relevé CNSS': 'cnss',
      'Fiche IFU': 'ifu',
      'Avenants': 'avenant'
    };
    const type = typeMap[docName];
    const doc = documents.find(d => d.document_type === type);
    return doc ? { status: 'OK', url: doc.file_url } : { status: 'Manquant', url: null };
  };

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
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
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
          <Button 
            className="gap-2"
            onClick={() => navigate({ to: `/rh-employees/${id}/edit` })}
          >
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
                    <Field label="Sexe" value={employee.gender || "—"} />
                    <Field label="Nationalité" value={employee.nationality || "—"} />
                    <Field label="Né(e) le" value={employee.birth_date || "—"} />
                    <Field label="À" value={employee.birth_place || "—"} />
                    <Field label="Pièce ID" value={employee.id_type || "—"} />
                    <Field label="Expire le" value={employee.id_expiry || "—"} />
                  </div>
                </div>

                {/* Section Famille */}
                <div className="bg-card p-6 space-y-4">
                  <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <Heart size={16} className="text-rose-500" /> Situation Familiale
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Statut" value={employee.marital_status || "—"} />
                    <Field label="Enfants" value={employee.children_count?.toString() || "0"} />
                    <Field label="Contact Urgence" value={employee.emergency_contact || "—"} />
                    <Field label="Relation" value={employee.emergency_relation || "—"} />
                    <Field label="Tél Urgence" value={employee.emergency_phone || "—"} />
                  </div>
                </div>

                {/* Section Coordonnées */}
                <div className="bg-card p-6 space-y-4 border-t border-border">
                  <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <MapPin size={16} className="text-accent" /> Coordonnées
                  </h3>
                  <div className="space-y-3">
                    <Field label="Email Pro" value={employee.email || "—"} />
                    <Field label="Email Perso" value={employee.personal_email || "—"} />
                    <Field label="Téléphone" value={employee.phone || "—"} />
                    <Field label="Adresse" value={employee.address || "—"} />
                  </div>
                </div>

                {/* Section Poste & Finance */}
                <div className="bg-card p-6 space-y-4 border-t border-border">
                  <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                    <CreditCard size={16} className="text-emerald-500" /> Carrière & Finance
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Poste" value={employee.role || "—"} />
                    <Field label="Département" value={employee.dept || "—"} />
                    <Field label="Manager" value={employee.manager || "—"} />
                    <Field label="Entrée le" value={employee.hired || "—"} />
                    <Field label="Salaire Base" value={employee.salary_base ? `${employee.salary_base} FCFA` : "—"} />
                    <Field label="RIB" value={employee.bank_account || "—"} />
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
                ].map(docName => {
                  const { status, url } = getDocStatus(docName);
                  const typeMap: Record<string, string> = {
                    'Contrat de travail': 'contract',
                    'CIP / CNI': 'id_card',
                    'Passeport': 'passport',
                    'Diplômes': 'diploma',
                    'Certificat de travail': 'work_certificate',
                    'Attestation résidence': 'residence_cert',
                    'Casier judiciaire': 'criminal_record',
                    'Certificat médical': 'medical_cert',
                    'Photo identité': 'photo',
                    'RIB': 'rib',
                    'Relevé CNSS': 'cnss',
                    'Fiche IFU': 'ifu',
                    'Avenants': 'avenant'
                  };
                  const docType = typeMap[docName];
                  
                  return (
                    <div key={docName} className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50 group">
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs truncate font-medium">{docName}</span>
                        <span className={`text-[10px] ${status === 'OK' ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {status}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {url ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-primary"
                            onClick={() => window.open(url, "_blank")}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-muted-foreground hover:text-primary"
                            onClick={() => handleUploadClick(docType)}
                            disabled={uploadingDoc === docType}
                          >
                            {uploadingDoc === docType ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Upload className="h-3 w-3" />
                            )}
                          </Button>
                        )}
                        {status === 'OK' && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 self-center" />
                        )}
                      </div>
                    </div>
                  );
                })}
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
