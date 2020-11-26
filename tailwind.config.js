var colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
