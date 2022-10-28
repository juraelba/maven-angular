/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts,scss,css}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 4px 20px rgba(0, 0, 0, 0.25)",
        simple: "0px 4px 20px rgba(0, 0, 0, 0.15)",
        button: "0px 4px 10px rgba(0, 0, 0, 0.20)",
        circle: "0px 0px 4px rgba(0, 0, 0, 0.20)",
      },
      colors: {
        blue: "#7380E7",
        "regal-blue": "#3A63CC",
        "second-blue": "#2e4fa3",
        "dark-blue": "#4A5BD3",
        "light-gray": "#b3b3b8",
        "pri-black": "#1f1f1f",
        "warn-red": "#c94a55",
        "check-green": "#018c76",
        "light-grey": "#F8F8FE",
        gray: "#D7D7DC",
        "pri-gray": "#797979",
        violet: "#9DA4EE",
        "light-blue": "#E4F2FF",
      },
      fontFamily: {
        mont: ["Montserrat"],
        lato: ["Lato"],
      },
    },
  },
  plugins: [],
};
