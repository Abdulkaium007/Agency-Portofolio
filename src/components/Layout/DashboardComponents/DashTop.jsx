import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import ThemeSwitcher from "../../shared/ThemeSwitcher";
import { FiEdit2, FiLock, FiX } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function DashboardTopBar() {
  // eslint-disable-next-line no-unused-vars
  const { user, logout, login, register } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "profile" or "password"

  const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle profile form change
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  // Handle password form change
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name: profileForm.name, email: profileForm.email };
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
    setDropdownOpen(false);
    setModalType(null);
    window.location.reload(); // Quick way to update dashboard data
  };

  // Update password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      alert("New passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(u => u.email === user.email && u.password === passwordForm.current);
    if (index === -1) {
      alert("Current password is incorrect!");
      return;
    }

    users[index].password = passwordForm.new;
    localStorage.setItem("users", JSON.stringify(users));

    // Update authUser if currently logged in
    const updatedAuthUser = { ...user, password: passwordForm.new };
    localStorage.setItem("authUser", JSON.stringify(updatedAuthUser));

    alert("Password updated successfully!");
    setDropdownOpen(false);
    setModalType(null);
  };

  return (
    <>
      {/* Top Bar */}
      <header className="flex justify-between items-center p-4 bg-base-100 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold gradient-text">
          Welcome, {user?.name?.split(" ")[0] || "Admin"}
        </h2>

        <div className="flex items-center gap-4 relative">
          <ThemeSwitcher />

          {/* Avatar */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/40"
          >
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff`}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-14 w-56 bg-base-100 shadow-lg rounded-xl border border-base-300 z-50 overflow-hidden"
            >
              <button
                onClick={() => setModalType("profile")}
                className="flex items-center gap-2 px-4 py-3 hover:bg-base-300 w-full text-left font-medium"
              >
                <FiEdit2 /> Update Profile
              </button>
              <button
                onClick={() => setModalType("password")}
                className="flex items-center gap-2 px-4 py-3 hover:bg-base-300 w-full text-left font-medium"
              >
                <FiLock /> Change Password
              </button>
              <hr className="border-base-300" />
              <button
                onClick={logout}
                className="px-4 py-3 hover:bg-error hover:text-white text-left w-full font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-base-100 rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
          >
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-xl hover:text-primary"
            >
              <FiX />
            </button>

            {modalType === "profile" && (
              <>
                <h2 className="text-2xl font-bold gradient-text mb-4">Update Profile</h2>
                <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
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
                  <button className="btn btn-primary w-full hero-gradient-btn text-button">
                    Save Changes
                  </button>
                </form>
              </>
            )}

            {modalType === "password" && (
              <>
                <h2 className="text-2xl font-bold gradient-text mb-4">Change Password</h2>
                <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                  <input
                    type="password"
                    name="current"
                    value={passwordForm.current}
                    onChange={handlePasswordChange}
                    placeholder="Current Password"
                    className="input input-bordered w-full bg-base-200"
                    required
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
                  <button className="btn btn-primary w-full hero-gradient-btn text-button">
                    Update Password
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
