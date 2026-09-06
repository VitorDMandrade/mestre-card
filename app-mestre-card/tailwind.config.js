import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bgMain: '#06090e',
        cardBg: 'rgba(13, 17, 23, 0.7)',
      },
    },
  },
  plugins: [],
} satisfies Config
