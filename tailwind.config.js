/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#F7F1E6", surface: "#FFFDF8" },
        ink: { DEFAULT: "#17130F", muted: "#6F665C" },
        caramel: { DEFAULT: "#8B5E2B", hover: "#6F471F", soft: "#C9A06C" },
        yellowsoft: "#E8D39D",
        beige: "#EDE4D5",
        line: "#DED4C5",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      boxShadow: {
        soft: "0 20px 50px rgba(23, 19, 15, 0.08)",
        lift: "0 30px 60px rgba(23, 19, 15, 0.12)",
      },
    },
  },
  plugins: [],
};