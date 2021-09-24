module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "green-primary": "#30AA99"
      },
      boxShadow: {
        "nav-shadow": "0px 2px 14px rgba(137, 174, 255, 0.2)"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
