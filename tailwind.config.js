/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        diwali: {
          gold: '#FFD700',
          orange: '#FF6B35',
          deepOrange: '#F7931E',
          purple: '#9D4EDD',
          darkPurple: '#5A189A',
          flame: '#FF4500',
          glow: '#FFA500',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 165, 0, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 165, 0, 0.6)' 
          },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '75%': { opacity: '0.9' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.5) drop-shadow(0 0 40px rgba(255, 165, 0, 1))',
          },
        },
      },
    },
  },
  plugins: [],
}
