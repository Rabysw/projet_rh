import { r as reactExports, l as useCompanyConfig, j as jsxRuntimeExports, L as Link, W as Mail } from "./index-BeBYdaDm.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { I as Input } from "./input-DJbT6S5r.js";
import { C as Card } from "./Card-B68StWRr.js";
import { b as CardContent, C as CardHeader, a as CardTitle, c as CardDescription } from "./Card-D5DOr9y8.js";
import { C as CircleCheck } from "./circle-check-O5P8UvY-.js";
import { A as ArrowLeft } from "./arrow-left-BOPWx_Ak.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import "./index-DPpzsANr.js";
function ForgotPasswordPage() {
  const [email, setEmail] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [isSubmitted, setIsSubmitted] = reactExports.useState(false);
  const { config } = useCompanyConfig();
  const primaryColor = (config == null ? void 0 : config.primary_color) || "#3b82f6";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  if (isSubmitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-md border-border/50 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-10 pb-10 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8 text-emerald-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Email envoyé !" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Si un compte existe pour ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email }),
        ", vous recevrez un lien pour réinitialiser votre mot de passe."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "w-full mt-6", style: { backgroundColor: primaryColor }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Retour à la connexion" }) })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md border-border/50 shadow-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "p-2 hover:bg-muted rounded-full transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: "Mot de passe oublié ?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Saisissez votre e-mail professionnel pour recevoir un lien de réinitialisation." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "text-sm font-medium", children: "Email professionnel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "email",
                type: "email",
                placeholder: "nom@entreprise.com",
                className: "pl-10",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            className: "w-full font-semibold",
            disabled: isSubmitting || !email,
            style: { backgroundColor: primaryColor },
            children: [
              isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
              isSubmitting ? "Envoi en cours..." : "Envoyer le lien"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "En cas de problème persistant, contactez votre administrateur RH." })
    ] })
  ] }) });
}
export {
  ForgotPasswordPage as default
};
