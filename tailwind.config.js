/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts,scss,css}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 4px 20px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        "regal-blue": "#3a63cc",
        "light-gray": "#b3b3b8",
        "pri-black": "#1f1f1f",
      },
      fontFamily: {
        mont: ["Montserrat"],
        lato: ["Lato"],
      },
    },
  },
  plugins: [],
  // important: true,
};
