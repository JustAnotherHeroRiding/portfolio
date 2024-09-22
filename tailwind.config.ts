import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
         'nord': {
          surface: '#2E3440',
          'on-surface': '#D8DEE9',
          'main-border': '#4C566A',
          'accent-1': '#3B4252',
          'accent-2': '#434C5E',
          'accent-3': '#5E81AC',
          'text-primary': '#E5E9F0',
          'text-secondary': '#ECEFF4',
          'highlight-1': '#8FBCBB',
          'highlight-2': '#88C0D0',
          'highlight-3': '#81A1C1',
          'error': '#BF616A',
          'warning': '#D08770',
          'info': '#EBCB8B',
          'success': '#A3BE8C',
          'muted': '#B48EAD',
        },
        },
    },
  },
  plugins: [],
};
export default config;
