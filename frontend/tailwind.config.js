/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#f9f5f0',
          100: '#f4e9df',
          200: '#e9d1bf',
          300: '#dcb89f',
          400: '#cfa07f',
          500: '#c2885f',
          600: '#9b6a4b',
          700: '#6f4c36',
          800: '#4a3424',
          900: '#2a1f14',
        },
        beige: {
          50: '#fefcf9',
          100: '#fdf8f1',
          200: '#fbf0e1',
          300: '#f8e7d1',
          400: '#f5ddc1',
          500: '#f2d3b1',
          600: '#c2a87f',
          700: '#917a5d',
          800: '#615034',
          900: '#30281a',
        },
      },
    },
  },
  plugins: [],
}
