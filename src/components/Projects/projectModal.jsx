// src/components/projects/ProjectModal.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-base-200 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-base-300/80 hover:bg-base-100 flex items-center justify-center"
        >
          <FiX size={24} />
        </button>

        <img src={project.image} alt="" className="w-full h-64 object-cover rounded-t-3xl" />
        <div className="p-8">
          <h2 className="text-4xl font-black mb-4">{project.title}</h2>
          <p className="text-lg text-base-content/80 mb-8">{project.description}</p>

          <div className="flex flex-wrap gap-3 mb-10">
            {project.tech.map((t) => (
              <span key={t} className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium border border-primary/20">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.live !== "#" && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary gap-2">
                <FiExternalLink /> Live Demo
              </a>
            )}
            {project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline gap-2">
                <FiGithub /> GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}