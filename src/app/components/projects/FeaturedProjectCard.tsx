'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties, PointerEvent } from 'react'
import { AcquireInfo, Project } from '@/app/utils/projects'
import AppStore from '../svg/AppStore'
import GooglePlay from '../svg/GooglePlay'

const FeaturedProjectCard = ({ name, description, imageUrl, acquireInfo, stack }: Project) => {
  const fullImageUrl = imageUrl

  const appButtons = acquireInfo.filter(info => info.type === 'appStore' || info.type === 'playStore')
  const websiteButton = acquireInfo.find(info => info.type === 'website')

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    event.currentTarget.style.setProperty('--pointer-x', `${x * 100}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${y * 100}%`)
    event.currentTarget.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-2px)`
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }

  return (
    <div
      className='group relative rounded-2xl bg-gradient-to-br from-nord-accent-1 via-nord-accent-2 to-nord-accent-1 border border-nord-highlight-2/30 p-1 transition-transform duration-200 ease-out will-change-transform'
      style={
        {
          '--pointer-x': '50%',
          '--pointer-y': '50%',
          transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)',
          transformStyle: 'preserve-3d',
        } as CSSProperties
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Animated gradient border */}
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-nord-highlight-2 via-nord-highlight-3 to-nord-highlight-2 opacity-0 group-hover:opacity-20 transition-opacity duration-500'></div>

      <div className='relative rounded-xl bg-nord-surface p-6 sm:p-8 [transform:translateZ(12px)] [transform-style:preserve-3d]'>
        <div
          className='pointer-events-none absolute inset-0 z-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          style={{
            background:
              'radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(136, 192, 208, 0.18), transparent 42%)',
          }}
        />

        {/* Currently working on badge */}
        <div className='relative z-10 lg:absolute lg:top-4 lg:right-4 ml-auto mb-4 lg:mb-0 w-fit flex items-center gap-2 px-3 py-1.5 rounded-full bg-nord-success/20 border border-nord-success/30 [transform:translateZ(28px)]'>
          <span className='text-xs font-medium text-nord-success'>Currently Working On</span>
        </div>

        <div className='relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8'>
          {/* Logo Section */}
          <div className='flex-shrink-0 flex justify-center lg:justify-start'>
            <div className='relative h-fit [transform:translateZ(30px)]'>
              <div className='absolute -inset-2 bg-gradient-to-r from-nord-highlight-2 to-nord-highlight-3 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500'></div>
              <Image
                src={fullImageUrl}
                className='relative rounded-2xl bg-nord-accent-1 object-cover transition-transform duration-500 group-hover:scale-105'
                width={120}
                height={120}
                alt={`${name} Logo`}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className='flex-1 flex flex-col gap-4 [transform:translateZ(20px)]'>
            <div>
              <h3 className='text-2xl sm:text-3xl font-bold text-nord-text-primary group-hover:text-nord-highlight-2 transition-colors duration-300'>
                {name}
              </h3>
              <p className='text-base text-nord-text-secondary opacity-80 mt-2 max-w-2xl'>{description}</p>
            </div>

            {/* Tech Stack */}
            <div className='flex flex-wrap gap-2'>
              {stack.map(s => (
                <Link
                  key={`${s.name}-${name}`}
                  href={s.docs}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 px-3 py-1.5 bg-nord-accent-1 border border-nord-main-border rounded-lg hover:border-nord-highlight-2 transition-colors duration-200'
                  title={s.name}
                >
                  <img src={s.logoUrl} width={20} height={20} alt={`${s.name} Logo`} className='rounded' />
                  <span className='text-sm font-medium text-nord-text-secondary'>{s.name}</span>
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-3 mt-2'>
              {appButtons.map((info: AcquireInfo, index: number) => (
                <div key={index}>
                  {info.type === 'appStore' && info.link && (
                    <Link
                      href={info.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-2 py-2.5 px-5 bg-nord-text-primary text-nord-surface rounded-xl font-semibold text-sm hover:opacity-90 transition-all duration-200 hover:scale-105'
                    >
                      <AppStore fill='#2E3440' size={20} />
                      <span>Download on App Store</span>
                    </Link>
                  )}
                  {info.type === 'playStore' && info.link && (
                    <Link
                      href={info.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-2 py-2.5 px-5 bg-nord-text-primary text-nord-surface rounded-xl font-semibold text-sm hover:opacity-90 transition-all duration-200 hover:scale-105'
                    >
                      <GooglePlay fill='#2E3440' size={20} />
                      <span>Get on Google Play</span>
                    </Link>
                  )}
                </div>
              ))}
              {websiteButton && websiteButton.link && (
                <Link
                  href={websiteButton.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 py-2.5 px-5 bg-nord-highlight-2 text-nord-surface rounded-xl font-semibold text-sm hover:bg-nord-highlight-3 transition-all duration-200 hover:scale-105'
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                    />
                  </svg>
                  <span>Visit Website</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProjectCard
