import { Button } from "@/components/shared/Button";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { PageHeader } from "@/components/shared/PageHeader";
import { apiClient } from "@/lib/api-client";
import type { Department, EmployeeInput, Employee } from "@/types";
import { ContractType, EmploymentStatus, HRRole } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Camera, Save, X, DollarSign } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors disabled:opacity-50";

const inputErrorClass =
  "w-full rounded-lg border border-destructive bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/40 transition-colors";

const hrRoleLabels: Record<HRRole, string> = {
  [HRRole.HRAdmin]: "Administrateur RH",
  [HRRole.HRManager]: "Gestionnaire RH",
  [HRRole.Manager]: "Manager",
  [HRRole.Employee]: "Collaborateur",
  [HRRole.Direction]: "Direction",
};

const contractLabels: Record<ContractType, string> = {
  [ContractType.CDI]: "CDI",
  [ContractType.CDD]: "CDD",
  [ContractType.Internship]: "Stage / Alternance",
  [ContractType.PartTime]: "Consultant",
  [ContractType.Freelance]: "Freelance",
};

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EditEmployeePage() {
  const { id } = useParams({ from: "/protected/rh-employees/$id/edit" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: employee,
    isLoading,
    isError,
  } = useQuery<Employee>({
    queryKey: ["employee", id],
    queryFn: () => apiClient<Employee>(`/employees/${id}/`),
    enabled: !!id,
  });

  const { data: departments } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: () => apiClient<Department[]>("/departments/"),
  });

  const [form, setForm] = useState<EmployeeInput>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    hr_role: HRRole.Employee,
    contract_type: ContractType.CDI,
    status: EmploymentStatus.Active,
    department_id: 0,
    birth_date: "",
    birth_place: "",
    nationality: "",
    gender: "",
    id_card_number: "",
    id_card_type: "",
    hire_date: "",
    position: "",
    contract_start: "",
    professional_email: "",
    base_salary: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (employee) {
      setForm({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone || "",
        hr_role: employee.hr_role,
        contract_type: employee.contract_type as ContractType,
        status: employee.status,
        department_id: employee.department_id,
        birth_date: employee.birth_date,
        birth_place: employee.birth_place,
        nationality: employee.nationality,
        gender: employee.gender,
        id_card_number: employee.id_card_number,
        id_card_type: employee.id_card_type,
        hire_date: employee.hire_date,
        position: employee.position,
        contract_start: employee.contract_start,
        professional_email: employee.professional_email,
        base_salary: employee.base_salary,
      });
      if (employee.profile_picture) {
        setAvatarPreview(employee.profile_picture.url);
      }
    }
  }, [employee]);

  const set = <K extends keyof EmployeeInput>(
    key: K,
    value: EmployeeInput[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.first_name.trim()) errs.first_name = "Le prénom est requis";
    if (!form.last_name.trim()) errs.last_name = "Le nom est requis";
    if (!form.email.trim()) {
      errs.email = "L'e-mail est requis";
    } else if (!validateEmail(form.email)) {
      errs.email = "Veuillez entrer une adresse e-mail valide";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image valide");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image doit être plus petite que 5 MB");
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(
      employee?.profile_picture ? employee.profile_picture.url : null,
    );
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const mutation = useMutation({
    mutationFn: async (input: EmployeeInput) => {
      const updated = await apiClient<Employee>(`/employees/${id}/`, {
        method: "PUT",
        body: JSON.stringify(input),
      });
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        await apiClient(`/employees/${id}/profile-picture`, {
          method: "POST",
          body: formData,
        });
      }
      return updated;
    },
    onSuccess: () => {
      toast.success("Collaborateur mis à jour avec succès");
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      navigate({ to: "/rh-employees/$id", params: { id: String(id) } });
    },
    onError: (err: Error) => toast.error(`Échec de la mise à jour : ${err.message}`)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  if (isError || !employee) return <ErrorMessage title="Collaborateur non trouvé" />;

  const initials =
    `${form.first_name[0] ?? ""}${form.last_name[0] ?? ""}`.toUpperCase() ||
    `${employee.first_name[0]}${employee.last_name[0]}`.toUpperCase();

  const hasNewAvatar = avatarFile !== null;
  const existingAvatarUrl = employee.profile_picture
    ? employee.profile_picture.url
    : null;
  const showRemoveBtn =
    hasNewAvatar ||
    (avatarPreview !== null && avatarPreview !== existingAvatarUrl);

  return (
    <div data-ocid="edit_employee.page">
      <PageHeader
        title={`Modifier : ${employee.first_name} ${employee.last_name}`}
        subtitle="Mettre à jour les détails du collaborateur"
        action={
          <Link to="/rh-employees/$id" params={{ id: String(id) }}>
            <Button variant="ghost" icon={<ArrowLeft size={15} />} size="sm">
              Retour
            </Button>
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="max-w-2xl"
        data-ocid="edit_employee.form"
      >
        {/* Profile picture */}
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <h3 className="font-display font-semibold text-sm text-foreground mb-4">
            Photo de profil
            <span className="ml-1.5 font-normal text-muted-foreground text-xs">
              (optionnel)
            </span>
          </h3>
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/15 text-primary flex items-center justify-center font-display font-bold text-2xl border-2 border-border">
                  {initials}
                </div>
              )}
              {showRemoveBtn && (
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
                  aria-label="Remove photo"
                >
                  <X size={10} />
                </button>
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="edit-avatar-input"
              />
              <label
                htmlFor="edit-avatar-input"
                className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <Camera size={14} />
                {hasNewAvatar ? "Changer la photo" : "Télécharger une photo"}
              </label>
              <p className="text-xs text-muted-foreground mt-1.5">
                JPG, PNG ou WebP · max 5 MB
              </p>
            </div>
          </div>
        </div>

        {/* Form fields */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              label="Prénom"
              id="edit-first-name"
              required
              error={errors.first_name}
            >
              <input
                id="edit-first-name"
                type="text"
                value={form.first_name}
                onChange={(e) => {
                  set("first_name", e.target.value);
                  if (errors.first_name)
                    setErrors((err) => ({ ...err, first_name: undefined }));
                }}
                className={errors.first_name ? inputErrorClass : inputClass}
              />
            </FormField>

            <FormField
              label="Nom"
              id="edit-last-name"
              required
              error={errors.last_name}
            >
              <input
                id="edit-last-name"
                type="text"
                value={form.last_name}
                onChange={(e) => {
                  set("last_name", e.target.value);
                  if (errors.last_name)
                    setErrors((err) => ({ ...err, last_name: undefined }));
                }}
                className={errors.last_name ? inputErrorClass : inputClass}
              />
            </FormField>

            <FormField
              label="E-mail"
              id="edit-email"
              required
              error={errors.email}
            >
              <input
                id="edit-email"
                type="email"
                value={form.email}
                onChange={(e) => {
                  set("email", e.target.value);
                  if (errors.email)
                    setErrors((err) => ({ ...err, email: undefined }));
                }}
                className={errors.email ? inputErrorClass : inputClass}
              />
            </FormField>

            <FormField label="Téléphone" id="edit-phone">
              <input
                id="edit-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass}
              />
            </FormField>

            <FormField label="Rôle RH" id="edit-hr-role" required>
              <select
                id="edit-hr-role"
                value={form.hr_role}
                onChange={(e) => set("hr_role", e.target.value as HRRole)}
                className={inputClass}
              >
                {Object.values(HRRole).map((r) => (
                  <option key={r} value={r}>
                    {hrRoleLabels[r]}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Type de contrat" id="edit-contract-type" required>
              <select
                id="edit-contract-type"
                value={form.contract_type}
                onChange={(e) =>
                  set("contract_type", e.target.value as ContractType)
                }
                className={inputClass}
              >
                {Object.values(ContractType).map((c) => (
                  <option key={c} value={c}>
                    {contractLabels[c]}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Statut" id="edit-status" required>
              <select
                id="edit-status"
                value={form.status}
                onChange={(e) =>
                  set("status", e.target.value as EmploymentStatus)
                }
                className={inputClass}
              >
                <option value={EmploymentStatus.Active}>Actif</option>
                <option value={EmploymentStatus.Inactive}>Inactif</option>
                <option value={EmploymentStatus.OnLeave}>Suspendu</option>
              </select>
            </FormField>

            <FormField label="Département" id="edit-department">
              <select
                id="edit-department"
                value={
                  form.department_id !== undefined
                    ? String(form.department_id)
                    : ""
                }
                onChange={(e) =>
                  set(
                    "department_id",
                    e.target.value ? Number(e.target.value) : 0,
                  )
                }
                className={inputClass}
                data-ocid="edit_employee.department_select"
              >
                <option value={0}>Sélectionner un département</option>
                {departments?.map((d) => (
                  <option key={String(d.id)} value={String(d.id)}>
                    {d.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Salaire de base (FCFA)" id="edit-base-salary">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="edit-base-salary"
                  type="text"
                  value={form.base_salary === 0 ? "" : form.base_salary}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    set("base_salary", val === "" ? 0 : parseInt(val));
                  }}
                  className={inputClass + " pl-10"}
                  placeholder="0"
                />
              </div>
            </FormField>
          </fieldset>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Link to="/rh-employees/$id" params={{ id: String(id) }}>
            <Button
              type="button"
              variant="ghost"
              data-ocid="edit_employee.cancel_button"
            >
              Annuler
            </Button>
          </Link>
          <Button
            type="submit"
            loading={mutation.isPending}
            icon={mutation.isPending ? undefined : <Save size={14} />}
          >
            {mutation.isPending ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  required,
  children,
  error,
  id,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
