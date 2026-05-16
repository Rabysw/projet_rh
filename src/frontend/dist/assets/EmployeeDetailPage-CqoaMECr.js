import { c as createLucideIcon, p as useParams, f as useNavigate, a as useApi, r as reactExports, j as jsxRuntimeExports, S as Shield, R as User, F as FileText, k as apiFetch } from "./index-Wq93vx8q.js";
import { C as Card } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { B as Badge } from "./Badge-BFQ_Hy0K.js";
import { u as ue } from "./index-Dmzovxt5.js";
import { L as LoaderCircle } from "./loader-circle-DBROso8Q.js";
import { A as ArrowLeft } from "./arrow-left-BNPpw59r.js";
import { D as Download } from "./download-CEJWcwKg.js";
import { b as CardContent, C as CardHeader, a as CardTitle, c as CardDescription } from "./card-CVnFq3EB.js";
import { H as Heart } from "./heart-Bp1cvSwR.js";
import { M as MapPin } from "./map-pin-ZCciL75B.js";
import { U as Upload } from "./upload-CicyoMpF.js";
import { C as CircleCheck } from "./circle-check-DtBxltuf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode);
function EmployeeDetailPage() {
  var _a;
  const { id } = useParams({ from: "/protected/rh-employees/$id" });
  const navigate = useNavigate();
  const { data: employee, isLoading, error, refetch: refetchEmployee } = useApi(`/api/v1/resp-rh/employees/${id}`);
  const [uploadingDoc, setUploadingDoc] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const { data: documentsData, refetch: refetchDocs } = useApi(`/api/v1/documents/employee/${id}`);
  const documents = (documentsData == null ? void 0 : documentsData.documents) || [];
  const handleUploadClick = (docType) => {
    var _a2;
    setUploadingDoc(docType);
    (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
  };
  const handleFileChange = async (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file || !uploadingDoc) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", uploadingDoc);
    formData.append("employee_id", id.toString());
    try {
      await apiFetch("/api/v1/documents/upload", {
        method: "POST",
        body: formData
      });
      ue.success(`${uploadingDoc} uploadé avec succès`);
      refetchDocs();
      if (uploadingDoc === "contract") refetchEmployee();
    } catch (err) {
      ue.error(err.message || "Erreur lors de l'upload");
    } finally {
      setUploadingDoc(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const getDocStatus = (docName) => {
    const typeMap = {
      "Contrat de travail": "contract",
      "CIP / CNI": "id_card",
      "Passeport": "passport",
      "Diplômes": "diploma",
      "Certificat de travail": "work_certificate",
      "Attestation résidence": "residence_cert",
      "Casier judiciaire": "criminal_record",
      "Certificat médical": "medical_cert",
      "Photo identité": "photo",
      "RIB": "rib",
      "Relevé CNSS": "cnss",
      "Fiche IFU": "ifu",
      "Avenants": "avenant"
    };
    const type = typeMap[docName];
    const doc = documents.find((d) => d.document_type === type);
    return doc ? { status: "OK", url: doc.file_url } : { status: "Manquant", url: null };
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  if (error || !employee) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: "Erreur lors du chargement du dossier" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({ to: "/rh-employees" }), children: "Retour à la liste" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "file",
        className: "hidden",
        ref: fileInputRef,
        onChange: handleFileChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate({ to: "/rh-employees" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: employee.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Module 01 — Dossier Administratif Complet" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          "Exporter PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }),
          "Modifier le dossier"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mb-4", children: employee.name.charAt(0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg text-center", children: employee.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: employee.matricule }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent mb-2", children: "ACTIF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: employee.contract })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
            " Sécurité & Légal"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase font-bold", children: "CNSS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: employee.cnss || "1234567890" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase font-bold", children: "IFU" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: employee.ifu || "1202012345678" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase font-bold", children: "Lieu de travail" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: employee.work_location || "Cotonou" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-px bg-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-sm flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, className: "text-primary" }),
              " État Civil & Identité"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sexe", value: employee.gender || "M" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nationalité", value: employee.nationality || "Béninoise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Né(e) le", value: employee.birth_date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "À", value: employee.birth_place || "Cotonou" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pièce ID", value: employee.id_type || "CIP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Expire le", value: employee.id_expiry || "12/12/2028" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-sm flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 16, className: "text-rose-500" }),
              " Situation Familiale"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Statut", value: employee.marital_status || "Marié(e)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Enfants", value: ((_a = employee.children_count) == null ? void 0 : _a.toString()) || "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Contact Urgence", value: employee.emergency_contact || "Jean Dupont" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Relation", value: employee.emergency_relation || "Frère" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tél Urgence", value: employee.emergency_phone || "+229 97 00 00 00" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-6 space-y-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-sm flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-accent" }),
              " Coordonnées"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email Pro", value: employee.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email Perso", value: employee.personal_email || "perso@mail.com" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Téléphone", value: employee.phone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Adresse", value: employee.address })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-6 space-y-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-sm flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 16, className: "text-emerald-500" }),
              " Carrière & Finance"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Poste", value: employee.role }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Département", value: employee.dept }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Manager", value: employee.manager || "Sophie Martin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Entrée le", value: employee.hired }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Salaire Base", value: employee.salary_base || "450 000 FCFA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "RIB", value: employee.bank_account || "BJ062 01001 1234567890 12" })
            ] })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }),
              " 13 Documents Requis"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Conformité du dossier administratif" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
            "Contrat de travail",
            "CIP / CNI",
            "Passeport",
            "Diplômes",
            "Certificat de travail",
            "Attestation résidence",
            "Casier judiciaire",
            "Certificat médical",
            "Photo identité",
            "RIB",
            "Relevé CNSS",
            "Fiche IFU",
            "Avenants"
          ].map((docName) => {
            const { status, url } = getDocStatus(docName);
            const typeMap = {
              "Contrat de travail": "contract",
              "CIP / CNI": "id_card",
              "Passeport": "passport",
              "Diplômes": "diploma",
              "Certificat de travail": "work_certificate",
              "Attestation résidence": "residence_cert",
              "Casier judiciaire": "criminal_record",
              "Certificat médical": "medical_cert",
              "Photo identité": "photo",
              "RIB": "rib",
              "Relevé CNSS": "cnss",
              "Fiche IFU": "ifu",
              "Avenants": "avenant"
            };
            const docType = typeMap[docName];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-2 bg-muted/30 rounded border border-border/50 group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs truncate font-medium", children: docName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] ${status === "OK" ? "text-emerald-500" : "text-amber-500"}`, children: status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-6 w-6 text-primary",
                    onClick: () => window.open(url, "_blank"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-6 w-6 text-muted-foreground hover:text-primary",
                    onClick: () => handleUploadClick(docType),
                    disabled: uploadingDoc === docType,
                    children: uploadingDoc === docType ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3" })
                  }
                ),
                status === "OK" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-500 self-center" })
              ] })
            ] }, docName);
          }) }) })
        ] })
      ] })
    ] })
  ] });
}
function Field({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase font-semibold", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: value })
  ] });
}
export {
  EmployeeDetailPage as default
};
