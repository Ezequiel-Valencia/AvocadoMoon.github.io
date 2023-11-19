/** @type {import('tailwindcss').Config}*/
const config = {
  content: [
    "./src/routes/ctgrassroots/*.{html,js,svelte,ts}", 
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],

  plugins: [require('flowbite/plugin')],

  // Now it doesn't overwrite base css components
  corePlugins: {
    preflight: false,
  },

  theme: {
    extend: {},
  },

};

module.exports = config;
