import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "@/lib/api-client";

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  department_id?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginStatus: "idle" | "logging-in" | "error";
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function normalizeRole(role?: string | null) {
  if (!role) {
    return "";
  }

  const normalized = role.trim().toLowerCase();
  if (["collaborateur", "collab", "employee", "user"].includes(normalized)) {
    return "collaborateur";
  }
  if (normalized === "manager") {
    return "manager";
  }
  if (["direction", "direction générale", "direction generale"].includes(normalized)) {
    return "direction";
  }
  if (["admin_rh", "admin rh", "admin", "hradmin", "hr admin"].includes(normalized)) {
    return "admin_rh";
  }
  if (["resp_rh", "resp. rh", "resp rh", "responsable rh", "rh", "hrmanager", "hr manager"].includes(normalized)) {
    return "resp_rh";
  }
  return normalized;
}

function readStorage() {
  const token = localStorage.getItem("ices_token");
  const userData = localStorage.getItem("ices_user");
  if (token && userData && userData !== "undefined") {
    try {
      const user = JSON.parse(userData);
      return { user: { ...user, role: normalizeRole(user.role) }, isAuthenticated: true };
    } catch {
      /* ignore */
    }
  }
  return { user: null, isAuthenticated: false };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = readStorage();
  const [user, setUser] = useState<User | null>(initial.user);
  const [isAuthenticated, setIsAuthenticated] = useState(initial.isAuthenticated);
  const [loginStatus, setLoginStatus] = useState<"idle" | "logging-in" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoginStatus("logging-in");
    setError(null);
    try {
      const data = await apiClient<any>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const normalizedUser = { ...data.user, role: normalizeRole(data.user?.role) };
      localStorage.setItem("ices_token", data.access_token);
      localStorage.setItem("ices_user", JSON.stringify(normalizedUser));
      setUser(normalizedUser);
      setIsAuthenticated(true);
      setLoginStatus("idle");
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
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginStatus, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useIcesAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useIcesAuth must be used within an AuthProvider");
  }
  return context;
};