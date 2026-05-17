import { useIcesAuth } from "@/contexts/AuthContext";
import CollaborateurDashboard from "./dashboards/CollaborateurDashboard";
import ManagerDashboard from "./dashboards/ManagerDashboard";
import RespRHDashboard from "./dashboards/RespRHDashboard";
import AdminRHDashboard from "./dashboards/AdminRHDashboard";
import DirectionDashboard from "./dashboards/DirectionDashboard";

export default function DashboardPage() {
  const { user } = useIcesAuth();

  if (!user) return null;

  switch (user.role) {
    case "collaborateur":
      return <CollaborateurDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "resp_rh":
      return <RespRHDashboard />;
    case "admin_rh":
      return <AdminRHDashboard />;
    case "direction":
      return <DirectionDashboard />;
    default:
      return <CollaborateurDashboard />;
  }
}
