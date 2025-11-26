import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center
                        bg-base-200 transition-colors duration-500">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight
                       text-base-content">
          We Craft Digital{" "}
          <span className="text-primary" data-theme-text>
            Experiences
          </span>
          <br />
          That Drive Results
        </h1>

        {/* Subheading */}
        <p className="mt-8 text-xl md:text-2xl max-w-3xl mx-auto text-base-content">
          A creative agency focused on branding, web design, and development
          that helps businesses stand out and grow.
        </p>

        {/* Buttons */}
<div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
  <Link
    to="/projects"
    className="px-8 py-3 rounded-lg shadow-lg
               bg-primary text-button hover:bg-primary/80 transition-all duration-300 hover:scale-105"
  >
    View Our Work
  </Link>
  <Link
    to="/contact"
    className="px-8 py-3 rounded-lg border border-primary
               text-primary dark:text-primary hover:bg-primary/20 hover:text-white hover:scale-105 transition-all duration-300"
  >
    Start a Project
  </Link>
</div>

      </div>
    </section>
  );
};

export default HeroSection;
