import { c as createLucideIcon, d as useNavigate, u as useQueryClient, r as reactExports, j as jsxRuntimeExports, L as Link, X } from "./index-C9_e_yR_.js";
import { u as useBackend, a as useQuery, E as EmploymentStatus, C as ContractType, H as HRRole, P as PageHeader, b as ExternalBlob } from "./use-backend-Pu7zigIS.js";
import { u as useMutation, B as Button, a as ue } from "./index-DoCTDkKg.js";
import { A as ArrowLeft } from "./arrow-left-CdLuYVY7.js";
import { C as Camera } from "./camera-XjxqUmuM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-colors disabled:opacity-50";
const inputErrorClass = "w-full rounded-lg border border-destructive bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/40 transition-colors";
const hrRoleLabels = {
  [HRRole.HRAdmin]: "HR Admin",
  [HRRole.HRManager]: "HR Manager",
  [HRRole.Manager]: "Manager",
  [HRRole.Employee]: "Employee",
  [HRRole.Direction]: "Direction"
};
const contractLabels = {
  [ContractType.CDI]: "CDI — Permanent",
  [ContractType.CDD]: "CDD — Fixed Term",
  [ContractType.Internship]: "Internship",
  [ContractType.PartTime]: "Part-Time",
  [ContractType.Freelance]: "Freelance"
};
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function NewEmployeePage() {
  var _a;
  const navigate = useNavigate();
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const fileInputRef = reactExports.useRef(null);
  const departments = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.listDepartments();
    },
    enabled: !!actor && !isFetching
  });
  const [form, setForm] = reactExports.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hrRole: HRRole.Employee,
    contractType: ContractType.CDI,
    status: EmploymentStatus.Active,
    departmentId: void 0
  });
  const [errors, setErrors] = reactExports.useState({});
  const [avatarFile, setAvatarFile] = reactExports.useState(null);
  const [avatarPreview, setAvatarPreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      errs.email = "Enter a valid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleFileChange = (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Image must be smaller than 5 MB");
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
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const mutation = useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("No actor");
      const employee = await actor.createEmployee(input);
      if (avatarFile) {
        const bytes = new Uint8Array(await avatarFile.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
          (pct) => setUploadProgress(pct)
        );
        await actor.setEmployeeProfilePicture(employee.id, blob);
      }
      return employee;
    },
    onSuccess: (employee) => {
      ue.success(
        `${employee.firstName} ${employee.lastName} added successfully`
      );
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      navigate({ to: "/employees/$id", params: { id: String(employee.id) } });
    },
    onError: () => ue.error("Failed to create employee")
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };
  const initials = `${form.firstName[0] ?? ""}${form.lastName[0] ?? ""}`.toUpperCase() || "?";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "new_employee.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Add Employee",
        subtitle: "Fill in the details to create a new employee record",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/employees", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }), size: "sm", children: "Back" }) })
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
              "Profile Picture",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 font-normal text-muted-foreground text-xs", children: "(optional)" })
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
                      avatarFile ? "Change photo" : "Upload photo"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "JPG, PNG or WebP · max 5 MB" }),
                avatarFile && mutation.isPending && uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-primary rounded-full transition-all",
                      style: { width: `${uploadProgress}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    "Uploading… ",
                    uploadProgress,
                    "%"
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-6 space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                label: "First Name",
                id: "new-first-name",
                required: true,
                error: errors.firstName,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "new-first-name",
                    type: "text",
                    value: form.firstName,
                    onChange: (e) => {
                      set("firstName", e.target.value);
                      if (errors.firstName)
                        setErrors((err) => ({ ...err, firstName: void 0 }));
                    },
                    onBlur: () => {
                      if (!form.firstName.trim())
                        setErrors((err) => ({
                          ...err,
                          firstName: "First name is required"
                        }));
                    },
                    className: errors.firstName ? inputErrorClass : inputClass,
                    placeholder: "John",
                    "data-ocid": "new_employee.first_name_input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                label: "Last Name",
                id: "new-last-name",
                required: true,
                error: errors.lastName,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "new-last-name",
                    type: "text",
                    value: form.lastName,
                    onChange: (e) => {
                      set("lastName", e.target.value);
                      if (errors.lastName)
                        setErrors((err) => ({ ...err, lastName: void 0 }));
                    },
                    onBlur: () => {
                      if (!form.lastName.trim())
                        setErrors((err) => ({
                          ...err,
                          lastName: "Last name is required"
                        }));
                    },
                    className: errors.lastName ? inputErrorClass : inputClass,
                    placeholder: "Doe",
                    "data-ocid": "new_employee.last_name_input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FormField,
              {
                label: "Email",
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
                          email: "Email is required"
                        }));
                      } else if (!validateEmail(form.email)) {
                        setErrors((err) => ({
                          ...err,
                          email: "Enter a valid email address"
                        }));
                      }
                    },
                    className: errors.email ? inputErrorClass : inputClass,
                    placeholder: "john.doe@ices.com",
                    "data-ocid": "new_employee.email_input"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Phone", id: "new-phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "new-phone",
                type: "tel",
                value: form.phone,
                onChange: (e) => set("phone", e.target.value),
                className: inputClass,
                placeholder: "+1 555 000 0000",
                "data-ocid": "new_employee.phone_input"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "HR Role", id: "new-hr-role", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "new-hr-role",
                value: form.hrRole,
                onChange: (e) => set("hrRole", e.target.value),
                className: inputClass,
                "data-ocid": "new_employee.role_select",
                children: Object.values(HRRole).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: hrRoleLabels[r] }, r))
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Contract Type", id: "new-contract-type", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "new-contract-type",
                value: form.contractType,
                onChange: (e) => set("contractType", e.target.value),
                className: inputClass,
                "data-ocid": "new_employee.contract_select",
                children: Object.values(ContractType).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: contractLabels[c] }, c))
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Status", id: "new-status", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "new-status",
                value: form.status,
                onChange: (e) => set("status", e.target.value),
                className: inputClass,
                "data-ocid": "new_employee.status_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.Active, children: "Active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.Inactive, children: "Inactive" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: EmploymentStatus.OnLeave, children: "On Leave" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Department", id: "new-department", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "new-department",
                value: form.departmentId !== void 0 ? String(form.departmentId) : "",
                onChange: (e) => set(
                  "departmentId",
                  e.target.value ? BigInt(e.target.value) : void 0
                ),
                className: inputClass,
                "data-ocid": "new_employee.department_select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No department" }),
                  (_a = departments.data) == null ? void 0 : _a.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(d.id), children: d.name }, String(d.id)))
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/employees", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                "data-ocid": "new_employee.cancel_button",
                children: "Cancel"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                loading: mutation.isPending,
                icon: mutation.isPending ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 14 }),
                "data-ocid": "new_employee.submit_button",
                children: mutation.isPending ? "Creating…" : "Create Employee"
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
