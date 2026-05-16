import { r as reactExports, j as jsxRuntimeExports, e as TrendingUp } from "./index-Wq93vx8q.js";
import { C as Card } from "./Card-7IT7P59f.js";
import { B as Button } from "./Button-COi0sWHJ.js";
import { C as CardHeader, a as CardTitle, b as CardContent } from "./card-CVnFq3EB.js";
function TeamProductivityPage() {
  const [kpis, setKpis] = reactExports.useState([]);
  const [projects, setProjects] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editedKpis, setEditedKpis] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("ices_token");
        const response = await fetch("/api/v1/manager/team/productivity", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        setKpis(data.kpis);
        setEditedKpis(data.kpis);
        setProjects(data.projects);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Chargement..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Productivité de l'Équipe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Module 08 — Indicateurs de performance et ranking collectif" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", onClick: () => setShowModal(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
        "Éditer les cibles"
      ] })
    ] }),
    showModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-96", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Éditer les cibles" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        editedKpis.map((kpi, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: kpi.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: kpi.target,
              onChange: (e) => {
                const updated = [...editedKpis];
                updated[index] = { ...updated[index], target: Number(e.target.value) };
                setEditedKpis(updated);
              },
              className: "w-full border rounded px-2 py-1 mt-1"
            }
          )
        ] }, kpi.label)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowModal(false), children: "Annuler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
            setKpis(editedKpis);
            setShowModal(false);
          }, children: "Sauvegarder" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: kpis.map((kpi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: kpi.label }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold", children: [
            kpi.current,
            kpi.unit
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Cible: ",
            kpi.target,
            kpi.unit
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: kpi.current >= kpi.target ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "✓ OK" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-600", children: "✗ À atteindre" }) })
      ] }) })
    ] }, kpi.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Projets en cours" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b pb-4 last:border-b-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: project.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2 py-1 rounded ${project.status === "on_track" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: project.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-200 rounded h-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-500 h-2 rounded", style: { width: `${project.progress}%` } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          project.progress,
          "% • Deadline: ",
          project.deadline
        ] })
      ] }, project.id)) }) })
    ] })
  ] });
}
export {
  TeamProductivityPage as default
};
