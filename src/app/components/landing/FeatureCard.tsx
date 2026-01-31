import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className='group relative flex flex-col items-center text-center gap-4 border rounded-xl p-6 transition-all duration-300 hover-lift card-hover border-nord-main-border bg-nord-accent-1'>
      <div className='absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300 bg-nord-highlight-2'></div>
      <div className='relative w-16 h-16 flex items-center justify-center rounded-full bg-nord-accent-2 text-nord-highlight-2'>
        {icon}
      </div>
      <h3 className='text-xl font-semibold text-nord-text-primary'>{title}</h3>
      <p className='text-nord-on-surface opacity-90 leading-relaxed'>{description}</p>
    </div>
  )
}

export default FeatureCard
