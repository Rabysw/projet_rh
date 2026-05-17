import { j as jsxRuntimeExports, Z as cn } from "./index-BeBYdaDm.js";
import { C as CircleAlert } from "./circle-alert-CIYviOcj.js";
import { R as RefreshCw } from "./refresh-cw-a95jL2eU.js";
function ErrorMessage({
  title = "Une erreur est survenue",
  message = "Impossible de charger les données pour le moment.",
  onRetry,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center",
        className
      ),
      "data-ocid": "error_state",
      role: "alert",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 20, className: "text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: message })
        ] }),
        onRetry && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onRetry,
            className: "flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors mt-1",
            "data-ocid": "error_state.retry_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 }),
              "Réessayer"
            ]
          }
        )
      ]
    }
  );
}
export {
  ErrorMessage as E
};
