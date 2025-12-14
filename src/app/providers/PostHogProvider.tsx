'use client'
import { useEffect } from 'react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const posthogKey =
    process.env.NODE_ENV === 'production' ? process.env.POSTHOG_KEY : process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost =
    process.env.NODE_ENV === 'production' ? process.env.POSTHOG_HOST : process.env.NEXT_PUBLIC_POSTHOG_HOST

  useEffect(() => {
    if (!posthogKey) return

    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
      defaults: '2025-11-30',
    })
  }, [posthogHost, posthogKey])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
