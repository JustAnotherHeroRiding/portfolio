'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import SuspendedPostHogPageView from '../components/PostHogPageView'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init('phc_2ptcBqH8DDyTBtOBjxHNVnkI19I2VTaN2gtAYyg8Qf', {
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
