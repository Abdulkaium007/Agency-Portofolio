// src/components/projects/ProjectGrid.jsx
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, onSelect }) {
  return (
    <section>
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={onSelect} />
        ))}
      </div>
    </section>
  );
}