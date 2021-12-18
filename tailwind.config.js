const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
      },
    },

    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },

    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.trueGray,
      black: {
        DEFAULT: "#000",
      },
      white: {
        DEFAULT: "#f9f9f9",
      },
      degreen: {
        DEFAULT: "#00d323",
      },
      acidic: {
        DEFAULT: "#CDF483",
      },
      yellowwallow: {
        DEFAULT: "#FAE62F",
      },
      redtagging: {
        DEFAULT: "#FF3707",
      },
      pinkaru: {
        DEFAULT: "#FFCDD4",
      },
      confusedPurple: {
        DEFAULT: "#EE50FF",
      },
      padeepBlue: {
        DEFAULT: "#4100FA",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
