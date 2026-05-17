import { f as useNavigate, a as useApi, r as reactExports, j as jsxRuntimeExports, U as Users, W as Mail, S as Shield, k as apiFetch } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { I as Input } from "./input-DJbT6S5r.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { P as Plus } from "./plus-C9uXZ8Nl.js";
import { b as CardContent, C as CardHeader, a as CardTitle } from "./Card-D5DOr9y8.js";
import { S as Search } from "./search-DAw-TzXT.js";
import { T as Trash2 } from "./trash-2-CtL5sn7V.js";
import "./index-DPpzsANr.js";
function UsersPage() {
  const navigate = useNavigate();
  const { data: users, isLoading, refetch } = useApi("/api/v1/admin-rh/users");
  const { data: roles, refetch: refetchRoles } = useApi("/api/v1/admin-rh/roles");
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", onClick: () => navigate({ to: "/rh-employees/new" }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Nouvel Utilisateur"
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
    ] })
  ] });
}
export {
  UsersPage as default
};
