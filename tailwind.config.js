/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [function({ addUtilities }) {
    addUtilities({
      '.webkit-appearance-none': {
        '-webkit-appearance': 'none',
      },
      '.webkit-appearance-auto': {
        '-webkit-appearance': 'auto',
      },
    })
  }
],
}