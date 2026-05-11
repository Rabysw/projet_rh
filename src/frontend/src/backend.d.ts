import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface PaginatedEmployees {
    total: bigint;
    employees: Array<Employee>;
    page: bigint;
    pageSize: bigint;
}
export interface DepartmentWithCount {
    id: bigint;
    employeeCount: bigint;
    name: string;
    createdAt: bigint;
    description: string;
    updatedAt: bigint;
}
export interface DashboardStats {
    statusSummary: EmployeeStatusSummary;
    departmentStats: Array<DepartmentStat>;
}
export interface EmployeeStatusSummary {
    onLeave: bigint;
    total: bigint;
    active: bigint;
    inactive: bigint;
}
export interface PaginationParams {
    page: bigint;
    pageSize: bigint;
}
export interface Department {
    id: bigint;
    name: string;
    createdAt: bigint;
    description: string;
    updatedAt: bigint;
}
export interface EmployeeFilter {
    status?: EmploymentStatus;
    search?: string;
    hrRole?: HRRole;
    departmentId?: bigint;
}
export interface Employee {
    id: bigint;
    status: EmploymentStatus;
    createdAt: bigint;
    contractType: ContractType;
    hrRole: HRRole;
    email: string;
    updatedAt: bigint;
    phone: string;
    profilePicture?: ExternalBlob;
    lastName: string;
    departmentId?: bigint;
    firstName: string;
}
export interface DepartmentInput {
    name: string;
    description: string;
}
export interface DepartmentStat {
    departmentName: string;
    employeeCount: bigint;
    departmentId: bigint;
}
export interface EmployeeInput {
    status: EmploymentStatus;
    contractType: ContractType;
    hrRole: HRRole;
    email: string;
    phone: string;
    lastName: string;
    departmentId?: bigint;
    firstName: string;
}
export enum ContractType {
    CDD = "CDD",
    CDI = "CDI",
    Internship = "Internship",
    PartTime = "PartTime",
    Freelance = "Freelance"
}
export enum EmploymentStatus {
    Inactive = "Inactive",
    Active = "Active",
    OnLeave = "OnLeave"
}
export enum HRRole {
    HRAdmin = "HRAdmin",
    Employee = "Employee",
    HRManager = "HRManager",
    Direction = "Direction",
    Manager = "Manager"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createDepartment(input: DepartmentInput): Promise<Department>;
    createEmployee(input: EmployeeInput): Promise<Employee>;
    deleteDepartment(id: bigint): Promise<boolean>;
    deleteEmployee(id: bigint): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardStats>;
    getDepartment(id: bigint): Promise<Department | null>;
    getEmployee(id: bigint): Promise<Employee | null>;
    isCallerAdmin(): Promise<boolean>;
    listDepartments(): Promise<Array<DepartmentWithCount>>;
    listEmployees(filter: EmployeeFilter, pagination: PaginationParams): Promise<PaginatedEmployees>;
    setEmployeeProfilePicture(id: bigint, blob: ExternalBlob): Promise<boolean>;
    updateDepartment(id: bigint, input: DepartmentInput): Promise<Department | null>;
    updateEmployee(id: bigint, input: EmployeeInput): Promise<Employee | null>;
}
