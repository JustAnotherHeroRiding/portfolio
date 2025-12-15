'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import SuspendedPostHogPageView from '../components/PostHogPageView'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const posthogKey =
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_POSTHOG_KEY : process.env.POSTHOG_KEY
  useEffect(() => {
    posthog.init(posthogKey, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true,
      autocapture: false,
      opt_in_site_apps: true,
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}
