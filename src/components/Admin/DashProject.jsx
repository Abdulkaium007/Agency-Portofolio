// src/components/admin/DashProjects.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCalendar, FiLink, FiCheck, FiAlertTriangle } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { format } from "date-fns";

const BASE_URL = "http://100.84.176.7:5000";

export default function DashProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "planned", // default
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: "",
    image: "",
  });

  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/projects`);
      setProjects(res.data || []);
    } catch (err) {
      showToast("error", "Failed to load projects");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      showToast("error", "Title and description are required");
      return;
    }

    const payload = {
      users_id: user.id,
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      start_date: form.start_date,
      end_date: form.end_date || null,
      image: form.image.trim() || null,
    };

    try {
      if (editingProject) {
        await axios.put(`${BASE_URL}/projects/${editingProject.id}`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        showToast("success", "Project updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/projects`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        showToast("success", "Project created successfully!");
      }
      closeModal();
      fetchProjects();
    } catch (err) {
      showToast("error", err.response?.data?.message || "Operation failed");
      console.error(err);
    }
  };

  const confirmDelete = (id, title) => {
    setDeleteConfirm({ id, title });
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await axios.delete(`${BASE_URL}/projects/${deleteConfirm.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      showToast("success", "Project deleted successfully");
      setDeleteConfirm(null);
      fetchProjects();
    } catch (err) {
      showToast("error", "Delete failed");
      console.error(err);
    }
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title || "",
      description: project.description || "",
      status: project.status || "planned",
      start_date: project.start_date ? format(new Date(project.start_date), "yyyy-MM-dd") : "",
      end_date: project.end_date ? format(new Date(project.end_date), "yyyy-MM-dd") : "",
      image: project.image || "",
    });
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingProject(null);
    setForm({
      title: "",
      description: "",
      status: "planned",
      start_date: format(new Date(), "yyyy-MM-dd"),
      end_date: "",
      image: "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className="p-6 min-h-screen relative">
      {/* Custom Toast */}
      {toast.show && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-lg flex items-center gap-3 max-w-md`}>
            {toast.type === "success" ? <FiCheck className="text-2xl" /> : <FiAlertTriangle className="text-2xl" />}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-2xl shadow-2xl p-8 max-w-md border border-base-300"
          >
            <h3 className="text-2xl font-bold text-error mb-4">Confirm Delete</h3>
            <p className="text-base-content/80 mb-8">
              Are you sure you want to delete "<span className="font-semibold">{deleteConfirm.title}</span>"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={executeDelete} className="btn btn-error hero-gradient-btn text-white">
                Delete Permanently
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-black gradient-text">Projects Management</h1>
        <button onClick={openAdd} className="btn btn-primary hero-gradient-btn flex items-center gap-3 text-lg">
          <FiPlus className="text-xl" /> Add New Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-base-content/60">No projects yet — showcase your first masterpiece!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all overflow-hidden"
            >
              {project.image ? (
                <figure className="h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </figure>
              ) : (
                <div className="h-48 bg-base-200 flex items-center justify-center">
                  <FiLink className="text-6xl text-base-content/30" />
                </div>
              )}
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">{project.title}</h2>
                <p className="text-base-content/80 line-clamp-3 mt-2">{project.description}</p>
                <div className="flex items-center gap-2 mt-4 text-sm">
                  <span className={`badge ${project.status === "completed" ? "badge-success" : project.status === "ongoing" ? "badge-primary" : "badge-ghost"}`}>
                    {project.status}
                  </span>
                  <span className="flex items-center gap-1 text-base-content/60">
                    <FiCalendar /> {project.start_date ? format(new Date(project.start_date), "MMM yyyy") : "TBD"}
                  </span>
                </div>

                <div className="card-actions justify-end mt-6 gap-3">
                  <button onClick={() => openEdit(project)} className="btn btn-ghost btn-sm">
                    <FiEdit2 /> Edit
                  </button>
                  <button onClick={() => confirmDelete(project.id, project.title)} className="btn btn-error btn-sm">
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-3xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-base-300"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-black gradient-text">
                {editingProject ? "Edit Project" : "Create New Project"}
              </h2>
              <button onClick={closeModal} className="text-3xl hover:text-primary transition">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Project Title"
                className="input input-bordered w-full text-2xl font-bold bg-base-200/60"
                required
              />

              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Project description..."
                className="textarea textarea-bordered w-full h-32 bg-base-200/60 text-lg resize-none"
                required
              />

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="select select-bordered w-full bg-base-200/60"
              >
                <option value="planned">Planned</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  className="input input-bordered w-full bg-base-200/60"
                  required
                />
                <input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  placeholder="End Date (optional)"
                  className="input input-bordered w-full bg-base-200/60"
                />
              </div>

              <input
                type="url"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="Image URL (e.g. imgbb direct link)"
                className="input input-bordered w-full bg-base-200/60"
              />

              <div className="flex justify-end gap-4">
                <button type="button" onClick={closeModal} className="btn btn-ghost text-lg">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary hero-gradient-btn text-lg">
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}