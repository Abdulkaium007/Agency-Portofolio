// src/components/Projects/ProjectSlider.jsx
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProjectSlider({ projects, onSelect }) {
  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (!scrollContainer.current) return;
    const scrollAmount = 420;
    scrollContainer.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative mb-20">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12 gradient-text [line-height:1.2] pb-2">
        Featured Projects
      </h2>

      {/* Main Container with padding for half-outside arrows */}
      <div className="relative px-16"> {/* This creates space for arrows */}

        {/* Scrollable Area - NO SCROLLBAR EVER */}
        <div
          ref={scrollContainer}
          className="overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-8 py-6 min-w-max">
            {[...projects, ...projects].map((p, i) => (
              <div key={`${p.id}-${i}`} className="flex-shrink-0 w-80">
                <ProjectCard project={p} onClick={onSelect} />
              </div>
            ))}
          </div>
        </div>

        {/* LEFT ARROW - Half inside, half outside */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 
                     w-14 h-14 rounded-full 
                     bg-base-100/90 dark:bg-base-900/90 
                     backdrop-blur-md border border-base-300 
                     shadow-2xl flex items-center justify-center 
                     hover:bg-primary hover:text-white hover:border-primary 
                     transition-all duration-300 z-20 
                     -translate-x-1/2"  // This pushes half of button outside
        >
          <FiChevronLeft size={32} />
        </button>

        {/* RIGHT ARROW - Half inside, half outside */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 
                     w-14 h-14 rounded-full 
                     bg-base-100/90 dark:bg-base-900/90 
                     backdrop-blur-md border border-base-300 
                     shadow-2xl flex items-center justify-center 
                     hover:bg-primary hover:text-white hover:border-primary 
                     transition-all duration-300 z-20 
                     translate-x-1/2"  // This pushes half of button outside
        >
          <FiChevronRight size={32} />
        </button>
      </div>

      {/* GLOBAL SCROLLBAR HIDE (Add once in index.css) */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}