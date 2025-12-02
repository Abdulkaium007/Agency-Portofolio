/* eslint-disable no-unused-vars */
// src/components/projects/ProjectCard.jsx
import { motion } from "framer-motion";

export default function ProjectCard({ project, onClick, variant = "grid" }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.4 }}
      onClick={() => onClick(project)}
      className="group relative overflow-hidden rounded-2xl bg-base-100/80 dark:bg-base-900/80 backdrop-blur-xl border border-base-300 cursor-pointer shadow-xl h-full"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-primary">{project.category}</p>
        <p className="text-sm text-base-content/70 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs text-base-content/50">+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}