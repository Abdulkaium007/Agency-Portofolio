// src/components/admin/DashboardTopBar.jsx
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import ThemeSwitcher from "../../shared/ThemeSwitcher";
import { FiEdit2, FiLock, FiX, FiUser, FiMail, FiPhone, FiGithub, FiBriefcase, FiFileText, FiCamera, FiAlertCircle } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function DashboardTopBar() {
  const { user, setUser, logout, adminUpdateUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const dropdownRef = useRef(null);

  const [profileForm, setProfileForm] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    whatsapp: user?.whatsapp || "",
    Phone: user?.Phone || "",
    photo: user?.photo || "",
    github: user?.github || "",
    expertise: user?.expertise || "",
    CV: user?.CV || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    new: "",
    confirm: "",
  });

  const [photoError, setPhotoError] = useState("");

  // Live avatar preview - fallback to ui-avatars if no valid photo
  const avatarUrl = profileForm.photo && profileForm.photo.includes("ibb.co")
    ? profileForm.photo
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(profileForm.fullname || "Admin")}&background=6366f1&color=fff&bold=true`;

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
      whatsapp: user?.whatsapp || "",
      Phone: user?.Phone || "",
      photo: user?.photo || "",
      github: user?.github || "",
      expertise: user?.expertise || "",
      CV: user?.CV || "",
    });
    setPhotoError("");
    setModalType("profile");
    setDropdownOpen(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });

    // Real-time imgbb validation
    if (name === "photo") {
      if (value === "") {
        setPhotoError("");
      } else if (!value.includes("ibb.co")) {
        setPhotoError("Only imgbb.com links are allowed");
      } else {
        setPhotoError("");
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // UPDATE PROFILE
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!profileForm.fullname.trim() || !profileForm.email.trim()) {
      toast.error("Full Name and Email are required");
      return;
    }

    if (profileForm.photo && !profileForm.photo.includes("ibb.co")) {
      toast.error("Please use a valid imgbb.com direct link for photo");
      return;
    }

    const result = await adminUpdateUser(user.id, {
      fullname: profileForm.fullname.trim(),
      email: profileForm.email.trim().toLowerCase(),
      whatsapp: profileForm.whatsapp.trim() || null,
      Phone: profileForm.Phone.trim() || null,
      photo: profileForm.photo.trim() || null,
      github: profileForm.github.trim() || null,
      expertise: profileForm.expertise.trim() || null,
      CV: profileForm.CV.trim() || null,
    });

    if (result.success) {
      setUser((prev) => ({
        ...prev,
        fullname: profileForm.fullname.trim(),
        email: profileForm.email.trim().toLowerCase(),
        whatsapp: profileForm.whatsapp.trim() || null,
        Phone: profileForm.Phone.trim() || null,
        photo: profileForm.photo.trim() || null,
        github: profileForm.github.trim() || null,
        expertise: profileForm.expertise.trim() || null,
        CV: profileForm.CV.trim() || null,
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
      toast.error("Passwords do not match!");
      return;
    }
    if (passwordForm.new.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const result = await adminUpdateUser(user.id, { password: passwordForm.new });
    if (result.success) {
      toast.success("Password changed successfully!");
      setPasswordForm({ new: "", confirm: "" });
      setModalType(null);
    } else {
      toast.error(result.message || "Failed to change password");
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="flex justify-between items-center p-4 bg-base-100 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold gradient-text">
          Welcome, {user?.fullname || "Admin"} 👋
        </h2>

        <div className="relative flex items-center gap-4">
          <ThemeSwitcher />
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-primary/30 transition-all hover:ring-primary shadow-xl"
          >
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </button>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-16 w-64 bg-base-100 rounded-2xl shadow-2xl border border-base-300 z-50 overflow-hidden backdrop-blur-xl"
            >
              <button onClick={openProfileModal} className="w-full text-left px-6 py-4 hover:bg-base-200 flex items-center gap-3 transition">
                <FiEdit2 className="text-xl" /> Update Profile
              </button>
              <button
                onClick={() => { setModalType("password"); setDropdownOpen(false); }}
                className="w-full text-left px-6 py-4 hover:bg-base-200 flex items-center gap-3 transition"
              >
                <FiLock className="text-xl" /> Change Password
              </button>
              <hr className="border-base-300" />
              <button
                onClick={() => { logout(); toast.success("Logged out successfully!"); }}
                className="w-full text-left px-6 py-4 hover:bg-error hover:text-white flex items-center gap-3 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MODAL OVERLAY */}
      {modalType && (
        <div className="fixed inset-0 bg-base-300 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-base-100/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-base-300"
          >
            <button
              onClick={() => setModalType(null)}
              className="absolute top-6 right-6 text-2xl hover:text-primary transition"
            >
              <FiX />
            </button>

            {/* PROFILE MODAL */}
            {modalType === "profile" && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-center gradient-text mb-6">Update Your Profile</h3>
                
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <img src={avatarUrl} alt="Preview" className="w-36 h-36 rounded-full ring-4 ring-primary/30 shadow-2xl object-cover" />
                    <div className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full shadow-lg">
                      <FiCamera className="text-xl" />
                    </div>
                  </div>
                </div>

                <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control relative">
                    <FiUser className="absolute left-4 top-4 text-xl text-base-content/60" />
                    <input type="text" name="fullname" value={profileForm.fullname} onChange={handleProfileChange} placeholder="Full Name" className="input input-bordered w-full pl-12 bg-base-200/60" required />
                  </div>

                  <div className="form-control relative">
                    <FiMail className="absolute left-4 top-4 text-xl text-base-content/60" />
                    <input type="email" name="email" value={profileForm.email} onChange={handleProfileChange} placeholder="Email Address" className="input input-bordered w-full pl-12 bg-base-200/60" required />
                  </div>

                  <div className="form-control relative">
                    <FiPhone className="absolute left-4 top-4 text-xl text-base-content/60" />
                    <input type="text" name="whatsapp" value={profileForm.whatsapp} onChange={handleProfileChange} placeholder="WhatsApp Number" className="input input-bordered w-full pl-12 bg-base-200/60" />
                  </div>

                  <div className="form-control relative">
                    <FiPhone className="absolute left-4 top-4 text-xl text-base-content/60" />
                    <input type="text" name="Phone" value={profileForm.Phone} onChange={handleProfileChange} placeholder="Phone Number" className="input input-bordered w-full pl-12 bg-base-200/60" />
                  </div>

                  <div className="form-control relative md:col-span-2">
                    {/* <FiCamera className="absolute left-4 top-14 text-xl text-base-content/60" /> */}
                    <input
                      type="url"
                      name="photo"
                      value={profileForm.photo}
                      onChange={handleProfileChange}
                      placeholder="imgbb direct link only (e.g. https://i.ibb.co/...)"
                      className={`input input-bordered w-full pl-12 pr-10 bg-base-200/60 ${photoError ? "input-error" : ""}`}
                    />
                    {photoError && (
                      <div className="flex items-center gap-1 text-error text-sm mt-2">
                        <FiAlertCircle /> {photoError}
                      </div>
                    )}
                    <p className="text-xs text-base-content/60 mt-2 pl-1">
                      Upload your photo to <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="link link-primary">imgbb.com</a> → copy the <strong>direct link</strong> → paste here
                    </p>
                  </div>

                  <div className="form-control relative">
                    <FiGithub className="absolute left-4 top-4 text-xl text-base-content/60" />
                    <input type="url" name="github" value={profileForm.github} onChange={handleProfileChange} placeholder="GitHub Profile URL" className="input input-bordered w-full pl-12 bg-base-200/60" />
                  </div>

                  <div className="form-control relative">
                    <FiBriefcase className="absolute left-4 top-4 text-xl text-base-content/60" />
                    <input type="text" name="expertise" value={profileForm.expertise} onChange={handleProfileChange} placeholder="Your Expertise (e.g. React, Node.js)" className="input input-bordered w-full pl-12 bg-base-200/60" />
                  </div>

                  <div className="form-control relative md:col-span-2">
                    <FiFileText className="absolute left-4 top-4 text-xl text-base-content/60" />
                    <input type="url" name="CV" value={profileForm.CV} onChange={handleProfileChange} placeholder="CV / Resume URL (PDF link)" className="input input-bordered w-full pl-12 bg-base-200/60" />
                  </div>

                  <button type="submit" className="btn btn-primary w-full hero-gradient-btn text-button text-lg col-span-1 md:col-span-2">
                    Save All Changes
                  </button>
                </form>
              </div>
            )}

            {/* PASSWORD MODAL */}
            {modalType === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md mx-auto">
                <h3 className="text-3xl font-bold text-center gradient-text mb-6">Change Password</h3>
                <input
                  type="password"
                  name="new"
                  value={passwordForm.new}
                  onChange={handlePasswordChange}
                  placeholder="New Password"
                  className="input input-bordered w-full bg-base-200/60"
                  required
                />
                <input
                  type="password"
                  name="confirm"
                  value={passwordForm.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm New Password"
                  className="input input-bordered w-full bg-base-200/60"
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