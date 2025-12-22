// src/components/admin/DashTeamMembers.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUser, FiMail, FiBriefcase, FiCheck, FiAlertTriangle } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const BASE_URL = "http://100.84.176.7:5000";

export default function DashTeamMembers() {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [form, setForm] = useState({
    project_id: "",
    name: "",
    designation: "",
    email: "",
  });

  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  useEffect(() => {
    fetchTeamMembers();
    fetchProjects();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/team-members`);
      setTeamMembers(res.data || []);
    } catch (err) {
      showToast("error", "Failed to load team members");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/projects`);
      setProjects(res.data || []);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.project_id || !form.name.trim() || !form.designation.trim()) {
      showToast("error", "Project, Name, and Designation are required");
      return;
    }

    const payload = {
      project_id: Number(form.project_id),
      name: form.name.trim(),
      designation: form.designation.trim(),
      email: form.email.trim() || null,
    };

    try {
      if (editingMember) {
        await axios.put(`${BASE_URL}/team-members/${editingMember.id}`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        showToast("success", "Team member updated!");
      } else {
        await axios.post(`${BASE_URL}/team-members`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        showToast("success", "Team member added!");
      }
      closeModal();
      fetchTeamMembers();
    } catch (err) {
      showToast("error", err.response?.data?.message || "Operation failed");
      console.error(err);
    }
  };

  const confirmDelete = (id, name) => {
    setDeleteConfirm({ id, name });
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await axios.delete(`${BASE_URL}/team-members/${deleteConfirm.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      showToast("success", "Team member removed");
      setDeleteConfirm(null);
      fetchTeamMembers();
    } catch (err) {
      showToast("error", "Remove failed");
      console.error(err);
    }
  };

  const openEdit = (member) => {
    setEditingMember(member);
    setForm({
      project_id: member.project_id || "",
      name: member.name || "",
      designation: member.designation || "",
      email: member.email || "",
    });
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingMember(null);
    setForm({
      project_id: "",
      name: "",
      designation: "",
      email: "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingMember(null);
  };

  // Group members by project
  const groupedMembers = teamMembers.reduce((acc, member) => {
    const pid = member.project_id || "unknown";
    if (!acc[pid]) acc[pid] = [];
    acc[pid].push(member);
    return acc;
  }, {});

  const getProjectTitle = (project_id) => {
    const project = projects.find(p => p.id === project_id);
    return project ? project.title : "Unknown Project";
  };

  return (
    <div className="p-8 min-h-screen">
      {/* Custom Toast */}
      {toast.show && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-2xl flex items-center gap-3 max-w-md backdrop-blur-xl border border-base-300`}>
            {toast.type === "success" ? <FiCheck className="text-2xl" /> : <FiAlertTriangle className="text-2xl" />}
            <span className="font-semibold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-3xl shadow-2xl p-10 max-w-md w-full border border-base-300"
          >
            <h3 className="text-3xl font-bold text-error mb-6 text-center">Remove Team Member?</h3>
            <p className="text-center text-base-content/80 mb-10">
              Are you sure you want to remove <span className="font-bold">"{deleteConfirm.name}"</span> from the team?
            </p>
            <div className="flex justify-center gap-6">
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-ghost btn-lg">
                Cancel
              </button>
              <button onClick={executeDelete} className="btn btn-error btn-lg hero-gradient-btn text-white">
                Remove
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex justify-between items-center mb-12">
        <h1 className="text-6xl font-black gradient-text">Our Team</h1>
        <button onClick={openAdd} className="btn btn-primary btn-lg hero-gradient-btn flex items-center gap-4 shadow-xl">
          <FiPlus className="text-2xl" /> Add Member
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-32">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : Object.keys(groupedMembers).length === 0 ? (
        <div className="text-center py-32">
          <p className="text-3xl text-base-content/60">No team members yet — build your dream team!</p>
        </div>
      ) : (
        <div className="space-y-16">
          {Object.entries(groupedMembers).map(([projectId, members]) => (
            <div key={projectId} className="bg-base-100/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-base-300 p-10">
              <h2 className="text-4xl font-bold gradient-text mb-10 text-center">
                {getProjectTitle(Number(projectId))}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {members.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 overflow-hidden"
                  >
                    <div className="p-8 text-center">
                      <div className="avatar mb-6">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                          <div className="bg-gradient-to-br from-primary to-accent flex items-center justify-center w-full h-full">
                            <FiUser className="text-5xl text-white" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-primary font-medium mb-4">{member.designation}</p>
                      {member.email && (
                        <p className="text-base-content/70 flex items-center justify-center gap-2 mb-6">
                          <FiMail /> {member.email}
                        </p>
                      )}

                      <div className="flex justify-center gap-4">
                        <button onClick={() => openEdit(member)} className="btn btn-ghost btn-sm">
                          <FiEdit2 /> Edit
                        </button>
                        <button onClick={() => confirmDelete(member.id, member.name)} className="btn btn-error btn-sm">
                          <FiTrash2 /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-3xl shadow-2xl p-10 w-full max-w-2xl border border-base-300"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-black gradient-text">
                {editingMember ? "Edit Team Member" : "Add New Team Member"}
              </h2>
              <button onClick={closeModal} className="text-3xl hover:text-primary transition">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <select
                value={form.project_id}
                onChange={(e) => setForm({ ...form, project_id: e.target.value })}
                className="select select-bordered w-full bg-base-200/60 text-lg"
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full Name"
                className="input input-bordered w-full bg-base-200/60 text-lg"
                required
              />

              <input
                type="text"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                placeholder="Designation"
                className="input input-bordered w-full bg-base-200/60 text-lg"
                required
              />

              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email (optional)"
                className="input input-bordered w-full bg-base-200/60 text-lg"
              />

              <div className="flex justify-end gap-6">
                <button type="button" onClick={closeModal} className="btn btn-ghost btn-lg">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-lg hero-gradient-btn">
                  {editingMember ? "Update Member" : "Add Member"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}