import { c as createLucideIcon, a0 as clsx, j as jsxRuntimeExports, Y as cn, r as reactExports, f as useNavigate, l as useCompanyConfig, U as Users, C as Calendar } from "./index-Wq93vx8q.js";
import { S as Slot } from "./index-DXWCajUK.js";
import { I as Input } from "./input-Dqi26IOG.js";
import { d as Card, C as CardHeader, a as CardTitle, c as CardDescription, b as CardContent } from "./card-CVnFq3EB.js";
import { P as Plus } from "./plus-CMUzI6kD.js";
import { X } from "./x-DJ1ld1ug.js";
import { B as Building2 } from "./building-2-o4immZy8.js";
import { C as CircleCheck } from "./circle-check-DtBxltuf.js";
import "./index-Bu-Umka4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const ALL_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
function SetupPage() {
  const [step, setStep] = reactExports.useState(1);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const navigate = useNavigate();
  const { refreshConfig } = useCompanyConfig();
  const [formData, setFormData] = reactExports.useState({
    // Étape 1 — Entreprise
    company_name: "",
    primary_color: "#3b82f6",
    country: "Bénin",
    currency: "XOF",
    phone_prefix: "+229",
    timezone: "Africa/Porto-Novo",
    // Étape 2 — Structure
    departments: [],
    job_titles: [],
    dept_input: "",
    job_input: "",
    // Étape 3 — Calendrier
    working_days: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
    working_hours_start: "08:00",
    working_hours_end: "17:00",
    // Étape 4 — Politiques RH
    leave_days_per_year: 24,
    leave_carry_over_max: 5,
    probation_duration_days: 90,
    contract_alert_days: 30,
    late_alert_threshold_minutes: 15,
    late_count_alert_per_month: 3,
    document_expiry_alert_days: 60,
    medical_visit_alert_days: 30,
    overtime_threshold_hours: 8,
    leave_types: ["Congé payé", "Maladie", "Sans solde", "Maternité", "Paternité", "Exceptionnel"],
    // Étape 5 - Jours fériés
    holidays_input_date: "",
    holidays_input_name: "",
    public_holidays: []
  });
  const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));
  const toggleDay = (day) => {
    const days = formData.working_days.includes(day) ? formData.working_days.filter((d) => d !== day) : [...formData.working_days, day];
    update("working_days", days);
  };
  const addItem = (listKey, inputKey) => {
    const val = formData[inputKey].trim();
    if (!val) return;
    if (!formData[listKey].includes(val)) {
      update(listKey, [...formData[listKey], val]);
    }
    update(inputKey, "");
  };
  const addHoliday = () => {
    const date = formData.holidays_input_date;
    const name = formData.holidays_input_name.trim();
    if (!date || !name) return;
    const exists = formData.public_holidays.some((h) => h.date === date);
    if (!exists) {
      update("public_holidays", [...formData.public_holidays, { date, name }]);
    }
    update("holidays_input_date", "");
    update("holidays_input_name", "");
  };
  const removeHoliday = (dateToRemove) => {
    update("public_holidays", formData.public_holidays.filter((h) => h.date !== dateToRemove));
  };
  const removeItem = (listKey, item) => update(listKey, formData[listKey].filter((i) => i !== item));
  const canContinue = () => {
    if (step === 1) return formData.company_name.trim() !== "";
    if (step === 3) return formData.working_days.length > 0;
    return true;
  };
  const handleComplete = async () => {
    const token = localStorage.getItem("ices_token");
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/v1/admin/company-config/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          company_name: formData.company_name,
          primary_color: formData.primary_color,
          country: formData.country,
          currency: formData.currency,
          phone_prefix: formData.phone_prefix,
          timezone: formData.timezone,
          working_days: formData.working_days,
          working_hours_start: formData.working_hours_start + ":00",
          working_hours_end: formData.working_hours_end + ":00",
          leave_days_per_year: formData.leave_days_per_year,
          leave_carry_over_max: formData.leave_carry_over_max,
          leave_types: formData.leave_types,
          probation_duration_days: formData.probation_duration_days,
          contract_alert_days: formData.contract_alert_days,
          document_expiry_alert_days: formData.document_expiry_alert_days,
          medical_visit_alert_days: formData.medical_visit_alert_days,
          overtime_threshold_hours: formData.overtime_threshold_hours,
          late_alert_threshold_minutes: formData.late_alert_threshold_minutes,
          late_count_alert_per_month: formData.late_count_alert_per_month,
          departments: formData.departments,
          job_titles: formData.job_titles,
          public_holidays: formData.public_holidays
        })
      });
      if (response.ok) {
        localStorage.removeItem("force_setup");
        await refreshConfig();
        navigate({ to: "/" });
      } else {
        const data = await response.json();
        setError(data.detail || "Erreur lors de la sauvegarde.");
      }
    } catch {
      setError("Erreur réseau. Vérifiez que le backend est démarré.");
    } finally {
      setLoading(false);
    }
  };
  const steps = [
    { id: 1, title: "Entreprise", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5" }) },
    { id: 2, title: "Structure", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }) },
    { id: 3, title: "Calendrier", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5" }) },
    { id: 4, title: "Politiques", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5" }) },
    { id: 5, title: "Jours Fériés", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5" }) },
    { id: 6, title: "Résumé", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-slate-50 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-3xl shadow-xl border-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "bg-white border-b text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center mb-8 px-4", children: steps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 transition-colors ${step >= s.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`, children: s.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium ${step >= s.id ? "text-blue-600" : "text-gray-400"}`, children: s.title })
      ] }, s.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "Configuration du Système RH" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Initialisez votre environnement de travail" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[320px]", children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-in fade-in slide-in-from-bottom-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Nom officiel de l'entité *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "h-12 text-lg",
                value: formData.company_name,
                onChange: (e) => update("company_name", e.target.value),
                placeholder: "ex: ICES International"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Couleur principale" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "color",
                  className: "w-16 h-12 p-1",
                  value: formData.primary_color,
                  onChange: (e) => update("primary_color", e.target.value)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "flex-1",
                  value: formData.primary_color,
                  onChange: (e) => update("primary_color", e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Pays" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.country, onChange: (e) => update("country", e.target.value), placeholder: "Bénin" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Devise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.currency, onChange: (e) => update("currency", e.target.value), placeholder: "XOF" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Indicatif téléphone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.phone_prefix, onChange: (e) => update("phone_prefix", e.target.value), placeholder: "+229" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Fuseau horaire" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.timezone, onChange: (e) => update("timezone", e.target.value), placeholder: "Africa/Porto-Novo" })
            ] })
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Départements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: formData.dept_input,
                  onChange: (e) => update("dept_input", e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && addItem("departments", "dept_input"),
                  placeholder: "ex: Ressources Humaines"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => addItem("departments", "dept_input"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
              formData.departments.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full", children: [
                d,
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem("departments", d), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }) })
              ] }, d)),
              formData.departments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Aucun département ajouté" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Postes / Titres" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: formData.job_input,
                  onChange: (e) => update("job_input", e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && addItem("job_titles", "job_input"),
                  placeholder: "ex: Développeur, Comptable..."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => addItem("job_titles", "job_input"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
              formData.job_titles.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full", children: [
                j,
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem("job_titles", j), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }) })
              ] }, j)),
              formData.job_titles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Aucun poste ajouté" })
            ] })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Jours travaillés *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ALL_DAYS.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleDay(day),
                className: `px-4 py-2 rounded-full text-sm font-medium border transition-colors ${formData.working_days.includes(day) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"}`,
                children: day
              },
              day
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Heure de début" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "time",
                  value: formData.working_hours_start,
                  onChange: (e) => update("working_hours_start", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Heure de fin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "time",
                  value: formData.working_hours_end,
                  onChange: (e) => update("working_hours_end", e.target.value)
                }
              )
            ] })
          ] })
        ] }),
        step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 animate-in fade-in slide-in-from-bottom-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Jours de congé / an" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: formData.leave_days_per_year,
                onChange: (e) => update("leave_days_per_year", Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Report max de congés" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: formData.leave_carry_over_max,
                onChange: (e) => update("leave_carry_over_max", Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Période d'essai (jours)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: formData.probation_duration_days,
                onChange: (e) => update("probation_duration_days", Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Alerte contrat (jours avant)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: formData.contract_alert_days,
                onChange: (e) => update("contract_alert_days", Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Seuil retard (minutes)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: formData.late_alert_threshold_minutes,
                onChange: (e) => update("late_alert_threshold_minutes", Number(e.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Retards max / mois" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: formData.late_count_alert_per_month,
                onChange: (e) => update("late_count_alert_per_month", Number(e.target.value))
              }
            )
          ] })
        ] }) }),
        step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Jours fériés annuels" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: formData.holidays_input_date,
                onChange: (e) => update("holidays_input_date", e.target.value)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: formData.holidays_input_name,
                onChange: (e) => update("holidays_input_name", e.target.value),
                onKeyDown: (e) => e.key === "Enter" && addHoliday(),
                placeholder: "ex: Fête du Travail"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: addHoliday, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mt-4 max-h-48 overflow-y-auto", children: [
            formData.public_holidays.sort((a, b) => a.date.localeCompare(b.date)).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-purple-50 px-3 py-2 rounded-md border border-purple-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-purple-700", children: h.date }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-700", children: h.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeHoliday(h.date), className: "text-gray-400 hover:text-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
            ] }, h.date)),
            formData.public_holidays.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 italic", children: "Aucun jour férié configuré" })
          ] })
        ] }) }),
        step === 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in zoom-in-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-slate-50 rounded-lg space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Entreprise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: formData.company_name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Couleur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border", style: { backgroundColor: formData.primary_color } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: formData.primary_color })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Pays / Devise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                formData.country,
                " — ",
                formData.currency
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Départements" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: formData.departments.length > 0 ? formData.departments.join(", ") : "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Postes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: formData.job_titles.length > 0 ? formData.job_titles.join(", ") : "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Jours travaillés" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: formData.working_days.join(", ") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Horaires" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                formData.working_hours_start,
                " — ",
                formData.working_hours_end
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Congés / an" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                formData.leave_days_per_year,
                " jours"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Jours Fériés" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                formData.public_holidays.length,
                " jours configurés"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Période d'essai" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                formData.probation_duration_days,
                " jours"
              ] })
            ] })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-500 text-center", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-center text-gray-500", children: "En cliquant sur Terminer, vous activez votre instance RH." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-10 pt-6 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", disabled: step === 1, onClick: () => setStep(step - 1), children: "Précédent" }),
        step < 6 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "px-8 bg-blue-600 hover:bg-blue-700",
            disabled: !canContinue(),
            onClick: () => setStep(step + 1),
            children: "Continuer"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "px-8 bg-green-600 hover:bg-green-700",
            disabled: loading,
            onClick: handleComplete,
            children: loading ? "Enregistrement..." : "Terminer"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  SetupPage as default
};
