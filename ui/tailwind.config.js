/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        "background-default": "#FAF9F6",
        "background-paper": "#fff",
        primary: "#0043ce",
        secondary: "#002d9c",
        tertiary: "#1192e8",
        error: "#da1e28",
        "error-secondary": "#a2191f",
        success: "#198038",
        "success-secondary": "#0e6027",
        warning: "#f1c21b",
        disabled: "#697077",
        "text-color": "#121619",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        default: "0 1px 4px #12161929",
      },
    },
  },
  plugins: [],
};