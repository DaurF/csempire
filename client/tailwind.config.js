/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Flama', 'sans-serif'],
      'serif': ['Flama-Medium', 'Flama', 'sans-serif'],

    },
    extend: {
      spacing: {
        '5.5': '1.3rem',
        '9.5': '2.34rem',
        '10.5': '2.38rem',
        '14.5': '3.625rem',
        '22': '5.5rem',
        '92': '23rem'
      },
      boxShadow: {
        'dep': 'inset 0 -2px #cc6c31',
        'sign': 'inset 0 -2px #00963B',
        'pl-bet': 'inset 0 -3px #242631'
      }
    },

  },
  plugins: [],
}
