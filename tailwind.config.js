/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {

      'mobileSm' :'375px',

      'mobileMd' : '414px',

      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',

      '3xl16inch': '1600px',

      '4xlFullHd': '1920px',

      '5xl27inch': '2560px',
      
      '6xl4k' : '3840px'
    }
  },
  plugins: [],
}