/** @type {import('next').NextConfig} */
import { config as dotenvConfig } from 'dotenv'

/**
 * Load env files early so `process.env.*` is populated when this config
 * is evaluated.
 *
 * Next.js normally loads `.env*` automatically, but since this config reads
 * from `process.env` (via `env:` below), we ensure the right file is loaded
 * for the current NODE_ENV as well.
 */
const nodeEnv = process.env.NODE_ENV || 'development'
dotenvConfig({ path: `.env.${nodeEnv}.local` })
dotenvConfig({ path: `.env.${nodeEnv}` })
dotenvConfig({ path: '.env.local' })
dotenvConfig({ path: '.env' })

const nextConfig = {
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    POSTHOG_KEY: process.env.POSTHOG_KEY,
    POSTHOG_HOST: process.env.POSTHOG_HOST,
  },
  /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: 'export',

  /**
   * Set base path. This is the slug of your GitHub repository.
   * Only apply in production for GitHub Pages deployment.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
}

export default nextConfig
