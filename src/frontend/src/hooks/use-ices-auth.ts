import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  department_id?: number;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

const AUTH_CHANGE_EVENT = "ices-auth-change";

function readAuthFromStorage(): { user: User | null; isAuthenticated: boolean } {
  const token = localStorage.getItem("ices_token");
  const userData = localStorage.getItem("ices_user");
  if (token && userData) {
    try {
      return { user: JSON.parse(userData), isAuthenticated: true };
    } catch {
      return { user: null, isAuthenticated: false };
    }
  }
  return { user: null, isAuthenticated: false };
}

export function useIcesAuth() {
  const [user, setUser] = useState<User | null>(readAuthFromStorage().user);
  const [isAuthenticated, setIsAuthenticated] = useState(readAuthFromStorage().isAuthenticated);
  const [loginStatus, setLoginStatus] = useState<"idle" | "logging-in" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthChange = () => {
      const auth = readAuthFromStorage();
      setUser(auth.user);
      setIsAuthenticated(auth.isAuthenticated);
    };
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
  }, []);

  const login = async (email: string, password: string) => {
    setLoginStatus("logging-in");
    setError(null);

    try {
      const data = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      // Store token and user data
      localStorage.setItem("ices_token", data.access_token);
      localStorage.setItem("ices_user", JSON.stringify(data.user));
      
      setUser(data.user);
      setIsAuthenticated(true);
      setLoginStatus("idle");
      
      // Notify all other hook instances
      window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
      
      return data;
    } catch (err) {
      setLoginStatus("error");
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("ices_token");
    localStorage.removeItem("ices_user");
    setUser(null);
    setIsAuthenticated(false);
    setLoginStatus("idle");
    setError(null);
    
    // Notify all other hook instances
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  };

  return {
    user,
    isAuthenticated,
    loginStatus,
    error,
    login,
    logout,
  };
}
