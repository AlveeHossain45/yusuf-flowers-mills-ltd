/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        colors: {
          brand: {
            50: '#eef4ff',
            100: '#d9e6ff',
            200: '#bcd3ff',
            300: '#8fb5ff',
            400: '#5a8cff',
            500: '#3563ff',
            600: '#1f42f5',
            700: '#1830e1',
            800: '#1a29b6',
            900: '#1c298f',
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }