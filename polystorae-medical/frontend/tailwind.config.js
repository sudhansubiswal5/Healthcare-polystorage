/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          light: '#ebf8ff',
          blue: '#2b6cb0',
          dark: '#2c5282',
        }
      }
    },
  },
  plugins: [],
}
