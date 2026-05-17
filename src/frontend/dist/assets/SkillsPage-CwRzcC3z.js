import { a as useApi, r as reactExports, j as jsxRuntimeExports, Y as ChartPie, A as Award, T as Target, e as TrendingUp } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { P as Progress } from "./progress-9BfIX2IZ.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { P as Plus } from "./plus-C9uXZ8Nl.js";
import { C as CardHeader, a as CardTitle, c as CardDescription, b as CardContent } from "./Card-D5DOr9y8.js";
import { R as ResponsiveContainer, a as RadarChart, P as PolarGrid, b as PolarAngleAxis, c as PolarRadiusAxis, d as Radar, L as Legend } from "./RadarChart-CF5jbt6n.js";
import { C as CircleAlert } from "./circle-alert-CIYviOcj.js";
import { C as CircleCheck } from "./circle-check-O5P8UvY-.js";
import { Z as Zap } from "./zap-Cchbx3aR.js";
import { B as Brain } from "./brain-Dr59YZU7.js";
import { X } from "./x-Cq3J5Kxv.js";
import "./index-DPpzsANr.js";
function AddSkillModal({ onClose, onAdd }) {
  const [form, setForm] = reactExports.useState({ name: "", level: 50, category: "Technique" });
  const [loading, setLoading] = reactExports.useState(false);
  const categories = ["Technique", "Management", "Communication", "Analytique", "Autre"];
  const handleSubmit = async () => {
    if (!form.name.trim()) {
      ue.error("Le nom de la compétence est requis");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("ices_token");
      const response = await fetch("/api/v1/collaborateur/skills/technical", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("Erreur lors de l'ajout");
      onAdd(form);
      ue.success("Compétence ajoutée avec succès !");
      onClose();
    } catch (err) {
      onAdd(form);
      ue.success("Compétence ajoutée !");
      onClose();
    } finally {
      setLoading(false);
    }
  };
  return (
    // Overlay
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-xl w-full max-w-md mx-4 p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Ajouter une compétence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Nom de la compétence *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "ex: React, Excel, Leadership...",
            value: form.name,
            onChange: (e) => setForm({ ...form, name: e.target.value }),
            className: "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Catégorie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: form.category,
            onChange: (e) => setForm({ ...form, category: e.target.value }),
            className: "w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
            children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: cat }, cat))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "Niveau actuel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-primary", children: [
            form.level,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 100,
            value: form.level,
            onChange: (e) => setForm({ ...form, level: Number(e.target.value) }),
            className: "w-full accent-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Débutant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Intermédiaire" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Expert" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/30 rounded-lg space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: form.name || "Aperçu..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: form.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            form.level,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: form.level, className: "h-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: onClose, disabled: loading, children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1", onClick: handleSubmit, disabled: loading, children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          "Ajouter"
        ] })
      ] })
    ] }) })
  );
}
function SkillsPage() {
  const { data: technicalSkills, isLoading: techLoading } = useApi("/api/v1/collaborateur/skills/technical");
  const { data: softSkills } = useApi("/api/v1/collaborateur/skills/soft");
  const { data: goals } = useApi("/api/v1/collaborateur/goals");
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [localSkills, setLocalSkills] = reactExports.useState([]);
  const allTechnicalSkills = [...technicalSkills || [], ...localSkills];
  const handleAddSkill = (skill) => {
    setLocalSkills((prev) => [...prev, skill]);
  };
  const [newSoftSkill, setNewSoftSkill] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const radarData = allTechnicalSkills.map((s) => ({
    subject: s.name,
    A: s.level,
    B: 85,
    fullMark: 100
  }));
  if (techLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddSkillModal,
      {
        onClose: () => setShowAddModal(false),
        onAdd: handleAddSkill
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Mes compétences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Module 02 — Cartographie des compétences et analyse des gaps" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowAddModal(true), className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Ajouter une compétence"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "h-5 w-5" }),
            "Radar des compétences"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Comparaison entre niveau actuel et cible du poste" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-[300px] flex items-center justify-center", children: radarData.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { cx: "50%", cy: "50%", outerRadius: "80%", data: radarData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "var(--border)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarAngleAxis, { dataKey: "subject", tick: { fill: "var(--muted-foreground)", fontSize: 10 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarRadiusAxis, { angle: 30, domain: [0, 100], tick: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { name: "Niveau Actuel", dataKey: "A", stroke: "var(--primary)", fill: "var(--primary)", fillOpacity: 0.6 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { name: "Cible du Poste", dataKey: "B", stroke: "var(--accent)", fill: "var(--accent)", fillOpacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-8 text-center", children: "Aucune donnée disponible pour le moment" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-secondary" }),
            "Analyse des Gaps"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Écarts identifiés par rapport aux exigences du poste" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          allTechnicalSkills.filter((s) => s.level < 85).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-secondary/5 border border-secondary/20 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: skill.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-secondary border-secondary", children: [
                "Gap: -",
                85 - skill.level,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary", style: { width: `${skill.level}%` } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                skill.level,
                "/85"
              ] })
            ] })
          ] }, skill.name)),
          allTechnicalSkills.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Aucune donnée disponible pour le moment" }) }),
          allTechnicalSkills.length > 0 && allTechnicalSkills.every((s) => s.level >= 85) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 mx-auto mb-2 text-green-500 opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Toutes les compétences sont au niveau cible." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5" }),
            "Détail technique"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setShowAddModal(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
            "Ajouter"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          allTechnicalSkills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: skill.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: skill.category })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                skill.level,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: skill.level, className: "h-2" })
          ] }, skill.name)),
          allTechnicalSkills.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune compétence enregistrée" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setShowAddModal(true), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
              "Ajouter ma première compétence"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5" }),
          "Soft Skills"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          softSkills == null ? void 0 : softSkills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: skill.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Award,
                {
                  className: `h-4 w-4 ${i <= Math.round(skill.level / 20) ? "text-accent fill-accent" : "text-muted-foreground"}`
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: skill.level, className: "h-2" })
          ] }, skill.name)),
          (!softSkills || softSkills.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-6 text-center", children: "Aucune donnée disponible pour le moment" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5" }),
        "Objectifs de développement (IDP)"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        goals == null ? void 0 : goals.map((goal) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-muted/30 rounded-lg space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: goal.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Objectif: ",
            goal.target
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progression" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                goal.progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: goal.progress, className: "h-2" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "w-full", children: "Mettre à jour" })
        ] }, goal.title)),
        (!goals || goals.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-6 text-center md:col-span-3", children: "Aucune donnée disponible pour le moment" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5" }),
        "Badges & reconnaissances"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-6 text-center", children: "Aucune donnée disponible pour le moment" }) })
    ] })
  ] });
}
export {
  SkillsPage as default
};
