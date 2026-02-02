/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  prefix: 'tw-',
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.{vue,js}",
    "./pages/**/*.{vue,js}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-main': '#F8F7F8',
        'custom-mains': '#f2f0f2',
        'custom-purple': '#E8E2E8',
        'custom-btn': '#7D9E89',
        'custom-green': '#7D9E89',
        'custom-olive': '#7D9E89',
        'custom-accent': '#BCADC3'
      },
      textColor: {
        'custom-dark': '#3D3D3D',
        'custom-olive': '#7D9E89',
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
       borderColor: {
        'custom-accent': '#BCADC3',
        'custom-olive': '#7D9E89',
      },
    },
  },
  plugins: [],
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue', 
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ]
}

