-- Create tables for ICES HR Platform

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    department VARCHAR(100),
    position VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    hire_date DATE,
    manager_id INTEGER,
    phone VARCHAR(50),
    address TEXT,
    matricule VARCHAR(50),
    contract_type VARCHAR(50),
    birth_date DATE
);

-- Leave balances table
CREATE TABLE IF NOT EXISTS leave_balances (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    leave_type VARCHAR(50) NOT NULL,
    total_days INTEGER DEFAULT 0,
    used_days INTEGER DEFAULT 0,
    remaining_days INTEGER DEFAULT 0,
    year INTEGER DEFAULT 2024
);

-- Leave requests table
CREATE TABLE IF NOT EXISTS leave_requests (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    leave_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payslips table
CREATE TABLE IF NOT EXISTS payslips (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    month VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    gross_amount INTEGER NOT NULL,
    net_amount INTEGER NOT NULL,
    payment_date DATE,
    deductions JSONB
);

-- Trainings table
CREATE TABLE IF NOT EXISTS trainings (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'in_progress',
    start_date DATE,
    duration VARCHAR(50),
    progress INTEGER DEFAULT 0,
    category VARCHAR(100)
);

-- Available trainings
CREATE TABLE IF NOT EXISTS available_trainings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    duration VARCHAR(50),
    deadline DATE
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    obtained_date DATE
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    skill_name VARCHAR(100) NOT NULL,
    level INTEGER DEFAULT 0,
    category VARCHAR(100)
);

-- Development goals table
CREATE TABLE IF NOT EXISTS development_goals (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    title VARCHAR(255) NOT NULL,
    target_date VARCHAR(20),
    progress INTEGER DEFAULT 0
);

-- Suggestions table
CREATE TABLE IF NOT EXISTS suggestions (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    likes INTEGER DEFAULT 0,
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team members (for managers)
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER REFERENCES employees(id),
    employee_id INTEGER REFERENCES employees(id),
    role VARCHAR(100),
    skills JSONB,
    performance INTEGER DEFAULT 0
);

-- Team leave requests
CREATE TABLE IF NOT EXISTS team_leave_requests (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER REFERENCES employees(id),
    employee_id INTEGER REFERENCES employees(id),
    leave_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    reason TEXT
);

-- Team skills stats
CREATE TABLE IF NOT EXISTS team_skills_stats (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER REFERENCES employees(id),
    skill_name VARCHAR(100) NOT NULL,
    total_members INTEGER DEFAULT 0,
    certified_count INTEGER DEFAULT 0,
    in_progress_count INTEGER DEFAULT 0
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER REFERENCES employees(id),
    name VARCHAR(255) NOT NULL,
    progress INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'on_track',
    deadline DATE,
    owner VARCHAR(255)
);

-- KPIs table
CREATE TABLE IF NOT EXISTS kpis (
    id SERIAL PRIMARY KEY,
    manager_id INTEGER REFERENCES employees(id),
    label VARCHAR(100) NOT NULL,
    current_value INTEGER DEFAULT 0,
    target_value INTEGER DEFAULT 0,
    unit VARCHAR(20)
);

-- Contracts table (for Resp RH)
CREATE TABLE IF NOT EXISTS contracts (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    contract_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    alert TEXT
);

-- System users table (for Admin RH)
CREATE TABLE IF NOT EXISTS system_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    last_login TIMESTAMP
);

-- Role stats
CREATE TABLE IF NOT EXISTS role_stats (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) NOT NULL,
    count INTEGER DEFAULT 0,
    color VARCHAR(50)
);

-- Reports table (for Direction)
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    date DATE,
    file_size VARCHAR(20),
    status VARCHAR(20) DEFAULT 'available'
);

-- Direction KPIs
CREATE TABLE IF NOT EXISTS direction_kpis (
    id SERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(50),
    change VARCHAR(20)
);

-- Employee stats
CREATE TABLE IF NOT EXISTS employee_stats (
    id SERIAL PRIMARY KEY,
    total_count INTEGER DEFAULT 0,
    active_count INTEGER DEFAULT 0,
    on_leave_count INTEGER DEFAULT 0,
    new_this_month INTEGER DEFAULT 0
);

-- Contract alerts
CREATE TABLE IF NOT EXISTS contract_alerts (
    id SERIAL PRIMARY KEY,
    expiring_30_days INTEGER DEFAULT 0,
    expiring_60_days INTEGER DEFAULT 0,
    active_count INTEGER DEFAULT 0
);

-- Company configuration (singleton)
CREATE TABLE IF NOT EXISTS company_config (
    id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    company_name VARCHAR(255) NOT NULL,
    company_logo_url TEXT,
    primary_color VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    currency VARCHAR(20) NOT NULL,
    phone_prefix VARCHAR(10) NOT NULL,
    timezone VARCHAR(64) NOT NULL,
    working_days JSONB NOT NULL DEFAULT '[]'::jsonb,
    working_hours_start TIME NOT NULL,
    working_hours_end TIME NOT NULL,
    overtime_threshold_hours NUMERIC(6,2) NOT NULL DEFAULT 0,
    leave_days_per_year NUMERIC(6,2) NOT NULL DEFAULT 0,
    leave_carry_over_max NUMERIC(6,2) NOT NULL DEFAULT 0,
    probation_duration_days INTEGER NOT NULL DEFAULT 0,
    contract_alert_days INTEGER NOT NULL DEFAULT 30,
    id_expiry_alert_days INTEGER NOT NULL DEFAULT 30,
    medical_alert_days INTEGER NOT NULL DEFAULT 30,
    late_alert_threshold_minutes INTEGER NOT NULL DEFAULT 0,
    late_count_alert_per_month INTEGER NOT NULL DEFAULT 0,
    public_holidays JSONB NOT NULL DEFAULT '[]'::jsonb,
    departments JSONB NOT NULL DEFAULT '[]'::jsonb,
    job_titles JSONB NOT NULL DEFAULT '[]'::jsonb,
    leave_types JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_company_config_updated_at
    ON company_config(updated_at);

CREATE OR REPLACE FUNCTION set_company_config_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_company_config_updated_at ON company_config;
CREATE TRIGGER trg_company_config_updated_at
BEFORE UPDATE ON company_config
FOR EACH ROW
EXECUTE FUNCTION set_company_config_updated_at();
