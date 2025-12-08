// src/components/admin/DashboardTopBar.jsx
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import ThemeSwitcher from "../../shared/ThemeSwitcher";
import { FiEdit2, FiLock, FiX } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function DashboardTopBar() {
  const { user, setUser, logout, adminUpdateUser } = useAuth(); // Added adminUpdateUser
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "profile" or "password"
  const dropdownRef = useRef(null);

  const [profileForm, setProfileForm] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openProfileModal = () => {
    setProfileForm({
      fullname: user?.fullname || "",
      email: user?.email || "",
    });
    setModalType("profile");
    setDropdownOpen(false);
  };

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // UPDATE PROFILE (fullname + email)
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    // Prevent empty submit
    if (!profileForm.fullname.trim() || !profileForm.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    const result = await adminUpdateUser(user.id, {
      fullname: profileForm.fullname.trim(),
      email: profileForm.email.trim().toLowerCase(),
    });

    if (result.success) {
      setUser((prev) => ({
        ...prev,
        fullname: profileForm.fullname.trim(),
        email: profileForm.email.trim().toLowerCase(),
      }));
      toast.success("Profile updated successfully!");
      setModalType(null);
    } else {
      toast.error(result.message || "Update failed");
    }
  };

  // CHANGE PASSWORD
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.new !== passwordForm.confirm) {
      toast.error("New passwords do not match!");
      return;
    }

    if (passwordForm.new.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const result = await adminUpdateUser(user.id, {
      password: passwordForm.new,
    });

    if (result.success) {
      toast.success("Password changed successfully!");
      setPasswordForm({ current: "", new: "", confirm: "" });
      setModalType(null);
    } else {
      toast.error(result.message || "Failed to change password");
    }
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-base-100 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold gradient-text">
          Welcome, {user?.fullname || "Admin"}
        </h2>

        <div className="relative flex items-center gap-4">
          <ThemeSwitcher />

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/40 transition-all hover:ring-primary"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullname || "Admin"
              )}&background=6366f1&color=fff&bold=true`}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-16 w-56 bg-base-100 rounded-xl shadow-xl border border-base-300 z-50 overflow-hidden"
            >
              <button
                onClick={openProfileModal}
                className="w-full text-left px-4 py-3 hover:bg-base-200 flex items-center gap-3 transition"
              >
                <FiEdit2 /> Update Profile
              </button>
              <button
                onClick={() => {
                  setModalType("password");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-base-200 flex items-center gap-3 transition"
              >
                <FiLock /> Change Password
              </button>
              <hr className="my-1 border-base-300" />
              <button
                onClick={() => {
                  logout();
                  toast.success("Logged out successfully!");
                }}
                className="w-full text-left px-4 py-3 hover:bg-error hover:text-white flex items-center gap-3 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MODAL OVERLAY */}
      {modalType && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
          >
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-2xl hover:text-primary transition"
            >
              <FiX />
            </button>

            {/* PROFILE MODAL */}
            {modalType === "profile" && (
              <form onSubmit={handleProfileSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-center mb-4">Update Profile</h3>
                <input
                  type="text"
                  name="fullname"
                  value={profileForm.fullname}
                  onChange={handleProfileChange}
                  placeholder="Full Name"
                  className="input input-bordered w-full bg-base-200"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  placeholder="Email Address"
                  className="input input-bordered w-full bg-base-200"
                  required
                />
                <button type="submit" className="btn btn-primary w-full hero-gradient-btn text-button text-lg">
                  Save Changes
                </button>
              </form>
            )}

            {/* PASSWORD MODAL */}
            {modalType === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-center mb-4">Change Password</h3>
                <input
                  type="password"
                  name="current"
                  value={passwordForm.current}
                  onChange={handlePasswordChange}
                  placeholder="Current Password (not checked)"
                  className="input input-bordered w-full bg-base-200"
                />
                <input
                  type="password"
                  name="new"
                  value={passwordForm.new}
                  onChange={handlePasswordChange}
                  placeholder="New Password"
                  className="input input-bordered w-full bg-base-200"
                  required
                />
                <input
                  type="password"
                  name="confirm"
                  value={passwordForm.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm New Password"
                  className="input input-bordered w-full bg-base-200"
                  required
                />
                <button type="submit" className="btn btn-primary w-full hero-gradient-btn text-button text-lg">
                  Update Password
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}