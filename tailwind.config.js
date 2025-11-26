/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class', // toggled via ThemeSwitcher
  theme: {
    extend: {
      fontFamily: {
        heading: ['Prompt', ...defaultTheme.fontFamily.sans],
        body: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          light: '#1e40af', // premium dark blue for light mode
          dark: '#ffa600',  // amber for dark mode
        },
        secondary: '#14b8a6',
        accent: '#f59e0b',
      },
    },
  },
  plugins: [
    daisyui,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#1e40af',        // premium dark blue
          'base-100': '#ffffff',
          'base-content': '#1f2937',
          secondary: '#14b8a6',
          accent: '#f59e0b',
          neutral: '#374151',
        },
        dark: {
          primary: '#ffa600',        // amber
          'base-100': '#1f2937',
          'base-content': '#ffffff',
          secondary: '#14b8a6',
          accent: '#4f46e5',
          neutral: '#1f2937',
        },
      },
      "retro",
      "synthwave",
    ],
  },
};
