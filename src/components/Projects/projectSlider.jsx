// src/components/projects/ProjectSlider.jsx
import ProjectCard from "./ProjectCard";

export default function ProjectSlider({ projects, onSelect }) {
  return (
    <section className="mb-20">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 gradient-text">
        Featured Projects
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 px-4 py-6">
          {[...projects, ...projects].map((p, i) => (
            <div key={`${p.id}-${i}`} className="flex-shrink-0 w-80">
              <ProjectCard project={p} onClick={onSelect} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}