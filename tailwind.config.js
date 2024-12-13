/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        heroBackground: "#F5FBFF",
        primary: "#16ABFF",
        hostTextTitle: "#284F7D",
        hostTextContent: "#84AECC",
        guestTextTitle: "#2B3486",
        guestTextContent: "#9199DD",
      },
      fontFamily: {
        space: ['"Space Grotesk"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
