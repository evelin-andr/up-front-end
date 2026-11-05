/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Definimos a Playfair Display como a fonte padrão (sans) de todo o site
        sans: ['Prompt', 'sans-serif'],
      },
      colors: {
        ivory: '#faf0e6', 
        brand: {
          green: '#1b5e3a',
          dark: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}