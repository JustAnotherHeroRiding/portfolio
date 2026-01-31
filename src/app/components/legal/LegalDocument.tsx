import React from 'react'
import Link from 'next/link'
import TableOfContents from './TableOfContents'

interface Section {
  id: string
  title: string
  content: React.ReactNode
}

interface LegalDocumentProps {
  title: string
  lastUpdated: string
  sections: Section[]
  backLink?: string
  backLinkText?: string
}

const LegalDocument: React.FC<LegalDocumentProps> = ({ title, lastUpdated, sections, backLink, backLinkText }) => {
  return (
    <div className='min-h-screen bg-nord-surface'>
      {/* Header */}
      <header className='border-b border-nord-main-border bg-nord-accent-1'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            {backLink && (
              <Link
                href={backLink}
                className='inline-flex items-center gap-2 text-nord-highlight-2 hover:text-nord-highlight-3 transition-colors'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                </svg>
                <span>{backLinkText || 'Back'}</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Table of Contents - Desktop Only */}
          <aside className='lg:w-64 flex-shrink-0'>
            <TableOfContents sections={sections.map(s => ({ id: s.id, title: s.title }))} />
          </aside>

          {/* Document Content */}
          <main className='flex-1 max-w-4xl'>
            {/* Title */}
            <div className='mb-12 animate-fade-in'>
              <h1 className='text-4xl lg:text-5xl font-bold gradient-text mb-4'>{title}</h1>
              <p className='text-nord-on-surface'>
                <span className='font-medium'>Last Updated:</span> {lastUpdated}
              </p>
            </div>

            {/* Sections */}
            <div className='space-y-12'>
              {sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className='bg-nord-accent-1 border border-nord-main-border rounded-lg p-6 lg:p-8 scroll-mt-24 animate-slide-up'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h2 className='text-2xl font-bold text-nord-text-primary mb-4'>{section.title}</h2>
                  <div className='prose prose-nord max-w-none text-nord-on-surface space-y-4'>{section.content}</div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className='border-t border-nord-main-border bg-nord-accent-1 mt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-nord-on-surface'>
          <p>© {new Date().getFullYear()} OnlyScans. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LegalDocument
