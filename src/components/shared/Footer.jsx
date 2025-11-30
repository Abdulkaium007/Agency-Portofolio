import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 dark:bg-base-300 text-base-content dark:text-base-content py-8 mt-12 transition-colors duration-500">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BornoByte Agency. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4">
          <Link
            to="/"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary text-sm transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary text-sm transition-colors duration-300"
          >
            Projects
          </Link>
          <Link
            to="/services"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary text-sm transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary text-sm transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/blog"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary text-sm transition-colors duration-300"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary text-sm transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
