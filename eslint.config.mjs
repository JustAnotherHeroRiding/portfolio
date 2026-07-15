import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'next-env.d.ts']),
])
