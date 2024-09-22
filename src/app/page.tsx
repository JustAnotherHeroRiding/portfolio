import Image from 'next/image'
import Sidebar from './components/sidebar/Sidebar'

export default function Home() {
  return (
    <div className='bg-stone-900 mx-auto flex min-h-screen max-w-[1800px] flex-col max-lg:pb-16 lg:flex-row'>
      <Sidebar />
      <div className='flex flex-col gap-8 justify-center items-center'>
        <h2>Projects</h2>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <li className='flex flex-col gap-2 border border-stone-700 rounded-lg mx-auto justify-center items-center px-4 py-6 w-full max-w-[400px]'>
            <Image
              src='/images/rategameLogo.webp'
              className='rounded-full'
              width={100}
              height={100}
              alt='Rate Game Logo'
            />
            <span>Rate Game</span>
            <span className='max-w-[400px] text-center'>Rate sports games and share your take</span>
          </li>
          <li className='flex flex-col gap-2 border border-stone-700 rounded-lg mx-auto justify-center items-center px-4 py-6 w-full max-w-[400px]'>
            <Image
              src='/images/wtkLogo.png'
              className='rounded-full'
              width={100}
              height={100}
              alt='What The Key Logo'
            />
            <span>What The Key</span>
            <span className='max-w-[400px] text-center'>Find the key of a song and jam with your favorites</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
