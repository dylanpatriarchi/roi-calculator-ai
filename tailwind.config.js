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
          DEFAULT: '#FF5722',
          light: '#FF8C00',
          dark: '#E64A19',
        },
        secondary: {
          DEFAULT: '#FFFFFF',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          light: '#333333',
        },
        accent: {
          DEFAULT: '#F0F0F0',
        },
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      fontWeight: {
        'thin-serif': '300',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom right, #FF5722, #FFA500)',
        'gradient-soft': 'linear-gradient(to bottom, #FF5722, rgba(255, 87, 34, 0.1))',
      },
    },
  },
  plugins: [],
}

