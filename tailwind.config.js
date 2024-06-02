/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#23BE0A",
        secondary: "#f9f9f9"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

