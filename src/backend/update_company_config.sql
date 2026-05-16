-- Add missing columns to company_config
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS timezone VARCHAR(100) DEFAULT 'Africa/Porto-Novo';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS working_days JSONB DEFAULT '["Lun", "Mar", "Mer", "Jeu", "Ven"]'::jsonb;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS working_hours_start TIME DEFAULT '08:00:00';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS working_hours_end TIME DEFAULT '17:00:00';
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS leave_days_per_year INTEGER DEFAULT 24;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS leave_carry_over_max INTEGER DEFAULT 5;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS probation_duration_days INTEGER DEFAULT 90;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS contract_alert_days INTEGER DEFAULT 30;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS late_alert_threshold_minutes INTEGER DEFAULT 15;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS late_count_alert_per_month INTEGER DEFAULT 3;
