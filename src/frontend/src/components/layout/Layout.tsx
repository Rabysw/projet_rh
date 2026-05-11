import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useIcesAuth } from "@/hooks/use-ices-auth";
import { Outlet } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useEffect } from "react";
import { Header } from "./Header";
import { IcesSidebar } from "./IcesSidebar";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, loginStatus, user } = useIcesAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const path = window.location.pathname;
    const role = user.role;

    const isAllowed = (() => {
      // Collaborateur
      if (role === "collaborateur") {
        return [
          "/",
          "/profile",
          "/leave",
          "/payslips",
          "/trainings",
          "/skills",
          "/suggestions",
          "/communication",
        ].includes(path);
      }

      // Manager
      if (role === "manager") {
        return [
          "/",
          "/team",
          "/team-leave",
          "/team-skills",
          "/team/productivity",
          "/projects",
          "/profile",
          "/leave",
        ].includes(path);
      }

      // Resp RH
      if (role === "resp_rh") {
        return ["/", "/rh-employees", "/rh-contracts", "/communication", "/admin/configuration"].includes(path);
      }

      // Admin RH
      if (role === "admin_rh") {
        // Admin peut accéder à tous les modules RH + admin users + pages employees CRUD
        return [
          "/",
          "/admin-users",
          "/rh-employees",
          "/rh-contracts",
          "/communication",
          "/employees",
          "/admin/configuration",
        ].includes(path) || path.startsWith("/employees/");
      }

      // Direction
      if (role === "direction") {
        return ["/", "/direction-reports", "/communication"].includes(path);
      }

      return false;
    })();

    if (!isAllowed) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, router, user]);

  if (loginStatus === "logging-in") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <IcesSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 overflow-y-auto bg-background px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
