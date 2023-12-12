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
        purple: 'hsl(259, 100%, 65%)'
      }
    },
  },
  plugins: [],
}

