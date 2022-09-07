/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        header:
          "url('https://www.nick-basile.com/assets/img/posts/building-a-photo-gallery-with-css-grid-and-tailwind-css/hero.jpeg')",
      },
      fontFamily: {
        header: ["sans"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
