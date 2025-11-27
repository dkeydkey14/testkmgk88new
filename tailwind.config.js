/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#ffd700',
        accent: '#ff6b6b',
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      animation: {
        'zoom': 'zoom 3s ease-in-out infinite',
      },
      keyframes: {
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      transitionDuration: {
        '3000': '3000ms',
      },
    },
  },
  plugins: [],
} 