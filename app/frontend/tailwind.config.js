/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        default_white: '#FFFFFF',
        default_light_gray: '#C0C0D1',
        default_dark_gray: '#9898A4',
        default_light_accent: '#F4978E',
        default_dark_accent: '#F08080',
        default_black: '#2D2C39',
      },
    },
  },
  // plugins: [scrollbars],
};
