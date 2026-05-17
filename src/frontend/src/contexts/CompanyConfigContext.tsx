import React, { createContext, useContext, useState, useEffect } from 'react';

interface CompanyConfig {
  company_name: string;
  company_logo_url: string;
  primary_color: string;
  country?: string;
  currency?: string;
  phone_prefix?: string;
  leave_types?: string[];
}

interface CompanyConfigContextType {
  config: CompanyConfig | null;
  loading: boolean;
  refreshConfig: () => Promise<void>;
  updateConfig: (newConfig: Partial<CompanyConfig>) => Promise<void>;
}

const CompanyConfigContext = createContext<CompanyConfigContextType | undefined>(undefined);

export const CompanyConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<CompanyConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const token = localStorage.getItem('ices_token');
      
      // ✅ IMPORTANT : Construire les headers sans vérifier le token
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Ajouter le token s'il existe, sinon continuer sans
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/admin/company-config`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Failed to fetch company config:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (newConfig: Partial<CompanyConfig>) => {
    try {
      const token = localStorage.getItem('ices_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/admin/company-config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newConfig),
      });

      if (response.ok) {
        await fetchConfig();
      }
    } catch (error) {
      console.error('Failed to update company config:', error);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <CompanyConfigContext.Provider value={{ config, loading, refreshConfig: fetchConfig, updateConfig }}>
      {children}
    </CompanyConfigContext.Provider>
  );
};

export const useCompanyConfig = () => {
  const context = useContext(CompanyConfigContext);
  if (context === undefined) {
    throw new Error('useCompanyConfig must be used within a CompanyConfigProvider');
  }
  return context;
};