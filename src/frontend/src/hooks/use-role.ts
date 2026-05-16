import { HRRole } from "@/types";
import { useIcesAuth } from "@/contexts/AuthContext";

export function useRole() {
  const { user } = useIcesAuth();
  
  const roleMap: Record<string, HRRole> = {
    "admin_rh": HRRole.HRAdmin,
    "resp_rh": HRRole.HRManager,
    "manager": HRRole.Manager,
    "collaborateur": HRRole.Employee,
    "direction": HRRole.Direction,
  };

  return {
    role: user?.role ? roleMap[user.role] || HRRole.Employee : null,
    isLoading: false,
  };
}
