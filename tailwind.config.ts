import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 80px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        border: 'hsl(210 16% 82%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
