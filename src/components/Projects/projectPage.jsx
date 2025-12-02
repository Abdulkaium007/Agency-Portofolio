// src/pages/Projects.jsx
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import ProjectSlider from "../Projects/projectSlider";
import ProjectGrid from "../Projects/projectGrid";
import ProjectModal from "../Projects/projectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section className="min-h-screen py-24 px-6 bg-gradient-to-b from-base-200 via-base-100 to-base-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 gradient-text">
              Our Projects
            </h1>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              We turn ideas into powerful digital solutions that make an impact.
            </p>
          </motion.div>

          <ProjectSlider projects={projects} onSelect={setSelectedProject} />
          <ProjectGrid projects={projects} onSelect={setSelectedProject} />
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}