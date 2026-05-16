-- SIRH Master Schema & RLS Setup

-- 1. Clean up existing tables
DROP TABLE IF EXISTS mobility_requests CASCADE;
DROP TABLE IF EXISTS career_goals CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS collab_of_the_month CASCADE;
DROP TABLE IF EXISTS meetings CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS note_acknowledgments CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS team_stats CASCADE;
DROP TABLE IF EXISTS contract_alerts CASCADE;
DROP TABLE IF EXISTS employee_stats CASCADE;
DROP TABLE IF EXISTS direction_kpis CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS role_stats CASCADE;
DROP TABLE IF EXISTS system_users CASCADE;
DROP TABLE IF EXISTS contracts CASCADE;
DROP TABLE IF EXISTS kpis CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS team_skills_stats CASCADE;
DROP TABLE IF EXISTS team_leave_requests CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS suggestions CASCADE;
DROP TABLE IF EXISTS development_goals CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS certificates CASCADE;
DROP TABLE IF EXISTS available_trainings CASCADE;
DROP TABLE IF EXISTS training_enrollments CASCADE;
DROP TABLE IF EXISTS trainings CASCADE;
DROP TABLE IF EXISTS payslips CASCADE;
DROP TABLE IF EXISTS leave_requests CASCADE;
DROP TABLE IF EXISTS leave_balances CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS company_config CASCADE;

-- 2. Tables
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (Central Auth & Roles)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    token TEXT,
    prenom VARCHAR(255),
    nom VARCHAR(255),
    role VARCHAR(50) NOT NULL CHECK (role IN ('collaborateur', 'manager', 'resp_rh', 'admin_rh', 'direction')),
    status VARCHAR(20) DEFAULT 'active',
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    matricule VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birth_date DATE,
    birth_place VARCHAR(100),
    nationality VARCHAR(100),
    gender VARCHAR(10),
    marital_status VARCHAR(50),
    children_count INTEGER DEFAULT 0,
    id_card_number VARCHAR(50),
    id_card_type VARCHAR(50),
    id_card_expiry DATE,
    address TEXT,
    personal_phone VARCHAR(50),
    personal_email VARCHAR(255),
    emergency_contact_name VARCHAR(255),
    emergency_contact_relation VARCHAR(100),
    emergency_contact_phone VARCHAR(50),
    hire_date DATE NOT NULL,
    position VARCHAR(100),
    department_id INTEGER,
    manager_id INTEGER REFERENCES employees(id),
    contract_type VARCHAR(50),
    contract_status VARCHAR(50) DEFAULT 'actif',
    contract_start DATE,
    contract_end DATE,
    base_salary NUMERIC,
    status VARCHAR(20) DEFAULT 'active',
    professional_email VARCHAR(255) UNIQUE NOT NULL,
    professional_phone VARCHAR(50),
    work_location VARCHAR(100),
    profile_picture_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leave requests
CREATE TABLE leave_requests (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    leave_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days NUMERIC(4,1) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reason TEXT,
    justification_url TEXT,
    manager_comment TEXT,
    rh_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leave balances
CREATE TABLE leave_balances (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    leave_type VARCHAR(50) NOT NULL,
    total_days NUMERIC(5,2) DEFAULT 0,
    used_days NUMERIC(5,2) DEFAULT 0,
    remaining_days NUMERIC(5,2) DEFAULT 0,
    year INTEGER DEFAULT 2024,
    UNIQUE(employee_id, leave_type, year)
);

-- Attendance
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    clock_in TIME NOT NULL,
    clock_out TIME,
    location VARCHAR(100) DEFAULT 'Bureau',
    status VARCHAR(20) DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'on_leave')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payslips
CREATE TABLE payslips (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    gross_amount NUMERIC NOT NULL,
    net_amount NUMERIC NOT NULL,
    payment_date DATE,
    file_url TEXT,
    deductions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trainings
CREATE TABLE trainings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    duration VARCHAR(50),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training enrollments
CREATE TABLE training_enrollments (
    id SERIAL PRIMARY KEY,
    training_id INTEGER REFERENCES trainings(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in_progress', 'completed', 'cancelled')),
    progress INTEGER DEFAULT 0,
    certificate_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Development goals
CREATE TABLE development_goals (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_date DATE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'achieved', 'cancelled')),
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Suggestions
CREATE TABLE suggestions (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),
    is_anonymous BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'implemented', 'rejected')),
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Config
CREATE TABLE company_config (
    id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    company_name VARCHAR(255) NOT NULL,
    company_logo_url TEXT,
    primary_color VARCHAR(20) DEFAULT '#000000',
    country VARCHAR(100) DEFAULT 'Bénin',
    currency VARCHAR(20) DEFAULT 'FCFA',
    phone_prefix VARCHAR(10) DEFAULT '+229',
    leave_types JSONB DEFAULT '["Congés payés", "Maladie", "Maternité", "Exceptionnel"]'::jsonb,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. RLS Setup
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE development_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_config ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION get_my_role() RETURNS TEXT AS $$
  SELECT role FROM users WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

-- 3. Policies

-- USERS
CREATE POLICY "Admin and Direction can see all users" ON users FOR SELECT USING (get_my_role() IN ('admin_rh', 'direction'));
CREATE POLICY "Users can see themselves" ON users FOR SELECT USING (id = auth.uid());

-- EMPLOYEES
CREATE POLICY "Everyone can see their own employee record" ON employees FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Managers can see their team" ON employees FOR SELECT USING (manager_id IN (SELECT id FROM employees WHERE user_id = auth.uid()));
CREATE POLICY "RH and Direction can see all employees" ON employees FOR SELECT USING (get_my_role() IN ('resp_rh', 'admin_rh', 'direction'));
CREATE POLICY "Admin and RH can update employees" ON employees FOR ALL USING (get_my_role() IN ('resp_rh', 'admin_rh'));

-- LEAVE REQUESTS
CREATE POLICY "Collaborateurs can manage own leave requests" ON leave_requests FOR ALL USING (employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid()));
CREATE POLICY "Managers can manage team leave requests" ON leave_requests FOR ALL USING (employee_id IN (SELECT id FROM employees WHERE manager_id IN (SELECT id FROM employees WHERE user_id = auth.uid())));
CREATE POLICY "RH can manage all leave requests" ON leave_requests FOR ALL USING (get_my_role() IN ('resp_rh', 'admin_rh'));

-- LEAVE BALANCES
CREATE POLICY "Collaborateurs can see own balances" ON leave_balances FOR SELECT USING (employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid()));
CREATE POLICY "RH can manage all balances" ON leave_balances FOR ALL USING (get_my_role() IN ('resp_rh', 'admin_rh'));

-- ATTENDANCE
CREATE POLICY "Collaborateurs can see own attendance" ON attendance FOR SELECT USING (employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid()));
CREATE POLICY "RH can manage all attendance" ON attendance FOR ALL USING (get_my_role() IN ('resp_rh', 'admin_rh'));

-- PAYSLIPS
CREATE POLICY "Collaborateurs can see own payslips" ON payslips FOR SELECT USING (employee_id IN (SELECT id FROM employees WHERE user_id = auth.uid()));
CREATE POLICY "RH can manage all payslips" ON payslips FOR ALL USING (get_my_role() IN ('resp_rh', 'admin_rh'));

-- SUGGESTIONS
CREATE POLICY "Everyone can see suggestions" ON suggestions FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Everyone can create suggestions" ON suggestions FOR INSERT TO authenticated WITH CHECK (TRUE);
CREATE POLICY "RH can manage suggestions" ON suggestions FOR ALL USING (get_my_role() IN ('resp_rh', 'admin_rh'));

-- COMPANY CONFIG
CREATE POLICY "Everyone can see company config" ON company_config FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Admin can manage company config" ON company_config FOR ALL USING (get_my_role() IN ('admin_rh'));
