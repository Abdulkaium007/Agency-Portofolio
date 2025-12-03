// src/components/Services/CaseStudies.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const cases = [
  {
    title: "E-commerce Platform Transformation",
    client: "RetailCorp",
    challenge: "Legacy system causing performance issues and limiting growth",
    solution: "Complete rebuild with React + Vite + Node.js microservices",
    results: [
      "300% improvement in page load speed",
      "50% increase in conversion rates",
      "99.9% uptime achieved",
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
  },
  {
    title: "SaaS Dashboard Redesign",
    client: "TechFlow Inc.",
    challenge: "Outdated UI leading to high churn rate",
    solution: "Modern dashboard with real-time analytics & dark mode",
    results: [
      "78% increase in user retention",
      "4.9/5 customer satisfaction score",
      "40% faster task completion",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    title: "Mobile Banking App Launch",
    client: "NeoBank",
    challenge: "Needed secure, beautiful app in 3 months",
    solution: "React Native app with biometric login & instant transfers",
    results: [
      "100K+ downloads in first month",
      "4.8 rating on App Store",
      "Zero security incidents",
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
  },
];

// Reusable Checkmark SVG (clean, sharp, animated)
const Checkmark = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <motion.path
      d="M4 12.6l5.6 5.6L20 7"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    />
  </svg>
);

export default function CaseStudiesSection() {
  return (
    <section className="py-24 lg:py-32 px-6 bg-gradient-to-b from-base-100 via-base-200 to-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-clip-text text-transparent gradient-text leading-tight">
            Case Studies
          </h2>
          <p className="text-xl md:text-2xl text-base-content/70 max-w-4xl mx-auto">
            Real results. Real clients. Real growth.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cases.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative bg-base-100 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-current"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-base-content group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-primary font-bold text-sm mb-5">Client: {item.client}</p>

                <div className="space-y-3 text-sm text-base-content/70 mb-6">
                  <p><strong className="text-base-content">Challenge:</strong> {item.challenge}</p>
                  <p><strong className="text-base-content">Solution:</strong> {item.solution}</p>
                </div>

                {/* Results */}
                <div className="pt-6 border-t border-base-300/50">
                  <p className="font-bold text-primary mb-4 text-lg">Results:</p>
                  {item.results.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.4 }}
                      className="flex items-center gap-3 text-secondary font-semibold text-sm mb-2"
                    >
                      <Checkmark />
                      <span>{result}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Shine Sweep Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 pointer-events-none" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}