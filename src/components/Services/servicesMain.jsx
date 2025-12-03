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
// eslint-disable-next-line no-unused-vars
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: <FaCode className="w-10 h-10" />,
    title: "Web Development",
    desc: "Blazing-fast, fully responsive websites & web apps built with React, Next.js, and modern tooling.",
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

// Floating Particles Component
const ParticlesBackground = () => {
  const [particles] = useState(() =>
    Array.from({ length: 16 }).map(() => ({
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * 600 + 100,
      xDirection: Math.random() > 0.5 ? "+=50" : "-=50",
      duration: 15 + Math.random() * 10,
      leftPosition: Math.random() * 100,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles?.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: particle.initialX,
            y: particle.initialY,
          }}
          animate={{
            y: [null, -100],
            x: particle.xDirection,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${particle.leftPosition}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function ServicesSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="py-24 lg:py-32 px-6 relative overflow-hidden bg-gradient-to-b from-base-200 via-base-100 to-base-200">
      {/* Subtle Floating Particles */}
      <ParticlesBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Epic Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 leading-tight tracking-tight"
        >
          What We Do Best
        </motion.h2>

        {/* Services Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 80 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: idx * 0.15,
                duration: 0.8,
                ease: "easeOut",
              }}
              whileHover={{
                y: prefersReducedMotion ? 0 : -20,
                scale: prefersReducedMotion ? 1 : 1.05,
                transition: { duration: 0.4, type: "spring", stiffness: 300 },
              }}
              className="group relative p-8 rounded-3xl bg-base-100/80 dark:bg-base-900/80 backdrop-blur-xl border border-base-300/60 shadow-2xl hover:border-primary/80 hover:shadow-primary/30 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Featured Badge */}
              {service.featured && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl z-20"
                >
                  Most Popular
                </motion.div>
              )}

              {/* Gradient Orb Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-700`}
              />

              {/* Icon with Hover Bounce */}
              <motion.div
                className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-5 mb-6 shadow-xl flex items-center justify-center`}
                whileHover={{ scale: 1.2, rotate: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-white">{service.icon}</div>
              </motion.div>

              {/* Title */}
              <h3 className="relative z-10 text-2xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-base-content/70 leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* Learn More Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.6 }}
                className="relative z-10"
              >
                <span className="text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300 inline-flex items-center gap-2">
                  Learn More <span className="text-xl">→</span>
                </span>
              </motion.div>

              {/* Shine Sweep Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-24"
        >
          <p className="text-xl md:text-2xl text-base-content/80 mb-10 max-w-3xl mx-auto">
            Ready to launch something extraordinary?
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="btn btn-primary btn-lg shadow-2xl hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"
            >
              Start Your Project
            </a>
            <a
              href="/portfolio"
              className="btn btn-outline btn-lg border-2 hover:bg-primary hover:text-white transition-all duration-300"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}