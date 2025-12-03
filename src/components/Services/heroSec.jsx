// src/components/Services/heroSec.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ← React Router, not next/link

export default function HeroSection() {
  return (
    <section className="text-base-content relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Optional: Add a subtle animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-base-300 backdrop-blur-3xl" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight"
        >
          <span className="">Our </span>
          <span className="hero-gradient-text">
            Services
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-lg md:text-xl lg:text-2xl  max-w-4xl mx-auto font-light"
        >
          Comprehensive software development & growth services to drive your business forward
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-4 hero-gradient-btn text-white font-bold text-lg md:text-xl px-10 py-6 rounded-full shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-200"
          >
            Get Started Today
            <span className="text-3xl group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}