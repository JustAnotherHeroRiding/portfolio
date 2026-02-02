import Engineer from '../../svg/Engineer'
import Location from '../../svg/Location'
import Image from 'next/image'
import Link from 'next/link'
import meImage from '../../../../../public/images/me.png'
import sixcoreLogo from '../../../../../public/images/sixcore-logo-lightblue.png'

const UserInfo = () => {

  return (
    <div className='flex flex-col items-center gap-4 justify-center pt-8 pb-4 animate-fade-in'>
      <div className='relative group  justify-center items-center flex'>
        <div className='absolute -inset-1 bg-gradient-to-r from-nord-highlight-2 to-nord-highlight-3 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500'></div>
        <Image
          src={meImage.src}
          className='relative rounded-full transition-transform duration-300 hover:scale-105'
          width={140}
          height={140}
          alt='Kristijan Kocev'
        />
      </div>
      <span className='text-2xl font-bold animate-slide-up'>Kristijan Kocev</span>
      <div className='flex flex-col sm:flex-row gap-3 justify-center items-center animate-slide-up animation-delay-100'>
        <div className='flex flex-row gap-1 items-center'>
          <Location fill='#88C0D0' size={20} />
          <span className='text-base font-medium text-nord-text-secondary'>Skopje</span>
        </div>
        <span className='hidden sm:block text-nord-main-border'>•</span>
        <div className='flex flex-row gap-1 justify-center items-center'>
          <Engineer fill='#88C0D0' size={20} />
          <span className='text-base font-medium font-soehne-mono'>Product Engineer</span>
        </div>
      </div>
      <Link
        href='https://sixcore.io'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-2 px-4 py-2 rounded-lg bg-nord-accent-1 border border-nord-main-border hover:border-nord-highlight-2 transition-all duration-300 hover:scale-105 animate-slide-up animation-delay-200'
      >
        <span className='text-sm font-medium text-nord-text-secondary'>Co-founder at</span>
        <span className='text-sm font-bold text-nord-highlight-2'>sixcore.io</span>
        <Image src={sixcoreLogo} alt='sixcore.io' width={16} height={16} />
        <svg className='w-4 h-4 text-nord-highlight-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
          />
        </svg>
      </Link>
    </div>
  )
}
export default UserInfo
