import React from 'react'
import Image from 'next/image'

interface LandingHeroProps {
  title: string
  subtitle: string
  description: string
  logoUrl?: string
  heroImageUrl?: string
  children?: React.ReactNode
}

const LandingHero: React.FC<LandingHeroProps> = ({
  title,
  subtitle,
  description,
  logoUrl,
  heroImageUrl,
  children,
}) => {
  return (
    <section className='relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden'>
      {/* Background Gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-nord-accent-1/50 to-transparent pointer-events-none'></div>

      <div className='relative max-w-6xl mx-auto'>
        <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-16'>
          {/* Content */}
          <div className='flex-1 text-center lg:text-left space-y-8 animate-fade-in'>
            {/* Logo */}
            {logoUrl && (
              <div className='flex justify-center lg:justify-start'>
                <div className='relative w-32 h-32 rounded-3xl overflow-hidden shadow-2xl'>
                  <Image src={logoUrl} alt={`${title} Logo`} fill className='object-cover' />
                </div>
              </div>
            )}

            {/* Title with Gradient */}
            <div className='space-y-4'>
              <h1 className='text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text'>{title}</h1>
              <h2 className='text-2xl lg:text-3xl text-nord-text-secondary font-light'>{subtitle}</h2>
            </div>

            {/* Description */}
            <p className='text-lg lg:text-xl text-nord-on-surface opacity-90 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
              {description}
            </p>

            {/* CTA Buttons */}
            <div className='animate-slide-up animation-delay-200'>{children}</div>
          </div>

          {/* Hero Image */}
          {heroImageUrl && (
            <div className='flex-1 animate-scale-in animation-delay-300'>
              <div className='relative w-full max-w-lg mx-auto animate-float'>
                <Image
                  src={heroImageUrl}
                  alt={`${title} Hero`}
                  width={600}
                  height={600}
                  className='w-full h-auto drop-shadow-2xl'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LandingHero
