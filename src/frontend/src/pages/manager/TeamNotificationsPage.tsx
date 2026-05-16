import { useApi, apiFetch } from "@/hooks/use-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { toast } from "sonner";
import {
  Bell,
  BellOff,
  CheckCheck,
  Calendar,
  Award,
  AlertTriangle,
  MessageSquare,
  Loader2,
  Circle,
} from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const TYPE_CONFIG: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  leave:        { icon: Calendar,      color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-900/20" },
  evaluation:   { icon: Award,         color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
  alert:        { icon: AlertTriangle, color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-900/20" },
  message:      { icon: MessageSquare, color: "text-green-500",  bg: "bg-green-50 dark:bg-green-900/20" },
  default:      { icon: Bell,          color: "text-primary",    bg: "bg-primary/5" },
};

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days}j`;
}

export default function TeamNotificationsPage() {
  const { data: notifications, isLoading, refetch } =
    useApi<Notification[]>("/api/v1/manager/notifications");

  const unreadCount = (notifications ?? []).filter((n) => !n.is_read).length;

  const markRead = async (id: string) => {
    try {
      await apiFetch(`/api/v1/manager/notifications/${id}/read`, {
        method: "PATCH",
      });
      refetch();
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const markAllRead = async () => {
    try {
      await apiFetch("/api/v1/manager/notifications/read-all", {
        method: "PATCH",
      });
      toast.success("Toutes les notifications marquées comme lues");
      refetch();
    } catch {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const items = notifications ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Activité récente de votre équipe
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2">
            <CheckCheck className="h-4 w-4" />
            Tout marquer comme lu ({unreadCount})
          </Button>
        )}
      </div>

      {/* Résumé */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: items.length, icon: Bell, color: "text-foreground" },
          { label: "Non lues", value: unreadCount, icon: Circle, color: "text-primary" },
          { label: "Congés", value: items.filter((n) => n.type === "leave").length, icon: Calendar, color: "text-blue-500" },
          { label: "Alertes", value: items.filter((n) => n.type === "alert").length, icon: AlertTriangle, color: "text-amber-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <div>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Liste */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Toutes les notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
              <BellOff className="h-10 w-10 opacity-30" />
              <p className="text-sm">Aucune notification pour le moment</p>
            </div>
          ) : (
            items.map((notif) => {
              const cfg = TYPE_CONFIG[notif.type] ?? TYPE_CONFIG.default;
              const Icon = cfg.icon;
              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                    notif.is_read
                      ? "bg-muted/20 opacity-70"
                      : "bg-muted/50 border border-border/60"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${cfg.bg}`}
                  >
                    <Icon className={`h-4 w-4 ${cfg.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{notif.title}</p>
                      {!notif.is_read && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {notif.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {timeAgo(notif.created_at)}
                    </p>
                  </div>

                  {!notif.is_read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="shrink-0 text-xs"
                      onClick={() => markRead(notif.id)}
                    >
                      Marquer lu
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}