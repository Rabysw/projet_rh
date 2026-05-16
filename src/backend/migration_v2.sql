-- Migration to add missing columns for Company Config and Employees

-- 1. Update company_config
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'Bénin';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS currency VARCHAR(20) DEFAULT 'XOF';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS phone_prefix VARCHAR(10) DEFAULT '+229';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS timezone VARCHAR(64) DEFAULT 'Africa/Porto-Novo';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS fiscal_id VARCHAR(50);
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS legal_structure VARCHAR(50) DEFAULT 'SARL';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS working_days JSONB DEFAULT '["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]'::jsonb;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS working_hours_start TIME DEFAULT '08:00:00';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS working_hours_end TIME DEFAULT '17:00:00';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS break_duration_minutes INTEGER DEFAULT 60;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS leave_days_per_year NUMERIC(6,2) DEFAULT 24;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS leave_carry_over_max NUMERIC(6,2) DEFAULT 5;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS leave_types JSONB DEFAULT '["Congé payé", "Maladie", "Sans solde", "Maternité", "Paternité", "Exceptionnel"]'::jsonb;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS probation_duration_days INTEGER DEFAULT 90;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS contract_alert_days INTEGER DEFAULT 30;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS id_expiry_alert_days INTEGER DEFAULT 60;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS medical_alert_days INTEGER DEFAULT 30;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS overtime_threshold_hours NUMERIC(6,2) DEFAULT 8;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS late_alert_threshold_minutes INTEGER DEFAULT 15;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS late_count_alert_per_month INTEGER DEFAULT 3;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS is_setup BOOLEAN DEFAULT FALSE;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS public_holidays JSONB DEFAULT '[]'::jsonb;

-- 2. Update employees
ALTER TABLE employees ADD COLUMN IF NOT EXISTS hr_role VARCHAR(50) DEFAULT 'Employee';
ALTER TABLE employees ADD COLUMN IF NOT EXISTS birth_place VARCHAR(100);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS nationality VARCHAR(100);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS gender VARCHAR(10);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS marital_status VARCHAR(50);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS children_count INTEGER DEFAULT 0;
ALTER TABLE employees ADD COLUMN IF NOT EXISTS id_card_number VARCHAR(50);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS id_card_type VARCHAR(50);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS id_card_expiry DATE;
ALTER TABLE employees ADD COLUMN IF NOT EXISTS personal_phone VARCHAR(50);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS personal_email VARCHAR(255);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS professional_phone VARCHAR(50);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS professional_email VARCHAR(255);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS work_location VARCHAR(100);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(255);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS emergency_contact_relation VARCHAR(100);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(50);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS diploma VARCHAR(255);
ALTER TABLE employees ADD COLUMN IF NOT EXISTS contract_start DATE;
ALTER TABLE employees ADD COLUMN IF NOT EXISTS contract_end DATE;
ALTER TABLE employees ADD COLUMN IF NOT EXISTS manager_id INTEGER;
ALTER TABLE employees ADD COLUMN IF NOT EXISTS base_salary NUMERIC;

-- Ensure constraints and indexes
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'company_config_pkey') THEN
        ALTER TABLE company_config ADD PRIMARY KEY (id);
    END IF;
END $$;
