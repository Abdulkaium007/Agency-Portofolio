import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content transition-colors duration-500">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to elevate your brand?
        </h2>
        <p className="text-xl opacity-90 mb-10">
          Let’s create something extraordinary together.
        </p>
        <Link
          to="/contact"
          className="px-8 py-3 rounded-lg shadow-lg
               bg-primary text-button hover:bg-primary/80 transition-all duration-300 hover:scale-105"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
