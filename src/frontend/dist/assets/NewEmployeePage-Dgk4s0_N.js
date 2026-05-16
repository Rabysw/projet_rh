import { f as useNavigate, n as useQueryClient, r as reactExports, j as jsxRuntimeExports, L as Link, o as apiClient } from "./index-Wq93vx8q.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { P as PageHeader } from "./PageHeader-BvZCSHtX.js";
import { u as useQuery, E as EmploymentStatus, C as ContractType, H as HRRole, a as useMutation, b as Camera } from "./api-COSrK3Vf.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { A as ArrowLeft } from "./arrow-left-BNPpw59r.js";
import { X } from "./x-DJ1ld1ug.js";
import { U as Upload } from "./upload-CicyoMpF.js";
const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors disabled:opacity-50";
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
    base_salary: 0
  });
  const [errors, setErrors] = reactExports.useState({});
  const [avatarFile, setAvatarFile] = reactExports.useState(null);
  const [avatarPreview, setAvatarPreview] = reactExports.useState(null);
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
        className: "max-w-2xl",
        "data-ocid": "new_employee.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground mb-4", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-6 space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                label: "Prénom",
                id: "new-first-name",
                required: true,
                error: errors.first_name,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "new-first-name",
                    type: "text",
                    value: form.first_name,
                    onChange: (e) => {
                      set("first_name", e.target.value);
                      if (errors.first_name)
                        setErrors((err) => ({ ...err, first_name: void 0 }));
                    },
                    onBlur: () => {
                      if (!form.first_name.trim())
                        setErrors((err) => ({
                          ...err,
                          first_name: "Le prénom est requis"
                        }));
                    },
                    className: errors.first_name ? inputErrorClass : inputClass,
                    placeholder: "Jean",
                    "data-ocid": "new_employee.first_name_input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                label: "Nom",
                id: "new-last-name",
                required: true,
                error: errors.last_name,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "new-last-name",
                    type: "text",
                    value: form.last_name,
                    onChange: (e) => {
                      set("last_name", e.target.value);
                      if (errors.last_name)
                        setErrors((err) => ({ ...err, last_name: void 0 }));
                    },
                    onBlur: () => {
                      if (!form.last_name.trim())
                        setErrors((err) => ({
                          ...err,
                          last_name: "Le nom est requis"
                        }));
                    },
                    className: errors.last_name ? inputErrorClass : inputClass,
                    placeholder: "Dupont",
                    "data-ocid": "new_employee.last_name_input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                label: "E-mail",
                id: "new-email",
                required: true,
                error: errors.email,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "new-email",
                    type: "email",
                    value: form.email,
                    onChange: (e) => {
                      set("email", e.target.value);
                      if (errors.email)
                        setErrors((err) => ({ ...err, email: void 0 }));
                    },
                    onBlur: () => {
                      if (!form.email.trim()) {
                        setErrors((err) => ({
                          ...err,
                          email: "L'e-mail est requis"
                        }));
                      } else if (!validateEmail(form.email)) {
                        setErrors((err) => ({
                          ...err,
                          email: "Veuillez entrer une adresse e-mail valide"
                        }));
                      }
                    },
                    className: errors.email ? inputErrorClass : inputClass,
                    placeholder: "jean.dupont@ices.com",
                    "data-ocid": "new_employee.email_input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Téléphone", id: "new-phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "new-phone",
                type: "tel",
                value: form.phone,
                onChange: (e) => set("phone", e.target.value),
                className: inputClass,
                placeholder: "+229 XXXXXXXX",
                "data-ocid": "new_employee.phone_input"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Rôle RH", id: "new-hr-role", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "new-hr-role",
                value: form.hr_role,
                onChange: (e) => set("hr_role", e.target.value),
                className: inputClass,
                "data-ocid": "new_employee.role_select",
                children: Object.values(HRRole).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: hrRoleLabels[r] }, r))
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Type de contrat", id: "new-contract-type", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "new-contract-type",
                value: form.contract_type,
                onChange: (e) => set("contract_type", e.target.value),
                className: inputClass,
                "data-ocid": "new_employee.contract_select",
                children: Object.values(ContractType).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: contractLabels[c] }, c))
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Statut", id: "new-status", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "new-status",
                value: form.status,
                onChange: (e) => set("status", e.target.value),
                className: inputClass,
                "data-ocid": "new_employee.status_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.Active, children: "Actif" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.Inactive, children: "Inactif" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.OnLeave, children: "Suspendu" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Département", id: "new-department", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "new-department",
                value: form.department_id !== void 0 ? String(form.department_id) : "",
                onChange: (e) => set(
                  "department_id",
                  e.target.value ? Number(e.target.value) : 0
                ),
                className: inputClass,
                "data-ocid": "new_employee.department_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 0, children: "Sélectionner un département" }),
                  departments == null ? void 0 : departments.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(d.id), children: d.name }, String(d.id)))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rh-employees", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                "data-ocid": "new_employee.cancel_button",
                children: "Annuler"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                loading: mutation.isPending,
                icon: mutation.isPending ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14 }),
                "data-ocid": "new_employee.submit_button",
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
