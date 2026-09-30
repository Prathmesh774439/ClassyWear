/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { 50: 'rgb(var(--brand-50) / <alpha-value>)', 100: 'rgb(var(--brand-100) / <alpha-value>)', 500: 'rgb(var(--brand) / <alpha-value>)', 600: 'rgb(var(--brand-strong) / <alpha-value>)', 700: 'rgb(var(--brand-deep) / <alpha-value>)' },
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)'
      },
      fontFamily: { display: ['"Bricolage Grotesque"', 'sans-serif'], sans: ['"Figtree"', 'sans-serif'] },
      boxShadow: { soft: 'var(--shadow-soft)', lift: 'var(--shadow-lift)' },
      borderRadius: { editorial: '2rem 0.75rem 2rem 0.75rem' }
    }
  },
  plugins: []
};
