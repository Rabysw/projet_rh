import { RoleBadge, StatusBadge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { SkeletonRow } from "@/components/shared/LoadingSpinner";
import { ConfirmDeleteModal } from "@/components/shared/Modal";
import { PageHeader } from "@/components/shared/PageHeader";
import { Pagination } from "@/components/shared/Pagination";
import { SearchInput } from "@/components/shared/SearchInput";
import { SelectFilter } from "@/components/shared/SelectFilter";
import { apiClient } from "@/lib/api-client";
import { useIcesAuth } from "@/hooks/use-ices-auth";
import type { Department, Employee, PaginatedEmployees } from "@/types";
import { EmploymentStatus, HRRole } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Edit2, Eye, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 20;

const statusOptions = [
  { value: EmploymentStatus.Active, label: "Actif" },
  { value: EmploymentStatus.Inactive, label: "Inactif" },
  { value: EmploymentStatus.OnLeave, label: "Suspendu" },
];

const roleOptions = [
  { value: HRRole.HRAdmin, label: "Administrateur RH" },
  { value: HRRole.HRManager, label: "Responsable RH" },
  { value: HRRole.Manager, label: "Manager" },
  { value: HRRole.Employee, label: "Collaborateur" },
  { value: HRRole.Direction, label: "Direction" },
];

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") ?? "",
    status: params.get("status") ?? "",
    role: params.get("role") ?? "",
    dept: params.get("dept") ?? "",
    page: Math.max(1, Number(params.get("page") ?? "1")),
  };
}

function setUrlParam(key: string, value: string) {
  const params = new URLSearchParams(window.location.search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  if (key !== "page") params.set("page", "1");
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`,
  );
}

export default function EmployeesPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useIcesAuth();

  const isRH = user?.role === "admin_rh" || user?.role === "resp_rh";
  const isAdmin = user?.role === "admin_rh";
  const canAdd = isRH;

  const urlState = getUrlParams();
  const [search, setSearch] = useState(urlState.search);
  const [statusFilter, setStatusFilter] = useState(urlState.status);
  const [roleFilter, setRoleFilter] = useState(urlState.role);
  const [deptFilter, setDeptFilter] = useState(urlState.dept);
  const [page, setPage] = useState(urlState.page);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
    setUrlParam("search", v);
  };
  const handleStatus = (v: string) => {
    setStatusFilter(v);
    setPage(1);
    setUrlParam("status", v);
  };
  const handleRole = (v: string) => {
    setRoleFilter(v);
    setPage(1);
    setUrlParam("role", v);
  };
  const handleDept = (v: string) => {
    setDeptFilter(v);
    setPage(1);
    setUrlParam("dept", v);
  };
  const handlePage = (p: number) => {
    setPage(p);
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(p));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["employees", { search, statusFilter, roleFilter, deptFilter, page }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      if (roleFilter) params.append("hr_role", roleFilter);
      if (deptFilter) params.append("department_id", deptFilter);
      params.append("page", String(page));
      params.append("page_size", String(PAGE_SIZE));

      return apiClient<PaginatedEmployees>(`/employees/?${params.toString()}`);
    },
    placeholderData: (prev) => prev,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => apiClient<Department[]>("/departments/"),
    staleTime: 5 * 60 * 1000,
  });

  const deptMap = new Map(
    (departments ?? []).map((d) => [String(d.id), d.name]),
  );

  const deptOptions = (departments ?? []).map((d: Department) => ({
    value: String(d.id),
    label: d.name,
  }));

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiClient(`/employees/${id}/`, { method: "DELETE" }),
    onSuccess: () => {
        toast.success("Collaborateur supprimé avec succès");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      setDeleteTarget(null);
    },
    onError: (err: Error) => {
      toast.error(`Failed to delete employee: ${err.message}`);
    },
  });

  const totalPages = data ? Math.ceil(Number(data.total) / PAGE_SIZE) : 0;
  const hasFilters = !!(search || statusFilter || roleFilter || deptFilter);

  return (
    <div data-ocid="employees.page">
      <PageHeader
        title="Collaborateurs"
        subtitle={
          data
            ? `${Number(data.total)} collaborateur${Number(data.total) !== 1 ? "s" : ""}`
            : undefined
        }
        action={
          canAdd && <Link to="/employees/new" data-ocid="employees.add_button">
            <Button icon={<Plus size={15} />}>Ajouter</Button>
          </Link>
        }
      />

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Rechercher par nom ou email…"
          className="flex-1 min-w-[200px]"
        />
        <SelectFilter
          value={deptFilter}
          onChange={handleDept}
          options={deptOptions}
          placeholder="Tous les départements"
          className="sm:w-44"
          data-ocid="employees.dept_filter"
        />
        <SelectFilter
          value={statusFilter}
          onChange={handleStatus}
          options={statusOptions}
          placeholder="Tous les statuts"
          className="sm:w-40"
          data-ocid="employees.status_filter"
        />
        <SelectFilter
          value={roleFilter}
          onChange={handleRole}
          options={roleOptions}
          placeholder="Tous les rôles"
          className="sm:w-40"
          data-ocid="employees.role_filter"
        />
      </div>

      {isError ? (
        <ErrorMessage title="Impossible de charger les collaborateurs" onRetry={refetch} />
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-3 text-left font-display font-semibold text-foreground/80">
                  Matricule
                </th>
                <th className="px-4 py-3 text-left font-display font-semibold text-foreground/80">
                  Employé
                </th>
                <th className="px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden lg:table-cell">
                  Email Pro
                </th>
                <th className="px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden md:table-cell">
                  Département
                </th>
                <th className="px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden md:table-cell">
                  Poste
                </th>
                <th className="px-4 py-3 text-left font-display font-semibold text-foreground/80 hidden sm:table-cell">
                  Contrat
                </th>
                <th className="px-4 py-3 text-left font-display font-semibold text-foreground/80">
                  Statut
                </th>
                <th className="px-4 py-3 text-right font-display font-semibold text-foreground/80">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(10)].map((_, i) => (
                  <SkeletonRow key={i} cols={8} />
                ))
              ) : data?.employees.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-16 text-center"
                    data-ocid="employees.empty_state"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                        <Users size={24} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-foreground">
                          {hasFilters
                            ? "Aucun collaborateur ne correspond à vos filtres"
                            : "Aucun collaborateur pour le moment"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {hasFilters
                            ? "Essayez d'ajuster vos critères de recherche ou de filtre."
                            : "Commencez par ajouter votre premier collaborateur."}
                        </p>
                      </div>
                      {!hasFilters && (
                        <Link to="/employees/new">
                          <Button size="sm" icon={<Plus size={13} />}>
                            Ajouter le premier collaborateur
                          </Button>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                (data?.employees ?? []).map((emp, idx) => (
                  <tr
                    key={String(emp.id)}
                    className="border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                    data-ocid={`employees.item.${idx + 1}`}
                    onClick={() =>
                      navigate({
                        to: "/employees/$id",
                        params: { id: String(emp.id) },
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        navigate({
                          to: "/employees/$id",
                          params: { id: String(emp.id) },
                        });
                      }
                    }}
                  >
                    {/* Matricule */}
                    <td className="px-4 py-3 font-medium text-foreground">
                      {emp.matricule}
                    </td>

                    {/* Employee info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <EmployeeAvatar employee={emp} />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {emp.first_name} {emp.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate lg:hidden">
                            {emp.professional_email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                      <span className="truncate max-w-[200px] block">
                        {emp.professional_email}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      {emp.department_id
                        ? (deptMap.get(String(emp.department_id)) ?? "—")
                        : "—"}
                    </td>

                    {/* Role badge */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {emp.position}
                      </span>
                    </td>

                    {/* Contract */}
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      {contractLabel(emp.contract_type)}
                    </td>

                    {/* Status badge */}
                    <td className="px-4 py-3">
                      <StatusBadge status={emp.status} />
                    </td>

                    {/* Actions */}
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to="/employees/$id"
                          params={{ id: String(emp.id) }}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          aria-label="View employee"
                          data-ocid={`employees.view_button.${idx + 1}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Eye size={15} />
                        </Link>
                        {isRH && <Link
                          to="/employees/$id/edit"
                          params={{ id: String(emp.id) }}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          aria-label="Edit employee"
                          data-ocid={`employees.edit_button.${idx + 1}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit2 size={15} />
                        </Link>}
                        {isAdmin && <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(emp);
                          }}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          aria-label="Delete employee"
                          data-ocid={`employees.delete_button.${idx + 1}`}
                        >
                          <Trash2 size={15} />
                        </button>}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-5 gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">
            Page {page} sur {totalPages} &mdash; {data ? Number(data.total) : 0}{" "}
            collaborateurs au total
          </p>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePage}
          />
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmDeleteModal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        entityName={
          deleteTarget
            ? `${deleteTarget.first_name} ${deleteTarget.last_name}`
            : ""
        }
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

function EmployeeAvatar({ employee }: { employee: Employee }) {
  if (employee.profile_picture_url) {
    return (
      <img
        src={employee.profile_picture_url}
        alt={`${employee.first_name} ${employee.last_name}`}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-border"
      />
    );
  }
  const initials = `${employee.first_name[0] ?? ""}${employee.last_name[0] ?? ""}`;
  const colors = [
    "bg-primary/15 text-primary",
    "bg-accent/15 text-accent-foreground",
    "bg-secondary text-secondary-foreground",
    "bg-chart-4/20 text-foreground",
  ];
  const colorIndex = (employee.first_name.charCodeAt(0) ?? 0) % colors.length;
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0 ${colors[colorIndex]}`}
    >
      {initials.toUpperCase()}
    </div>
  );
}

function contractLabel(type: string): string {
  const labels: Record<string, string> = {
    CDI: "CDI",
    CDD: "CDD",
    Internship: "Stage / Alternance",
    PartTime: "Consultant",
    Freelance: "Freelance",
  };
  return labels[type] ?? type;
}
