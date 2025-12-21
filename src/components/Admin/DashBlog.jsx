// src/components/admin/DashBlogs.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";  // ← Fixed path
import axios from "axios";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCalendar } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

const BASE_URL = "http://100.84.176.7:5000";

export default function DashBlogs() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    published_date: format(new Date(), "yyyy-MM-dd"),
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/blogs`);
      setBlogs(res.data || []);
    } catch (err) {
      toast.error("Failed to load blogs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const payload = {
      users_id: user.id,
      title: form.title.trim(),
      content: form.content.trim(),
      published_date: form.published_date,
    };

    try {
      if (editingBlog) {
        await axios.put(`${BASE_URL}/blogs/${editingBlog.id}`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success("Blog updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/blogs`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success("Blog created successfully!");
      }
      closeModal();
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${BASE_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Blog deleted");
      fetchBlogs();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title || "",
      content: blog.content || "",
      published_date: blog.published_date 
        ? format(new Date(blog.published_date), "yyyy-MM-dd") 
        : format(new Date(), "yyyy-MM-dd"),
    });
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingBlog(null);
    setForm({
      title: "",
      content: "",
      published_date: format(new Date(), "yyyy-MM-dd"),
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBlog(null);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-black gradient-text">Blog Management</h1>
        <button onClick={openAdd} className="btn btn-primary hero-gradient-btn flex items-center gap-3 text-lg">
          <FiPlus className="text-xl" /> Add New Blog
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-base-content/60">No blogs yet — create your first masterpiece!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">{blog.title}</h2>
                <p className="text-sm text-base-content/60 flex items-center gap-2">
                  <FiCalendar /> {blog.published_date ? format(new Date(blog.published_date), "MMM dd, yyyy") : "Draft"}
                </p>
                <p className="text-base-content/80 line-clamp-4 mt-3 whitespace-pre-wrap">
                  {blog.content}
                </p>

                <div className="card-actions justify-end mt-6 gap-3">
                  <button onClick={() => openEdit(blog)} className="btn btn-ghost btn-sm">
                    <FiEdit2 /> Edit
                  </button>
                  <button onClick={() => handleDelete(blog.id)} className="btn btn-error btn-sm">
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
                {editingBlog ? "Edit Blog" : "Create New Blog"}
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
                placeholder="Enter blog title..."
                className="input input-bordered w-full text-2xl font-bold bg-base-200/60"
                required
              />

              <input
                type="date"
                value={form.published_date}
                onChange={(e) => setForm({ ...form, published_date: e.target.value })}
                className="input input-bordered w-full bg-base-200/60"
                required
              />

              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write your blog content here... (supports line breaks and plain text)"
                className="textarea textarea-bordered w-full h-80 bg-base-200/60 text-lg resize-none"
                required
              />

              <div className="flex justify-end gap-4">
                <button type="button" onClick={closeModal} className="btn btn-ghost text-lg">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary hero-gradient-btn text-lg">
                  {editingBlog ? "Update Blog" : "Publish Blog"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}