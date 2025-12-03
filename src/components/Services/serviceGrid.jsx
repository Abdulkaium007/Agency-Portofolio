// src/components/Services/ServicesGrid.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaCode,
  FaPaintBrush,
  FaServer,
  FaMobileAlt,
  FaBullhorn,
  FaCogs,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

const services = [
  {
    icon: <FaCode className="w-10 h-10" />,
    title: "Web Development",
    desc: "Blazing-fast, fully responsive websites & web apps built with React, Vite, and modern tooling.",
    gradient: "from-blue-500 to-cyan-500",
    featured: true,
  },
  {
    icon: <FaPaintBrush className="w-10 h-10" />,
    title: "UI/UX Design",
    desc: "Pixel-perfect, conversion-focused designs that users fall in love with at first sight.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <FaServer className="w-10 h-10" />,
    title: "Backend & APIs",
    desc: "Scalable, secure backend systems with Node.js, Python, PostgreSQL, and clean REST/GraphQL APIs.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: <FaMobileAlt className="w-10 h-10" />,
    title: "Mobile Apps",
    desc: "Native-like cross-platform apps using React Native & Flutter — smooth, fast, beautiful.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <FaBullhorn className="w-10 h-10" />,
    title: "Digital Marketing",
    desc: "SEO, Google/FB Ads, content strategy & social growth that actually converts.",
    gradient: "from-amber-500 to-rose-500",
  },
  {
    icon: <FaCogs className="w-10 h-10" />,
    title: "Automation & AI",
    desc: "Custom bots, workflows, CRM integrations — save hundreds of hours monthly.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: <FaRocket className="w-10 h-10" />,
    title: "Performance Optimization",
    desc: "100/100 Lighthouse scores, Core Web Vitals mastery, instant load times.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: <FaShieldAlt className="w-10 h-10" />,
    title: "Security & Maintenance",
    desc: "Penetration testing, SSL, updates, backups — your site stays bulletproof.",
    gradient: "from-red-500 to-pink-600",
  },
];

export default function ServicesGrid() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="py-24 lg:py-32 px-6 bg-gradient-to-b from-base-100 via-base-200 to-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Epic Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-20 bg-clip-text text-transparent gradient-text leading-tight tracking-tight"
        >
          What We Do Best
        </motion.h2>

        {/* Services Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
              whileHover={{
                y: prefersReducedMotion ? 0 : -20,
                scale: prefersReducedMotion ? 1 : 1.05,
              }}
              className="group relative p-8 rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl hover:border-primary/60 hover:shadow-primary/30 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Featured Badge */}
              {service.featured && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl z-10">
                  MOST POPULAR
                </div>
              )}

              {/* Gradient Orb Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-5 mb-6 shadow-xl flex items-center justify-center text-white`}
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <h3 className="relative z-10 text-2xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-base-content/70 leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Learn More */}
              <span className="relative z-10 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500 inline-flex items-center gap-2">
                Learn more →
              </span>

              {/* Shine Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}