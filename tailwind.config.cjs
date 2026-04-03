/** @type {import('tailwindcss').Config}*/
const config = {
  content: [
    "./src/app/ctgrassroots/**/*.{html,js,ts,tsx}",
    "./src/components/ctgrassroots/**/*.{html,js,ts,tsx}",
  ],

  plugins: [require('flowbite/plugin')],

  // Does not overwrite base css components globally
  corePlugins: {
    preflight: false,
  },

  theme: {
    extend: {},
  },
};

module.exports = config;
