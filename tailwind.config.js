/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tesla: {
          red: '#e82127',
          darkRed: '#b0171c',
          darkBg: '#050505',
          cardDark: '#111111',
          borderDark: '#222222',
          textDark: '#eeeeee',
          mutedDark: '#888888',
          lightBg: '#ffffff',
          cardLight: '#fafafa',
          borderLight: '#e5e5e5',
          textLight: '#171a20',
          mutedLight: '#5c5e62',
        }
      },
      fontFamily: {
        tesla: ['Universal Sans', 'Gotham', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'subtle-float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
}
