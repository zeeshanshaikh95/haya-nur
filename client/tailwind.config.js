/**
 * Haya Nur design system.
 *
 * A quiet, editorial palette: bone paper, warm ivory, charcoal ink and a muted
 * sage/taupe pair sampled from the brand's grey-heart aesthetic. Deliberately
 * square-edged and hairline-driven so it never reads as a recolour of a
 * rounded, blush-pink beauty template.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F4F0E9', // page paper
        ivory: '#FBF9F5', // raised surfaces
        sand: '#E7E0D5', // hairlines, fills
        clay: '#D8CEC0',
        ink: '#171614', // headings, primary text
        'ink-soft': '#6C655C',
        'ink-faint': '#9A9287',
        sage: {
          50: '#F1F3EE',
          100: '#E3E8DE',
          200: '#C9D1C1',
          400: '#8D9A85',
          500: '#727F6A',
          600: '#5B6854',
          700: '#47523F',
          900: '#2C3327',
        },
        taupe: {
          100: '#EFE7DE',
          300: '#C9B6A5',
          500: '#A08874',
          700: '#6F5B4B',
        },
        wine: {
          500: '#7C2B33',
          600: '#63222A',
          700: '#4D1A20',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        micro: '0.22em',
        wide2: '0.14em',
      },
      borderRadius: {
        none: '0',
        xs: '1px',
        sm: '2px',
      },
      boxShadow: {
        lift: '0 18px 40px -28px rgba(23, 22, 20, 0.45)',
        panel: '0 24px 60px -32px rgba(23, 22, 20, 0.35)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'slide-in-right': 'slide-in-right 0.32s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'ken-burns': 'ken-burns 9s ease-out both',
      },
    },
  },
  plugins: [],
};
