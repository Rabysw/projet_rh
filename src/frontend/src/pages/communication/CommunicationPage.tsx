import { useApi, apiFetch } from "@/hooks/use-api";
import { useIcesAuth } from "@/hooks/use-ices-auth";
import { Note, InternalEvent } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Megaphone, 
  Calendar, 
  Trophy, 
  FileText, 
  Plus, 
  MapPin, 
  Clock, 
  ChevronRight,
  Pin,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { useMemo, useState } from "react";

export default function CommunicationPage() {
  const { user } = useIcesAuth();
  const { data: notes, isLoading: notesLoading } = useApi<Note[]>("/api/v1/communication/notes");
  const { data: events, isLoading: eventsLoading } = useApi<InternalEvent[]>("/api/v1/communication/events");
  const { data: palmares, isLoading: palmaresLoading } = useApi<any>("/api/v1/communication/palmares");
  const { data: meetings, isLoading: meetingsLoading } = useApi<any[]>("/api/v1/communication/reunions");

  const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: "",
    type: "Team Building",
    date_time: "",
    location: "",
  });
  const [meetingForm, setMeetingForm] = useState({
    title: "",
    date_time: "",
    attendees: "",
    notes: "",
  });

  const canCreateEvent = user?.role === "resp_rh" || user?.role === "admin_rh";
  const canCreateMeeting =
    user?.role === "resp_rh" || user?.role === "admin_rh" || user?.role === "direction";

  const isLoading = notesLoading || eventsLoading || palmaresLoading || meetingsLoading;

  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
    type: "Note de service",
    requires_acknowledgment: false,
    is_pinned: false
  });

  const hasPublisherEndpoint = true; // backend expose maintenant POST /communication/notes

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const [acknowledgedNotes, setAcknowledgedNotes] = useState<Record<number, string>>({});

  const handleAcknowledge = async (noteId: number) => {
    try {
      await apiFetch(`/api/v1/communication/notes/${noteId}/accuser-lecture`, { method: "POST" });
      const now = new Date();
      const dateStr = now.toLocaleDateString("fr-FR");
      const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      setAcknowledgedNotes(prev => ({
        ...prev,
        [noteId]: `✓ Lu le ${dateStr} à ${timeStr}`
      }));
      toast.success("Accusé de lecture enregistré");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'accusé de lecture");
    }
  };

  const handleCreateNote = async () => {
    if (!noteForm.title || !noteForm.content) {
      toast.error("Veuillez renseigner le titre et le contenu");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/communication/notes", {
        method: "POST",
        body: JSON.stringify(noteForm),
      });
      toast.success("Note de service créée");
      setShowNoteForm(false);
      setNoteForm({ 
        title: "", 
        content: "", 
        type: "Note de service", 
        requires_acknowledgment: false,
        is_pinned: false
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de la création");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateEvent = async () => {
    if (!eventForm.title || !eventForm.date_time || !eventForm.location) {
      toast.error("Veuillez renseigner le titre, la date/heure et le lieu");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/communication/evenements", {
        method: "POST",
        body: JSON.stringify(eventForm),
      });
      toast.success("Événement créé");
      setShowEventForm(false);
      setEventForm({ title: "", type: "Team Building", date_time: "", location: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de la création");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateMeeting = async () => {
    if (!meetingForm.title || !meetingForm.date_time) {
      toast.error("Veuillez renseigner le titre et la date/heure");
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/communication/reunions", {
        method: "POST",
        body: JSON.stringify({
          ...meetingForm,
          attendees: meetingForm.attendees
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });
      toast.success("Réunion enregistrée");
      setShowMeetingForm(false);
      setMeetingForm({ title: "", date_time: "", attendees: "", notes: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Espace Communication</h1>
          <p className="text-muted-foreground">Notes internes, événements et actualités de l'entreprise</p>
        </div>
        {(user?.role === "resp_rh" || user?.role === "admin_rh") && (
          <Button onClick={() => setShowNoteForm(!showNoteForm)}>
            <Plus size={16} />
            {showNoteForm ? "Annuler" : "Nouvelle Publication"}
          </Button>
        )}
      </div>

      {showNoteForm && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Nouvelle Note de Service</CardTitle>
            <CardDescription>Publiez une information officielle pour tous les collaborateurs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Titre</label>
                <input
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                  value={noteForm.title}
                  onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                  placeholder="Ex: Fermeture exceptionnelle"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                  value={noteForm.type}
                  onChange={(e) => setNoteForm({ ...noteForm, type: e.target.value })}
                >
                  <option value="Note de service">Note de service</option>
                  <option value="Circulaire">Circulaire</option>
                  <option value="Information">Information</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contenu</label>
              <Textarea
                value={noteForm.content}
                onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                rows={4}
                placeholder="Détail de l'information..."
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noteForm.requires_acknowledgment}
                  onChange={(e) => setNoteForm({ ...noteForm, requires_acknowledgment: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">Exiger un accusé de lecture</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noteForm.is_pinned}
                  onChange={(e) => setNoteForm({ ...noteForm, is_pinned: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">Épingler en haut</span>
              </label>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateNote} disabled={isSubmitting}>
                {isSubmitting ? "Publication..." : "Publier la note"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-[520px]">
              <TabsTrigger value="notes" className="gap-2">
                <Megaphone size={14} />
                Notes & Circulaires
              </TabsTrigger>
              <TabsTrigger value="events" className="gap-2">
                <Calendar size={14} />
                Événements RH
              </TabsTrigger>
              <TabsTrigger value="meetings" className="gap-2">
                <Clock size={14} />
                Réunions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="notes" className="mt-6 space-y-4">
              {notes?.map(note => (
                <Card key={note.id} className={`relative overflow-hidden ${note.is_pinned ? 'border-primary/30 bg-primary/5' : ''}`}>
                  {note.is_pinned && (
                    <div className="absolute top-0 right-0 p-2">
                      <Pin size={14} className="text-primary fill-primary" />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-[10px] uppercase">{note.type}</Badge>
                      <span className="text-xs text-muted-foreground">{new Date(note.publish_date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm text-muted-foreground mb-4 ${expandedNoteId === note.id ? "" : "line-clamp-3"}`}>
                      {note.content}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary gap-1 text-sm"
                        onClick={() => setExpandedNoteId((prev) => (prev === note.id ? null : note.id))}
                      >
                        {expandedNoteId === note.id ? "Réduire" : "Lire la suite"}
                        <ChevronRight size={14} />
                      </Button>
                        {acknowledgedNotes[note.id] ? (
                          <span className="text-xs font-medium text-accent flex items-center gap-1">
                            {acknowledgedNotes[note.id]}
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAcknowledge(note.id)}
                          >
                            Accuser réception / Lu
                          </Button>
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="events" className="mt-6 space-y-4">
              {canCreateEvent && (
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-base">Créer un événement</CardTitle>
                      <Button size="sm" variant="outline" onClick={() => setShowEventForm((v) => !v)}>
                        {showEventForm ? "Fermer" : "Nouveau"}
                      </Button>
                    </div>
                  </CardHeader>
                  {showEventForm && (
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-muted-foreground">Titre</label>
                          <input
                            className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                            value={eventForm.title}
                            onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground">Type</label>
                          <input
                            className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                            value={eventForm.type}
                            onChange={(e) => setEventForm((p) => ({ ...p, type: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground">Date & heure</label>
                          <input
                            type="datetime-local"
                            className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                            value={eventForm.date_time}
                            onChange={(e) => setEventForm((p) => ({ ...p, date_time: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground">Lieu</label>
                          <input
                            className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                            value={eventForm.location}
                            onChange={(e) => setEventForm((p) => ({ ...p, location: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" onClick={handleCreateEvent} disabled={isSubmitting}>
                          {isSubmitting ? "Création..." : "Créer l'événement"}
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )}
              {events?.map(event => (
                <Card key={event.id}>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-32 bg-muted flex flex-col items-center justify-center p-4 text-center border-r">
                      <span className="text-2xl font-bold text-primary">
                        {new Date(event.date_time).getDate()}
                      </span>
                      <span className="text-xs uppercase font-semibold">
                        {new Date(event.date_time).toLocaleString('fr-FR', { month: 'short' })}
                      </span>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[10px]">{event.type}</Badge>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          {new Date(event.date_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex items-center">
                      <Button variant="outline" size="sm" disabled title="Inscription/participation non implémentée côté backend">
                        Participer
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="meetings" className="mt-6 space-y-4">
              {canCreateMeeting && (
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-base">Enregistrer une réunion</CardTitle>
                      <Button size="sm" variant="outline" onClick={() => setShowMeetingForm((v) => !v)}>
                        {showMeetingForm ? "Fermer" : "Nouveau"}
                      </Button>
                    </div>
                  </CardHeader>
                  {showMeetingForm && (
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-muted-foreground">Titre</label>
                          <input
                            className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                            value={meetingForm.title}
                            onChange={(e) => setMeetingForm((p) => ({ ...p, title: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted-foreground">Date & heure</label>
                          <input
                            type="datetime-local"
                            className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                            value={meetingForm.date_time}
                            onChange={(e) => setMeetingForm((p) => ({ ...p, date_time: e.target.value }))}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-muted-foreground">Participants (emails séparés par virgules)</label>
                          <input
                            className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-sm"
                            value={meetingForm.attendees}
                            onChange={(e) => setMeetingForm((p) => ({ ...p, attendees: e.target.value }))}
                            placeholder="ex: rh@ices.bj, dir@ices.bj"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-muted-foreground">Compte-rendu (PV)</label>
                          <Textarea
                            value={meetingForm.notes}
                            onChange={(e) => setMeetingForm((p) => ({ ...p, notes: e.target.value }))}
                            rows={4}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" onClick={handleCreateMeeting} disabled={isSubmitting}>
                          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )}

              {(meetings ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune réunion enregistrée.</p>
              ) : (
                (meetings ?? []).map((m: any) => (
                  <Card key={m.id ?? `${m.title}-${m.date_time}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{m.title ?? "Réunion"}</CardTitle>
                      <CardDescription>
                        {m.date_time ? new Date(m.date_time).toLocaleString("fr-FR") : ""}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {m.notes ?? m.pv ?? "—"}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar / Palmarès */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/5 border-primary/20 shadow-lg">
            <CardHeader className="text-center pb-2">
              <Trophy className="h-10 w-10 text-amber-500 mx-auto mb-2" />
              <CardTitle className="text-xl">Collaborateur du Mois</CardTitle>
              <CardDescription>{palmares?.period}</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="relative mx-auto w-24 h-24">
                <img 
                  src={palmares?.photo_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"} 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                  alt={palmares?.employee_name}
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-1.5 rounded-full border-2 border-white">
                  <Trophy size={14} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg">{palmares?.employee_name}</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{palmares?.position}</p>
              </div>
              <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl text-sm italic border border-white/50">
                "{palmares?.reason}"
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <FileText size={16} />
                Documents utiles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {["Règlement intérieur", "Charte informatique", "Guide du télétravail"].map(doc => (
                  <button key={doc} className="w-full px-6 py-3 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between group">
                    {doc}
                    <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
