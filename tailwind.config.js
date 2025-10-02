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
        // 1. Создаем кастомное свойство 'script'
        'heading': ['Montserrat', 'sans-serif'],
        // 2. ИЛИ переопределяем стандартное семейство 'sans'
        'body': ['Open Sans', 'sans-serif'],
      },
       borderColor: {
        'custom-accent': '#BCADC3',    // Ваш акцентный цвет для границ
        'custom-olive': '#7D9E89',
      },
    },
  },
  plugins: [],
}

