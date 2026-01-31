'use client'

import React from 'react'
import Link from 'next/link'

interface Section {
  id: string
  title: string
}

interface TableOfContentsProps {
  sections: Section[]
  activeSection?: string
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, activeSection }) => {
  return (
    <nav className='sticky top-24 bg-nord-accent-1 border border-nord-main-border rounded-xl p-6 hidden lg:block'>
      <h3 className='text-lg font-semibold text-nord-text-primary mb-4'>Table of Contents</h3>
      <ul className='space-y-2'>
        {sections.map(section => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              className={`block text-sm transition-colors duration-200 hover:text-nord-highlight-2 ${
                activeSection === section.id ? 'text-nord-highlight-2 font-medium' : 'text-nord-on-surface'
              }`}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
