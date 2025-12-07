// src/components/admin/AdminAccess.jsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AdminAccess() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    login(form.email, form.name || form.email.split("@")[0]);
    navigate("/adminxyz/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-300 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-base-100/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 border border-base-300">
          <h2 className="text-6xl font-black text-center mb-10 gradient-text">
            {isLogin ? "Team Portal" : "Join Team"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input input-bordered w-full text-lg"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input input-bordered input-primary w-full text-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input input-bordered input-primary w-full text-lg"
              required
            />
            <button type="submit" className="btn btn-primary w-full text-xl font-bold py-4">
              {isLogin ? "Enter Portal" : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-base-content/70">
            {isLogin ? "New member?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="link link-primary font-bold text-lg"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}