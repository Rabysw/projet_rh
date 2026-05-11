import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, X, a as cn } from "./index-C9_e_yR_.js";
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "sm"
}) {
  const dialogRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);
  reactExports.useEffect(() => {
    var _a;
    if (open) {
      (_a = dialogRef.current) == null ? void 0 : _a.focus();
    }
  }, [open]);
  if (!open) return null;
  const maxWidth = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-2xl" }[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent max-w-none w-full h-full m-0 border-0 outline-none",
      open: true,
      "aria-labelledby": "modal-title",
      "data-ocid": "modal.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/30 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: dialogRef,
            tabIndex: -1,
            className: cn(
              "relative z-10 w-full rounded-2xl border border-border bg-card shadow-xl outline-none animate-in fade-in zoom-in-95 duration-200",
              maxWidth
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 p-6 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      id: "modal-title",
                      className: "font-display font-semibold text-lg text-foreground",
                      children: title
                    }
                  ),
                  description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0",
                    "aria-label": "Close dialog",
                    "data-ocid": "modal.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                  }
                )
              ] }),
              children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children }),
              footer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30 rounded-b-2xl", children: footer })
            ]
          }
        )
      ]
    }
  );
}
function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  entityName,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title: "Confirm deletion",
      description: `Are you sure you want to delete ${entityName}? This action cannot be undone.`,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            disabled: isLoading,
            className: "rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50",
            "data-ocid": "modal.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onConfirm,
            disabled: isLoading,
            className: "rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50",
            "data-ocid": "modal.confirm_button",
            children: isLoading ? "Deleting…" : "Delete"
          }
        )
      ] })
    }
  );
}
export {
  ConfirmDeleteModal as C,
  Pen as P,
  Trash2 as T
};
