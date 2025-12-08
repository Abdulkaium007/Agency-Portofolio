// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const BASE_URL = "http://100.84.176.7:5000";

const restoreUser = () => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const user = localStorage.getItem("authUser") || sessionStorage.getItem("authUser");

  if (!token || !user) return null;

  return {
    ...JSON.parse(user),
    token,
  };
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(restoreUser);

  useEffect(() => {
    const sync = () => setUser(restoreUser());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // --------------------------
  // REGISTER
  // --------------------------
  const register = async ({
    fullname,
    email,
    password,
    role = "admin",
    whatsapp,
    Phone,
    photo,
    github,
    expertise,
    CV,
  }) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, {
        fullname,
        email,
        password,
        role,
        whatsapp,
        Phone,
        photo,
        github,
        expertise,
        CV,
      });

      const newUser = {
        id: res.data.id,
        fullname,
        email,
        role,
        whatsapp,
        Phone,
        photo,
        github,
        expertise,
        CV,
      };

      // Save in frontend state if desired
      setUser(newUser);

      return { success: true, message: "User created", id: res.data.id };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  };

  // --------------------------
  // LOGIN
  // --------------------------
  const login = async (email, password, remember = false) => {
    try {
      const res = await axios.post(`${BASE_URL}/users/login`, { email, password });
      const { token, user: userData } = res.data;

      // Merge with any existing frontend data (e.g., adminAccess fields)
      const localExtras = JSON.parse(localStorage.getItem("authUser") || "{}");
      const mergedUser = { ...localExtras, ...userData };

      if (remember) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(mergedUser));
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authUser");
      } else {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("authUser", JSON.stringify(mergedUser));
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      }

      setUser({ ...mergedUser, token });

      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Invalid email or password" };
    }
  };

  // --------------------------
  // LOGOUT
  // --------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
  };

  // --------------------------
  // ADMIN: Update user (any fields)
  // --------------------------
  const adminUpdateUser = async (id, updatedFields) => {
    try {
      const token = user?.token;
      if (!token) throw new Error("Unauthorized");

      const res = await axios.put(`${BASE_URL}/users/${id}`, updatedFields, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If updating self, merge frontend state
      if (id === user.id) {
        setUser((prev) => ({ ...prev, ...updatedFields }));
        localStorage.setItem("authUser", JSON.stringify({ ...user, ...updatedFields }));
        sessionStorage.setItem("authUser", JSON.stringify({ ...user, ...updatedFields }));
      }

      return { success: true, data: res.data };
    } catch (err) {
      console.error(err.response?.data || err);
      return { success: false, message: err.response?.data?.message || "Failed to update user" };
    }
  };

  const value = {
    user,
    setUser,
    register,
    login,
    logout,
    adminUpdateUser, // for admin access
    isAuthenticated: !!user,
    BASE_URL,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
