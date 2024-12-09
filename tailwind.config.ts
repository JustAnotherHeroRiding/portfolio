import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        soehne: ['var(--font-soehne-full)', 'sans-serif'],
        'soehne-mono': ['var(--font-soehne-mono)', 'monospace'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        nord: {
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
          error: '#BF616A',
          warning: '#D08770',
          info: '#EBCB8B',
          success: '#A3BE8C',
          muted: '#B48EAD',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E5E9F0',
            a: {
              color: '#88C0D0',
              '&:hover': {
                color: '#81A1C1',
              },
            },
            h1: {
              color: '#E5E9F0',
            },
            h2: {
              color: '#E5E9F0',
            },
            h3: {
              color: '#E5E9F0',
            },
            h4: {
              color: '#E5E9F0',
            },
            p: {
              color: '#E5E9F0',
            },
            code: {
              color: '#ECEFF4',
              backgroundColor: '#3B4252',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            strong: {
              color:"#E5E9F0"
            },
            pre: {
              color: '#E5E9F0',
              backgroundColor: '#3B4252',
              padding: '1em',
              borderRadius: '0.25rem',
              overflowX: 'auto',
            },
            'pre code': {
              color: '#ECEFF4',
              backgroundColor: 'transparent',
              padding: 0,
              borderRadius: 0,
            },
            blockquote: {
              color: '#ECEFF4',
              borderLeftColor: '#88C0D0',
            },
            hr: {
              borderColor: '#4C566A',
            },
          },
        },
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
