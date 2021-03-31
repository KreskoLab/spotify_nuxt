const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
   darkMode: false, // or 'media' or 'class'
   theme: {
    extand:{
      // gridTemplateRows: {
      //   '8': 'repeat(8, minmax(0, 1fr))',
      //   'layout': '200px minmax(900px, 1fr) 100px',
      // }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      amber: colors.amber,
      black: '#000',
      blue: colors.blue,
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      cyan: colors.cyan,
      emerald: colors.emerald,
      fuchsia: colors.fuchsia,
      gray: colors.gray,
      green: colors.green,
      indigo: colors.indigo,
      lightBlue: colors.lightBlue,
      lime: colors.lime,
      orange: colors.orange,
      pink: colors.pink,
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      teal: colors.teal,
      trueGray: colors.trueGray,
      violet: colors.violet,
      warmGray: colors.warmGray,
      white: '#FFF',
      yellow: colors.yellow,
  }
  },
   variants: {
     extend: {},
   },
   plugins: [],
 }