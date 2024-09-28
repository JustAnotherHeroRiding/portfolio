'use client'

import { db } from '@/app/config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ContactMe = () => {
  const [text, setText] = useState('')

  const sendMessage = async (messageText: string) => {
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
    }
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <h3 className='text-lg'>Is there anything you want to tell me?</h3>
        <p className='text-nord-text-secondary opacity-70'>Send an anonymous message</p>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault()
          sendMessage(text)
        }}
        className='flex flex-row'
      >
        <input
          onChange={e => setText(e.target.value)}
          value={text}
          maxLength={500}
          className='border-1 border-nord-text-primary w-[80%] mx-auto py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-nord-highlight-1 bg-nord-accent-2'
          type='text'
          placeholder='Go ahead'
        />
        <button
          type='submit'
          className='border-1 font-bold border-nord-text-primary py-2 px-4 rounded-r-md bg-nord-text-primary text-nord-surface'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ContactMe
