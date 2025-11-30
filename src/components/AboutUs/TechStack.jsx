// TechStack.jsx

import {
  FaReact, FaNodeJs, FaFigma, FaGitAlt, FaGithub
} from "react-icons/fa";
import {
  SiMysql, SiTailwindcss, SiMongodb, SiMongoose, SiExpress, SiEjs,
  SiRedux, SiJavascript, SiPython, SiDjango, SiArduino
} from "react-icons/si";
import { BiLogoPostgresql, BiLogoCPlusPlus } from "react-icons/bi";
import { RiNextjsFill } from "react-icons/ri";
import { LuBrainCircuit } from "react-icons/lu";
import { FaGolang } from "react-icons/fa6";
import { PiCircuitryFill } from "react-icons/pi";

const icons = [
  { icon: <FaReact />, label: "React" },
  { icon: <FaNodeJs />, label: "Node.js" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <SiTailwindcss />, label: "Tailwind" },
  { icon: <BiLogoPostgresql />, label: "PostgreSQL" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiMongoose />, label: "Mongoose" },
  { icon: <SiExpress />, label: "Express" },
  { icon: <SiEjs />, label: "EJS" },
  { icon: <RiNextjsFill />, label: "Next.js" },
  { icon: <FaFigma />, label: "Figma" },
  { icon: <SiRedux />, label: "Redux" },
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiPython />, label: "Python" },
  { icon: <SiDjango />, label: "Django" },
  { icon: <SiArduino />, label: "Arduino" },
  { icon: <FaGitAlt />, label: "Git" },
  { icon: <FaGithub />, label: "GitHub" },
  { icon: <LuBrainCircuit />, label: "AI/ML" },
  { icon: <FaGolang />, label: "Go" },
  { icon: <PiCircuitryFill />, label: "Electronics" },
  { icon: <BiLogoCPlusPlus />, label: "C++" },
];

const doubledIcons = [...icons, ...icons];

const TechStack = () => {
  return (
    <section className="py-20 bg-base-200 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-primary">
          Our Tech Stack
        </h2>

        <div className="space-y-4">

          {/* ROW 1 */}
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {doubledIcons.map((item, idx) => (
                <div
                  key={idx}
                  className="
                    mx-2 flex-shrink-0 w-52 h-24 
                    bg-base-100 rounded-lg border border-gray-400/40 dark:border-gray-200/20
                    flex flex-col items-center justify-center gap-3
                    text-5xl opacity-75
                    hover:opacity-100 hover:border-primary hover:text-primary
                    hover:scale-105 hover:shadow-xl
                    transition-all duration-300 cursor-default
                  "
                >
                  <div className="text-5xl">{item.icon}</div>
                  <span className="text-sm font-medium text-base-content/80">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2 - Reverse direction */}
          <div className="relative">
            <div className="flex animate-marqueeReverse whitespace-nowrap">
              {doubledIcons.map((item, idx) => (
                <div
                  key={idx}
                  className="
                    mx-2 flex-shrink-0 w-52 h-24 
                    bg-base-100 rounded-2xl border  border-gray-400/40 dark:border-gray-200/20
                    flex flex-col items-center justify-center gap-3
                    text-5xl opacity-75
                    hover:opacity-100 hover:border-primary hover:text-primary
                    hover:scale-105 hover:shadow-2xl
                    transition-all duration-300 cursor-default
                  "
                >
                  <div className="text-5xl">{item.icon}</div>
                  <span className="text-sm font-medium text-base-content/80">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Row 3 */  }
          <div className="relative">
            <div className="flex animate-marqueeFast whitespace-nowrap">
              {doubledIcons.map((item, idx) => (  
                <div
                  key={idx}
                  className="
                    mx-2 flex-shrink-0 w-52 h-24 
                    bg-base-100 rounded-2xl border border-gray-400/40 dark:border-gray-200/20
                    flex flex-col items-center justify-center gap-3
                    text-5xl opacity-75
                    hover:opacity-100 
                    hover:border-primary hover:text-primary
                    dark:hover:border-primary dark:hover:text-primary
                    hover:scale-105 hover:shadow-2xl
                    transition-all duration-300 cursor-default
                  "
                >
                  <div className="text-5xl">{item.icon}</div>
                  <span className="text-sm font-medium text-base-content/80">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;