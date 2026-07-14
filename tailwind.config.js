/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0367FC',
        'brand-dark': '#024DC4',
        'brand-darker': '#161616',
        'brand-light': '#D2F801',
        accent: '#D2F801',
        dark: '#161616',
        light: '#FFFFFF',
        muted: '#9CA3AF',
        'gray-dark': '#161616',
        'gray-medium': '#1F1F1F',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 8s linear infinite',
        'matrix': 'matrix 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'typing': 'typing 3s steps(30) infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(3, 103, 252, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(3, 103, 252, 0.5)' },
        },
        'glow-accent': {
          '0%': { boxShadow: '0 0 10px rgba(210, 248, 1, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(210, 248, 1, 0.4)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseGlow: {
          '0%': { opacity: '0.4', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.05)' },
        },
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
