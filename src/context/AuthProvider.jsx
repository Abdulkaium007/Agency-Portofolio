// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

// Restore auth state from storage
const restoreUser = () => {
  const persistent = localStorage.getItem("authUser");
  const temporary = sessionStorage.getItem("authUser");

  const userData = persistent
    ? JSON.parse(persistent)
    : temporary
    ? JSON.parse(temporary)
    : null;

  // Auto logout if user was not remembered
  if (userData && userData.remember === false) {
    return null;
  }

  return userData;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(restoreUser);

  // Sync across tabs
  useEffect(() => {
    const sync = () => setUser(restoreUser());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // REGISTER (frontend only)
  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email)) {
      return { success: false, message: "User already exists" };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "admin",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=6366f1&color=fff`,
      joinedAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true, message: "Registered successfully" };
  };

  // LOGIN
  const login = (email, password, remember) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      return { success: false, message: "Invalid email or password" };
    }

    // Save login in correct storage
    const authUser = { ...found, remember: !!remember };
    if (remember) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      sessionStorage.removeItem("authUser");
    } else {
      sessionStorage.setItem("authUser", JSON.stringify(authUser));
      localStorage.removeItem("authUser");
    }

    setUser(authUser);
    return { success: true };
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authUser");
  };

  const value = {
    user,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
