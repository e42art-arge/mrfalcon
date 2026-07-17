/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Live site palette
        brand: {
          gold: '#b5985a',      // Primary gold
          goldLight: '#dbb054', // Hover gold
          taupe: '#A48B78',     // Muted secondary
          taupeLight: '#F0DDD7',
          ink: '#121212',       // Dark backgrounds
          beige: '#fbf9f8',     // Light section background
          whatsapp: '#55cd6c',
        },
        // Semantic aliases
        ink: '#121212',
        champagne: '#b5985a',
        mist: '#fbf9f8',
      },
      fontFamily: {
        display: ['"Instrument Sans"', 'sans-serif'], // From live site
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
