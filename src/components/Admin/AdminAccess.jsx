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
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    whatsapp: "",
    Phone: "",
    photo: "",
    github: "",
    expertise: "",
    CV: "",
  });

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const res = await login(form.email, form.password, remember);
      if (res.success) navigate("/adminxyz/dashboard");
      else alert(res.message || "Invalid credentials!");
    } else {
      const res = await register(form);
      if (res.success) {
        alert("Account created successfully! Please login.");
        setIsLogin(true);
      } else alert(res.message || "Registration failed!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen hero-gradient-bg flex items-center justify-center p-6 bg-base-200 text-base-content">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-base-300 shadow-2xl border border-base-300 rounded-3xl p-8">
          <h2 className="text-4xl font-black gradient-text text-center mb-6">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Register only) */}
            {!isLogin && (
              <div className="form-control relative">
                <label className="label text-base-content">Full Name</label>
                <FiUser className="absolute left-3 top-12 text-base-content/60 text-xl" />
                <input
                  type="text"
                  name="fullname"
                  required
                  value={form.fullname}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-12 bg-base-200/60 backdrop-blur-xl"
                />
              </div>
            )}

            {/* Email */}
            <div className="form-control relative">
              <label className="label text-base-content">Email Address</label>
              <FiMail className="absolute left-3 top-12 text-base-content/60 text-xl" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="input input-bordered w-full pl-12 bg-base-200/60 backdrop-blur-xl"
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label text-base-content">Password</label>
              <FiLock className="absolute left-3 top-12 text-base-content/60 text-xl" />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered w-full pl-12 pr-12 bg-base-200/60 backdrop-blur-xl"
              />
              <button
                type="button"
                className="absolute right-3 top-12 text-xl text-base-content/60"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Extra fields for registration */}
            {!isLogin && (
              <div className="space-y-2">
                <input
                  type="text"
                  name="whatsapp"
                  placeholder="WhatsApp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-base-200/60"
                />
                <input
                  type="text"
                  name="Phone"
                  placeholder="Phone"
                  value={form.Phone}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-base-200/60"
                />
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  value={form.photo}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-base-200/60"
                />
                <input
                  type="text"
                  name="github"
                  placeholder="GitHub URL"
                  value={form.github}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-base-200/60"
                />
                <input
                  type="text"
                  name="expertise"
                  placeholder="Expertise"
                  value={form.expertise}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-base-200/60"
                />
                <input
                  type="text"
                  name="CV"
                  placeholder="CV URL"
                  value={form.CV}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-base-200/60"
                />
              </div>
            )}

            {/* Remember Me for Login */}
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

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full text-lg hero-gradient-btn text-button"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
            </button>
          </form>

          {/* Switch Login/Register */}
          <p className="text-center mt-4 text-base-content/80">
            {isLogin ? "New here?" : "Already have an account?"}
            <button
              className="link link-primary ml-2"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create account" : "Login instead"}
            </button>
          </p>

          {/* Social login buttons (UI only) */}
          <div className="divider">or</div>
          <div className="flex flex-col gap-3">
            <button className="btn bg-base-200 hover:bg-base-300 w-full">
              <FcGoogle className="text-2xl mr-2" /> Continue with Google
            </button>
            <button className="btn bg-base-200 hover:bg-base-300 w-full">
              <FiGithub className="text-2xl mr-2" /> Continue with GitHub
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
