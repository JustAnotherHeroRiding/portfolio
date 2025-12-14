import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import './prism-nord.css'
import posthog from 'posthog-js'

export const metadata: Metadata = {
  title: 'Kristijan Kocev',
  description: 'Everything you need to know about Kristijan Kocev(me)',
  keywords: 'Kristijan Kocev, product engineer, portfolio, developer, web development, React Native, Next.js',
  openGraph: {
    title: 'Kristijan Kocev',
    description:
      'Explore the portfolio of Kristijan Kocev, a skilled product engineer specializing in React Native and Next.js.',
    url: 'https://justanotherheroriding.github.io/portfolio/images/me.png',
    images: [
      {
        url: 'https://justanotherheroriding.github.io/portfolio/images/me.png',
        width: 800,
        height: 600,
        alt: 'Kristijan Kocev Portfolio',
      },
    ],
    siteName: 'Kristijan Kocev',
  },
}

const SoehneFull = localFont({
  src: [
    { path: './fonts/SoehneFull/Sohne-Extraleicht.otf', weight: '200', style: 'normal' },
    { path: './fonts/SoehneFull/Sohne-ExtraleichtKursiv.otf', weight: '200', style: 'italic' },
    { path: './fonts/SoehneFull/Sohne-Leicht.otf', weight: '300', style: 'normal' },
    { path: './fonts/SoehneFull/Sohne-LeichtKursiv.otf', weight: '300', style: 'italic' },
    { path: './fonts/SoehneFull/Sohne-Buch.otf', weight: '400', style: 'normal' },
    { path: './fonts/SoehneFull/Sohne-BuchKursiv.otf', weight: '400', style: 'italic' },
    { path: './fonts/SoehneFull/Sohne-Halbfett.otf', weight: '500', style: 'normal' },
    { path: './fonts/SoehneFull/Sohne-HalbfettKursiv.otf', weight: '500', style: 'italic' },
    { path: './fonts/SoehneFull/Sohne-Dreiviertelfett.otf', weight: '600', style: 'normal' },
    { path: './fonts/SoehneFull/Sohne-DreiviertelfettKursiv.otf', weight: '600', style: 'italic' },
    { path: './fonts/SoehneFull/Sohne-Fett.otf', weight: '700', style: 'normal' },
    { path: './fonts/SoehneFull/Sohne-FettKursiv.otf', weight: '700', style: 'italic' },
    { path: './fonts/SoehneFull/Sohne-Extrafett.otf', weight: '800', style: 'normal' },
    { path: './fonts/SoehneFull/Sohne-ExtrafettKursiv.otf', weight: '800', style: 'italic' },
    { path: './fonts/SoehneFull/Sohne-Kraftig.otf', weight: '900', style: 'normal' },
    { path: './fonts/SoehneFull/Sohne-KraftigKursiv.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-soehne-full',
})

const SoehneMono = localFont({
  src: [
    { path: '/fonts/SoehneMono/SohneMono-Extraleicht.otf', weight: '200', style: 'normal' },
    { path: '/fonts/SoehneMono/SohneMono-ExtraleichtKursiv.otf', weight: '200', style: 'italic' },
    { path: '/fonts/SoehneMono/SohneMono-Leicht.otf', weight: '300', style: 'normal' },
    { path: '/fonts/SoehneMono/SohneMono-LeichtKursiv.otf', weight: '300', style: 'italic' },
    { path: '/fonts/SoehneMono/SohneMono-Buch.otf', weight: '400', style: 'normal' },
    { path: '/fonts/SoehneMono/SohneMono-BuchKursiv.otf', weight: '400', style: 'italic' },
    { path: '/fonts/SoehneMono/SohneMono-Halbfett.otf', weight: '500', style: 'normal' },
    { path: '/fonts/SoehneMono/SohneMono-HalbfettKursiv.otf', weight: '500', style: 'italic' },
    { path: '/fonts/SoehneMono/SohneMono-Dreiviertelfett.otf', weight: '600', style: 'normal' },
    { path: '/fonts/SoehneMono/SohneMono-DreiviertelfettKurs.otf', weight: '600', style: 'italic' },
    { path: '/fonts/SoehneMono/SohneMono-Fett.otf', weight: '700', style: 'normal' },
    { path: '/fonts/SoehneMono/SohneMono-FettKursiv.otf', weight: '700', style: 'italic' },
    { path: '/fonts/SoehneMono/SohneMono-Extrafett.otf', weight: '800', style: 'normal' },
    { path: '/fonts/SoehneMono/SohneMono-ExtrafettKursiv.otf', weight: '800', style: 'italic' },
    { path: '/fonts/SoehneMono/SohneMono-Kraftig.otf', weight: '900', style: 'normal' },
    { path: '/fonts/SoehneMono/SohneMono-KraftigKursiv.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-soehne-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  posthog.init('phc_2ptcBqH8DDyTBtOBjxHNVnkI19I2VTaN2gtAYyg8Qf', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2025-11-30',
    person_profiles: 'always',
  })
  return (
    <html suppressHydrationWarning lang='en'>
      <body
        className={`${SoehneFull.variable} ${SoehneMono.variable} antialiased font-soehne`}
        suppressHydrationWarning
      >
        <Toaster position='top-center' reverseOrder={false} />
        <main className='min-h-screen text-nord-text-primary bg-nord-surface'>{children}</main>
      </body>
    </html>
  )
}
