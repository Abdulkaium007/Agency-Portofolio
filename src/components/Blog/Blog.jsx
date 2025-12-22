// src/components/Blog/BlogPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { FiCalendar, FiUser, FiClock, FiArrowRight, FiX } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import BlogCTA from "./blogCTA";

const BASE_URL = "/api";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); // For modal
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blogs`);
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Failed to load blogs", err);
        setBlogs([]);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users`);
        const users = res.data || [];
        const map = {};
        users.forEach(u => {
          map[u.id] = u.fullname || "BornoByte Team";
        });
        setUsersMap(map);
      } catch (err) {
        console.warn("Could not load user names (normal for public page)", err);
        setUsersMap({});
      }
    };

    const loadData = async () => {
      await Promise.all([fetchBlogs(), fetchUsers()]);
      setLoading(false);
    };

    loadData();
  }, []);

  const getAuthorName = (users_id) => {
    return usersMap[users_id] || "BornoByte Team";
  };

  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
  };

  const closeBlogModal = () => {
    setSelectedBlog(null);
  };

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-base-200 to-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-base-200 via-base-100 to-base-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-black hero-gradient-text mb-8">Insights & Stories</h1>
          <p className="text-2xl text-base-content/60">No blogs published yet. Check back soon!</p>
        </div>
        <BlogCTA />
      </section>
    );
  }

  return (
    <section className="min-h-screen py-10 lg:py-12 px-6 overflow-hidden bg-gradient-to-b from-base-200 via-base-100 to-base-200">
      <div className="max-w-7xl mx-auto">

        {/* Epic Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-8xl font-black hero-gradient-text leading-tight pb-4 tracking-tight">
            Insights & Stories
          </h1>
          <p className="text-xl text-base-content/70 mt-6 max-w-3xl mx-auto">
            Deep dives, tutorials, and behind-the-scenes from the team building tomorrow’s digital experiences.
          </p>
        </motion.div>

        {/* Featured Large Post */}
        {featuredBlog && (
          <motion.article
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            onClick={() => openBlogModal(featuredBlog)}
            className="group relative rounded-3xl overflow-hidden mb-20 shadow-2xl cursor-pointer"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden bg-base-300 flex items-center justify-center">
                <span className="text-white/60 text-2xl font-medium">Blog Image Coming Soon</span>
              </div>
              <div className="relative p-12 lg:p-16 hero-gradient-bg bg-opacity-90">
                <span className="inline-block px-5 py-2 rounded-full bg-white/20 text-white font-bold text-sm mb-6">
                  FEATURED POST
                </span>
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  {featuredBlog.title}
                </h2>
                <p className="text-white/90 text-lg mb-8 line-clamp-3">
                  {featuredBlog.content.replace(/<[^>]*>/g, "").slice(0, 250)}...
                </p>
                <div className="flex items-center gap-6 text-white/80">
                  <span className="flex items-center gap-2">
                    <FiUser /> {getAuthorName(featuredBlog.users_id)}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiCalendar /> {featuredBlog.published_date ? new Date(featuredBlog.published_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently"}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiClock /> ~8 min read
                  </span>
                </div>
                <FiArrowRight className="absolute bottom-8 right-8 text-4xl text-white opacity-60 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
              </div>
            </div>
          </motion.article>
        )}

        {/* All Other Posts Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {otherBlogs.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.12, duration: 0.8 }}
              whileHover={{ y: -16, scale: 1.04 }}
              onClick={() => openBlogModal(post)}
              className="group relative p-8 rounded-3xl bg-base-100/70 backdrop-blur-xl border border-base-300/50 shadow-xl hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-700" />

              <span className="relative z-10 inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
                Insight
              </span>

              <h3 className="relative z-10 text-2xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>

              <p className="relative z-10 text-base-content/70 mb-6 line-clamp-3">
                {post.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
              </p>

              <div className="relative z-10 flex items-center justify-between text-sm text-base-content/60">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <FiUser size={14} /> {getAuthorName(post.users_id)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={14} /> ~6 min
                  </span>
                </div>
                <FiArrowRight className="group-hover:translate-x-3 transition-transform duration-300" />
              </div>

              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 pointer-events-none" />
            </motion.article>
          ))}
        </div>

        <BlogCTA />
      </div>

      {/* FULL BLOG MODAL */}
      {selectedBlog && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={closeBlogModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
            className="bg-base-100 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-base-300"
          >
            <div className="sticky top-0 bg-base-100/90 backdrop-blur-xl border-b border-base-300 p-6 flex justify-between items-center">
              <h2 className="text-4xl font-black gradient-text">{selectedBlog.title}</h2>
              <button onClick={closeBlogModal} className="text-3xl hover:text-primary transition">
                <FiX />
              </button>
            </div>

            <div className="p-10 lg:p-16">
              <div className="flex items-center gap-6 text-base-content/70 mb-8">
                <span className="flex items-center gap-2">
                  <FiUser /> {getAuthorName(selectedBlog.users_id)}
                </span>
                <span className="flex items-center gap-2">
                  <FiCalendar /> {selectedBlog.published_date ? new Date(selectedBlog.published_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recently"}
                </span>
                <span className="flex items-center gap-2">
                  <FiClock /> ~8 min read
                </span>
              </div>

              <div className="prose prose-lg max-w-none text-base-content">
                <p className="whitespace-pre-wrap text-justify leading-relaxed">
                  {selectedBlog.content}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}