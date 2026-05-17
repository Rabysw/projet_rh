import { c as createLucideIcon, a as useApi, j as jsxRuntimeExports, B as Bell, C as Calendar, M as MessageSquare, A as Award, k as apiFetch } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { T as TriangleAlert } from "./triangle-alert-C50AwoWJ.js";
import { b as CardContent, C as CardHeader, a as CardTitle } from "./Card-D5DOr9y8.js";
import "./index-DPpzsANr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
const TYPE_CONFIG = {
  leave: { icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  evaluation: { icon: Award, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  alert: { icon: TriangleAlert, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
  message: { icon: MessageSquare, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
  default: { icon: Bell, color: "text-primary", bg: "bg-primary/5" }
};
function timeAgo(isoDate) {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 6e4);
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days}j`;
}
function TeamNotificationsPage() {
  const { data: notifications, isLoading, refetch } = useApi("/api/v1/manager/notifications");
  const unreadCount = (notifications ?? []).filter((n) => !n.is_read).length;
  const markRead = async (id) => {
    try {
      await apiFetch(`/api/v1/manager/notifications/${id}/read`, {
        method: "PATCH"
      });
      refetch();
    } catch {
      ue.error("Erreur lors de la mise à jour");
    }
  };
  const markAllRead = async () => {
    try {
      await apiFetch("/api/v1/manager/notifications/read-all", {
        method: "PATCH"
      });
      ue.success("Toutes les notifications marquées comme lues");
      refetch();
    } catch {
      ue.error("Erreur lors de la mise à jour");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  const items = notifications ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Activité récente de votre équipe" })
      ] }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: markAllRead, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-4 w-4" }),
        "Tout marquer comme lu (",
        unreadCount,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      { label: "Total", value: items.length, icon: Bell, color: "text-foreground" },
      { label: "Non lues", value: unreadCount, icon: Circle, color: "text-primary" },
      { label: "Congés", value: items.filter((n) => n.type === "leave").length, icon: Calendar, color: "text-blue-500" },
      { label: "Alertes", value: items.filter((n) => n.type === "alert").length, icon: TriangleAlert, color: "text-amber-500" }
    ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
      ] })
    ] }) }) }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
        "Toutes les notifications"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "h-10 w-10 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Aucune notification pour le moment" })
      ] }) : items.map((notif) => {
        const cfg = TYPE_CONFIG[notif.type] ?? TYPE_CONFIG.default;
        const Icon = cfg.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-start gap-4 p-4 rounded-lg transition-colors ${notif.is_read ? "bg-muted/20 opacity-70" : "bg-muted/50 border border-border/60"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${cfg.bg}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${cfg.color}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: notif.title }),
                  !notif.is_read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary shrink-0" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: notif.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: timeAgo(notif.created_at) })
              ] }),
              !notif.is_read && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "shrink-0 text-xs",
                  onClick: () => markRead(notif.id),
                  children: "Marquer lu"
                }
              )
            ]
          },
          notif.id
        );
      }) })
    ] })
  ] });
}
export {
  TeamNotificationsPage as default
};
