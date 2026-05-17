import { f as useNavigate, o as useQueryClient, r as reactExports, a as useApi, j as jsxRuntimeExports, L as Link, p as User, i as Briefcase, S as Shield, q as apiClient } from "./index-BeBYdaDm.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { P as PageHeader } from "./PageHeader-Bvv3XKgY.js";
import { u as useQuery, E as EmploymentStatus, C as ContractType, H as HRRole, a as useMutation, b as Camera } from "./api-DVzE5MB8.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { A as ArrowLeft } from "./arrow-left-BOPWx_Ak.js";
import { X } from "./x-Cq3J5Kxv.js";
import { K as Key } from "./key-Dbp4pecK.js";
import { H as Heart } from "./heart-Ba1B3Xo4.js";
import { P as Phone } from "./phone-B55e_yDP.js";
import { D as DollarSign } from "./dollar-sign-CV6nWGBO.js";
import { G as GraduationCap } from "./graduation-cap-BdE0xvXl.js";
import { U as Upload } from "./upload-BnxiadBF.js";
import "./index-DPpzsANr.js";
const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors disabled:opacity-50";
const selectClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors disabled:opacity-50";
const inputErrorClass = "w-full rounded-lg border border-destructive bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/40 transition-colors";
const hrRoleLabels = {
  [HRRole.HRAdmin]: "Administrateur RH",
  [HRRole.HRManager]: "Gestionnaire RH",
  [HRRole.Manager]: "Manager",
  [HRRole.Employee]: "Collaborateur",
  [HRRole.Direction]: "Direction"
};
const contractLabels = {
  [ContractType.CDI]: "CDI",
  [ContractType.CDD]: "CDD",
  [ContractType.Internship]: "Stage / Alternance",
  [ContractType.PartTime]: "Consultant",
  [ContractType.Freelance]: "Freelance"
};
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function NewEmployeePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = reactExports.useRef(null);
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => apiClient("/departments/")
  });
  const [form, setForm] = reactExports.useState({
    // Accès & Identité de base
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    // Nouveau champ pour le compte système
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
    manager_id: void 0,
    contract_type: ContractType.CDI,
    contract_start: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    contract_end: "",
    hire_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
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
    status: EmploymentStatus.Active
  });
  const [errors, setErrors] = reactExports.useState({});
  const [avatarFile, setAvatarFile] = reactExports.useState(null);
  const [avatarPreview, setAvatarPreview] = reactExports.useState(null);
  const { data: managers } = useApi("/api/v1/resp-rh/managers");
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const validate = () => {
    const errs = {};
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
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Veuillez sélectionner un fichier image valide");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("L'image doit être plus petite que 5 MB");
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };
  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const mutation = useMutation({
    mutationFn: async (input) => {
      const employee = await apiClient("/employees/", {
        method: "POST",
        body: JSON.stringify(input)
      });
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        await apiClient(`/employees/${employee.id}/profile-picture`, {
          method: "POST",
          body: formData
        });
      }
      return employee;
    },
    onSuccess: (employee) => {
      ue.success(
        `${employee.first_name} ${employee.last_name} a été créé avec succès`
      );
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      navigate({ to: "/rh-employees/$id", params: { id: String(employee.id) } });
    },
    onError: (err) => ue.error(`Échec de la création : ${err.message}`)
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };
  const initials = `${form.first_name[0] ?? ""}${form.last_name[0] ?? ""}`.toUpperCase() || "?";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "new_employee.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Ajouter un collaborateur",
        subtitle: "Remplissez les détails pour créer un nouveau dossier collaborateur",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rh-employees", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }), size: "sm", children: "Retour" }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        noValidate: true,
        className: "max-w-4xl space-y-6 pb-20",
        "data-ocid": "new_employee.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 16, className: "text-primary" }),
              "Photo de profil",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 font-normal text-muted-foreground text-xs", children: "(optionnel)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                avatarPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: avatarPreview,
                    alt: "Preview",
                    className: "w-20 h-20 rounded-full object-cover border-2 border-border"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/15 text-primary flex items-center justify-center font-display font-bold text-2xl border-2 border-border", children: initials }),
                avatarPreview && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: removeAvatar,
                    className: "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors",
                    "aria-label": "Remove photo",
                    "data-ocid": "new_employee.remove_avatar_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: "image/*",
                    onChange: handleFileChange,
                    className: "hidden",
                    id: "new-avatar-input",
                    "data-ocid": "new_employee.avatar_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "new-avatar-input",
                    className: "inline-flex items-center gap-2 cursor-pointer rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors",
                    "data-ocid": "new_employee.upload_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 14 }),
                      avatarFile ? "Changer la photo" : "Télécharger une photo"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "JPG, PNG ou WebP · max 5 MB" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold border-b border-border pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "État Civil & Identité" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Prénom", id: "new-first-name", required: true, error: errors.first_name, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-first-name",
                  type: "text",
                  value: form.first_name,
                  onChange: (e) => {
                    set("first_name", e.target.value);
                    if (errors.first_name) setErrors((err) => ({ ...err, first_name: void 0 }));
                  },
                  onBlur: () => {
                    if (!form.first_name.trim())
                      setErrors((err) => ({ ...err, first_name: "Le prénom est requis" }));
                  },
                  className: errors.first_name ? inputErrorClass : inputClass,
                  placeholder: "Jean"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Nom", id: "new-last-name", required: true, error: errors.last_name, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-last-name",
                  type: "text",
                  value: form.last_name,
                  onChange: (e) => {
                    set("last_name", e.target.value);
                    if (errors.last_name) setErrors((err) => ({ ...err, last_name: void 0 }));
                  },
                  onBlur: () => {
                    if (!form.last_name.trim())
                      setErrors((err) => ({ ...err, last_name: "Le nom est requis" }));
                  },
                  className: errors.last_name ? inputErrorClass : inputClass,
                  placeholder: "Dupont"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(FormField, { label: "Mot de passe (Accès système)", id: "new-password", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "new-password",
                      type: "password",
                      value: form.password,
                      onChange: (e) => set("password", e.target.value),
                      className: inputClass + " pl-10",
                      placeholder: "Laisser vide pour : Ices2026!"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Ce mot de passe permettra au collaborateur de se connecter." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Genre", id: "new-gender", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "new-gender",
                  value: form.gender,
                  onChange: (e) => set("gender", e.target.value),
                  className: selectClass,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "M", children: "Masculin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "F", children: "Féminin" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Date de naissance", id: "new-birth-date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-birth-date",
                  type: "date",
                  value: form.birth_date,
                  onChange: (e) => set("birth_date", e.target.value),
                  className: inputClass
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Lieu de naissance", id: "new-birth-place", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-birth-place",
                  type: "text",
                  value: form.birth_place,
                  onChange: (e) => set("birth_place", e.target.value),
                  className: inputClass,
                  placeholder: "Cotonou"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Nationalité", id: "new-nationality", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-nationality",
                  type: "text",
                  value: form.nationality,
                  onChange: (e) => set("nationality", e.target.value),
                  className: inputClass,
                  placeholder: "Béninoise"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold border-b border-border pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 18 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Situation Familiale" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Situation matrimoniale", id: "new-marital-status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "new-marital-status",
                  value: form.marital_status,
                  onChange: (e) => set("marital_status", e.target.value),
                  className: selectClass,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Célibataire", children: "Célibataire" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Marié(e)", children: "Marié(e)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Divorcé(e)", children: "Divorcé(e)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Veuf(ve)", children: "Veuf(ve)" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Nombre d'enfants", id: "new-children-count", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-children-count",
                  type: "number",
                  min: "0",
                  value: form.children_count,
                  onChange: (e) => set("children_count", parseInt(e.target.value) || 0),
                  className: inputClass
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold border-b border-border pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Coordonnées & Contact" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Téléphone professionnel", id: "new-phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-phone",
                  type: "tel",
                  value: form.phone,
                  onChange: (e) => set("phone", e.target.value),
                  className: inputClass,
                  placeholder: "+229 00 00 00 00"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Téléphone personnel", id: "new-personal-phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-personal-phone",
                  type: "tel",
                  value: form.personal_phone,
                  onChange: (e) => set("personal_phone", e.target.value),
                  className: inputClass,
                  placeholder: "+229 00 00 00 00"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "E-mail principal", id: "new-email", required: true, error: errors.email, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-email",
                  type: "email",
                  value: form.email,
                  onChange: (e) => {
                    set("email", e.target.value);
                    if (errors.email) setErrors((err) => ({ ...err, email: void 0 }));
                  },
                  onBlur: () => {
                    if (!form.email.trim()) {
                      setErrors((err) => ({ ...err, email: "L'e-mail est requis" }));
                    } else if (!validateEmail(form.email)) {
                      setErrors((err) => ({ ...err, email: "Veuillez entrer une adresse e-mail valide" }));
                    }
                  },
                  className: errors.email ? inputErrorClass : inputClass,
                  placeholder: "jean.dupont@ices.com"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "E-mail personnel", id: "new-personal-email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-personal-email",
                  type: "email",
                  value: form.personal_email,
                  onChange: (e) => set("personal_email", e.target.value),
                  className: inputClass,
                  placeholder: "jean.dupont@gmail.com"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Lieu de travail", id: "new-work-location", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-work-location",
                  type: "text",
                  value: form.work_location,
                  onChange: (e) => set("work_location", e.target.value),
                  className: inputClass,
                  placeholder: "Siège / Agence..."
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Adresse de résidence", id: "new-address", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "new-address",
                  value: form.address,
                  onChange: (e) => set("address", e.target.value),
                  className: inputClass + " min-h-[80px] sm:col-span-2",
                  placeholder: "Cotonou, quartier..."
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold border-b border-border pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 18 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Carrière & Finance" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Poste / Intitulé", id: "new-position", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-position",
                  type: "text",
                  value: form.position,
                  onChange: (e) => set("position", e.target.value),
                  className: inputClass,
                  placeholder: "Consultant RH"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Rôle RH", id: "new-hr-role", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  id: "new-hr-role",
                  value: form.hr_role,
                  onChange: (e) => set("hr_role", e.target.value),
                  className: selectClass,
                  children: Object.values(HRRole).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: hrRoleLabels[r] }, r))
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Département", id: "new-department", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "new-department",
                  value: form.department_id !== void 0 ? String(form.department_id) : "",
                  onChange: (e) => set("department_id", e.target.value ? Number(e.target.value) : 0),
                  className: selectClass,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 0, children: "Sélectionner un département" }),
                    departments == null ? void 0 : departments.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(d.id), children: d.name }, String(d.id)))
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Manager direct", id: "new-manager", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "new-manager",
                  value: form.manager_id !== void 0 ? String(form.manager_id) : "",
                  onChange: (e) => set("manager_id", e.target.value ? Number(e.target.value) : void 0),
                  className: selectClass,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Aucun manager" }),
                    managers == null ? void 0 : managers.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: String(m.id), children: [
                      m.first_name,
                      " ",
                      m.last_name
                    ] }, String(m.id)))
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Type de contrat", id: "new-contract-type", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  id: "new-contract-type",
                  value: form.contract_type,
                  onChange: (e) => set("contract_type", e.target.value),
                  className: selectClass,
                  children: Object.values(ContractType).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: contractLabels[c] }, c))
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Date d'embauche", id: "new-hire-date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-hire-date",
                  type: "date",
                  value: form.hire_date,
                  onChange: (e) => set("hire_date", e.target.value),
                  className: inputClass
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Début du contrat", id: "new-contract-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-contract-start",
                  type: "date",
                  value: form.contract_start,
                  onChange: (e) => set("contract_start", e.target.value),
                  className: inputClass
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Salaire de base (FCFA)", id: "new-base-salary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "new-base-salary",
                    type: "text",
                    value: form.base_salary === 0 ? "" : form.base_salary,
                    onChange: (e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      set("base_salary", val === "" ? 0 : parseInt(val));
                    },
                    className: inputClass + " pl-10",
                    placeholder: "0"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Dernier diplôme", id: "new-diploma", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "new-diploma",
                    type: "text",
                    value: form.diploma,
                    onChange: (e) => set("diploma", e.target.value),
                    className: inputClass + " pl-10",
                    placeholder: "Master en RH"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Statut", id: "new-status", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "new-status",
                  value: form.status,
                  onChange: (e) => set("status", e.target.value),
                  className: selectClass,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.Active, children: "Actif" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.Inactive, children: "Inactif" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.OnLeave, children: "Suspendu" })
                  ]
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-sm space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold border-b border-border pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sécurité & Légal" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Type de document", id: "new-id-card-type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "new-id-card-type",
                  value: form.id_card_type,
                  onChange: (e) => set("id_card_type", e.target.value),
                  className: selectClass,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Passeport", children: "Passeport" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CNI", children: "Carte d'identité nationale" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Permis", children: "Permis de conduire" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Numéro d'identité", id: "new-id-card-number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-id-card-number",
                  type: "text",
                  value: form.id_card_number,
                  onChange: (e) => set("id_card_number", e.target.value),
                  className: inputClass,
                  placeholder: "AB123456"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Date d'expiration", id: "new-id-card-expiry", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-id-card-expiry",
                  type: "date",
                  value: form.id_card_expiry,
                  onChange: (e) => set("id_card_expiry", e.target.value),
                  className: inputClass
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Contact d'urgence", id: "new-emergency-name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-emergency-name",
                  type: "text",
                  value: form.emergency_contact_name,
                  onChange: (e) => set("emergency_contact_name", e.target.value),
                  className: inputClass,
                  placeholder: "Nom du contact"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Relation", id: "new-emergency-relation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-emergency-relation",
                  type: "text",
                  value: form.emergency_contact_relation,
                  onChange: (e) => set("emergency_contact_relation", e.target.value),
                  className: inputClass,
                  placeholder: "Père, Conjoint..."
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Téléphone d'urgence", id: "new-emergency-phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "new-emergency-phone",
                  type: "tel",
                  value: form.emergency_contact_phone,
                  onChange: (e) => set("emergency_contact_phone", e.target.value),
                  className: inputClass,
                  placeholder: "+229 00 00 00 00"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-5 bg-background/80 backdrop-blur-md p-4 border border-border rounded-xl sticky bottom-4 z-10 shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rh-employees", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", children: "Annuler" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                loading: mutation.isPending,
                icon: mutation.isPending ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14 }),
                className: "min-w-[200px]",
                children: mutation.isPending ? "Création..." : "Créer le collaborateur"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function FormField({
  label,
  required,
  children,
  error,
  id
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: id, className: "text-sm font-medium text-foreground", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
    ] }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-destructive",
        role: "alert",
        "data-ocid": "new_employee.field_error",
        children: error
      }
    )
  ] });
}
export {
  NewEmployeePage as default
};
