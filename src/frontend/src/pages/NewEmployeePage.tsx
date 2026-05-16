import { Button } from "@/components/shared/Button";
import { PageHeader } from "@/components/shared/PageHeader";
import { apiClient } from "@/lib/api-client";
import type { Department, EmployeeInput, Employee } from "@/types";
import { ContractType, EmploymentStatus, HRRole } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  X,
  User,
  Users,
  Phone,
  Mail,
  Briefcase,
  Shield,
  FileText,
  AlertCircle,
  MapPin,
  Calendar,
  DollarSign,
  GraduationCap,
  Heart,
  Key
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors disabled:opacity-50";

const selectClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors disabled:opacity-50";

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

  const { data: employees } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: () => apiClient<Employee[]>("/employees/"),
  });

  const [form, setForm] = useState<EmployeeInput>({
    // Accès & Identité de base
    first_name: "",
    last_name: "",
    email: "",
    password: "", // Nouveau champ pour le compte système
    phone: "",
    hr_role: HRRole.Employee,
    
    // État civil & Identité
    gender: "M",
    birth_date: "",
    birth_place: "",
    nationality: "Béninoise",
    marital_status: "Célibataire",
    children_count: 0,
    
    // Coordonnées
    address: "",
    personal_email: "",
    personal_phone: "",
    professional_phone: "",
    work_location: "Siège",
    
    // Carrière & Finance
    position: "",
    department_id: 0,
    manager_id: undefined,
    contract_type: ContractType.CDI,
    contract_start: new Date().toISOString().split('T')[0],
    contract_end: "",
    hire_date: new Date().toISOString().split('T')[0],
    base_salary: 0,
    professional_email: "",
    diploma: "",
    
    // Sécurité & Légal
    id_card_type: "Passeport",
    id_card_number: "",
    id_card_expiry: "",
    emergency_contact_name: "",
    emergency_contact_relation: "",
    emergency_contact_phone: "",
    
    status: EmploymentStatus.Active,
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
      navigate({ to: "/rh-employees/$id", params: { id: String(employee.id) } });
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
          <Link to="/rh-employees">
            <Button variant="ghost" icon={<ArrowLeft size={15} />} size="sm">
              Retour
            </Button>
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="max-w-4xl space-y-6 pb-20"
        data-ocid="new_employee.form"
      >
        {/* Profile picture */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
            <Camera size={16} className="text-primary" />
            Photo de profil
            <span className="ml-1.5 font-normal text-muted-foreground text-xs">
              (optionnel)
            </span>
          </h3>
          <div className="flex items-center gap-5">
            {/* ... (keep existing avatar logic) */}
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

        {/* 1. État Civil & Identité */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-border pb-3">
            <User size={18} />
            <span>État Civil & Identité</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField label="Prénom" id="new-first-name" required error={errors.first_name}>
              <input
                id="new-first-name"
                type="text"
                value={form.first_name}
                onChange={(e) => {
                  set("first_name", e.target.value);
                  if (errors.first_name) setErrors((err) => ({ ...err, first_name: undefined }));
                }}
                onBlur={() => {
                  if (!form.first_name.trim())
                    setErrors((err) => ({ ...err, first_name: "Le prénom est requis" }));
                }}
                className={errors.first_name ? inputErrorClass : inputClass}
                placeholder="Jean"
              />
            </FormField>

            <FormField label="Nom" id="new-last-name" required error={errors.last_name}>
              <input
                id="new-last-name"
                type="text"
                value={form.last_name}
                onChange={(e) => {
                  set("last_name", e.target.value);
                  if (errors.last_name) setErrors((err) => ({ ...err, last_name: undefined }));
                }}
                onBlur={() => {
                  if (!form.last_name.trim())
                    setErrors((err) => ({ ...err, last_name: "Le nom est requis" }));
                }}
                className={errors.last_name ? inputErrorClass : inputClass}
                placeholder="Dupont"
              />
            </FormField>

            <FormField label="Mot de passe (Accès système)" id="new-password">
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="new-password"
                  type="password"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  className={inputClass + " pl-10"}
                  placeholder="Laisser vide pour : Ices2026!"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                Ce mot de passe permettra au collaborateur de se connecter.
              </p>
            </FormField>

            <FormField label="Genre" id="new-gender">
              <select
                id="new-gender"
                value={form.gender}
                onChange={(e) => set("gender", e.target.value)}
                className={selectClass}
              >
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </FormField>

            <FormField label="Date de naissance" id="new-birth-date">
              <input
                id="new-birth-date"
                type="date"
                value={form.birth_date}
                onChange={(e) => set("birth_date", e.target.value)}
                className={inputClass}
              />
            </FormField>

            <FormField label="Lieu de naissance" id="new-birth-place">
              <input
                id="new-birth-place"
                type="text"
                value={form.birth_place}
                onChange={(e) => set("birth_place", e.target.value)}
                className={inputClass}
                placeholder="Cotonou"
              />
            </FormField>

            <FormField label="Nationalité" id="new-nationality">
              <input
                id="new-nationality"
                type="text"
                value={form.nationality}
                onChange={(e) => set("nationality", e.target.value)}
                className={inputClass}
                placeholder="Béninoise"
              />
            </FormField>
          </div>
        </div>

        {/* 2. Situation Familiale */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-border pb-3">
            <Heart size={18} />
            <span>Situation Familiale</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Situation matrimoniale" id="new-marital-status">
              <select
                id="new-marital-status"
                value={form.marital_status}
                onChange={(e) => set("marital_status", e.target.value)}
                className={selectClass}
              >
                <option value="Célibataire">Célibataire</option>
                <option value="Marié(e)">Marié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf(ve)">Veuf(ve)</option>
              </select>
            </FormField>

            <FormField label="Nombre d'enfants" id="new-children-count">
              <input
                id="new-children-count"
                type="number"
                min="0"
                value={form.children_count}
                onChange={(e) => set("children_count", parseInt(e.target.value) || 0)}
                className={inputClass}
              />
            </FormField>
          </div>
        </div>

        {/* 3. Coordonnées */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-border pb-3">
            <Phone size={18} />
            <span>Coordonnées & Contact</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField label="Téléphone professionnel" id="new-phone">
              <input
                id="new-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass}
                placeholder="+229 00 00 00 00"
              />
            </FormField>

            <FormField label="Téléphone personnel" id="new-personal-phone">
              <input
                id="new-personal-phone"
                type="tel"
                value={form.personal_phone}
                onChange={(e) => set("personal_phone", e.target.value)}
                className={inputClass}
                placeholder="+229 00 00 00 00"
              />
            </FormField>

            <FormField label="E-mail principal" id="new-email" required error={errors.email}>
              <input
                id="new-email"
                type="email"
                value={form.email}
                onChange={(e) => {
                  set("email", e.target.value);
                  if (errors.email) setErrors((err) => ({ ...err, email: undefined }));
                }}
                onBlur={() => {
                  if (!form.email.trim()) {
                    setErrors((err) => ({ ...err, email: "L'e-mail est requis" }));
                  } else if (!validateEmail(form.email)) {
                    setErrors((err) => ({ ...err, email: "Veuillez entrer une adresse e-mail valide" }));
                  }
                }}
                className={errors.email ? inputErrorClass : inputClass}
                placeholder="jean.dupont@ices.com"
              />
            </FormField>

            <FormField label="E-mail personnel" id="new-personal-email">
              <input
                id="new-personal-email"
                type="email"
                value={form.personal_email}
                onChange={(e) => set("personal_email", e.target.value)}
                className={inputClass}
                placeholder="jean.dupont@gmail.com"
              />
            </FormField>

            <FormField label="Lieu de travail" id="new-work-location">
              <input
                id="new-work-location"
                type="text"
                value={form.work_location}
                onChange={(e) => set("work_location", e.target.value)}
                className={inputClass}
                placeholder="Siège / Agence..."
              />
            </FormField>

            <FormField label="Adresse de résidence" id="new-address">
              <textarea
                id="new-address"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className={inputClass + " min-h-[80px] sm:col-span-2"}
                placeholder="Cotonou, quartier..."
              />
            </FormField>
          </div>
        </div>

        {/* 4. Carrière & Finance */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-border pb-3">
            <Briefcase size={18} />
            <span>Carrière & Finance</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField label="Poste / Intitulé" id="new-position">
              <input
                id="new-position"
                type="text"
                value={form.position}
                onChange={(e) => set("position", e.target.value)}
                className={inputClass}
                placeholder="Consultant RH"
              />
            </FormField>

            <FormField label="Rôle RH" id="new-hr-role" required>
              <select
                id="new-hr-role"
                value={form.hr_role}
                onChange={(e) => set("hr_role", e.target.value as HRRole)}
                className={selectClass}
              >
                {Object.values(HRRole).map((r) => (
                  <option key={r} value={r}>
                    {hrRoleLabels[r]}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Département" id="new-department">
              <select
                id="new-department"
                value={form.department_id !== undefined ? String(form.department_id) : ""}
                onChange={(e) => set("department_id", e.target.value ? Number(e.target.value) : 0)}
                className={selectClass}
              >
                <option value={0}>Sélectionner un département</option>
                {departments?.map((d) => (
                  <option key={String(d.id)} value={String(d.id)}>
                    {d.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Manager direct" id="new-manager">
              <select
                id="new-manager"
                value={form.manager_id !== undefined ? String(form.manager_id) : ""}
                onChange={(e) => set("manager_id", e.target.value ? Number(e.target.value) : undefined)}
                className={selectClass}
              >
                <option value="">Aucun manager</option>
                {employees?.map((emp) => (
                  <option key={String(emp.id)} value={String(emp.id)}>
                    {emp.first_name} {emp.last_name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Type de contrat" id="new-contract-type" required>
              <select
                id="new-contract-type"
                value={form.contract_type}
                onChange={(e) => set("contract_type", e.target.value as ContractType)}
                className={selectClass}
              >
                {Object.values(ContractType).map((c) => (
                  <option key={c} value={c}>
                    {contractLabels[c]}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Date d'embauche" id="new-hire-date">
              <input
                id="new-hire-date"
                type="date"
                value={form.hire_date}
                onChange={(e) => set("hire_date", e.target.value)}
                className={inputClass}
              />
            </FormField>

            <FormField label="Début du contrat" id="new-contract-start">
              <input
                id="new-contract-start"
                type="date"
                value={form.contract_start}
                onChange={(e) => set("contract_start", e.target.value)}
                className={inputClass}
              />
            </FormField>

            <FormField label="Salaire de base (FCFA)" id="new-base-salary">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="new-base-salary"
                  type="number"
                  value={form.base_salary}
                  onChange={(e) => set("base_salary", parseInt(e.target.value) || 0)}
                  className={inputClass + " pl-10"}
                />
              </div>
            </FormField>

            <FormField label="Dernier diplôme" id="new-diploma">
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="new-diploma"
                  type="text"
                  value={form.diploma}
                  onChange={(e) => set("diploma", e.target.value)}
                  className={inputClass + " pl-10"}
                  placeholder="Master en RH"
                />
              </div>
            </FormField>

            <FormField label="Statut" id="new-status" required>
              <select
                id="new-status"
                value={form.status}
                onChange={(e) => set("status", e.target.value as EmploymentStatus)}
                className={selectClass}
              >
                <option value={EmploymentStatus.Active}>Actif</option>
                <option value={EmploymentStatus.Inactive}>Inactif</option>
                <option value={EmploymentStatus.OnLeave}>Suspendu</option>
              </select>
            </FormField>
          </div>
        </div>

        {/* 5. Sécurité & Légal */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-primary font-semibold border-b border-border pb-3">
            <Shield size={18} />
            <span>Sécurité & Légal</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField label="Type de document" id="new-id-card-type">
              <select
                id="new-id-card-type"
                value={form.id_card_type}
                onChange={(e) => set("id_card_type", e.target.value)}
                className={selectClass}
              >
                <option value="Passeport">Passeport</option>
                <option value="CNI">Carte d'identité nationale</option>
                <option value="Permis">Permis de conduire</option>
              </select>
            </FormField>

            <FormField label="Numéro d'identité" id="new-id-card-number">
              <input
                id="new-id-card-number"
                type="text"
                value={form.id_card_number}
                onChange={(e) => set("id_card_number", e.target.value)}
                className={inputClass}
                placeholder="AB123456"
              />
            </FormField>

            <FormField label="Date d'expiration" id="new-id-card-expiry">
              <input
                id="new-id-card-expiry"
                type="date"
                value={form.id_card_expiry}
                onChange={(e) => set("id_card_expiry", e.target.value)}
                className={inputClass}
              />
            </FormField>

            <FormField label="Contact d'urgence" id="new-emergency-name">
              <input
                id="new-emergency-name"
                type="text"
                value={form.emergency_contact_name}
                onChange={(e) => set("emergency_contact_name", e.target.value)}
                className={inputClass}
                placeholder="Nom du contact"
              />
            </FormField>

            <FormField label="Relation" id="new-emergency-relation">
              <input
                id="new-emergency-relation"
                type="text"
                value={form.emergency_contact_relation}
                onChange={(e) => set("emergency_contact_relation", e.target.value)}
                className={inputClass}
                placeholder="Père, Conjoint..."
              />
            </FormField>

            <FormField label="Téléphone d'urgence" id="new-emergency-phone">
              <input
                id="new-emergency-phone"
                type="tel"
                value={form.emergency_contact_phone}
                onChange={(e) => set("emergency_contact_phone", e.target.value)}
                className={inputClass}
                placeholder="+229 00 00 00 00"
              />
            </FormField>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-5 bg-background/80 backdrop-blur-md p-4 border border-border rounded-xl sticky bottom-4 z-10 shadow-lg">
          <Link to="/rh-employees">
            <Button type="button" variant="outline">
              Annuler
            </Button>
          </Link>
          <Button
            type="submit"
            loading={mutation.isPending}
            icon={mutation.isPending ? undefined : <Upload size={14} />}
            className="min-w-[200px]"
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
