import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiFetch } from '@/hooks/use-api';

export interface CompanyConfig {
  id?: number;
  company_name: string;
  company_logo_url?: string;
  primary_color: string;
  country: string;
  currency: string;
  phone_prefix: string;
  timezone: string;
  working_days: string[];
  working_hours_start: string;
  working_hours_end: string;
  overtime_threshold_hours: number;
  leave_days_per_year: number;
  leave_carry_over_max: number;
  probation_duration_days: number;
  contract_alert_days: number;
  id_expiry_alert_days: number;
  medical_alert_days: number;
  late_alert_threshold_minutes: number;
  late_count_alert_per_month: number;
  public_holidays: Array<{ date: string; label: string }>;
  departments: string[];
  job_titles: string[];
  leave_types: string[];
}

interface CompanyConfigContextType {
  config: CompanyConfig | null;
  isLoading: boolean;
  isConfigured: boolean;
  status: "loading" | "configured" | "not_configured" | "error";
  refreshConfig: () => Promise<void>;
  createConfig: (payload: CompanyConfig) => Promise<CompanyConfig>;
  updateConfig: (payload: Partial<CompanyConfig>) => Promise<CompanyConfig>;
}

const CompanyConfigContext = createContext<CompanyConfigContextType | undefined>(undefined);

export function CompanyConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<CompanyConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"loading" | "configured" | "not_configured" | "error">("loading");

  const fetchConfig = async () => {
    setIsLoading(true);
    setStatus("loading");
    try {
      const data = await apiFetch<CompanyConfig | null>("/admin/company-config");
      setConfig(data);
      setStatus(data?.company_name ? "configured" : "not_configured");
    } catch (err) {
      console.error("Failed to fetch company config:", err);
      setConfig(null);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const applyThemeColor = (hex?: string) => {
    if (!hex) return;
    document.documentElement.style.setProperty("--primary", hex);
  };

  useEffect(() => {
    const token = localStorage.getItem("ices_token");
    if (token) {
      fetchConfig();
    } else {
      setIsLoading(false);
      setStatus("not_configured");
    }
  }, []);

  useEffect(() => {
    applyThemeColor(config?.primary_color);
  }, [config?.primary_color]);

  const createConfig = async (payload: CompanyConfig) => {
    const created = await apiFetch<CompanyConfig>("/admin/company-config", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setConfig(created);
    setStatus("configured");
    applyThemeColor(created.primary_color);
    return created;
  };

  const updateConfig = async (payload: Partial<CompanyConfig>) => {
    const updated = await apiFetch<CompanyConfig>("/admin/company-config", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    setConfig(updated);
    setStatus(updated?.company_name ? "configured" : "not_configured");
    applyThemeColor(updated.primary_color);
    return updated;
  };

  const isConfigured = !!config && !!config.company_name;

  return (
    <CompanyConfigContext.Provider value={{ 
      config, 
      isLoading, 
      isConfigured, 
      status,
      refreshConfig: fetchConfig,
      createConfig,
      updateConfig,
    }}>
      {children}
    </CompanyConfigContext.Provider>
  );
}

export function useCompanyConfig() {
  const context = useContext(CompanyConfigContext);
  if (context === undefined) {
    throw new Error('useCompanyConfig must be used within a CompanyConfigProvider');
  }
  return context;
}
