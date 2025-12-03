"use client";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
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
import { useInView } from "react-intersection-observer";

const services = [
  {
    icon: <FaCode />,
    title: "Web Development",
    desc: "Blazing-fast, fully responsive websites & web apps built with React, Next.js, and modern tooling.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <FaPaintBrush />,
    title: "UI/UX Design",
    desc: "Pixel-perfect, conversion-focused designs that users fall in love with at first sight.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <FaServer />,
    title: "Backend & APIs",
    desc: "Scalable, secure backend systems with Node.js, Python, PostgreSQL, and clean REST/GraphQL APIs.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Apps",
    desc: "Native-like cross-platform apps using React Native & Flutter — smooth, fast, beautiful.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <FaBullhorn />,
    title: "Digital Marketing",
    desc: "SEO, Google/FB Ads, content strategy & social growth that actually converts.",
    gradient: "from-amber-500 to-rose-500",
  },
  {
    icon: <FaCogs />,
    title: "Automation & AI",
    desc: "Custom bots, workflows, CRM integrations — save hundreds of hours monthly.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: <FaRocket />,
    title: "Performance Optimization",
    desc: "100/100 Lighthouse scores, Core Web Vitals mastery, instant load times.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: <FaShieldAlt />,
    title: "Security & Maintenance",
    desc: "Penetration testing, SSL, updates, backups — your site stays bulletproof.",
    gradient: "from-red-500 to-pink-600",
  },
];

export default function ServicesSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="py-24 lg:py-32 px-6 overflow-hidden bg-gradient-to-b from-base-200 via-base-100 to-base-200">
      <div className="max-w-7xl mx-auto">

        {/* Epic Heading — No Cropped 'j' */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-20 
                     gradient-text leading-tight pb-4 tracking-tight"
          style={{ lineHeight: "1.1" }} // Safety net
        >
          What We Do Best
        </motion.h2>

        {/* Services Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
              whileHover={{
                y: -16,
                scale: 1.05,
                transition: { duration: 0.4 },
              }}
              className="group relative p-8 rounded-3xl bg-base-100/70 dark:bg-base-900/70 backdrop-blur-xl border border-base-300/50 shadow-xl hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Animated Gradient Orb Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

              {/* Icon Container */}
              <div
                className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-5 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}
              >
                <div className="text-white text-4xl">
                  {service.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="relative z-10 text-2xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="relative z-10 text-base-content/70 leading-relaxed">
                {service.desc}
              </p>

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Optional CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-xl text-base-content/80 mb-8">
            Ready to turn your vision into reality?
          </p>
          <a href="/contact" className="btn btn-primary btn-lg shadow-xl hover:shadow-primary/50">
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}