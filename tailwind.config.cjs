/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  important: true,
}
/* 
  还是得使用Command JS 才会生效
*/