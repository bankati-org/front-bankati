/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // Ensure Tailwind CSS purges unused styles from your Angular components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

