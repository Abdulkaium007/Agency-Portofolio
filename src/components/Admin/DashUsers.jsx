// src/components/admin/DashUsers.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { FiEdit2, FiLock, FiMail, FiPhone, FiGithub, FiBriefcase, FiFileText } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const BASE_URL = "http://100.84.176.7:5000";

export default function DashUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" or "password"
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    role: "user",
    whatsapp: "",
    Phone: "",
    photo: "",
    github: "",
    expertise: "",
    CV: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    new: "",
    confirm: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  // Put current user first
  const sortedUsers = [...users].sort((a, b) => {
    if (a.id === currentUser.id) return -1;
    if (b.id === currentUser.id) return 1;
    return 0;
  });

  const openEdit = (user) => {
    if (user.id !== currentUser.id) return; // Only allow own edit

    setEditingUser(user);
    setForm({
      fullname: user.fullname || "",
      email: user.email || "",
      role: user.role || "user",
      whatsapp: user.whatsapp || "",
      Phone: user.Phone || "",
      photo: user.photo || "",
      github: user.github || "",
      expertise: user.expertise || "",
      CV: user.CV || "",
    });
    setModalType("edit");
    setModalOpen(true);
  };

  const openPasswordModal = (user) => {
    if (user.id !== currentUser.id) return;

    setEditingUser(user);
    setPasswordForm({ new: "", confirm: "" });
    setModalType("password");
    setModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullname.trim() || !form.email.trim()) {
      alert("Name and email are required");
      return;
    }

    if (form.photo && !form.photo.includes("ibb.co")) {
      alert("Photo must be a valid imgbb direct link");
      return;
    }

    try {
      await axios.put(`${BASE_URL}/users/${editingUser.id}`, form, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      alert("Profile updated successfully!");
      closeModal();
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
      console.error(err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      alert("Passwords do not match");
      return;
    }
    if (passwordForm.new.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.put(`${BASE_URL}/users/${editingUser.id}`, { password: passwordForm.new }, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      alert("Password changed successfully!");
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
      console.error(err);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingUser(null);
    setModalType("");
  };

  const avatarUrl = (u) =>
    u.photo && u.photo.includes("ibb.co")
      ? u.photo
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(u.fullname || "User")}&background=6366f1&color=fff&bold=true`;

  return (
    <div className="p-6 min-h-screen relative">
      <div className="mb-10">
        <h1 className="text-5xl font-black gradient-text">User Management</h1>
        <p className="text-base-content/70 mt-4">You can only edit your own profile and password. Other users are view-only.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-base-content/60">No users found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedUsers.map((u) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all"
            >
              <div className="card-body">
                <div className="flex items-center gap-6 mb-6">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={avatarUrl(u)} alt={u.fullname} className="object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{u.fullname}</h3>
                    <p className="text-base-content/70 capitalize">{u.role}</p>
                    {u.id === currentUser.id && <span className="badge badge-primary badge-sm">You</span>}
                  </div>
                </div>

                <div className="space-y-3 text-base-content/80">
                  <p className="flex items-center gap-2">
                    <FiMail /> {u.email}
                  </p>
                  {u.whatsapp && (
                    <p className="flex items-center gap-2">
                      <FiPhone /> WhatsApp: {u.whatsapp}
                    </p>
                  )}
                  {u.Phone && (
                    <p className="flex items-center gap-2">
                      <FiPhone /> Phone: {u.Phone}
                    </p>
                  )}
                  {u.github && (
                    <p className="flex items-center gap-2 truncate">
                      <FiGithub /> <a href={u.github} target="_blank" rel="noopener noreferrer" className="link link-primary truncate">{u.github}</a>
                    </p>
                  )}
                  {u.expertise && (
                    <p className="flex items-center gap-2">
                      <FiBriefcase /> {u.expertise}
                    </p>
                  )}
                  {u.CV && (
                    <p className="flex items-center gap-2">
                      <FiFileText /> <a href={u.CV} target="_blank" rel="noopener noreferrer" className="link link-primary">View CV</a>
                    </p>
                  )}
                </div>

                <div className="card-actions justify-end mt-8 gap-3">
                  {u.id === currentUser.id ? (
                    <>
                      <button onClick={() => openEdit(u)} className="btn btn-ghost btn-sm">
                        <FiEdit2 /> Edit Profile
                      </button>
                      <button onClick={() => openPasswordModal(u)} className="btn btn-ghost btn-sm">
                        <FiLock /> Change Password
                      </button>
                    </>
                  ) : (
                    <span className="text-sm text-base-content/60 italic">View only</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* EDIT / PASSWORD MODAL */}
      {modalOpen && editingUser && editingUser.id === currentUser.id && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-3xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-base-300"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-black gradient-text">
                {modalType === "password" ? "Change Your Password" : "Edit Your Profile"}
              </h2>
              <button onClick={closeModal} className="text-3xl hover:text-primary transition">
                <FiX />
              </button>
            </div>

            {modalType === "edit" && (
              <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex justify-center mb-6">
                  <div className="relative">
                    <img src={avatarUrl(form)} alt="Preview" className="w-32 h-32 rounded-full ring-4 ring-primary/30 shadow-xl object-cover" />
                    <div className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full">
                      <FiCamera />
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  value={form.fullname}
                  onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                  placeholder="Full Name"
                  className="input input-bordered w-full bg-base-200/60"
                  required
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className="input input-bordered w-full bg-base-200/60"
                  required
                />

                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="select select-bordered w-full bg-base-200/60"
                  disabled // Role change not allowed for security
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <input
                  type="text"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="WhatsApp"
                  className="input input-bordered w-full bg-base-200/60"
                />

                <input
                  type="text"
                  value={form.Phone}
                  onChange={(e) => setForm({ ...form, Phone: e.target.value })}
                  placeholder="Phone"
                  className="input input-bordered w-full bg-base-200/60"
                />

                <input
                  type="url"
                  value={form.photo}
                  onChange={(e) => setForm({ ...form, photo: e.target.value })}
                  placeholder="Photo URL (imgbb direct link only)"
                  className="input input-bordered w-full md:col-span-2 bg-base-200/60"
                />

                <input
                  type="url"
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  placeholder="GitHub URL"
                  className="input input-bordered w-full bg-base-200/60"
                />

                <input
                  type="text"
                  value={form.expertise}
                  onChange={(e) => setForm({ ...form, expertise: e.target.value })}
                  placeholder="Expertise (e.g. React, Node.js)"
                  className="input input-bordered w-full bg-base-200/60"
                />

                <input
                  type="url"
                  value={form.CV}
                  onChange={(e) => setForm({ ...form, CV: e.target.value })}
                  placeholder="CV / Resume URL"
                  className="input input-bordered w-full md:col-span-2 bg-base-200/60"
                />

                <div className="md:col-span-2 flex justify-end gap-4">
                  <button type="button" onClick={closeModal} className="btn btn-ghost text-lg">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary hero-gradient-btn text-lg">
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {modalType === "password" && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md mx-auto">
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                  placeholder="New Password"
                  className="input input-bordered w-full bg-base-200/60"
                  required
                />
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  placeholder="Confirm New Password"
                  className="input input-bordered w-full bg-base-200/60"
                  required
                />
                <div className="flex justify-end gap-4">
                  <button type="button" onClick={closeModal} className="btn btn-ghost text-lg">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary hero-gradient-btn text-lg">
                    Change Password
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}