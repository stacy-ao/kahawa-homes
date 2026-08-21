import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#f7f3ec',
          dark: '#ede6d6',
        },
        espresso: {
          DEFAULT: '#1e120a',
          mid: '#4a2c17',
          lt: '#7a5c3e',
        },
        gold: {
          DEFAULT: '#c9a96e',
          lt: '#e8d5b0',
        },
        border: '#e8e0d0',
        muted: '#6b5744',
        wa: '#25d366',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        xs: '0 1px 4px rgba(30,18,10,.08)',
        sm: '0 2px 12px rgba(30,18,10,.10)',
        md: '0 6px 24px rgba(30,18,10,.14)',
        lg: '0 16px 48px rgba(30,18,10,.18)',
      },
      borderRadius: {
        r: '0.75rem',
        pill: '50px',
      },
    },
  },
  plugins: [],
} satisfies Config;
