// src/components/Blog/BlogPage.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCalendar, FiUser, FiClock, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const posts = [
  {
    id: 1,
    title: "Building a 100/100 Lighthouse Site in 2025",
    excerpt: "The exact stack, tools, and performance secrets we used to hit perfect scores.",
    author: "Alex Chen",
    date: "Dec 4, 2025",
    readTime: "6 min",
    category: "Performance",
    gradient: "from-blue-500 to-cyan-500",
    image: "/blog/performance.jpg",
  },
  {
    id: 2,
    title: "Why AI Will Never Replace Great Designers",
    excerpt: "AI is a tool — not a replacement. Here’s how the best designers are using it.",
    author: "Sarah Kim",
    date: "Nov 28, 2025",
    readTime: "8 min",
    category: "Design",
    gradient: "from-purple-500 to-pink-500",
    image: "/blog/ai-design.jpg",
  },
  {
    id: 3,
    title: "From Garage to Unicorn: Our $1M Client Story",
    excerpt: "How we helped a startup scale with branding, dev, and growth hacking.",
    author: "Mike Torres",
    date: "Nov 20, 2025",
    readTime: "10 min",
    category: "Case Study",
    gradient: "from-orange-500 to-red-500",
    image: "/blog/case-study.jpg",
  },
  {
    id: 4,
    title: "The Future of Full-Stack React in 2025",
    excerpt: "React Server Components, Suspense, and the death of client-side routing.",
    author: "Dev Team",
    date: "Nov 15, 2025",
    readTime: "12 min",
    category: "Development",
    gradient: "from-emerald-500 to-teal-600",
    image: "/blog/react-2025.jpg",
  },
  // Add more...
];

export default function BlogPage() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="min-h-screen py-24 lg:py-32 px-6 overflow-hidden bg-gradient-to-b from-base-200 via-base-100 to-base-200">
      <div className="max-w-7xl mx-auto">

        {/* Epic Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-8xl font-black gradient-text leading-tight pb-4 tracking-tight">
            Insights & Stories
          </h1>
          <p className="text-xl text-base-content/70 mt-6 max-w-3xl mx-auto">
            Deep dives, tutorials, and behind-the-scenes from the team building tomorrow’s digital experiences.
          </p>
        </motion.div>

        {/* Featured Large Post */}
        {posts[0] && (
          <motion.article
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group relative rounded-3xl overflow-hidden mb-20 shadow-2xl"
          >
            <Link to={`/blog/${posts[0].id}`}>
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden">
                  <img
                    src={posts[0].image}
                    alt={posts[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className={`relative p-12 lg:p-16 bg-gradient-to-br ${posts[0].gradient} bg-opacity-90`}>
                  <span className="inline-block px-5 py-2 rounded-full bg-white/20 text-white font-bold text-sm mb-6">
                    FEATURED POST
                  </span>
                  <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
                    {posts[0].title}
                  </h2>
                  <p className="text-white/90 text-lg mb-8 line-clamp-3">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-white/80">
                    <span className="flex items-center gap-2"><FiUser /> {posts[0].author}</span>
                    <span className="flex items-center gap-2"><FiCalendar /> {posts[0].date}</span>
                    <span className="flex items-center gap-2"><FiClock /> {posts[0].readTime}</span>
                  </div>
                  <FiArrowRight className="absolute bottom-8 right-8 text-4xl text-white opacity-60 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        {/* All Posts Grid — Same Premium Card as Services */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {posts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.12, duration: 0.8 }}
              whileHover={{ y: -16, scale: 1.04 }}
              className="group relative p-8 rounded-3xl bg-base-100/70 dark:bg-base-900/70 backdrop-blur-xl border border-base-300/50 shadow-xl hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Gradient Orb Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

              {/* Category Badge */}
              <span className="relative z-10 inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
                {post.category}
              </span>

              {/* Title */}
              <h3 className="relative z-10 text-2xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="relative z-10 text-base-content/70 mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="relative z-10 flex items-center justify-between text-sm text-base-content/60">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><FiUser size={14} /> {post.author}</span>
                  <span className="flex items-center gap-1"><FiClock size={14} /> {post.readTime}</span>
                </div>
                <FiArrowRight className="group-hover:translate-x-3 transition-transform duration-300" />
              </div>

              {/* Shine Sweep */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 pointer-events-none" />
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-24"
        >
          <p className="text-2xl mb-8 text-base-content/80">
            Never miss an update
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Your email" className="flex-1 input input-bordered input-primary" />
            <button className="btn btn-primary btn-lg shadow-xl hover:shadow-primary/50">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}