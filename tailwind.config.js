/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        heroBackground: "#F5FBFF",
        primary: "#16ABFF"
      },
      fontFamily: {
        space: ['"Space Grotesk"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
