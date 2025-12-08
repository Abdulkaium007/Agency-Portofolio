import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const success = login(form.email, form.password, remember);
      if (success) navigate("/adminxyz/dashboard");
      else alert("Invalid credentials!");
    } else {
      const success = register(form.name, form.email, form.password);
      if (success) {
        alert("Account created. Login now.");
        setIsLogin(true);
      } else alert("User already exists!");
    }
  };

  return (
    <div className="min-h-screen hero-gradient-bg flex bg-base-200 text-base-content items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-base-300 shadow-2xl border border-base-300 rounded-3xl p-8">
          
          <h2 className="text-center text-4xl font-black gradient-text mb-6">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME (Register Only) */}
            {!isLogin && (
              <div className="form-control">
                <label className="label text-base-content">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-base-content/60 text-xl" />
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={handleChange}
                    className="input input-bordered w-full pl-12 bg-base-200/60 backdrop-blur-xl"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div className="form-control">
              <label className="label text-base-content">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-base-content/60 text-xl" />
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="input input-bordered w-full pl-12 bg-base-200/60 backdrop-blur-xl"
                  placeholder="example@mail.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-control">
              <label className="label text-base-content">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-base-content/60 text-xl" />

                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  required
                  onChange={handleChange}
                  className="input input-bordered w-full pl-12 pr-12 bg-base-200/60 backdrop-blur-xl"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 text-xl text-base-content/60"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* REMEMBER ME (Login only) */}
            {isLogin && (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="checkbox checkbox-primary"
                />
                <span className="text-base-content">Remember Me</span>
              </label>
            )}

            <button className="btn btn-primary w-full text-lg hero-gradient-btn text-button">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          {/* SWITCH FORM */}
          <p className="text-center mt-4 text-base-content/80">
            {isLogin ? "New here?" : "Already have an account?"}
            <button
              className="link link-primary ml-2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create account" : "Login instead"}
            </button>
          </p>

          {/* SOCIAL LOGIN */}
          <div className="divider">or</div>

          <div className="flex flex-col gap-3">
            <button className="btn bg-base-200 hover:bg-base-300 w-full">
              <FcGoogle className="text-2xl" /> Continue with Google
            </button>

            <button className="btn bg-base-200 hover:bg-base-300 w-full">
              <FiGithub className="text-2xl" /> Continue with GitHub
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
