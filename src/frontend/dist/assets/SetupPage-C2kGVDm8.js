import { c as createLucideIcon, a1 as clsx, j as jsxRuntimeExports, Z as cn, r as reactExports, f as useNavigate, l as useCompanyConfig, F as FileText, U as Users, i as Briefcase, C as Calendar, d as Clock, B as Bell, m as Settings } from "./index-BeBYdaDm.js";
import { S as Slot } from "./index-DPpzsANr.js";
import { I as Input } from "./input-DJbT6S5r.js";
import { d as Card, C as CardHeader, a as CardTitle, c as CardDescription, b as CardContent } from "./Card-D5DOr9y8.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { S as Sparkles } from "./sparkles-7CzR_OxM.js";
import { B as Building2 } from "./building-2-C-zV0K9S.js";
import { D as DollarSign } from "./dollar-sign-CV6nWGBO.js";
import { P as Plus } from "./plus-C9uXZ8Nl.js";
import { X } from "./x-Cq3J5Kxv.js";
import { C as CircleCheck } from "./circle-check-O5P8UvY-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
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
const ALL_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
function SetupPage() {
  const [step, setStep] = reactExports.useState(1);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const navigate = useNavigate();
  const { refreshConfig } = useCompanyConfig();
  const prefillICES = () => {
    setFormData({
      ...formData,
      company_name: "ICES International",
      legal_structure: "SAS",
      fiscal_id: "3202112345678",
      primary_color: "#1e40af",
      departments: [
        "Direction Technique & Ingénierie",
        "Conseil & Stratégie",
        "Capital Humain (RH)",
        "Finance & Administration",
        "Support Client & Maintenance"
      ],
      job_titles: [
        "Ingénieur de Projet Senior",
        "Consultant Business Analyst",
        "Responsable des Opérations",
        "Chargé de Recrutement",
        "Expert en Transformation Digitale"
      ],
      leave_types: [
        "Congé payé",
        "Maladie",
        "RTT (Récupération)",
        "Formation",
        "Évènement Familial",
        "Sans solde"
      ],
      working_hours_start: "08:00",
      working_hours_end: "18:00",
      break_duration_minutes: 60
    });
    ue.success("Données ICES pré-remplies !");
  };
  const [formData, setFormData] = reactExports.useState({
    // Étape 1 — Entreprise
    company_name: "",
    company_logo_url: "",
    primary_color: "#3b82f6",
    country: "Bénin",
    currency: "XOF",
    phone_prefix: "+229",
    timezone: "Africa/Porto-Novo",
    fiscal_id: "",
    // IFU au Bénin
    legal_structure: "SARL",
    // Étape 2 — Structure
    departments: ["Direction Générale", "Ressources Humaines", "Finance & Comptabilité", "Informatique & Digital", "Opérations"],
    job_titles: ["Directeur Général", "Responsable RH", "Comptable", "Développeur", "Consultant"],
    dept_input: "",
    job_input: "",
    // Étape 3 — Calendrier
    working_days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    working_hours_start: "08:00",
    working_hours_end: "17:00",
    break_duration_minutes: 60,
    // Étape 4 — Politiques RH
    leave_days_per_year: 24,
    leave_carry_over_max: 5,
    probation_duration_days: 90,
    contract_alert_days: 30,
    late_alert_threshold_minutes: 15,
    late_count_alert_per_month: 3,
    id_expiry_alert_days: 60,
    medical_alert_days: 30,
    overtime_threshold_hours: 8,
    leave_types: ["Congé payé", "Maladie", "Sans solde", "Maternité", "Paternité", "Exceptionnel", "Deuil", "Mariage"],
    // Étape 5 - Jours fériés
    holidays_input_date: "",
    holidays_input_name: "",
    public_holidays: [
      { date: "2026-01-01", name: "Nouvel An" },
      { date: "2026-01-10", name: "Fête du Vodoun" },
      { date: "2026-04-06", name: "Lundi de Pâques" },
      { date: "2026-05-01", name: "Fête du Travail" },
      { date: "2026-08-01", name: "Fête de l'Indépendance" },
      { date: "2026-12-25", name: "Noël" }
    ]
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
          company_logo_url: formData.company_logo_url,
          primary_color: formData.primary_color,
          country: formData.country,
          currency: formData.currency,
          phone_prefix: formData.phone_prefix,
          timezone: formData.timezone,
          fiscal_id: formData.fiscal_id,
          legal_structure: formData.legal_structure,
          working_days: formData.working_days,
          working_hours_start: formData.working_hours_start + ":00",
          working_hours_end: formData.working_hours_end + ":00",
          break_duration_minutes: formData.break_duration_minutes,
          leave_days_per_year: formData.leave_days_per_year,
          leave_carry_over_max: formData.leave_carry_over_max,
          leave_types: formData.leave_types,
          probation_duration_days: formData.probation_duration_days,
          contract_alert_days: formData.contract_alert_days,
          id_expiry_alert_days: formData.id_expiry_alert_days,
          medical_alert_days: formData.medical_alert_days,
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-600 rounded-lg text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 20 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-blue-900", children: "Configuration Rapide" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-700", children: "Remplir avec les standards ICES International" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: prefillICES, variant: "outline", className: "bg-white border-blue-200 text-blue-700 hover:bg-blue-50", children: "Appliquer l'idée ICES" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Nom officiel de l'entité *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: "h-10 pl-10",
                    value: formData.company_name,
                    onChange: (e) => update("company_name", e.target.value),
                    placeholder: "ex: ICES International"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Identifiant Fiscal (IFU/NIF)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: "h-10 pl-10",
                    value: formData.fiscal_id,
                    onChange: (e) => update("fiscal_id", e.target.value),
                    placeholder: "ex: 1234567890123"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Forme Juridique" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm",
                  value: formData.legal_structure,
                  onChange: (e) => update("legal_structure", e.target.value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SARL", children: "SARL" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SAS", children: "SAS" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SA", children: "SA" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ETS", children: "ETS / Entreprise Individuelle" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "NGO", children: "ONG / Association" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Pays" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-10 pl-10", value: formData.country, onChange: (e) => update("country", e.target.value), placeholder: "Bénin" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Devise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-10 pl-10", value: formData.currency, onChange: (e) => update("currency", e.target.value), placeholder: "XOF" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Logo URL (Optionnel)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  className: "h-10",
                  value: formData.company_logo_url,
                  onChange: (e) => update("company_logo_url", e.target.value),
                  placeholder: "https://..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Couleur principale" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "color",
                    className: "w-12 h-10 p-1",
                    value: formData.primary_color,
                    onChange: (e) => update("primary_color", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    className: "h-10",
                    value: formData.primary_color,
                    onChange: (e) => update("primary_color", e.target.value)
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 mb-4", children: "Définissez l'ossature de votre entreprise. Ces départements et postes seront utilisés pour classer vos collaborateurs." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold text-gray-700 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              " Départements"
            ] }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: formData.departments.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full border border-blue-200", children: [
              d,
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem("departments", d), className: "hover:text-blue-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }) })
            ] }, d)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold text-gray-700 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4" }),
              " Postes / Titres"
            ] }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: formData.job_titles.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full border border-green-200", children: [
              j,
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem("job_titles", j), className: "hover:text-green-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }) })
            ] }, j)) })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold text-gray-700 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
              " Jours travaillés *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ALL_DAYS.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleDay(day),
                className: `px-4 py-2 rounded-lg text-sm font-medium border transition-all ${formData.working_days.includes(day) ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"}`,
                children: day
              },
              day
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold text-gray-700 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                " Début"
              ] }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold text-gray-700 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                " Fin"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "time",
                  value: formData.working_hours_end,
                  onChange: (e) => update("working_hours_end", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Pause (min)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: formData.break_duration_minutes,
                  onChange: (e) => update("break_duration_minutes", Number(e.target.value))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Fuseau horaire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.timezone, onChange: (e) => update("timezone", e.target.value), placeholder: "Africa/Porto-Novo" })
          ] })
        ] }),
        step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-blue-800 uppercase tracking-wider border-b pb-1", children: "Gestion des Congés" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-gray-600", children: "Jours de congé / an" }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-gray-600", children: "Report max de congés (N-1)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: formData.leave_carry_over_max,
                  onChange: (e) => update("leave_carry_over_max", Number(e.target.value))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-amber-800 uppercase tracking-wider border-b pb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
              " Alertes & Sécurité"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-gray-600", children: "Alerte fin de contrat (jours)" }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-gray-600", children: "Alerte expiration pièce (jours)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: formData.id_expiry_alert_days,
                  onChange: (e) => update("id_expiry_alert_days", Number(e.target.value))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-red-800 uppercase tracking-wider border-b pb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4" }),
              " Discipline"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-gray-600", children: "Seuil retard (minutes)" }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-gray-600", children: "Retards max / mois avant alerte" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: formData.late_count_alert_per_month,
                  onChange: (e) => update("late_count_alert_per_month", Number(e.target.value))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-emerald-800 uppercase tracking-wider border-b pb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4" }),
              " Finance"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-gray-600", children: "Seuil Heures Sup (h/jour)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: formData.overtime_threshold_hours,
                  onChange: (e) => update("overtime_threshold_hours", Number(e.target.value))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-gray-600", children: "Période d'essai (jours)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: formData.probation_duration_days,
                  onChange: (e) => update("probation_duration_days", Number(e.target.value))
                }
              )
            ] })
          ] })
        ] }) }),
        step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in fade-in slide-in-from-bottom-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-purple-50 border border-purple-100 rounded-lg text-sm text-purple-700 mb-4", children: "Ajoutez les jours fériés légaux de votre pays pour un calcul précis des temps de travail." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-gray-700", children: "Ajouter un jour férié" }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 max-h-56 overflow-y-auto pr-2", children: formData.public_holidays.sort((a, b) => a.date.localeCompare(b.date)).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-purple-600 uppercase tracking-tighter", children: new Date(h.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-800", children: h.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeHoliday(h.date), className: "text-gray-400 hover:text-red-500 p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
            ] }, h.date)) })
          ] })
        ] }),
        step === 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-in zoom-in-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-white rounded-xl border border-gray-100 shadow-sm space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-gray-800 border-b pb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 text-blue-600" }),
                " Profil Entreprise"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Nom" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formData.company_name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Forme" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formData.legal_structure })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "IFU" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formData.fiscal_id || "—" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Localisation" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    formData.country,
                    " (",
                    formData.timezone,
                    ")"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-white rounded-xl border border-gray-100 shadow-sm space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-gray-800 border-b pb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-emerald-600" }),
                " Temps de Travail"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Horaires" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    formData.working_hours_start,
                    " — ",
                    formData.working_hours_end
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Pause" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    formData.break_duration_minutes,
                    " min"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Jours travaillés" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                    formData.working_days.length,
                    " jours/sem"
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-blue-600 rounded-xl text-white shadow-lg space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
              " Validation Finale"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-90", children: [
              'Votre système RH est prêt. En cliquant sur "Terminer", nous allons configurer ',
              formData.departments.length,
              " départements, ",
              formData.job_titles.length,
              " postes types et vos politiques de congés."
            ] })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium", children: error })
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
