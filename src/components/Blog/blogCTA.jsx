// src/components/Blog/BlogCTA.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function BlogCTA() {
  return (
    <section className="py-10 lg:py-32 overflow-hidden">
      <div className=" w-full px-6">
        
        {/* Exact Orange-Red Block from your screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative rounded-3xl hero-gradient-bg lg:p-24 text-center shadow-2xl overflow-hidden"
        >
          {/* Subtle glow overlay */}
          <div className="absolute inset-0 bg-white/5"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Heading */}
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Stay Updated
            </h2>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Subscribe to our newsletter and never miss the latest insights and trends.
            </p>

            {/* Form — Exact match */}
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-8 py-5 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 text-lg"
              />
              <button
                type="submit"
                className="px-10 py-5 rounded-full bg-base-100 text-primary font-bold text-lg hover:bg-orange-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>

            {/* Trust line */}
            <p className="text-white/70 text-sm mt-6">
              No spam · Unsubscribe anytime
            </p>
          </div>

          {/* Shine sweep effect */}
          <div className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}