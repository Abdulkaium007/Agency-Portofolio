import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMysql, SiTailwindcss } from "react-icons/si";

const TechStack = () => {
  return (
    <section className="py-20 px-6 lg:px-16 text-center">
      <h2 className="text-4xl font-bold mb-10">Our Tech Stack</h2>

      <div className="flex flex-wrap justify-center gap-12 text-6xl opacity-80">
        <FaReact title="React" className="hover:opacity-100 transition" />
        <FaNodeJs title="Node.js" className="hover:opacity-100 transition" />
        <SiMysql title="MySQL" className="hover:opacity-100 transition" />
        <SiTailwindcss title="TailwindCSS" className="hover:opacity-100 transition" />
      </div>
    </section>
  );
};

export default TechStack;
