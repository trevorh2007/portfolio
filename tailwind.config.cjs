/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        background: "#ffffff",
        backgroundLight: "#f8f9fa",
        text: "#212529",
        border: "#dee2e6",
        buttonBackground: "#e9ecef",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
