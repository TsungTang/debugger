module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "green-primary": "#30AA99",
        "light-green": "#C7E8E3",
        "dark-navy": "#0A2F5C",
        "gray": "#ACACAC"
      },
      boxShadow: {
        "nav-shadow": "0px 2px 14px rgba(137, 174, 255, 0.2)",
        "card-hover": "0px 0px 999px 999px rgba(255, 255, 255, 0.5)",
        "selector": "0px 2px 6px rgba(48, 170, 153, 0.2)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
