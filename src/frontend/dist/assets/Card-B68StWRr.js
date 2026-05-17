import { j as jsxRuntimeExports, Z as cn } from "./index-BeBYdaDm.js";
function Card({ children, className, hover, onClick }) {
  const Tag = onClick ? "button" : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      onClick,
      type: onClick ? "button" : void 0,
      className: cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        hover && "hover:shadow-md hover:-translate-y-0.5 transition-smooth cursor-pointer",
        onClick && "w-full text-left",
        className
      ),
      children
    }
  );
}
function StatCard({ label, value, icon, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-3xl text-foreground mt-1.5 tabular-nums", children: value })
    ] }),
    icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "icon-wrap w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: icon })
  ] }) });
}
export {
  Card as C,
  StatCard as S
};
