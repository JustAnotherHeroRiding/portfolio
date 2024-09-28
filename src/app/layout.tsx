import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Kristijan Kocev',
  description: 'All you need to know about Kristijan Kocev(me).',
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
  return (
    <html suppressHydrationWarning lang='en'>
      <body className={`${SoehneFull.variable} ${SoehneMono.variable} antialiased font-soehne`}>
        <Toaster position='top-center' reverseOrder={false} />
        <main className='min-h-screen text-nord-text-primary'>{children}</main>
      </body>
    </html>
  )
}
