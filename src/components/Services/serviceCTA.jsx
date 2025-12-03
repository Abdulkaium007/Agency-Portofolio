// src/components/Services/FinalCTASection.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // React Router — works perfectly with Vite

export default function FinalCTASection() {
  return (
    <section className="relative py-20 lg:py-24 px-6 overflow-hidden hero-gradient-bg min-h-[70vh]">
      {/* Background Glow Effect */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-orange-500/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/40 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/30 blur-3xl rounded-full animate-pulse delay-700" />
      </div> */}

      <div className="relative z-10 max-w-6xl mx-auto text-center ">
        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-8"
        >
          Let's Build Your
          <br />
          <span className="bg-gradient-to-r fade-text bg-clip-text">
            Solution Together
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl lg:text-3xl font-light opacity-90 max-w-4xl mx-auto mb-16 leading-relaxed"
        >
          Ready to transform your business with cutting-edge technology?
          <br className="hidden md:block" />
          Our expert team is here to turn your vision into reality — every step of the way.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Primary Button */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-4 bg-base-100 text-primary font-black text-xl md:text-2xl px-12 py-7 rounded-full shadow-2xl hover:shadow-cta transform hover:scale-110 transition-all duration-500 hover:-translate-y-1"
          >
            Start Your Project
            <span className="text-3xl group-hover:translate-x-3 transition-transform duration-300">→</span>
          </Link>

          {/* Secondary Button (Optional) */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-white font-bold text-lg px-10 py-6 border-4 border-white/30 rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all duration-500"
          >
            Schedule a Consultation
          </Link>
        </motion.div>

        {/* Trust Badge (Optional Micro-Detail) */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-16 text-white/70 text-sm font-medium tracking-wider"
        >
          Trusted by startups & enterprises • 100+ successful projects • Since 2020
        </motion.p>
      </div>
    </section>
  );
}