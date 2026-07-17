/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'sky-light': '#E9F2F9',
        'sky': '#61B1F5',
        'navy': '#17468A',
        'primary': '#007BFF',
        'whatsapp': '#55cd6c',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.25', letterSpacing: '0', fontWeight: '600' }],
        'heading-lg': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'heading-md': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.35', letterSpacing: '0', fontWeight: '600' }],
        'heading-sm': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.65', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '500' }],
        'label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '500', textTransform: 'uppercase' }],
      },
      letterSpacing: {
        'tight': '-0.02em',
        'snug': '-0.01em',
        'normal': '0',
        'wide': '0.02em',
        'wider': '0.05em',
        'section-label': '0.15em',
      },
      spacing: {
        'section-sm': '4rem',   // 64px
        'section-md': '5rem',   // 80px
        'section-lg': '6rem',   // 96px
      },
      boxShadow: {
        'surface': '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card': '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -4px rgb(0 0 0 / 0.06)',
        'card-hover': '0 12px 24px -4px rgb(0 0 0 / 0.12), 0 4px 12px -6px rgb(0 0 0 / 0.08)',
        'featured': '0 20px 40px -8px rgb(0 0 0 / 0.15), 0 8px 20px -12px rgb(0 0 0 / 0.1)',
        'hero': '0 32px 64px -12px rgb(0 0 0 / 0.2), 0 16px 32px -16px rgb(0 0 0 / 0.12)',
        'inner-glow': 'inset 0 1px 0 0 rgb(255 255 255 / 0.1)',
      },
      borderRadius: {
        'card': '1rem',      // 16px
        'card-lg': '1.5rem', // 24px
        'hero': '2rem',      // 32px
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
        'slower': '600ms',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
