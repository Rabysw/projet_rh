import { p as useParams, f as useNavigate, n as useQueryClient, r as reactExports, j as jsxRuntimeExports, q as LoadingSpinner, L as Link, o as apiClient } from "./index-Wq93vx8q.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { E as ErrorMessage } from "./ErrorMessage-DN9KnOIR.js";
import { P as PageHeader } from "./PageHeader-BvZCSHtX.js";
import { u as useQuery, E as EmploymentStatus, C as ContractType, H as HRRole, a as useMutation, b as Camera } from "./api-COSrK3Vf.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { A as ArrowLeft } from "./arrow-left-BNPpw59r.js";
import { X } from "./x-DJ1ld1ug.js";
import { S as Save } from "./save-BN_4S-yH.js";
import "./circle-alert-Cb00aeSX.js";
import "./refresh-cw-CGHREE1Q.js";
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
function EditEmployeePage() {
  const { id } = useParams({ from: "/protected/rh-employees/$id/edit" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = reactExports.useRef(null);
  const {
    data: employee,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => apiClient(`/employees/${id}/`),
    enabled: !!id
  });
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
  reactExports.useEffect(() => {
    if (employee) {
      setForm({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone || "",
        hr_role: employee.hr_role,
        contract_type: employee.contract_type,
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
        base_salary: employee.base_salary
      });
      if (employee.profile_picture) {
        setAvatarPreview(employee.profile_picture.url);
      }
    }
  }, [employee]);
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
    setAvatarPreview(
      (employee == null ? void 0 : employee.profile_picture) ? employee.profile_picture.url : null
    );
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const mutation = useMutation({
    mutationFn: async (input) => {
      const updated = await apiClient(`/employees/${id}/`, {
        method: "PUT",
        body: JSON.stringify(input)
      });
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        await apiClient(`/employees/${id}/profile-picture`, {
          method: "POST",
          body: formData
        });
      }
      return updated;
    },
    onSuccess: () => {
      ue.success("Collaborateur mis à jour avec succès");
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      navigate({ to: "/rh-employees/$id", params: { id: String(id) } });
    },
    onError: (err) => ue.error(`Échec de la mise à jour : ${err.message}`)
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }) });
  if (isError || !employee) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { title: "Collaborateur non trouvé" });
  const initials = `${form.first_name[0] ?? ""}${form.last_name[0] ?? ""}`.toUpperCase() || `${employee.first_name[0]}${employee.last_name[0]}`.toUpperCase();
  const hasNewAvatar = avatarFile !== null;
  const existingAvatarUrl = employee.profile_picture ? employee.profile_picture.url : null;
  const showRemoveBtn = hasNewAvatar || avatarPreview !== null && avatarPreview !== existingAvatarUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "edit_employee.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: `Modifier : ${employee.first_name} ${employee.last_name}`,
        subtitle: "Mettre à jour les détails du collaborateur",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rh-employees/$id", params: { id: String(id) }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }), size: "sm", children: "Retour" }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        noValidate: true,
        className: "max-w-2xl",
        "data-ocid": "edit_employee.form",
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
                showRemoveBtn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: removeAvatar,
                    className: "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors",
                    "aria-label": "Remove photo",
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
                    id: "edit-avatar-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "edit-avatar-input",
                    className: "inline-flex items-center gap-2 cursor-pointer rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 14 }),
                      hasNewAvatar ? "Changer la photo" : "Télécharger une photo"
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
                id: "edit-first-name",
                required: true,
                error: errors.first_name,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "edit-first-name",
                    type: "text",
                    value: form.first_name,
                    onChange: (e) => {
                      set("first_name", e.target.value);
                      if (errors.first_name)
                        setErrors((err) => ({ ...err, first_name: void 0 }));
                    },
                    className: errors.first_name ? inputErrorClass : inputClass
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                label: "Nom",
                id: "edit-last-name",
                required: true,
                error: errors.last_name,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "edit-last-name",
                    type: "text",
                    value: form.last_name,
                    onChange: (e) => {
                      set("last_name", e.target.value);
                      if (errors.last_name)
                        setErrors((err) => ({ ...err, last_name: void 0 }));
                    },
                    className: errors.last_name ? inputErrorClass : inputClass
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                label: "E-mail",
                id: "edit-email",
                required: true,
                error: errors.email,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "edit-email",
                    type: "email",
                    value: form.email,
                    onChange: (e) => {
                      set("email", e.target.value);
                      if (errors.email)
                        setErrors((err) => ({ ...err, email: void 0 }));
                    },
                    className: errors.email ? inputErrorClass : inputClass
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Téléphone", id: "edit-phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "edit-phone",
                type: "tel",
                value: form.phone,
                onChange: (e) => set("phone", e.target.value),
                className: inputClass
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Rôle RH", id: "edit-hr-role", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "edit-hr-role",
                value: form.hr_role,
                onChange: (e) => set("hr_role", e.target.value),
                className: inputClass,
                children: Object.values(HRRole).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: hrRoleLabels[r] }, r))
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Type de contrat", id: "edit-contract-type", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "edit-contract-type",
                value: form.contract_type,
                onChange: (e) => set("contract_type", e.target.value),
                className: inputClass,
                children: Object.values(ContractType).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: contractLabels[c] }, c))
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Statut", id: "edit-status", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "edit-status",
                value: form.status,
                onChange: (e) => set("status", e.target.value),
                className: inputClass,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.Active, children: "Actif" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.Inactive, children: "Inactif" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.OnLeave, children: "Suspendu" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Département", id: "edit-department", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "edit-department",
                value: form.department_id !== void 0 ? String(form.department_id) : "",
                onChange: (e) => set(
                  "department_id",
                  e.target.value ? Number(e.target.value) : 0
                ),
                className: inputClass,
                "data-ocid": "edit_employee.department_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 0, children: "Sélectionner un département" }),
                  departments == null ? void 0 : departments.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(d.id), children: d.name }, String(d.id)))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rh-employees/$id", params: { id: String(id) }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                "data-ocid": "edit_employee.cancel_button",
                children: "Annuler"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                loading: mutation.isPending,
                icon: mutation.isPending ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
                children: mutation.isPending ? "Enregistrement..." : "Enregistrer"
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
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", role: "alert", children: error })
  ] });
}
export {
  EditEmployeePage as default
};
