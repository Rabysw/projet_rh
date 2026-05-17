import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import IcesLoginPage from "@/pages/IcesLoginPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy pages
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const EmployeesPage = lazy(() => import("@/pages/resp_rh/EmployeesPage"));
const NewEmployeePage = lazy(() => import("@/pages/NewEmployeePage"));
const EditEmployeePage = lazy(() => import("@/pages/EditEmployeePage"));
const EmployeeDetailPage = lazy(() => import("@/pages/resp_rh/EmployeeDetailPage"));
const AttendancePage = lazy(() => import("@/pages/resp_rh/AttendancePage"));
const ContractsPage = lazy(() => import("@/pages/resp_rh/ContractsPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));

// Collaborateur pages
const ProfilePage = lazy(() => import("@/pages/collaborateur/ProfilePage"));
const LeavePage = lazy(() => import("@/pages/collaborateur/LeavePage"));
const PresencesPage = lazy(() => import("@/pages/collaborateur/Presencespage"));
const PayslipsPage = lazy(() => import("@/pages/collaborateur/PayslipsPage"));
const TrainingsPage = lazy(() => import("@/pages/collaborateur/TrainingsPage"));
const SkillsPage = lazy(() => import("@/pages/collaborateur/SkillsPage"));
const EvaluationsPage = lazy(() => import("@/pages/EvaluationsPage"));
const CareerPlanPage = lazy(() => import("@/pages/collaborateur/CareerPlanPage"));
const SuggestionsPage = lazy(() => import("@/pages/collaborateur/SuggestionsPage"));

// Manager pages
const TeamPage = lazy(() => import("@/pages/manager/TeamPage"));
const TeamLeavePage = lazy(() => import("@/pages/manager/TeamLeavePage"));
const TeamSkillsPage = lazy(() => import("@/pages/manager/TeamSkillsPage"));
const TeamProductivityPage = lazy(() => import("@/pages/manager/TeamProductivityPage"));
const KanbanPage = lazy(() => import("@/pages/manager/KanbanPage"));
const TeamTrainingsPage = lazy(() => import("@/pages/manager/TeamTrainingsPage"));
const TeamNotificationsPage = lazy(() => import("@/pages/manager/TeamNotificationsPage"));
const TeamReportsPage = lazy(() => import("@/pages/manager/TeamReportsPage"));

// Communication pages
const CommunicationPage = lazy(() => import("@/pages/communication/CommunicationPage"));

// Resp RH pages
const RHEmployeesPage = lazy(() => import("@/pages/resp_rh/EmployeesPage"));
const RHContractsPage = lazy(() => import("@/pages/resp_rh/ContractsPage"));

// Admin RH pages
const AdminUsersPage = lazy(() => import("@/pages/admin_rh/UsersPage"));
const AdminConfigPage = lazy(() => import("@/pages/admin_rh/ConfigPage"));
const AdminRolesPage = lazy(() => import("@/pages/admin_rh/RolesPage"));
const AdminSecurityPage = lazy(() => import("@/pages/admin_rh/SecurityPage"));
const AdminLogsPage = lazy(() => import("@/pages/admin_rh/LogsPage"));
const AdminBackupsPage = lazy(() => import("@/pages/admin_rh/BackupsPage"));
const AdminNotificationsPage = lazy(() => import("@/pages/admin_rh/NotificationsPage"));

// Direction pages
const DirectionReportsPage = lazy(() => import("@/pages/direction/ReportsPage"));
const DirectionKpiPage = lazy(() => import("@/pages/direction/KpiPage"));
const DirectionAnalyticsPage = lazy(() => import("@/pages/direction/AnalyticsPage"));
const DirectionExportsPage = lazy(() => import("@/pages/direction/ExportsPage"));

// IA pages
const ChatbotPage = lazy(() => import("@/pages/ia/ChatbotPage"));
const IaDocumentsPage = lazy(() => import("@/pages/ia/IaDocumentsPage"));
const TurnoverPage = lazy(() => import("@/pages/ia/TurnoverPage"));
const MatchingPage = lazy(() => import("@/pages/ia/MatchingPage"));

const RHCongesPage = lazy(() => import("@/pages/resp_rh/RHCongesPage"));
const EnquetesPage = lazy(() => import("@/pages/resp_rh/EnquetesPage"));

// Setup page
const SetupPage = lazy(() => import("@/pages/admin/SetupPage"));

import { CompanyConfigProvider } from "@/contexts/CompanyConfigContext";
import { AuthProvider } from "@/contexts/AuthContext";

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

// ─── Role Guard ───────────────────────────────────────────────────────────────

function RoleGuard({
  allowed,
  children,
}: {
  allowed: string[];
  children: React.ReactNode;
}) {
  const rawUser = localStorage.getItem("ices_user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const role = user?.role ?? "";

  if (!allowed.includes(role)) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>
        <div>
          <p className="text-xl font-bold text-destructive">Accès refusé (403)</p>
          <p className="text-sm text-muted-foreground mt-1">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

type StoredUser = {
  role?: string;
};

async function readBootstrapState() {
  const token = localStorage.getItem("ices_token");
  const rawUser = localStorage.getItem("ices_user");
  const user: StoredUser | null = (rawUser && rawUser !== "undefined")
    ? JSON.parse(rawUser)
    : null;
  const role = user?.role ?? "";

  if (!token) {
    return { isAuthenticated: false, role, isConfigured: false };
  }

  if (!["admin_rh", "resp_rh"].includes(role)) {
    return { isAuthenticated: true, role, isConfigured: true };
  }

  try {
    const response = await fetch("/api/v1/admin/company-config", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      return { isAuthenticated: true, role, isConfigured: false };
    }

    const data = await response.json();
    const forceSetup = localStorage.getItem("force_setup") === "true";
    const isConfigured = !forceSetup && !!(
      data &&
      data.company_name &&
      data.company_name.trim() !== ""
    );

    return { isAuthenticated: true, role, isConfigured };
  } catch {
    return { isAuthenticated: true, role, isConfigured: false };
  }
}

// ─── Routes ───────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: Outlet,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: IcesLoginPage,
  beforeLoad: async () => {
    const state = await readBootstrapState();
    if (state.isAuthenticated && !state.isConfigured) {
      throw redirect({ to: "/setup" });
    }
    if (state.isAuthenticated && state.isConfigured) {
      throw redirect({ to: "/" });
    }
  },
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ForgotPasswordPage />
    </Suspense>
  ),
});

const setupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setup",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SetupPage />
    </Suspense>
  ),
  beforeLoad: async () => {
    const state = await readBootstrapState();
    if (!state.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
    if (state.isConfigured) {
      throw redirect({ to: "/" });
    }
  },
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: () => <Layout />,
  beforeLoad: async () => {
    const state = await readBootstrapState();
    if (!state.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
    if (!state.isConfigured && ["admin_rh", "resp_rh"].includes(state.role)) {
      throw redirect({ to: "/setup" });
    }
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const rhEmployeesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/rh-employees",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EmployeesPage />
    </Suspense>
  ),
});

const newEmployeeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/rh-employees/new",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NewEmployeePage />
    </Suspense>
  ),
});

const editEmployeeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/rh-employees/$id/edit",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EditEmployeePage />
    </Suspense>
  ),
});

const rhAttendanceRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/rh-attendance",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AttendancePage />
    </Suspense>
  ),
});

const rhContractsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/rh-contracts",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContractsPage />
    </Suspense>
  ),
});

const rhCongesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/rh-conges",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["resp_rh", "admin_rh"]}>
        <RHCongesPage />
      </RoleGuard>
    </Suspense>
  ),
});

const enquetesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/enquetes",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["resp_rh", "admin_rh"]}>
        <EnquetesPage />
      </RoleGuard>
    </Suspense>
  ),
});

const employeeDetailRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/rh-employees/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EmployeeDetailPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});

const leaveRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/leave",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LeavePage />
    </Suspense>
  ),
});

const presencesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/presences",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["collaborateur", "manager", "resp_rh", "admin_rh"]}>
        <PresencesPage />
      </RoleGuard>
    </Suspense>
  ),
});

const payslipsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/payslips",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PayslipsPage />
    </Suspense>
  ),
});

const trainingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/trainings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TrainingsPage />
    </Suspense>
  ),
});

const skillsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/skills",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SkillsPage />
    </Suspense>
  ),
});

const careerPlanRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/career",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CareerPlanPage />
    </Suspense>
  ),
});

const suggestionsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/suggestions",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SuggestionsPage />
    </Suspense>
  ),
});

const communicationRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/communication",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CommunicationPage />
    </Suspense>
  ),
});

const teamRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/team",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TeamPage />
    </Suspense>
  ),
});

const teamLeaveRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/team-leave",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TeamLeavePage />
    </Suspense>
  ),
});

const teamSkillsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/team-skills",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TeamSkillsPage />
    </Suspense>
  ),
});

const teamProductivityRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/team/productivity",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TeamProductivityPage />
    </Suspense>
  ),
});

const kanbanRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/projects",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <KanbanPage />
    </Suspense>
  ),
});

const evaluationsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/evaluations",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["collaborateur", "manager", "resp_rh", "admin_rh"]}>
        <EvaluationsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const teamTrainingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/team-trainings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["manager", "admin_rh"]}>
        <TeamTrainingsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const teamNotificationsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/team-notifications",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["manager", "admin_rh"]}>
        <TeamNotificationsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const teamReportsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/team-reports",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["manager", "admin_rh"]}>
        <TeamReportsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-users",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminUsersPage />
    </Suspense>
  ),
});

const adminRolesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-roles",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["admin_rh"]}>
        <AdminRolesPage />
      </RoleGuard>
    </Suspense>
  ),
});

const adminSecurityRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-securite",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["admin_rh"]}>
        <AdminSecurityPage />
      </RoleGuard>
    </Suspense>
  ),
});

const adminLogsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-logs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["admin_rh"]}>
        <AdminLogsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const adminNotificationsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-notifications",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["admin_rh"]}>
        <AdminNotificationsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const adminBackupsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-sauvegardes",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["admin_rh"]}>
        <AdminBackupsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const adminConfigRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin/configuration",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["admin_rh"]}>
        <AdminConfigPage />
      </RoleGuard>
    </Suspense>
  ),
});

const directionReportsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/direction-reports",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["direction", "admin_rh"]}>
        <DirectionReportsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const directionKpiRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/direction-kpis",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["direction", "admin_rh"]}>
        <DirectionKpiPage />
      </RoleGuard>
    </Suspense>
  ),
});

const directionAnalyticsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/direction-analytics",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["direction", "admin_rh"]}>
        <DirectionAnalyticsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const directionExportsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/direction-exports",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["direction", "admin_rh"]}>
        <DirectionExportsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const iaChatbotRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/ia-chatbot",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ChatbotPage />
    </Suspense>
  ),
});

const iaDocumentsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/ia-documents",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <IaDocumentsPage />
    </Suspense>
  ),
});

const iaTurnoverRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/ia-turnover",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TurnoverPage />
    </Suspense>
  ),
});

const iaMatchingRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/ia-matching",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MatchingPage />
    </Suspense>
  ),
});

const genericReportsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/reports",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleGuard allowed={["admin_rh", "resp_rh", "direction"]}>
        <DirectionReportsPage />
      </RoleGuard>
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  forgotPasswordRoute,
  setupRoute,
  protectedRoute.addChildren([
    dashboardRoute,
    profileRoute,
    leaveRoute,
    presencesRoute,
    payslipsRoute,
    trainingsRoute,
    skillsRoute,
    evaluationsRoute,
    careerPlanRoute,
    suggestionsRoute,
    communicationRoute,
    teamRoute,
    teamLeaveRoute,
    teamSkillsRoute,
    teamProductivityRoute,
    kanbanRoute,
    teamTrainingsRoute,
    teamNotificationsRoute,
    teamReportsRoute,
    rhEmployeesRoute,
    newEmployeeRoute,
    editEmployeeRoute,
    rhAttendanceRoute,
    rhContractsRoute,
    rhCongesRoute,
    enquetesRoute,
    employeeDetailRoute,
    adminUsersRoute,
    adminRolesRoute,
    adminSecurityRoute,
    adminLogsRoute,
    adminNotificationsRoute,
    adminBackupsRoute,
    adminConfigRoute,
    directionReportsRoute,
    directionKpiRoute,
    directionAnalyticsRoute,
    directionExportsRoute,
    iaChatbotRoute,
    iaDocumentsRoute,
    iaTurnoverRoute,
    iaMatchingRoute,
    genericReportsRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <CompanyConfigProvider>
        <RouterProvider router={router} />
      </CompanyConfigProvider>
    </AuthProvider>
  );
}