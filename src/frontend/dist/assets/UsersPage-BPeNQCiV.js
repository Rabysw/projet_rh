import { c as createLucideIcon, a as useApi, r as reactExports, j as jsxRuntimeExports, U as Users, V as Mail, S as Shield, k as apiFetch, R as User, i as Briefcase, F as FileText } from "./index-Wq93vx8q.js";
import { C as Card } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { B as Badge } from "./Badge-BFQ_Hy0K.js";
import { I as Input } from "./input-Dqi26IOG.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { L as LoaderCircle } from "./loader-circle-DBROso8Q.js";
import { P as Plus } from "./plus-CMUzI6kD.js";
import { b as CardContent, C as CardHeader, a as CardTitle } from "./card-CVnFq3EB.js";
import { S as Search } from "./search-QiIA7WTc.js";
import { T as Trash2 } from "./trash-2-CEV4bQlq.js";
import { X } from "./x-DJ1ld1ug.js";
import { K as Key } from "./key-2FPTDjQA.js";
import { P as Phone } from "./phone-BYtqNb9l.js";
import { M as MapPin } from "./map-pin-ZCciL75B.js";
import { C as CircleAlert } from "./circle-alert-Cb00aeSX.js";
import { C as CircleCheck } from "./circle-check-DtBxltuf.js";
import { C as ChevronRight } from "./chevron-right-BphBONtI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
const INITIAL_FORM = {
  prenom: "",
  nom: "",
  email: "",
  password: "",
  role: "collaborateur",
  gender: "M",
  birth_date: "",
  birth_place: "",
  nationality: "Béninoise",
  marital_status: "Célibataire",
  children_count: 0,
  phone: "",
  address: "",
  personal_email: "",
  personal_phone: "",
  position: "",
  department_id: 1,
  contract_type: "CDI",
  hire_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
  base_salary: 0,
  id_card_type: "Passeport",
  id_card_number: "",
  id_card_expiry: "",
  emergency_contact_name: "",
  emergency_contact_relation: "",
  emergency_contact_phone: ""
};
function CreateUserModal({
  open,
  onClose,
  onCreated
}) {
  const [step, setStep] = reactExports.useState(1);
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open) {
      setStep(1);
      setForm(INITIAL_FORM);
    }
  }, [open]);
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (step < 5) {
      setStep(step + 1);
      return;
    }
    if (!form.email || !form.password || !form.role) {
      return ue.error("Veuillez remplir les champs obligatoires");
    }
    if (!form.prenom || !form.nom) {
      return ue.error("Prénom et nom sont obligatoires");
    }
    setLoading(true);
    try {
      const response = await apiFetch("/api/v1/admin-rh/users", {
        method: "POST",
        body: JSON.stringify(form)
      });
      if (response) {
        ue.success(`Utilisateur ${form.prenom} ${form.nom} créé avec succès`);
        onCreated();
        onClose();
      }
    } catch (err) {
      console.error("Creation error:", err);
      ue.error(err.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    onClose();
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: handleCancel }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl p-0 overflow-hidden flex flex-col max-h-[90vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col h-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border flex items-center justify-between bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "text-primary h-5 w-5" }),
            "Nouvel utilisateur"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Étape ",
            step,
            " sur 5"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCancel, className: "p-2 hover:bg-muted rounded-full transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex px-6 py-4 bg-muted/10 gap-2 border-b border-border", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-border"}`
        },
        s
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Accès & Identité" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Prénom *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.prenom,
                  onChange: (e) => setForm({ ...form, prenom: e.target.value }),
                  placeholder: "Jean",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Nom *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.nom,
                  onChange: (e) => setForm({ ...form, nom: e.target.value }),
                  placeholder: "Dupont",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Email professionnel *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "email",
                  className: "pl-10",
                  value: form.email,
                  onChange: (e) => setForm({ ...form, email: e.target.value }),
                  placeholder: "jean.dupont@ices.com",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Mot de passe provisoire *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                value: form.password,
                onChange: (e) => setForm({ ...form, password: e.target.value }),
                placeholder: "••••••••",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Rôle système *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
                value: form.role,
                onChange: (e) => setForm({ ...form, role: e.target.value }),
                required: true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "collaborateur", children: "Collaborateur" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "manager", children: "Manager" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "resp_rh", children: "Responsable RH" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin_rh", children: "Administrateur RH" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "direction", children: "Direction" })
                ]
              }
            )
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "État Civil & Famille" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Genre" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm",
                  value: form.gender,
                  onChange: (e) => setForm({ ...form, gender: e.target.value }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "M", children: "Masculin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "F", children: "Féminin" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Date de naissance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: form.birth_date,
                  onChange: (e) => setForm({ ...form, birth_date: e.target.value })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Lieu de naissance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.birth_place,
                onChange: (e) => setForm({ ...form, birth_place: e.target.value }),
                placeholder: "Cotonou"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Nationalité" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.nationality,
                  onChange: (e) => setForm({ ...form, nationality: e.target.value }),
                  placeholder: "Béninoise"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Situation matrimoniale" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm",
                  value: form.marital_status,
                  onChange: (e) => setForm({ ...form, marital_status: e.target.value }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Célibataire", children: "Célibataire" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Marié(e)", children: "Marié(e)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Divorcé(e)", children: "Divorcé(e)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Veuf(ve)", children: "Veuf(ve)" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Nombre d'enfants" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0",
                value: form.children_count,
                onChange: (e) => setForm({ ...form, children_count: parseInt(e.target.value) || 0 })
              }
            )
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Coordonnées & Contact" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Téléphone professionnel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.phone,
                onChange: (e) => setForm({ ...form, phone: e.target.value }),
                placeholder: "+229 00 00 00 00"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Téléphone personnel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.personal_phone,
                onChange: (e) => setForm({ ...form, personal_phone: e.target.value }),
                placeholder: "+229 00 00 00 00"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Adresse de résidence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  className: "w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px]",
                  value: form.address,
                  onChange: (e) => setForm({ ...form, address: e.target.value }),
                  placeholder: "Cotonou, quartier..."
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Email personnel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "email",
                value: form.personal_email,
                onChange: (e) => setForm({ ...form, personal_email: e.target.value }),
                placeholder: "jean.dupont@gmail.com"
              }
            )
          ] })
        ] }),
        step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Informations de Carrière" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Poste / Intitulé" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.position,
                onChange: (e) => setForm({ ...form, position: e.target.value }),
                placeholder: "Consultant RH"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Département" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm",
                  value: form.department_id,
                  onChange: (e) => setForm({ ...form, department_id: parseInt(e.target.value) }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 1, children: "IT & Digital" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 2, children: "Ressources Humaines" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 3, children: "Finance" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 4, children: "Opérations" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Type de contrat" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm",
                  value: form.contract_type,
                  onChange: (e) => setForm({ ...form, contract_type: e.target.value }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CDI", children: "CDI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CDD", children: "CDD" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Stage", children: "Stage" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Freelance", children: "Freelance" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Date d'embauche" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: form.hire_date,
                  onChange: (e) => setForm({ ...form, hire_date: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Salaire de base (FCFA)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "number",
                  value: form.base_salary,
                  onChange: (e) => setForm({ ...form, base_salary: parseInt(e.target.value) || 0 })
                }
              )
            ] })
          ] })
        ] }),
        step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Documents & Urgence" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/20 rounded-lg border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-sm mb-4", children: "Documents d'identité" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Type de document" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm",
                    value: form.id_card_type,
                    onChange: (e) => setForm({ ...form, id_card_type: e.target.value }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Passeport", children: "Passeport" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CNI", children: "Carte d'identité nationale" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Permis", children: "Permis de conduire" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Numéro" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.id_card_number,
                    onChange: (e) => setForm({ ...form, id_card_number: e.target.value }),
                    placeholder: "AB123456"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Date d'expiration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "date",
                    value: form.id_card_expiry,
                    onChange: (e) => setForm({ ...form, id_card_expiry: e.target.value })
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/20 rounded-lg border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium text-sm mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16, className: "text-amber-600" }),
              "Contact d'urgence"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Nom du contact" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.emergency_contact_name,
                    onChange: (e) => setForm({ ...form, emergency_contact_name: e.target.value }),
                    placeholder: "Jean Dupont"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Relation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    className: "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm",
                    value: form.emergency_contact_relation,
                    onChange: (e) => setForm({ ...form, emergency_contact_relation: e.target.value }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Sélectionner..." }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Père", children: "Père" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Mère", children: "Mère" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Frère", children: "Frère" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sœur", children: "Sœur" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Conjoint(e)", children: "Conjoint(e)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Ami(e)", children: "Ami(e)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Autre", children: "Autre" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Téléphone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.emergency_contact_phone,
                    onChange: (e) => setForm({ ...form, emergency_contact_phone: e.target.value }),
                    placeholder: "+229 00 00 00 00"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-primary/5 border border-primary/20 rounded-xl mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-medium flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }),
              "Prêt pour la validation finale"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: 'En cliquant sur "Créer", le compte utilisateur sera activé et le profil employé sera généré avec toutes ces informations.' })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-t border-border bg-muted/20 flex gap-3 mt-auto", children: [
        step > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "flex-1 gap-2", onClick: () => setStep(step - 1), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
          "Précédent"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "flex-1", onClick: handleCancel, children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", className: "flex-1 gap-2", disabled: loading, children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }) : step === 5 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 }),
          step === 5 ? "Valider & Créer" : "Suivant"
        ] })
      ] })
    ] }) })
  ] });
}
function UsersPage() {
  const { data: users, isLoading, refetch } = useApi("/api/v1/admin-rh/users");
  const { data: roles, refetch: refetchRoles } = useApi("/api/v1/admin-rh/roles");
  const [createModalOpen, setCreateModalOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    try {
      await apiFetch(`/api/v1/admin-rh/users/${id}`, { method: "DELETE" });
      ue.success("Utilisateur supprimé");
      refetch();
      refetchRoles();
    } catch (err) {
      ue.error(err.message || "Erreur de suppression");
    }
  };
  const filteredUsers = users == null ? void 0 : users.filter(
    (u) => `${u.prenom} ${u.nom}`.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Gestion des utilisateurs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Administrez les comptes et les rôles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", onClick: () => setCreateModalOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Créer un compte"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: roles == null ? void 0 : roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: r.count }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `mt-1 ${r.color}`, children: r.role })
    ] }) }, r.role)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }),
          "Utilisateurs"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "pl-10",
                placeholder: "Rechercher un utilisateur...",
                value: search,
                onChange: (e) => setSearch(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredUsers == null ? void 0 : filteredUsers.map((user) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary", children: ((_a = user.prenom) == null ? void 0 : _a.charAt(0)) || user.email.charAt(0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm", children: [
                    user.prenom,
                    " ",
                    user.nom
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: user.email })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3 w-3 mr-1" }),
                  user.role
                ] }),
                user.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs", children: "Actif" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-muted-foreground text-xs", children: "Inactif" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10", onClick: () => handleDelete(user.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
              ] })
            ] }, user.id);
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5" }),
          "Permissions par rôle"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          [
            { module: "Dossiers personnel", roles: ["Admin RH", "Resp RH", "Manager"] },
            { module: "Contrats", roles: ["Admin RH", "Resp RH"] },
            { module: "Congés", roles: ["Admin RH", "Resp RH", "Manager", "Collab"] },
            { module: "Fiches de paie", roles: ["Admin RH", "Resp RH", "Collab"] },
            { module: "Admin système", roles: ["Admin RH"] }
          ].map((perm) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/30 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: perm.module }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: perm.roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px]", children: role }, role)) })
          ] }, perm.module)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "w-full", children: "Configuration avancée" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateUserModal,
      {
        open: createModalOpen,
        onClose: () => setCreateModalOpen(false),
        onCreated: () => {
          refetch();
          refetchRoles();
        }
      }
    )
  ] });
}
export {
  UsersPage as default
};
