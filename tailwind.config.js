/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./projects/**/*.{html,ts,css,scss,sass,less,styl}"],
  theme: {
    colors: {
      blue: colors.blue,
      gray: colors.gray,
      green: colors.green,
      orange: colors.orange,
      red: colors.red,
      teal: colors.teal,
      white: colors.white,
    },
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
