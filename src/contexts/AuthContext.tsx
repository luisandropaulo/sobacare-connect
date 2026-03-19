import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "patient" | "hospital" | "admin-master";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  register: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("sobacare_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, _password: string, role: UserRole) => {
    const u: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role,
    };
    localStorage.setItem("sobacare_user", JSON.stringify(u));
    setUser(u);
  };

  const register = (name: string, email: string, _password: string, role: UserRole) => {
    const u: User = { id: crypto.randomUUID(), name, email, role };
    localStorage.setItem("sobacare_user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("sobacare_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
