/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts,scss,css}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 4px 20px rgba(0, 0, 0, 0.25)",
        header: "0px 4px 20px rgba(0, 0, 0, 0.15);"
      },
      colors: {
        "regal-blue": "#3a63cc",
        "second-blue": "#2e4fa3",
        "light-gray": "#b3b3b8",
        "pri-black": "#1f1f1f",
        "warn-red": "#c94a55",
        "check-green": "#018c76",
        "light-grey": "#F8F8FE",
        "gray": "#D7D7DC",
        "pri-gray": "#797979"
      },
      fontFamily: {
        mont: ["Montserrat"],
        lato: ["Lato"],
      },
    },
  },
  plugins: [],
};
