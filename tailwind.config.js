const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        color1: '#61ABC7',
        color2: '#1C7394',
        color3: '#FBD6D2',
        hovercolor: '#C76176',
        background1: '#333333',
        text1: '#ffcccc',
        text2: '#CCA3A3',
        primary: '#5c6ac4',
        secondary: {
          100: '#E2E2D5',
          200: '#44403C',
          300: '#DC2626'
        },
        blue: {
          light: '#85d7ff',
          DEFAULT: '#FFFFFF',
          dark: '#009eeb',
        },
        pink: {
          light: '#ff7ce5',
          DEFAULT: '#ff49db',
          dark: '#ff16d1',
        }
      },
      fontFamily: {
        header: ['Gill Sans']
      },
      padding: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px',
        xxl: '400px',
       },
       letterSpacing: {
         'thewidest': '3px',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
