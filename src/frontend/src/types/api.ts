
export enum EmploymentStatus {
  Active = "Active",
  Inactive = "Inactive",
  OnLeave = "OnLeave",
}

export enum ContractType {
  CDI = "CDI",
  CDD = "CDD",
  Internship = "Internship",
  Freelance = "Freelance",
  PartTime = "PartTime",
}

export enum HRRole {
  HRAdmin = "HRAdmin",
  HRManager = "HRManager",
  Manager = "Manager",
  Employee = "Employee",
  Direction = "Direction",
}

export interface ProfilePicture {
  url: string;
  filename?: string;
}

export interface Employee {
  id: number;
  matricule: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
  nationality: string;
  gender: string;
  marital_status?: string;
  children_count?: number;
  id_card_number: string;
  id_card_type: string;
  id_card_expiry?: string;
  address?: string;
  personal_phone?: string;
  personal_email?: string;
  emergency_contact_name?: string;
  emergency_contact_relation?: string;
  emergency_contact_phone?: string;
  
  hire_date: string;
  position: string;
  diploma?: string;
  department_id: number;
  manager_id?: number;
  contract_type: string;
  contract_start: string;
  contract_end?: string;
  status: EmploymentStatus;
  professional_email: string;
  professional_phone?: string;
  work_location?: string;
  base_salary: number;
  
  profile_picture_url?: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeInput {
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
  nationality: string;
  gender: string;
  marital_status?: string;
  children_count?: number;
  id_card_number: string;
  id_card_type: string;
  id_card_expiry?: string;
  address?: string;
  personal_phone?: string;
  personal_email?: string;
  emergency_contact_name?: string;
  emergency_contact_relation?: string;
  emergency_contact_phone?: string;
  
  hire_date: string;
  position: string;
  diploma?: string;
  department_id: number;
  manager_id?: number;
  contract_type: string;
  contract_start: string;
  contract_end?: string;
  status: EmploymentStatus;
  professional_email: string;
  professional_phone?: string;
  work_location?: string;
  base_salary: number;
}

export interface Department {
  id: number;
  name: string;
  description?: string;
  manager_id?: number;
}

export interface DepartmentWithCount extends Department {
  employee_count: number;
}

export interface PaginatedEmployees {
  employees: Employee[];
  total: number;
  page: number;
  page_size: number;
}

export interface Note {
  id: number;
  title: string;
  type: string;
  content: string;
  attachments: string[];
  target_audience: string;
  publish_date: string;
  is_immediate: boolean;
  requires_acknowledgment: boolean;
  is_pinned: boolean;
  status: string;
}

export interface InternalEvent {
  id: number;
  title: string;
  type: string;
  date_time: string;
  location: string;
  participants: string;
  description: string;
  auto_reminder: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  project_manager_id: number;
  team_ids: number[];
  start_date: string;
  end_date_scheduled: string;
  priority: string;
  status: string;
  progress: number;
  budget: number;
  attachments: string[];
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  responsible_id: number;
  deadline: string;
  priority: string;
  status: string;
  dependencies: number[];
  comments: string[];
  is_milestone: boolean;
}
