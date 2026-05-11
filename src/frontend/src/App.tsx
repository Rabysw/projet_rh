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
const EmployeeDetailPage = lazy(() => import("@/pages/resp_rh/EmployeeDetailPage"));
const AttendancePage = lazy(() => import("@/pages/resp_rh/AttendancePage"));
const ContractsPage = lazy(() => import("@/pages/resp_rh/ContractsPage"));

// Collaborateur pages
const ProfilePage = lazy(() => import("@/pages/collaborateur/ProfilePage"));
const LeavePage = lazy(() => import("@/pages/collaborateur/LeavePage"));
const PayslipsPage = lazy(() => import("@/pages/collaborateur/PayslipsPage"));
const TrainingsPage = lazy(() => import("@/pages/collaborateur/TrainingsPage"));
const SkillsPage = lazy(() => import("@/pages/collaborateur/SkillsPage"));
const CareerPlanPage = lazy(() => import("@/pages/collaborateur/CareerPlanPage"));
const SuggestionsPage = lazy(() => import("@/pages/collaborateur/SuggestionsPage"));

// Manager pages
const TeamPage = lazy(() => import("@/pages/manager/TeamPage"));
const TeamLeavePage = lazy(() => import("@/pages/manager/TeamLeavePage"));
const TeamSkillsPage = lazy(() => import("@/pages/manager/TeamSkillsPage"));
const TeamProductivityPage = lazy(() => import("@/pages/manager/TeamProductivityPage"));
const KanbanPage = lazy(() => import("@/pages/manager/KanbanPage"));

// Communication pages
const CommunicationPage = lazy(() => import("@/pages/communication/CommunicationPage"));

// Resp RH pages
const RHEmployeesPage = lazy(() => import("@/pages/resp_rh/EmployeesPage"));
const RHContractsPage = lazy(() => import("@/pages/resp_rh/ContractsPage"));

// Admin RH pages
const AdminUsersPage = lazy(() => import("@/pages/admin_rh/UsersPage"));
const AdminConfigPage = lazy(() => import("@/pages/admin_rh/ConfigPage"));

// Direction pages
const DirectionReportsPage = lazy(() => import("@/pages/direction/ReportsPage"));

import { CompanyConfigProvider, useCompanyConfig } from "@/contexts/CompanyConfigContext";

function PageLoader() {
  return (
    <div className="flex h-64 items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

const SetupPage = lazy(() => import("@/pages/admin/SetupPage"));

type StoredUser = {
  role?: string;
};

async function readBootstrapState() {
  const token = localStorage.getItem("ices_token");
  const rawUser = localStorage.getItem("ices_user");
  const user: StoredUser | null = rawUser ? JSON.parse(rawUser) : null;
  const role = user?.role ?? "";

  if (!token) {
    return { isAuthenticated: false, role, isConfigured: false };
  }

  // Only admin-like users need setup bootstrap
  if (!["admin_rh", "resp_rh"].includes(role)) {
    return { isAuthenticated: true, role, isConfigured: true };
  }

  const response = await fetch("/api/v1/admin/company-config", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    // Fail-open for non-ready backend, fail-closed only for explicit null
    return { isAuthenticated: true, role, isConfigured: true };
  }

  const data = await response.json();
  return {
    isAuthenticated: true,
    role,
    isConfigured: !!(data && data.company_name),
  };
}

// Root route
const rootRoute = createRootRoute({
  component: Outlet,
});

// Login route
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

// Protected layout route
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

// Dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

// Employees list
const rhEmployeesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/rh-employees",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EmployeesPage />
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

// Employee detail
const employeeDetailRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/employees/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EmployeeDetailPage />
    </Suspense>
  ),
});

// Collaborateur routes
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

// Manager routes
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

// Resp RH routes
// rhEmployeesRoute and rhContractsRoute are declared above

// Admin routes
const adminUsersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-users",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminUsersPage />
    </Suspense>
  ),
});

const adminConfigRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin/configuration",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminConfigPage />
    </Suspense>
  ),
});

// Direction routes
const directionReportsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/direction-reports",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DirectionReportsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  setupRoute,
  protectedRoute.addChildren([
    dashboardRoute,
    profileRoute,
    leaveRoute,
    payslipsRoute,
    trainingsRoute,
    skillsRoute,
    careerPlanRoute,
    suggestionsRoute,
    communicationRoute,
    teamRoute,
    teamLeaveRoute,
    teamSkillsRoute,
    teamProductivityRoute,
    kanbanRoute,
    rhEmployeesRoute,
    rhAttendanceRoute,
    rhContractsRoute,
    employeeDetailRoute,
    adminUsersRoute,
    adminConfigRoute,
    directionReportsRoute,
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
    <CompanyConfigProvider>
      <RouterProvider router={router} />
    </CompanyConfigProvider>
  );
}
