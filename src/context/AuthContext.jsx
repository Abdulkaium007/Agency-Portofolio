// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext(undefined);

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("admin_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("admin_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("admin_user");
    }
  }, [user]);

  // Login function
  const login = (email, name = "Admin") => {
    const userData = {
      id: Date.now(),
      email,
      name: name || email.split("@")[0],
      role: "admin",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=6366f1&color=fff&bold=true`,
      joinedAt: new Date().toISOString(),
    };
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
