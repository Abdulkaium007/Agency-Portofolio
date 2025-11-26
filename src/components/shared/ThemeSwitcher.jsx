import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={`relative w-14 h-7 rounded-full flex items-center p-0.5
                  shadow-md hover:shadow-xl transition-all duration-300
                  ${
                    theme === "light"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : "bg-gradient-to-r from-amber-500 to-orange-500"
                  }`}
    >
      {/* Knob */}
      <span
        className={`absolute w-6 h-6 bg-white rounded-full shadow-lg transform
                    transition-transform duration-300 ease-in-out flex items-center justify-center
                    ${theme === "light" ? "translate-x-0" : "translate-x-7"}`}
      >
        {theme === "light" ? (
          // Enhanced Sun Icon
          <svg
            className="w-5 h-5 text-yellow-400 drop-shadow-lg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="5" />
            <g stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="6.64" y2="6.64" />
              <line x1="17.36" y1="17.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="6.64" y2="17.36" />
              <line x1="17.36" y1="6.64" x2="19.78" y2="4.22" />
            </g>
          </svg>
        ) : (
          // Moon Icon
          <svg
            className="w-5 h-5 text-yellow-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default ThemeSwitcher;
