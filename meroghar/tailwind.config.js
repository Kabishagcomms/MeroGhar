/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  mode:"jit",
//the purgr property is used to remove unused css from the final build

  content: [
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        mainColor:"#22546D",
        themeColor:"#54A2C9",
        hoverColor:'#cee4ef',
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        gray: colors.neutral
      }
    },
  },
  plugins: [],
}
