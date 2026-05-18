import { useState, useEffect, useCallback } from "react";

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

function getToken(): string | null {
  return localStorage.getItem("ices_token");
}
const BACKEND_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function normalizeEndpoint(endpoint: string): string {
  let path: string;
  if (endpoint.startsWith("/api/")) path = endpoint;
  else if (endpoint.startsWith("/")) path = `/api/v1${endpoint}`;
  else path = `/api/v1/${endpoint}`;

  return BACKEND_URL ? `${BACKEND_URL}${path}` : path;
}
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");
  
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(normalizeEndpoint(endpoint), {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ detail: `API error: ${response.status}` }));
    throw new Error(errorData.detail || `API error: ${response.status}`);
  }
  
  return response.json();
}

export function useApi<T>(endpoint: string | null | undefined): ApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(!!endpoint);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiFetch<T>(endpoint);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (!endpoint) return;
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export { apiFetch };
