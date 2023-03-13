/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#0071e2',
        bgModal: 'rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: [],
};
