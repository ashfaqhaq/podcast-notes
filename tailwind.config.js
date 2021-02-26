const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'montserrat': ['Montserrat'],
      'lato': ['Lato'],
      'garamond': ['Garamond']
  },
            colors: {
              // Build your palette here
              primary:colors.emerald['500'],
              primaryDark:colors.emerald['900'],
              transparent: 'transparent',
              current: 'currentColor',
              gray: colors.trueGray,
              red: colors.red,
              blue: colors.lightBlue,
              yellow: colors.amber,
              green: colors.emerald,
              'white': '#fff',

            },
            
},
  variants: {
    extend: {
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
      padding: ['hover'],
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
