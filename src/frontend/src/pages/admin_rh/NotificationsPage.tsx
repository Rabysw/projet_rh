import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Bell, Mail, Smartphone, MessageSquare, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NotificationsConfigPage() {
  const settings = [
    { id: "new_request", title: "Nouvelle demande de congé", desc: "Notifier les managers par email", icon: Bell },
    { id: "contract_expiry", title: "Expiration de contrat", desc: "Alerte RH 60 jours avant", icon: Mail },
    { id: "birthday", title: "Anniversaires", desc: "Notification sur le dashboard collaborateur", icon: Smartphone },
    { id: "eval_reminder", title: "Relance évaluations", desc: "Email automatique aux retardataires", icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuration des Notifications</h1>
        <p className="text-muted-foreground">Personnalisez les alertes et les communications automatiques</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor={s.id} className="text-base font-semibold block mb-1">{s.title}</Label>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <Switch id={s.id} defaultChecked />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Paramètres SMTP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Serveur SMTP</Label>
              <div className="p-2 border rounded bg-muted/30 text-sm">smtp.gmail.com</div>
            </div>
            <div className="space-y-2">
              <Label>Port</Label>
              <div className="p-2 border rounded bg-muted/30 text-sm">587</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
