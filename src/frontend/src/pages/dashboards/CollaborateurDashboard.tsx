import { useIcesAuth } from "@/hooks/use-ices-auth";
import { useApi } from "@/hooks/use-api";
import { useNotifications } from "@/hooks/use-notifications";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { downloadFile } from "@/lib/download";
import { toast } from "sonner";
import { 
  Bell, 
  Calendar, 
  TrendingUp, 
  FileText, 
  BookOpen,
  MessageSquare,
  Users,
  Trophy,
  Loader2
} from "lucide-react";

export default function CollaborateurDashboard() {
  const { user } = useIcesAuth();
  const { data, isLoading } = useApi<any>("/api/v1/dashboard/collaborateur");
  const { data: payslips } = useApi<any[]>("/api/v1/collaborateur/payslips");
  const { data: palmares } = useApi<any>("/api/v1/communication/palmares");
  const { notifications, isLoading: notifLoading, markAsRead, markAllAsRead } = useNotifications();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const latestPayslip = payslips?.[0];
  const handleDownloadPayslip = async () => {
    if (!latestPayslip) return;
    try {
      await downloadFile(
        `/documents/generate/payslip/${latestPayslip.id}`,
        `bulletin_${String(latestPayslip.month ?? "dernier").replaceAll(" ", "_")}.pdf`,
      );
      toast.success("Téléchargement lancé");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur de téléchargement");
    }
  };

  const kpis = data?.kpis || { conges_restants: 0, formations_planifiees: 0, demandes_en_cours: 0 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Principal du Collaborateur</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.full_name} — Accès collaborateur à votre dossier personnel et vos demandes RH.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jours de congés restants</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.conges_restants}</div>
            <p className="text-xs text-muted-foreground">sur {data?.solde_conges?.total || 25} jours annuels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Formations planifiées</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.formations_planifiees}</div>
            <p className="text-xs text-muted-foreground">formées planifiées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demandes en cours</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.demandes_en_cours}</div>
            <p className="text-xs text-muted-foreground">en cours de validation</p>
          </CardContent>
        </Card>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Notifications récentes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications récentes
              </CardTitle>
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={markAllAsRead}
              >
                Tout marquer comme lu
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifLoading ? (
                <div className="text-sm text-muted-foreground">Chargement des notifications…</div>
              ) : (
                notifications.map((notif: any) => (
                  <button
                    type="button"
                    key={notif._key}
                    className="w-full text-left flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => markAsRead(notif._key)}
                  >
                    <div className={`w-2 h-2 rounded-full ${notif.lu ? "bg-muted" : "bg-accent"}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notif.type}</p>
                      <p className="text-xs text-muted-foreground">{notif.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{notif.date}</span>
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Solde de congés */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Solde de congés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Jauge visuelle : jours restants / pris / totaux */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Jours utilisés ({data?.solde_conges?.pris})</span>
                  <span>Restants ({data?.solde_conges?.restants}) / Total ({data?.solde_conges?.total})</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden flex">
                  <div className="bg-secondary h-3 rounded-l-full" style={{ width: `${(data?.solde_conges?.pris / data?.solde_conges?.total) * 100}%` }}></div>
                  <div className="bg-primary h-3 rounded-r-full" style={{ width: `${(data?.solde_conges?.restants / data?.solde_conges?.total) * 100}%` }}></div>
                </div>
                <div className="flex gap-3 text-xs mt-1">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>Pris : {data?.solde_conges?.pris}j</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block"></span>Restants : {data?.solde_conges?.restants}j</span>
                </div>
              </div>
              <div className="pt-2 border-t space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Congés exceptionnels</span>
                  <span className="font-medium">{data?.solde_conges?.exceptionnels ?? 0} jours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total restant</span>
                  <span className="font-bold text-primary">{data?.solde_conges?.restants ?? 0} jours</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prochaine formation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Prochaine formation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="font-medium">{data?.prochaine_formation?.titre || "Aucune formation prévue"}</p>
                <p className="text-sm text-muted-foreground">{data?.prochaine_formation?.date_debut}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                  {data?.prochaine_formation?.statut || "N/A"}
                </span>
                <span className="text-xs text-muted-foreground">Présentiel</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan de carrière */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Mon plan de carrière
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Objectif en cours</p>
                <p className="text-sm text-muted-foreground">{data?.plan_carriere?.dernier_objectif}</p>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${data?.plan_carriere?.progression}%` }}></div>
              </div>
              <p className="text-xs text-muted-foreground">{data?.plan_carriere?.progression}% complété</p>
            </div>
          </CardContent>
        </Card>

        {/* Dernière fiche de paie */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dernière fiche de paie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="font-medium">{data?.derniere_fiche_paie?.mois}</p>
                <p className="text-sm text-muted-foreground">Disponible au téléchargement</p>
                <p className="font-medium text-primary text-xl">{data?.derniere_fiche_paie?.net?.toLocaleString()} FCFA</p>
              </div>
              <button
                className="w-full px-3 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
                disabled={!latestPayslip}
                onClick={handleDownloadPayslip}
              >
                Télécharger PDF
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Actualités RH */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Actualités RH
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.actualites_rh?.map((actu: any, idx: number) => (
                <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium">{actu.titre}</p>
                  <p className="text-xs text-muted-foreground">{actu.resume}</p>
                  <span className="text-xs text-muted-foreground">Publié le {actu.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Palmarès Collaborateur du Mois */}
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/10 dark:to-background border-amber-200 shadow-md">
          <CardHeader className="text-center pb-2">
            <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Palmarès ICES</CardTitle>
            <CardDescription>{palmares?.period}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            {palmares?.employee_name ? (
              <>
                <div className="relative mx-auto w-16 h-16">
                  <img 
                    src={palmares.photo_url} 
                    className="w-full h-full rounded-full object-cover border-2 border-white shadow-md"
                    alt={palmares.employee_name}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{palmares.employee_name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{palmares.position}</p>
                </div>
                <div className="bg-white/60 dark:bg-black/20 p-2 rounded-lg text-[11px] italic border border-amber-100">
                  "{palmares.reason}"
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground py-4">
                Aucune donnée disponible pour le moment
              </p>
            )}
          </CardContent>
        </Card>

        {/* Boîte à suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Boîte à suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Vos suggestions</p>
                <p className="text-xs text-muted-foreground">
                  {data?.suggestions?.resume || "Aucune donnée disponible pour le moment"}
                </p>
              </div>
              <button className="w-full px-3 py-2 bg-muted text-muted-foreground text-sm rounded-lg hover:bg-muted/80 transition-colors">
                Nouvelle suggestion
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}