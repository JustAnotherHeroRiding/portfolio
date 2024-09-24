import Engineer from '../../svg/Engineer'
import Location from '../../svg/Location'
import Image from 'next/image'

const UserInfo = () => {
  const isProd = process.env.NODE_ENV === 'production'
  return (
    <div className='flex flex-col items-center justify-center pt-8 pb-4'>
      <Image
        src={isProd ? '/portfolio/images/me.jpg' : '/images/me.jpg'}
        className='rounded-[25px]'
        width={100}
        height={100}
        alt='Rate Game Logo'
      />
      <span>Kristijan Kocev</span>
      <div className='flex flex-row gap-4'>
        <div className='flex flex-row gap-1'>
          <Location fill='#94a3b8' />
          <span>Skopje</span>
        </div>
        <div className='flex flex-row gap-1'>
          <Engineer fill='#94a3b8' />
          <span>Software Engineer</span>
        </div>
      </div>
    </div>
  )
}
export default UserInfo
