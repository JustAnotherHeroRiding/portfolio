import React from 'react'
import Link from 'next/link'
import LandingHero from '@/app/components/landing/LandingHero'
import FeatureCard from '@/app/components/landing/FeatureCard'
import StepCard from '@/app/components/landing/StepCard'
import WaitlistForm from '@/app/components/landing/WaitlistForm'

export const metadata = {
  title: 'OnlyScans - Document Scanning Made Simple',
  description:
    'Scan, save, and share documents effortlessly with OnlyScans. Features automatic Google Drive backup and seamless cloud integration.',
  openGraph: {
    title: 'OnlyScans - Document Scanning Made Simple',
    description: 'Scan, save, and share documents effortlessly with automatic Google Drive backup',
    type: 'website',
  },
}

export default function OnlyScansLanding() {
  return (
    <div className='min-h-screen bg-nord-surface'>
      {/* Hero Section */}
      <LandingHero
        title='OnlyScans'
        subtitle='Document Scanning Made Simple'
        description='Scan, save, and share documents effortlessly on your phone. Automatic Google Drive backup keeps your documents safe in the cloud.'
      >
        <WaitlistForm />
      </LandingHero>

      {/* Features Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center gap-3 mb-12'>
            <div className='h-px flex-1 bg-gradient-to-r from-transparent via-nord-highlight-2/50 to-transparent'></div>
            <h2 className='text-3xl font-bold text-nord-text-primary text-center'>Features</h2>
            <div className='h-px flex-1 bg-gradient-to-r from-transparent via-nord-highlight-2/50 to-transparent'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children'>
            <FeatureCard
              icon={
                <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              title='Instant Document Capture'
              description='Use your phone camera to scan documents with automatic edge detection and perspective correction'
            />

            <FeatureCard
              icon={
                <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z' />
                  <path d='M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z' />
                  <path d='M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z' />
                </svg>
              }
              title='Save to Gallery'
              description='All scanned documents are automatically saved to your phone gallery for easy access anytime'
            />

            <FeatureCard
              icon={
                <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z' />
                </svg>
              }
              title='Native Share Menu'
              description='Share documents instantly using your device native share functionality with any app'
            />

            <FeatureCard
              icon={
                <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z' />
                </svg>
              }
              title='Automatic Backup'
              description='Connect your Google Drive and automatically backup every scan to a folder of your choosing'
            />

            <FeatureCard
              icon={
                <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              title='Your Data, Your Control'
              description='Documents stay on your device. Google Drive integration is optional and fully under your control'
            />

            <FeatureCard
              icon={
                <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              title='Lightning Fast'
              description='Scan and save in seconds. No processing delays or unnecessary steps between you and your documents'
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8 bg-nord-accent-1/30'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-nord-text-primary text-center mb-16'>How It Works</h2>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 stagger-children'>
            <StepCard
              stepNumber={1}
              icon={
                <svg className='w-12 h-12' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              title='Open & Scan'
              description='Point your camera at any document and tap to capture with automatic edge detection'
            />

            <StepCard
              stepNumber={2}
              icon={
                <svg className='w-12 h-12' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              }
              title='Auto-Save'
              description='Document saves to your gallery automatically and uploads to Google Drive if enabled'
            />

            <StepCard
              stepNumber={3}
              icon={
                <svg className='w-12 h-12' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z' />
                </svg>
              }
              title='Share Anywhere'
              description='Use native share menu or access your documents from Google Drive anytime, anywhere'
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* Google Drive Integration Highlight */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-nord-accent-2 border-2 border-nord-highlight-2/50 rounded-2xl p-8 lg:p-12 text-center space-y-6 shadow-xl'>
            <div className='flex justify-center gap-4 mb-6'>
              <svg className='w-16 h-16 text-nord-highlight-2' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z' />
              </svg>
            </div>

            <h2 className='text-3xl font-bold gradient-text'>Seamless Google Drive Backup</h2>

            <p className='text-lg text-nord-on-surface max-w-2xl mx-auto'>
              Connect once, backup forever. Every document you scan is automatically uploaded to your chosen Google
              Drive folder.
            </p>

            <ul className='text-left max-w-md mx-auto space-y-3 text-nord-on-surface'>
              {[
                'Choose any Drive folder',
                'Automatic sync after each scan',
                'Full control over permissions',
                'Disable anytime',
              ].map((item, index) => (
                <li key={index} className='flex items-center gap-3'>
                  <svg className='w-6 h-6 text-nord-success flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Waitlist CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-nord-surface to-nord-accent-1'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <h2 className='text-4xl lg:text-5xl font-bold gradient-text'>Ready to Go Paperless?</h2>
          <p className='text-xl text-nord-on-surface'>Join the waitlist and be notified when OnlyScans launches</p>

          <WaitlistForm pulse />

          <p className='text-sm text-nord-on-surface opacity-70'>Coming soon to iOS & Android</p>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-nord-main-border bg-nord-accent-1 py-8 px-4'>
        <div className='max-w-7xl mx-auto text-center space-y-4'>
          <p className='text-nord-on-surface'>© {new Date().getFullYear()} OnlyScans</p>
          <div className='flex justify-center gap-6 text-sm'>
            <Link href='/onlyscans/privacy' className='text-nord-highlight-2 hover:text-nord-highlight-3 transition'>
              Privacy Policy
            </Link>
            <span className='text-nord-main-border'>|</span>
            <Link href='/onlyscans/terms' className='text-nord-highlight-2 hover:text-nord-highlight-3 transition'>
              Terms of Service
            </Link>
            <span className='text-nord-main-border'>|</span>
            <a
              href='mailto:kristijankocev1234@gmail.com'
              className='text-nord-highlight-2 hover:text-nord-highlight-3 transition'
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
