/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        'bg-elevated': '#12121a',
        violet: {
          DEFAULT: '#7c3aed',
          dim: '#5b21b6',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          dim: '#0891b2',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
