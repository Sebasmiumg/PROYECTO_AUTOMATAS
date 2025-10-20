
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("app:user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = ({ name, role, password }) => {
    // Demo auth: only admin requires a password check
    if (role === "admin" && password !== "admin123") {
      throw new Error("Contraseña de admin inválida (usa: admin123)");
    }
    const next = { name, role };
    setUser(next);
    localStorage.setItem("app:user", JSON.stringify(next));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("app:user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
