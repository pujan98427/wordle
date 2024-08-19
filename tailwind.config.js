/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffff'
      },

      fontFamily: {
        body: ['Inter', 'sans-serif']
      },
    }
  },
  
}
