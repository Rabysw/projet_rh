import { c as createLucideIcon, u as useIcesAuth, l as useCompanyConfig, a as useApi, r as reactExports, j as jsxRuntimeExports, i as Briefcase, p as User, W as Mail, C as Calendar, F as FileText, A as Award, k as apiFetch } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { X } from "./x-Cq3J5Kxv.js";
import { S as Save } from "./save-CWBvC4p8.js";
import { b as CardContent, C as CardHeader, a as CardTitle } from "./Card-D5DOr9y8.js";
import { B as Building2 } from "./building-2-C-zV0K9S.js";
import { P as Phone } from "./phone-B55e_yDP.js";
import { M as MapPin } from "./map-pin-6quSs4Es.js";
import "./index-DPpzsANr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
function ProfilePage() {
  var _a;
  const { user } = useIcesAuth();
  const { config } = useCompanyConfig();
  const { data: profile, isLoading, refetch } = useApi("/api/v1/collaborateur/profile");
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    phone: "",
    address: ""
  });
  (config == null ? void 0 : config.phone_prefix) || "+229";
  const companyName = (config == null ? void 0 : config.company_name) || "ICES";
  reactExports.useEffect(() => {
    if (profile) {
      setFormData({
        phone: profile.phone || "",
        address: profile.address || ""
      });
    }
  }, [profile]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/collaborateur/profile", {
        method: "PATCH",
        body: JSON.stringify(formData)
      });
      ue.success("Profil mis à jour avec succès");
      setIsEditing(false);
      refetch();
    } catch (err) {
      ue.error("Erreur lors de la mise à jour");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Mon dossier personnel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Consultez et mettez à jour vos informations de contact." })
      ] }),
      !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setIsEditing(true), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-4 w-4" }),
        "Modifier le profil"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setIsEditing(false), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          "Annuler"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, disabled: isSubmitting, className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          isSubmitting ? "Enregistrement..." : "Enregistrer"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-6 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary", children: ((_a = user == null ? void 0 : user.full_name) == null ? void 0 : _a.charAt(0)) || "U" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: (user == null ? void 0 : user.full_name) || "Utilisateur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3" }),
            (user == null ? void 0 : user.role) === "collaborateur" ? "Collaborateur" : user == null ? void 0 : user.role
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
            (profile == null ? void 0 : profile.department) || "Département"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Matricule: ",
          (profile == null ? void 0 : profile.matricule) || `${companyName}-0000`,
          " | Date d'entrée: ",
          (profile == null ? void 0 : profile.hire_date) || "15/03/2022"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }),
          "Coordonnées"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (user == null ? void 0 : user.email) || "email@entreprise.local" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Téléphone" }),
              isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "mt-1 w-full px-3 py-1 border border-border rounded-lg bg-background text-sm",
                  value: formData.phone,
                  onChange: (e) => setFormData({ ...formData, phone: e.target.value })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (profile == null ? void 0 : profile.phone) || "Non renseigné" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Adresse" }),
              isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "mt-1 w-full px-3 py-1 border border-border rounded-lg bg-background text-sm",
                  value: formData.address,
                  onChange: (e) => setFormData({ ...formData, address: e.target.value })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (profile == null ? void 0 : profile.address) || (config == null ? void 0 : config.country) || "Adresse non renseignée" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Date de naissance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (profile == null ? void 0 : profile.birth_date) || "12/06/1990" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
          "Contrat actuel"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "CDI" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Poste" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Développeur Senior" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Département" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Technique" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manager" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Jean Dupont" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Échéance prochaine" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Aucune (CDI)" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5" }),
        "Compétences certifiées"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["React", "TypeScript", "Node.js", "Python", "FastAPI", "Docker", "AWS", "PostgreSQL"].map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-sm py-1 px-3", children: skill }, skill)) }) })
    ] })
  ] });
}
export {
  ProfilePage as default
};
