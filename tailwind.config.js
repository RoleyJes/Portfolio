/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#6C6C6C",
          200: "#151110",
        },
        secondary: {
          100: "#5B6950",
          200: "#E4D0D0",
          300: "#D5B4B4",
        },
        bground: {
          100: "#faf9f7",
          200: "#ffe8fc",
        },
      },
      fontFamily: {
        ubuntu: ["Ubuntu"],
        poppins: ["Poppins"],
        kablammo: ["Kablammo"],
      },
    },
  },
  plugins: [],
};
