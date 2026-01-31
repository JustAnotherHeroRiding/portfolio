import React from 'react'

interface StepCardProps {
  stepNumber: number
  icon: React.ReactNode
  title: string
  description: string
  isLast?: boolean
}

const StepCard: React.FC<StepCardProps> = ({ stepNumber, icon, title, description, isLast = false }) => {
  return (
    <div className='flex flex-col items-center text-center gap-4 relative'>
      {/* Step Number Badge */}
      <div className='absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-nord-highlight-2 text-nord-surface flex items-center justify-center text-sm font-bold z-10'>
        {stepNumber}
      </div>

      {/* Icon Container */}
      <div className='relative w-24 h-24 flex items-center justify-center rounded-full bg-nord-accent-1 border-2 border-nord-main-border mt-4'>
        <div className='text-nord-highlight-2'>{icon}</div>
      </div>

      {/* Arrow Connector (desktop only) */}
      {!isLast && (
        <div className='hidden lg:block absolute top-16 -right-16 w-32 h-0.5 border-t-2 border-dashed border-nord-main-border'>
          <svg
            className='absolute -right-2 -top-2 w-4 h-4 text-nord-main-border'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className='space-y-2 max-w-xs'>
        <h3 className='text-lg font-semibold text-nord-text-primary'>{title}</h3>
        <p className='text-sm text-nord-on-surface opacity-80'>{description}</p>
      </div>
    </div>
  )
}

export default StepCard
