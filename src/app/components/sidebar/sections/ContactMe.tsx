'use client'

import { db } from '@/app/config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ContactMe = () => {
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    setIsSending(true)
    try {
      const messageRef = collection(db, 'messages')
      await addDoc(messageRef, {
        text: messageText,
        timestamp: serverTimestamp(),
      })

      setText('')
      toast.success('Message sent successfully!')
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className='flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-4 animate-fade-in animation-delay-300'>
      <div className='flex flex-col gap-1 text-center'>
        <h3 className='text-lg font-medium text-nord-text-primary'>Got something to say?</h3>
        <p className='text-sm text-nord-text-secondary opacity-70'>Send me an anonymous message</p>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault()
          sendMessage(text)
        }}
        className='flex flex-row w-full max-w-md mx-auto'
      >
        <input
          onChange={e => setText(e.target.value)}
          value={text}
          maxLength={500}
          disabled={isSending}
          className='flex-1 py-2.5 px-4 rounded-l-lg border border-r-0 border-nord-main-border bg-nord-accent-2 text-nord-text-primary placeholder-nord-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-nord-highlight-2 focus:border-transparent transition-all duration-200 disabled:opacity-50'
          type='text'
          placeholder='Type your message...'
        />
        <button
          type='submit'
          disabled={isSending || !text.trim()}
          className='py-2.5 px-5 rounded-r-lg bg-nord-highlight-2 text-nord-surface font-semibold hover:bg-nord-highlight-3 focus:outline-none focus:ring-2 focus:ring-nord-highlight-2 focus:ring-offset-2 focus:ring-offset-nord-surface transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isSending ? (
            <svg className='w-5 h-5 animate-spin' fill='none' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactMe
