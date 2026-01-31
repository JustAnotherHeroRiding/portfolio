'use client'

import React, { useState } from 'react'
import { db } from '@/app/config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'

interface WaitlistFormProps {
  className?: string
  pulse?: boolean
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ className = '', pulse = false }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      const waitlistRef = collection(db, 'onlyscans-waitlist')
      await addDoc(waitlistRef, {
        email: email.toLowerCase().trim(),
        createdAt: serverTimestamp(),
      })

      setStatus('success')
      setEmail('')
      toast.success('Successfully joined the waitlist!')
    } catch (error) {
      console.error('Error adding to waitlist:', error)
      setStatus('error')
      toast.error('Failed to join waitlist. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`bg-nord-success/20 border-2 border-nord-success rounded-xl p-6 text-center ${className}`}>
        <svg
          className='w-16 h-16 text-nord-success mx-auto mb-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <h3 className='text-2xl font-bold text-nord-text-primary mb-2'>You&apos;re on the list!</h3>
        <p className='text-nord-on-surface'>We&apos;ll notify you when OnlyScans launches.</p>
        <button
          onClick={() => setStatus('idle')}
          className='mt-4 text-sm text-nord-highlight-2 hover:text-nord-highlight-3 transition-colors underline'
        >
          Add another email
        </button>
      </div>
    )
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
        <div className='flex-1'>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            disabled={status === 'loading'}
            className={`w-full px-6 py-3 rounded-xl bg-nord-accent-1 border-2 border-nord-main-border text-nord-text-primary placeholder-nord-on-surface/50 focus:outline-none focus:border-nord-highlight-2 transition-colors disabled:opacity-50 ${pulse ? 'animate-pulse-glow' : ''}`}
          />
        </div>
        <button
          type='submit'
          disabled={status === 'loading' || !email.trim()}
          className='px-8 py-3 bg-nord-highlight-2 text-nord-surface rounded-xl font-semibold hover:bg-nord-highlight-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
        >
          {status === 'loading' ? (
            <span className='flex items-center gap-2'>
              <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                  fill='none'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
              Joining...
            </span>
          ) : (
            'Join Waitlist'
          )}
        </button>
      </form>

      <p className='text-sm text-nord-on-surface/70 text-center mt-4'>
        Be the first to know when OnlyScans launches
      </p>
    </div>
  )
}

export default WaitlistForm
