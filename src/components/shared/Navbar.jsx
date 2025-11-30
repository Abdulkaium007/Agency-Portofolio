import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<nav className="bg-base-100 dark:bg-base-200 shadow-md sticky top-0 z-50 transition-colors duration-500">
  <div className="w-full px-24 py-4 flex justify-between items-center">
    {/* Logo */}
    <Link
      to="/"
      className="text-3xl font-bold text-primary dark:text-primary"
      data-theme-text
    >
      BornoByte Web Agency
    </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary font-medium transition-colors duration-300 text-lg"
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary font-medium transition-colors duration-300 text-lg"
          >
            Projects
          </Link>
          <Link
            to="/services"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary font-medium transition-colors duration-300 text-lg"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary font-medium transition-colors duration-300 text-lg"
          >
            About Us
          </Link>
          <Link
            to="/blog"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary font-medium transition-colors duration-300 text-lg"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary font-medium transition-colors duration-300 text-lg"
          >
            Contact
          </Link>

      <ThemeSwitcher />
    </div>

    {/* Mobile Hamburger */}
    <button
      className="md:hidden flex flex-col gap-1"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span className="block w-6 h-0.5 bg-base-content dark:bg-base-content"></span>
      <span className="block w-6 h-0.5 bg-base-content dark:bg-base-content"></span>
      <span className="block w-6 h-0.5 bg-base-content dark:bg-base-content"></span>
    </button>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden bg-base-100 dark:bg-base-200 shadow-lg px-6 py-4 flex flex-col gap-4 animate-fadeIn">
      <Link
        to="/"
        onClick={() => setMenuOpen(false)}
        className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary transition-colors duration-300"
      >
        Home
      </Link>
      <Link
        to="/projects"
        onClick={() => setMenuOpen(false)}
        className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary transition-colors duration-300"
      >
        Projects
      </Link>
      <Link
        to="/services"
        onClick={() => setMenuOpen(false)}
        className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary transition-colors duration-300"
      >
        Services
      </Link>
            <Link
        to="/about"
        onClick={() => setMenuOpen(false)}
        className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary transition-colors duration-300"
      >
        About Us
      </Link>
            <Link
        to="/blog"
        onClick={() => setMenuOpen(false)}
        className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary transition-colors duration-300"
      >
        Blog
      </Link>
      <Link
        to="/contact"
        onClick={() => setMenuOpen(false)}
        className="text-base-content dark:text-base-content hover:text-primary dark:hover:text-primary transition-colors duration-300"
      >
        Contact
      </Link>

      <div className="pt-2 flex justify-center">
        <ThemeSwitcher />
      </div>
    </div>
  )}
</nav>

  );
};

export default Navbar;
