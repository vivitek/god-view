const defaults = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["montserrat", ...defaults.fontFamily.sans],
        itc: ["itc-avant-garde-gothic-pro", "sans-serif"],
      },
      colors: {
        blue: {
          DEFAULT: "#313E68"
        },
        darkBlue: {
          DEFAULT: "#1A1F32"
        },
        viviBlue: {
          DEFAULT: "#3c65ac"
        },
        viviRed: {
          DEFAULT: "#68313f",
        },
        grayBlue: {
          DEFAULT: "#292E41"
        }
      },
      height: {
        "9/20": "45%"
      },
      width: {
        "9/20": "45%"
      }
    },
    screen: {
      'xl': '1000px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-scrollbar")
  ],
}
