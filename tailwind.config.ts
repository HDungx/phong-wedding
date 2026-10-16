import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        weddingRed: '#8B0000',
        weddingRedLight: '#A31C1C',
        weddingGold: '#D4AF37',
        weddingGoldLight: '#F3E5AB',
        creamBG: '#FAF8F5',
      },
      fontFamily: {
        script: ['var(--font-script)', 'cursive'],
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
