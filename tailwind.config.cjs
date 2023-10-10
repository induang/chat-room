/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
    },
    extend: {
      spacing: {
        120: "30rem",
      },
    },
  },
  plugins: [require("daisyui")],
  important: true,
};
/* 
  还是得使用Command JS 才会生效
*/
