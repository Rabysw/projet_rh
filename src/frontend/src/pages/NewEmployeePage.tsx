import { Button } from "@/components/shared/Button";
import { PageHeader } from "@/components/shared/PageHeader";
import { apiClient } from "@/lib/api-client";
import type { Department, EmployeeInput, Employee } from "@/types";
import { ContractType, EmploymentStatus, HRRole } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Camera, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
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

export default function NewEmployeePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    department_id: undefined,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const mutation = useMutation({
    mutationFn: async (input: EmployeeInput) => {
      const employee = await apiClient<Employee>("/employees/", {
        method: "POST",
        body: JSON.stringify(input),
      });

      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        await apiClient(`/employees/${employee.id}/profile-picture`, {
          method: "POST",
          body: formData,
        });
      }
      return employee;
    },
    onSuccess: (employee) => {
      toast.success(
        `${employee.first_name} ${employee.last_name} a été créé avec succès`,
      );
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      navigate({ to: "/employees/$id", params: { id: String(employee.id) } });
    },
    onError: (err: Error) => toast.error(`Échec de la création : ${err.message}`)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  const initials =
    `${form.first_name[0] ?? ""}${form.last_name[0] ?? ""}`.toUpperCase() || "?";

  return (
    <div data-ocid="new_employee.page">
      <PageHeader
        title="Ajouter un collaborateur"
        subtitle="Remplissez les détails pour créer un nouveau dossier collaborateur"
        action={
          <Link to="/employees">
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
        data-ocid="new_employee.form"
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
              {avatarPreview && (
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
                  aria-label="Remove photo"
                  data-ocid="new_employee.remove_avatar_button"
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
                id="new-avatar-input"
                data-ocid="new_employee.avatar_input"
              />
              <label
                htmlFor="new-avatar-input"
                className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                data-ocid="new_employee.upload_button"
              >
                <Camera size={14} />
                {avatarFile ? "Changer la photo" : "Télécharger une photo"}
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
              id="new-first-name"
              required
              error={errors.first_name}
            >
              <input
                id="new-first-name"
                type="text"
                value={form.first_name}
                onChange={(e) => {
                  set("first_name", e.target.value);
                  if (errors.first_name)
                    setErrors((err) => ({ ...err, first_name: undefined }));
                }}
                onBlur={() => {
                  if (!form.first_name.trim())
                    setErrors((err) => ({
                      ...err,
                      first_name: "Le prénom est requis",
                    }));
                }}
                className={errors.first_name ? inputErrorClass : inputClass}
                placeholder="Jean"
                data-ocid="new_employee.first_name_input"
              />
            </FormField>

            <FormField
              label="Nom"
              id="new-last-name"
              required
              error={errors.last_name}
            >
              <input
                id="new-last-name"
                type="text"
                value={form.last_name}
                onChange={(e) => {
                  set("last_name", e.target.value);
                  if (errors.last_name)
                    setErrors((err) => ({ ...err, last_name: undefined }));
                }}
                onBlur={() => {
                  if (!form.last_name.trim())
                    setErrors((err) => ({
                      ...err,
                      last_name: "Le nom est requis",
                    }));
                }}
                className={errors.last_name ? inputErrorClass : inputClass}
                placeholder="Dupont"
                data-ocid="new_employee.last_name_input"
              />
            </FormField>

            <FormField
              label="E-mail"
              id="new-email"
              required
              error={errors.email}
            >
              <input
                id="new-email"
                type="email"
                value={form.email}
                onChange={(e) => {
                  set("email", e.target.value);
                  if (errors.email)
                    setErrors((err) => ({ ...err, email: undefined }));
                }}
                onBlur={() => {
                  if (!form.email.trim()) {
                    setErrors((err) => ({
                      ...err,
                      email: "L'e-mail est requis",
                    }));
                  } else if (!validateEmail(form.email)) {
                    setErrors((err) => ({
                      ...err,
                      email: "Veuillez entrer une adresse e-mail valide",
                    }));
                  }
                }}
                className={errors.email ? inputErrorClass : inputClass}
                placeholder="jean.dupont@ices.com"
                data-ocid="new_employee.email_input"
              />
            </FormField>

            <FormField label="Téléphone" id="new-phone">
              <input
                id="new-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass}
                placeholder="+229 XXXXXXXX"
                data-ocid="new_employee.phone_input"
              />
            </FormField>

            <FormField label="Rôle RH" id="new-hr-role" required>
              <select
                id="new-hr-role"
                value={form.hr_role}
                onChange={(e) => set("hr_role", e.target.value as HRRole)}
                className={inputClass}
                data-ocid="new_employee.role_select"
              >
                {Object.values(HRRole).map((r) => (
                  <option key={r} value={r}>
                    {hrRoleLabels[r]}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Type de contrat" id="new-contract-type" required>
              <select
                id="new-contract-type"
                value={form.contract_type}
                onChange={(e) =>
                  set("contract_type", e.target.value as ContractType)
                }
                className={inputClass}
                data-ocid="new_employee.contract_select"
              >
                {Object.values(ContractType).map((c) => (
                  <option key={c} value={c}>
                    {contractLabels[c]}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Statut" id="new-status" required>
              <select
                id="new-status"
                value={form.status}
                onChange={(e) =>
                  set("status", e.target.value as EmploymentStatus)
                }
                className={inputClass}
                data-ocid="new_employee.status_select"
              >
                <option value={EmploymentStatus.Active}>Actif</option>
                <option value={EmploymentStatus.Inactive}>Inactif</option>
                <option value={EmploymentStatus.OnLeave}>Suspendu</option>
              </select>
            </FormField>

            <FormField label="Département" id="new-department">
              <select
                id="new-department"
                value={
                  form.department_id !== undefined
                    ? String(form.department_id)
                    : ""
                }
                onChange={(e) =>
                  set(
                    "department_id",
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                className={inputClass}
                data-ocid="new_employee.department_select"
              >
                <option value="">Aucun département</option>
                {departments?.map((d) => (
                  <option key={String(d.id)} value={String(d.id)}>
                    {d.name}
                  </option>
                ))}
              </select>
            </FormField>
          </fieldset>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Link to="/employees">
            <Button
              type="button"
              variant="outline"
              data-ocid="new_employee.cancel_button"
            >
              Annuler
            </Button>
          </Link>
          <Button
            type="submit"
            loading={mutation.isPending}
            icon={mutation.isPending ? undefined : <Upload size={14} />}
            data-ocid="new_employee.submit_button"
          >
            {mutation.isPending ? "Création..." : "Créer le collaborateur"}
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
        <p
          className="text-xs text-destructive"
          role="alert"
          data-ocid="new_employee.field_error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
