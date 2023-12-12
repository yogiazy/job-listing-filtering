/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/app.js'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '16px'
    },
    extend: {
      colors: {
        dark_cyan: 'hsl(180, 29%, 50%)',
        bg_cyan: 'hsl(180, 52%, 96%)',
        filter_cyan: 'hsl(180, 31%, 95%)',
        gray_cyan: 'hsl(180, 8%, 52%)',
        dark_gray_cyan: 'hsl(180, 14%, 20%)'
      }
    },
  },
  plugins: [],
}

