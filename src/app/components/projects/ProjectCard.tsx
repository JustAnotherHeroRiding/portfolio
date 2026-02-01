import Link from 'next/link'
import Image from 'next/image'
import { AcquireInfo, logoComponentMap, Project } from '@/app/utils/projects'
import AppStore from '../svg/AppStore'
import GooglePlay from '../svg/GooglePlay'
import Mail from '../svg/Mail'

const ProjectCard = ({
  name,
  description,
  imageUrl,
  acquireInfo,
  stack,
  imageComponent,
}: Omit<Project, 'featured'>) => {
  const fullImageUrl = imageUrl

  const appButtons = acquireInfo.filter(info => info.type === 'appStore' || info.type === 'playStore')
  const altButtons = acquireInfo.filter(info => info.type === 'contact' || info.type === 'website')

  const ImageComponent = logoComponentMap[name as keyof typeof logoComponentMap] || null

  return (
    <li className='group relative flex flex-col gap-4 border rounded-xl p-6 w-full transition-all duration-300 hover-lift card-hover border-nord-main-border bg-nord-accent-1'>
      {/* Header with logo and title */}
      <div className='flex items-start gap-4'>
        <div className='relative flex-shrink-0'>
          <div className='absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300 bg-nord-highlight-3'></div>
          {imageComponent ? (
            <ImageComponent size={80} />
          ) : (
            <Image
              src={fullImageUrl}
              className='relative rounded-xl bg-nord-surface object-cover transition-transform duration-300 group-hover:scale-105'
              width={80}
              height={80}
              alt={`${name} Logo`}
            />
          )}
        </div>
        <div className='flex-1 min-w-0'>
          <h3 className='text-xl font-semibold text-nord-text-primary group-hover:text-nord-highlight-2 transition-colors duration-300'>
            {name}
          </h3>
          <p className='text-sm text-nord-text-secondary opacity-80 mt-1'>{description}</p>
        </div>
      </div>

      {/* Tech stack */}
      <div className='flex flex-wrap gap-2 mt-auto'>
        {stack.map(s => (
          <Link
            key={`${s.name}-${name}`}
            href={s.docs}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1.5 px-2 py-1 bg-nord-surface/50 rounded-lg hover:bg-nord-surface transition-colors duration-200'
            title={s.name}
          >
            <img src={s.logoUrl} width={20} height={20} alt={`${s.name} Logo`} className='rounded' />
            <span className='text-xs font-medium text-nord-text-secondary'>{s.name}</span>
          </Link>
        ))}
      </div>

      {/* Action buttons */}
      <div className='flex flex-wrap gap-2 pt-2 border-t border-nord-main-border/50'>
        {appButtons?.map((info: AcquireInfo, index: number) => (
          <div key={index}>
            {info.type === 'appStore' && info.link && (
              <Link
                href={info.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 py-2 px-4 bg-nord-text-primary text-nord-surface rounded-lg font-medium text-sm hover:opacity-90 transition-opacity duration-200'
              >
                <AppStore fill='#2E3440' size={18} />
                <span>App Store</span>
              </Link>
            )}
            {info.type === 'playStore' && info.link && (
              <Link
                href={info.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 py-2 px-4 bg-nord-text-primary text-nord-surface rounded-lg font-medium text-sm hover:opacity-90 transition-opacity duration-200'
              >
                <GooglePlay fill='#2E3440' size={18} />
                <span>Play Store</span>
              </Link>
            )}
          </div>
        ))}
        {altButtons?.map((info: AcquireInfo, index: number) => (
          <div key={index}>
            {info.type === 'website' && info.link && (
              <Link
                href={info.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 py-2 px-4 bg-nord-highlight-2 text-nord-surface rounded-lg font-medium text-sm hover:bg-nord-highlight-3 transition-colors duration-200'
              >
                {info.logo ? (
                  <info.logo size={18} fill='#2E3440' />
                ) : (
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                    />
                  </svg>
                )}
                <span>Visit Site</span>
              </Link>
            )}
            {info.type === 'contact' && (
              <Link
                href='mailto:kristijankocev1234@gmail.com'
                className='inline-flex items-center gap-2 py-2 px-4 bg-nord-text-primary text-nord-surface rounded-lg font-medium text-sm hover:opacity-90 transition-opacity duration-200'
              >
                <Mail fill='#2E3440' size={18} />
                <span>Contact Me</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </li>
  )
}

export default ProjectCard
