/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        lobster: ["Lobster", "cursive"],
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};
