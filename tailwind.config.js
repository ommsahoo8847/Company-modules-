/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg:       '#0A0A0C',
        surface:  '#121216',
        elevated: '#1A1A22',
        border:   '#26262E',
        'border-hover': '#3E3E4D',
        primary:  '#6366F1',
        secondary:'#8B5CF6',
        tertiary: '#06B6D4',
        'text-high':   '#FFFFFF',
        'text-body':   '#E2E2E8',
        'text-subtle': '#8E8E9F',
        'text-off':    '#4A4A58',
      },
      animation: {
        'ticker': 'ticker 28s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(6,182,212,0.4)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.3)', boxShadow: '0 0 0 5px rgba(6,182,212,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
