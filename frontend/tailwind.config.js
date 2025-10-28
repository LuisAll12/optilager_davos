/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',        // .vue unbedingt abdecken
  ],
  theme: {
    extend: {
      colors: {
        navy: {                      // Custom Farbpalette
          900: '#0A132A',
          800: '#0E1B3A',
          700: '#14244F',
        },
      },
    },
  },
  plugins: [],
}
