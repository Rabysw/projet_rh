import { useIcesAuth } from "@/hooks/use-ices-auth";
import { StatusBadge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ConfirmDeleteModal } from "@/components/shared/Modal";
import { PageHeader } from "@/components/shared/PageHeader";
import { apiClient } from "@/lib/api-client";
import { apiFetch } from "@/hooks/use-api";
import type { Department, Employee } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  Download,
  Edit2,
  FileText,
  Mail,
  Phone,
  Upload,
  RefreshCw,
  Trash2,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type EmployeeDocument = {
  id: number;
  type: string;
  name: string;
  uploaded_at: string;
  status: string;
};

export default function EmployeeDetailPage() {
  const { id } = useParams({ from: "/protected/employees/$id" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDelete, setShowDelete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [documentType, setDocumentType] = useState<string>("other");
  const [isUploading, setIsUploading] = useState(false);

  const {
    data: employee,
    isLoading,
    isError,
    refetch,
  } = useQuery<Employee | null>({
    queryKey: ["employee", id],
    queryFn: () => apiClient<Employee>(`/employees/${id}/`),
    enabled: !!id,
  });

  const { data: departments } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: () => apiClient<Department[]>("/departments/"),
  });

  const {
    data: employeeDocs,
    isLoading: isDocsLoading,
    isError: isDocsError,
    refetch: refetchDocs,
  } = useQuery<{ employee_id: number; documents: EmployeeDocument[] }>({
    queryKey: ["employeeDocuments", id],
    queryFn: () => apiFetch(`/documents/employee/${id}`),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      apiClient(`/employees/${id}/`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Collaborateur supprimé");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      navigate({ to: "/employees" });
    },
    onError: (err: Error) => toast.error(`Failed to delete employee: ${err.message}`),
  });

  const departmentName = employee?.department_id
    ? departments?.find((d) => d.id === employee.department_id)?.name
    : undefined;

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  if (isError || !employee)
    return (
      <ErrorMessage
        title="Collaborateur non trouvé"
        message="Ce dossier collaborateur n'existe pas ou n'a pas pu être chargé."
        onRetry={refetch}
      />
    );

  const { user } = useIcesAuth();

  const canEdit = user?.role === "admin_rh" || user?.role === "resp_rh";
  const canDelete = user?.role === "admin_rh";
  const isManagement = user?.role === "admin_rh" || user?.role === "resp_rh" || user?.role === "direction";

  const joinedDate = new Date(employee.created_at).toLocaleDateString("fr-FR");

  const updatedDate = new Date(employee.updated_at).toLocaleDateString("fr-FR");

  const contractLabels: Record<string, string> = {
    CDI: "CDI",
    CDD: "CDD",
    Internship: "Stage / Alternance",
    PartTime: "Consultant",
    Freelance: "Freelance",
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileSelected = async (file: File | null) => {
    if (!file || !id) return;
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);

      // Backend expects query params for document_type & employee_id
      await apiFetch(
        `/documents/upload?document_type=${encodeURIComponent(documentType)}&employee_id=${encodeURIComponent(
          String(id),
        )}`,
        { method: "POST", body: form },
      );
      toast.success("Document uploadé avec succès");
      await refetchDocs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'upload");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div data-ocid="employee_detail.page">
      <PageHeader
        title={`${employee.first_name} ${employee.last_name}`}
        subtitle={`Employé #${employee.id}`}
        action={
          <div className="flex items-center gap-2">
            <Link to="/employees">
              <Button variant="ghost" icon={<ArrowLeft size={15} />} size="sm">
                Retour
              </Button>
            </Link>
            {canEdit && (
              <Link
                to="/employees/$id/edit"
                params={{ id: String(employee.id) }}
              >
                <Button
                  variant="outline"
                  icon={<Edit2 size={15} />}
                  size="sm"
                  data-ocid="employee_detail.edit_button"
                >
                  Modifier
                </Button>
              </Link>
            )}
            {canDelete && (
              <Button
                variant="danger"
                icon={<Trash2 size={15} />}
                size="sm"
                onClick={() => setShowDelete(true)}
                data-ocid="employee_detail.delete_button"
              >
                Supprimer
              </Button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Top accent bar */}
            <div className="h-20 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10" />
            <div className="px-6 pb-6 -mt-10 flex flex-col items-center text-center">
              <EmployeeAvatar employee={employee} size="lg" />
              <h2 className="font-display font-bold text-xl text-foreground mt-3">
                {employee.first_name} {employee.last_name}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {employee.professional_email}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                <StatusBadge status={employee.status} />
              </div>
            </div>
          </div>

          {/* Quick facts */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Informations clés
            </h3>
            <QuickFact
              icon={<Briefcase size={14} />}
              label="Contrat"
              value={
                contractLabels[employee.contract_type] ?? employee.contract_type
              }
            />
            {departmentName && (
              <QuickFact
                icon={<Building2 size={14} />}
                label="Département"
                value={departmentName}
              />
            )}
            <QuickFact
              icon={<Calendar size={14} />}
              label="Créé le"
              value={joinedDate}
            />
            <QuickFact
              icon={<RefreshCw size={14} />}
              label="Mis à jour le"
              value={updatedDate}
            />
          </div>
        </div>

        {/* Detail panels */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <SectionHeading
              icon={<User size={15} />}
              title="Coordonnées"
            />
            <div className="space-y-4 mt-4">
              <DetailRow
                icon={<Mail size={15} />}
                label="Email"
                value={employee.professional_email}
              />
              <DetailRow
                icon={<Phone size={15} />}
                label="Téléphone"
                value={employee.professional_phone || "+229 -- -- -- --"}
              />
              {isManagement && (
                <DetailRow
                  icon={<Briefcase size={15} />}
                  label="Salaire de base"
                  value={`${(employee as any).base_salary?.toLocaleString('fr-FR') || 0} FCFA`}
                />
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <SectionHeading
              icon={<Briefcase size={15} />}
              title="Informations professionnelles"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-4">
              <DetailRow
                icon={<Briefcase size={15} />}
                label="Type de contrat"
                value={
                  contractLabels[employee.contract_type] ?? employee.contract_type
                }
              />
              {departmentName && (
                <DetailRow
                  icon={<Building2 size={15} />}
                  label="Département"
                  value={departmentName}
                />
              )}
              <DetailRow
                icon={<Calendar size={15} />}
                label="Créé le"
                value={joinedDate}
              />
              <DetailRow
                icon={<RefreshCw size={15} />}
                label="Mis à jour le"
                value={updatedDate}
              />
            </div>
          </div>

          {/* Documents employé */}
          <div className="rounded-xl border border-border bg-card p-6">
            <SectionHeading icon={<FileText size={15} />} title="Documents" />

            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-end">
              <div className="flex-1">
                <label className="block text-xs text-muted-foreground">Type de document</label>
                <select
                  className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  disabled={isUploading}
                >
                  <option value="contract">Contrat</option>
                  <option value="certificate">Attestation / Certificat</option>
                  <option value="payslip">Fiche de paie</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  icon={<Upload size={14} />}
                  onClick={handleUploadClick}
                  disabled={isUploading}
                >
                  Charger un document
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  icon={<RefreshCw size={14} />}
                  onClick={() => refetchDocs()}
                  disabled={isUploading}
                >
                  Actualiser
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => handleFileSelected(e.target.files?.[0] ?? null)}
              />
            </div>

            <div className="mt-5">
              {isDocsLoading ? (
                <div className="text-sm text-muted-foreground">Chargement des documents…</div>
              ) : isDocsError ? (
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-destructive">Erreur de chargement des documents.</p>
                  <Button size="sm" variant="outline" onClick={() => refetchDocs()}>
                    Réessayer
                  </Button>
                </div>
              ) : (employeeDocs?.documents?.length ?? 0) === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun document pour cet employé.</p>
              ) : (
                <div className="space-y-2">
                  {(employeeDocs?.documents ?? []).map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/30"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Type: {doc.type} · Statut: {doc.status} · Ajouté le{" "}
                          {new Date(doc.uploaded_at).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          icon={<Download size={14} />}
                          disabled
                          title="Téléchargement direct non disponible pour ce document (endpoint backend manquant)"
                        >
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteMutation.mutate()}
        entityName={`${employee.first_name} ${employee.last_name}`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

function SectionHeading({
  icon,
  title,
}: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <h3 className="font-display font-semibold text-base text-foreground">
        {title}
      </h3>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {typeof value === "string" ? (
          <p className="text-sm font-medium text-foreground mt-0.5 break-words">
            {value}
          </p>
        ) : (
          <div className="mt-0.5">{value}</div>
        )}
      </div>
    </div>
  );
}

function QuickFact({
  icon,
  label,
  value,
}: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-muted-foreground flex-shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="text-xs text-muted-foreground">{label}: </span>
        <span className="text-sm font-medium text-foreground truncate">
          {value}
        </span>
      </div>
    </div>
  );
}

function EmployeeAvatar({
  employee,
  size = "md",
}: {
  employee: Employee;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-8 h-8 text-[10px]",
    md: "w-10 h-10 text-xs",
    lg: "w-24 h-24 text-2xl border-4 border-card",
  };

  if (employee.profile_picture_url) {
    return (
      <img
        src={employee.profile_picture_url}
        alt={`${employee.first_name} ${employee.last_name}`}
        className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0 border border-border shadow-sm`}
      />
    );
  }
  const initials = `${employee.first_name[0] ?? ""}${employee.last_name[0] ?? ""}`;
  const colors = [
    "bg-primary/15 text-primary",
    "bg-accent/15 text-accent-foreground",
    "bg-secondary text-secondary-foreground",
    "bg-chart-4/20 text-foreground",
  ];
  const colorIndex = (employee.first_name.charCodeAt(0) ?? 0) % colors.length;
  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-display font-bold flex-shrink-0 shadow-sm ${colors[colorIndex]}`}
    >
      {initials.toUpperCase()}
    </div>
  );
}
