import { myWritings } from '@/app/utils/allWritings'
import Link from 'next/link'

export const Writings = () => {
  return (
    <div className='flex flex-col w-full px-4 sm:px-6 lg:px-8 py-6 animate-fade-in'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='h-px flex-1 bg-gradient-to-r from-transparent via-nord-main-border to-transparent'></div>
        <h2 className='text-2xl font-bold gradient-text'>Writings</h2>
        <div className='h-px flex-1 bg-gradient-to-r from-transparent via-nord-main-border to-transparent'></div>
      </div>

      <div className='grid gap-4 stagger-children'>
        {myWritings.reverse().map((blog, index) => (
          <Link key={blog.slug} href={`/writing/${blog.slug}`} className='group block'>
            <article className='relative p-4 sm:p-5 rounded-xl bg-nord-accent-1 border border-nord-main-border card-hover overflow-hidden'>
              {/* Subtle gradient overlay on hover */}
              <div className='absolute inset-0 bg-gradient-to-r from-nord-highlight-2/0 to-nord-highlight-3/0 group-hover:from-nord-highlight-2/5 group-hover:to-nord-highlight-3/5 transition-all duration-300'></div>

              <div className='relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-nord-text-primary group-hover:text-nord-highlight-2 transition-colors duration-300'>
                    {blog.title}
                  </h3>
                  <p className='text-sm text-nord-text-secondary opacity-70 mt-1 line-clamp-2'>{blog.subtitle}</p>
                </div>

                <div className='flex items-center gap-2 text-sm text-nord-text-secondary opacity-60'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  <time className='whitespace-nowrap'>{blog.createdAt}</time>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className='absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300'>
                <svg className='w-5 h-5 text-nord-highlight-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
