/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c4a43c',
          dark: '#d7b964',
          light: '#e5d7a6',
        },
        ruby: {
          DEFAULT: '#9b2c2c',
          dark: '#7a1f1f',
          light: '#c43a3a',
        },
        emerald: {
          DEFAULT: '#2d6a4f',
          dark: '#1b4d3e',
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'luxury': '20px',
        'luxury-sm': '14px',
        'luxury-lg': '32px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(205, 205, 205, 0.65)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'gold': '0 8px 24px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'float': 'float 3s ease infinite',
        'fade-in-up': 'fadeInUp 0.4s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'spin-slow': 'spin 0.8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          'from': { opacity: 0, transform: 'translateY(20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spin: {
          'to': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}