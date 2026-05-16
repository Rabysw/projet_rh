-- Configuration complète SIRH

-- 1. Table des Postes / Job Titles
CREATE TABLE IF NOT EXISTS job_titles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table des Jours Fériés / Public Holidays
CREATE TABLE IF NOT EXISTS public_holidays (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_recurring BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date)
);

-- 3. Ajout des colonnes manquantes dans company_config
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS overtime_threshold_hours INTEGER DEFAULT 8;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS document_expiry_alert_days INTEGER DEFAULT 60;
ALTER TABLE company_config ADD COLUMN IF NOT EXISTS medical_visit_alert_days INTEGER DEFAULT 30;

-- 4. RLS sur les nouvelles tables
ALTER TABLE job_titles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_holidays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone authenticated can see job_titles" ON job_titles FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Everyone authenticated can see public_holidays" ON public_holidays FOR SELECT TO authenticated USING (TRUE);

-- Les Admin et RH peuvent modifier
CREATE POLICY "Admin and RH can manage job_titles" ON job_titles FOR ALL USING (get_my_role() IN ('admin_rh', 'resp_rh'));
CREATE POLICY "Admin and RH can manage public_holidays" ON public_holidays FOR ALL USING (get_my_role() IN ('admin_rh', 'resp_rh'));
