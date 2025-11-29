import { FaReact, FaNodeJs, FaFigma, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiMysql, SiTailwindcss, SiMongodb, SiMongoose, SiExpress, SiEjs, SiRedux, SiJavascript, SiPython, SiDjango, SiArduino } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiNextjsFill } from "react-icons/ri";

const TechStack = () => {
  return (
    <section className="py-20 px-6 lg:px-16 text-center">
      <h2 className="text-4xl font-bold mb-10">Our Tech Stack</h2>

      <div className="flex flex-wrap justify-center gap-12 text-6xl opacity-80">
        <FaReact title="React" className="hover:opacity-100 transition" />
        <FaNodeJs title="Node.js" className="hover:opacity-100 transition" />
        <SiMysql title="MySQL" className="hover:opacity-100 transition" />
        <SiTailwindcss title="TailwindCSS" className="hover:opacity-100 transition" />
        <BiLogoPostgresql title="PostgreSQL" className="hover:opacity-100 transition" />
        <SiMongodb title="MongoDB" className="hover:opacity-100 transition" />
        <SiMongoose title="Mongoose" className="hover:opacity-100 transition" />
        <SiExpress title="Express.js" className="hover:opacity-100 transition" />
        <SiEjs title="EJS" className="hover:opacity-100 transition" />      
        <RiNextjsFill title="Next.js" className="hover:opacity-100 transition" />
        <FaFigma title="Figma" className="hover:opacity-100 transition" />
        <SiRedux title="Redux" className="hover:opacity-100 transition" />
        <SiJavascript title="JavaScript" className="hover:opacity-100 transition" />
        <SiPython title="Python" className="hover:opacity-100 transition" />
        <SiDjango title="Django" className="hover:opacity-100 transition" />
        <SiArduino title="Arduino" className="hover:opacity-100 transition" />
        <FaGitAlt title="Git" className="hover:opacity-100 transition" />
        <FaGithub title="Github" className="hover:opacity-100 transition" />


      </div>
    </section>
  );
};

export default TechStack;
