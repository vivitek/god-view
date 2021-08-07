module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'sans': "montserrat"
      },
      colors: {
        blue: {
          DEFAULT: "#313E68"
        },
        darkBlue: {
          DEFAULT: "#292e41"
        },
        viviBlue: {
          DEFAULT: "#3c65ac"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
