import { c as createLucideIcon, u as useIcesAuth, a as useApi, r as reactExports, j as jsxRuntimeExports, C as Calendar, d as Clock, F as FileText, k as apiFetch } from "./index-BeBYdaDm.js";
import { C as Card } from "./Card-B68StWRr.js";
import { B as Badge } from "./Badge-CO55yxEt.js";
import { B as Button } from "./Button-Cr7a-uS2.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-C19GeIh7.js";
import { T as Textarea } from "./textarea-D6UpuBwr.js";
import { u as ue } from "./index-Cuaux0fq.js";
import { L as LoaderCircle } from "./loader-circle-G1Ks-bUD.js";
import { P as Plus } from "./plus-C9uXZ8Nl.js";
import { C as CardHeader, a as CardTitle, c as CardDescription, b as CardContent } from "./Card-D5DOr9y8.js";
import { C as ChevronRight } from "./chevron-right-Onv6hVY4.js";
import { M as MapPin } from "./map-pin-6quSs4Es.js";
import { T as Trophy } from "./trophy-DS28-9rD.js";
import "./index-DPpzsANr.js";
import "./index-BLmBpyEQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
];
const Pin = createLucideIcon("pin", __iconNode);
function CommunicationPage() {
  const { user } = useIcesAuth();
  const { data: notes, isLoading: notesLoading } = useApi("/api/v1/communication/notes");
  const { data: events, isLoading: eventsLoading } = useApi("/api/v1/communication/events");
  const { data: palmares, isLoading: palmaresLoading } = useApi("/api/v1/communication/palmares");
  const { data: meetings, isLoading: meetingsLoading } = useApi("/api/v1/communication/reunions");
  const [expandedNoteId, setExpandedNoteId] = reactExports.useState(null);
  const [showEventForm, setShowEventForm] = reactExports.useState(false);
  const [showMeetingForm, setShowMeetingForm] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [showNoteForm, setShowNoteForm] = reactExports.useState(false);
  const [acknowledgedNotes, setAcknowledgedNotes] = reactExports.useState({});
  const [eventForm, setEventForm] = reactExports.useState({
    title: "",
    type: "Team Building",
    date_time: "",
    location: ""
  });
  const [meetingForm, setMeetingForm] = reactExports.useState({
    title: "",
    date_time: "",
    attendees: "",
    notes: ""
  });
  const [noteForm, setNoteForm] = reactExports.useState({
    title: "",
    content: "",
    type: "Note de service",
    requires_acknowledgment: false,
    is_pinned: false
  });
  const canCreateEvent = (user == null ? void 0 : user.role) === "resp_rh" || (user == null ? void 0 : user.role) === "admin_rh";
  const canCreateMeeting = (user == null ? void 0 : user.role) === "resp_rh" || (user == null ? void 0 : user.role) === "admin_rh" || (user == null ? void 0 : user.role) === "direction";
  const isLoading = notesLoading || eventsLoading || palmaresLoading || meetingsLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-64 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  const handleAcknowledge = async (noteId) => {
    try {
      await apiFetch(`/api/v1/communication/notes/${noteId}/accuser-lecture`, { method: "POST" });
      const now = /* @__PURE__ */ new Date();
      const dateStr = now.toLocaleDateString("fr-FR");
      const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      setAcknowledgedNotes((prev) => ({
        ...prev,
        [noteId]: `✓ Lu le ${dateStr} à ${timeStr}`
      }));
      ue.success("Accusé de lecture enregistré");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Erreur lors de l'accusé de lecture");
    }
  };
  const handleCreateNote = async () => {
    if (!noteForm.title || !noteForm.content) {
      ue.error("Veuillez renseigner le titre et le contenu");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/communication/notes", {
        method: "POST",
        body: JSON.stringify(noteForm)
      });
      ue.success("Note de service créée");
      setShowNoteForm(false);
      setNoteForm({
        title: "",
        content: "",
        type: "Note de service",
        requires_acknowledgment: false,
        is_pinned: false
      });
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Erreur lors de la création");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCreateEvent = async () => {
    if (!eventForm.title || !eventForm.date_time || !eventForm.location) {
      ue.error("Veuillez renseigner le titre, la date/heure et le lieu");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/communication/evenements", {
        method: "POST",
        body: JSON.stringify(eventForm)
      });
      ue.success("Événement créé");
      setShowEventForm(false);
      setEventForm({ title: "", type: "Team Building", date_time: "", location: "" });
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Erreur lors de la création");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCreateMeeting = async () => {
    if (!meetingForm.title || !meetingForm.date_time) {
      ue.error("Veuillez renseigner le titre et la date/heure");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/communication/reunions", {
        method: "POST",
        body: JSON.stringify({
          ...meetingForm,
          attendees: meetingForm.attendees.split(",").map((s) => s.trim()).filter(Boolean)
        })
      });
      ue.success("Réunion enregistrée");
      setShowMeetingForm(false);
      setMeetingForm({ title: "", date_time: "", attendees: "", notes: "" });
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Espace Communication" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Notes internes, événements et actualités de l'entreprise" })
      ] }),
      ((user == null ? void 0 : user.role) === "resp_rh" || (user == null ? void 0 : user.role) === "admin_rh") && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowNoteForm(!showNoteForm), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
        showNoteForm ? "Annuler" : "Nouvelle Publication"
      ] })
    ] }),
    showNoteForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/50 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Nouvelle Note de Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Publiez une information officielle pour tous les collaborateurs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Titre" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
                value: noteForm.title,
                onChange: (e) => setNoteForm({ ...noteForm, title: e.target.value }),
                placeholder: "Ex: Fermeture exceptionnelle"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
                value: noteForm.type,
                onChange: (e) => setNoteForm({ ...noteForm, type: e.target.value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Note de service", children: "Note de service" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Circulaire", children: "Circulaire" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Information", children: "Information" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Contenu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: noteForm.content,
              onChange: (e) => setNoteForm({ ...noteForm, content: e.target.value }),
              rows: 4,
              placeholder: "Détail de l'information..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: noteForm.requires_acknowledgment,
                onChange: (e) => setNoteForm({ ...noteForm, requires_acknowledgment: e.target.checked }),
                className: "rounded border-border"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Exiger un accusé de lecture" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: noteForm.is_pinned,
                onChange: (e) => setNoteForm({ ...noteForm, is_pinned: e.target.checked }),
                className: "rounded border-border"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Épingler en haut" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCreateNote, disabled: isSubmitting, children: isSubmitting ? "Publication..." : "Publier la note" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "notes", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-3 max-w-[520px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "notes", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 14 }),
            "Notes & Circulaires"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "events", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }),
            "Événements RH"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "meetings", className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
            "Réunions"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "notes", className: "mt-6 space-y-4", children: [
          (notes ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune note publiée." }),
          notes == null ? void 0 : notes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `relative overflow-hidden ${note.is_pinned ? "border-primary/30 bg-primary/5" : ""}`, children: [
            note.is_pinned && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { size: 14, className: "text-primary fill-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px] uppercase", children: note.type }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(note.publish_date).toLocaleDateString("fr-FR") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: note.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm text-muted-foreground mb-4 ${expandedNoteId === note.id ? "" : "line-clamp-3"}`, children: note.content }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "link",
                    className: "p-0 h-auto text-primary gap-1 text-sm",
                    onClick: () => setExpandedNoteId((prev) => prev === note.id ? null : note.id),
                    children: [
                      expandedNoteId === note.id ? "Réduire" : "Lire la suite",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
                    ]
                  }
                ),
                acknowledgedNotes[note.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-accent flex items-center gap-1", children: acknowledgedNotes[note.id] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => handleAcknowledge(note.id),
                    children: "Accuser réception / Lu"
                  }
                )
              ] })
            ] })
          ] }, note.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "events", className: "mt-6 space-y-4", children: [
          canCreateEvent && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Créer un événement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setShowEventForm((v) => !v), children: showEventForm ? "Fermer" : "Nouveau" })
            ] }) }),
            showEventForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-muted-foreground", children: "Titre" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      className: "mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
                      value: eventForm.title,
                      onChange: (e) => setEventForm((p) => ({ ...p, title: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-muted-foreground", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      className: "mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
                      value: eventForm.type,
                      onChange: (e) => setEventForm((p) => ({ ...p, type: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-muted-foreground", children: "Date & heure" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "datetime-local",
                      className: "mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
                      value: eventForm.date_time,
                      onChange: (e) => setEventForm((p) => ({ ...p, date_time: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-muted-foreground", children: "Lieu" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      className: "mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
                      value: eventForm.location,
                      onChange: (e) => setEventForm((p) => ({ ...p, location: e.target.value }))
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: handleCreateEvent, disabled: isSubmitting, children: isSubmitting ? "Création..." : "Créer l'événement" }) })
            ] })
          ] }),
          (events ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucun événement planifié." }),
          events == null ? void 0 : events.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:w-32 bg-muted flex flex-col items-center justify-center p-4 text-center border-r", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary", children: new Date(event.date_time).getDate() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase font-semibold", children: new Date(event.date_time).toLocaleString("fr-FR", { month: "short" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: event.type }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-2", children: event.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                  new Date(event.date_time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
                  event.location
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", disabled: true, children: "Participer" }) })
          ] }) }, event.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "meetings", className: "mt-6 space-y-4", children: [
          canCreateMeeting && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Enregistrer une réunion" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setShowMeetingForm((v) => !v), children: showMeetingForm ? "Fermer" : "Nouveau" })
            ] }) }),
            showMeetingForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-muted-foreground", children: "Titre" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      className: "mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
                      value: meetingForm.title,
                      onChange: (e) => setMeetingForm((p) => ({ ...p, title: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-muted-foreground", children: "Date & heure" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "datetime-local",
                      className: "mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
                      value: meetingForm.date_time,
                      onChange: (e) => setMeetingForm((p) => ({ ...p, date_time: e.target.value }))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-muted-foreground", children: "Participants (emails séparés par virgules)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      className: "mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm",
                      value: meetingForm.attendees,
                      onChange: (e) => setMeetingForm((p) => ({ ...p, attendees: e.target.value })),
                      placeholder: "ex: rh@ices.bj, dir@ices.bj"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-muted-foreground", children: "Compte-rendu (PV)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      value: meetingForm.notes,
                      onChange: (e) => setMeetingForm((p) => ({ ...p, notes: e.target.value })),
                      rows: 4
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: handleCreateMeeting, disabled: isSubmitting, children: isSubmitting ? "Enregistrement..." : "Enregistrer" }) })
            ] })
          ] }),
          (meetings ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aucune réunion enregistrée." }) : (meetings ?? []).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: m.title ?? "Réunion" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: m.date_time ? new Date(m.date_time).toLocaleString("fr-FR") : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground whitespace-pre-wrap", children: m.notes ?? m.pv ?? "—" }) })
          ] }, m.id ?? `${m.title}-${m.date_time}`))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-gradient-to-br from-primary/10 via-background to-accent/5 border-primary/20 shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-10 w-10 text-amber-500 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Collaborateur du Mois" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: palmares == null ? void 0 : palmares.period })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "text-center space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-24 h-24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: (palmares == null ? void 0 : palmares.photo_url) || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
                  className: "w-full h-full rounded-full object-cover border-4 border-white shadow-xl",
                  alt: palmares == null ? void 0 : palmares.employee_name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-2 -right-2 bg-amber-500 text-white p-1.5 rounded-full border-2 border-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 14 }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-lg", children: palmares == null ? void 0 : palmares.employee_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: palmares == null ? void 0 : palmares.position })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/50 dark:bg-black/20 p-4 rounded-xl text-sm italic border border-white/50", children: [
              '"',
              palmares == null ? void 0 : palmares.reason,
              '"'
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16 }),
            "Documents utiles"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: ["Règlement intérieur", "Charte informatique", "Guide du télétravail"].map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full px-6 py-3 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between group", children: [
            doc,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "text-muted-foreground group-hover:text-primary transition-colors" })
          ] }, doc)) }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  CommunicationPage as default
};
