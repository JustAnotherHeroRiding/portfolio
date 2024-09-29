import Engineer from '../../svg/Engineer'
import Location from '../../svg/Location'
import Image from 'next/image'

const UserInfo = () => {
  const isProd = process.env.NODE_ENV === 'production'

  return (
    <div className='flex flex-col items-center gap-4 justify-center pt-8 pb-4'>
      <Image
        src={isProd ? '/portfolio/images/me.png' : '/images/me.png'}
        className='rounded-full mb-4'
        width={120}
        height={120}
        alt='Rate Game Logo'
      />
      <span className='text-2xl font-bold'>Kristijan Kocev</span>
      <div className='flex flex-row gap-4 justify-center items-center'>
        <div className='flex flex-row gap-1'>
          <Location fill='#94a3b8' size={24} />
          <span className='text-lg font-medium'>Skopje</span>
        </div>
        <div className='flex flex-row gap-1 justify-center items-center'>
          <Engineer fill='#94a3b8' size={24} />
          <span className='text-lg font-medium font-soehne-mono'>Software Engineer</span>
        </div>
      </div>
    </div>
  )
}
export default UserInfo
