const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{tsx,ts,jsx,js}'
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '324px',
      ...defaultTheme.screens
    }
  },
  plugins: [],
}
