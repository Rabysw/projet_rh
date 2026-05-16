-- SIRH Schema Additions

-- 1. Departments
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    manager_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Skills
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    skill_name VARCHAR(255) NOT NULL,
    level INTEGER DEFAULT 1 CHECK (level BETWEEN 1 AND 5),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(employee_id, skill_name)
);

-- 3. Projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'en_cours',
    progress INTEGER DEFAULT 0,
    manager_id INTEGER REFERENCES employees(id),
    start_date DATE,
    end_date_scheduled DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tasks (for projects)
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to INTEGER REFERENCES employees(id),
    status VARCHAR(50) DEFAULT 'a_faire',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Evaluations (Performance reviews)
CREATE TABLE IF NOT EXISTS evaluations (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
    evaluator_id INTEGER REFERENCES employees(id),
    evaluation_date DATE NOT NULL,
    period VARCHAR(100),
    score NUMERIC(3,2),
    comments TEXT,
    goals_met TEXT,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Surveys / Enquêtes
CREATE TABLE IF NOT EXISTS surveys (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Survey Responses
CREATE TABLE IF NOT EXISTS survey_responses (
    id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
    employee_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    response_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RLS
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Everyone authenticated can see)
CREATE POLICY "Everyone authenticated can see departments" ON departments FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Everyone authenticated can see skills" ON skills FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Everyone authenticated can see projects" ON projects FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Everyone authenticated can see tasks" ON tasks FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Everyone authenticated can see evaluations" ON evaluations FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Everyone authenticated can see surveys" ON surveys FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "Everyone authenticated can see survey_responses" ON survey_responses FOR SELECT TO authenticated USING (TRUE);

-- Sample departments
INSERT INTO departments (name) VALUES ('IT'), ('RH'), ('Finance'), ('Ventes'), ('Marketing') ON CONFLICT (name) DO NOTHING;
