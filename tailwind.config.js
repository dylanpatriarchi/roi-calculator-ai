/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Electric Blue
          hover: '#2563EB',   // Darker blue for hover states
        },
        secondaryGray: '#6B7280', 
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      scale: {
        '95': '0.95',
      },
      letterSpacing: {
        tight: '-0.025em',
      }
    },
  },
  plugins: [],
}

