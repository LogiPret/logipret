/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          blue: "#0055FF",
          dark: "#000000",
          gray: "#F3F4F6",
        },
        logitext: {
          primary: "#0A84FF",
          purple: "#5e5ce6",
          success: "#30D158",
          warning: "#FF9F0A",
          error: "#FF453A",
          bg: "#020617", // Changed to dark blue (slate-950)
          surface: "#0f172a", // Changed to slate-900
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
