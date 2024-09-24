import Link from 'next/link'
import Image from 'next/image'
import { AcquireInfo, Project } from '@/app/utils/projects'

const ProjectCard = ({ name, description, imageUrl, acquireInfo }: Project) => {
  const isProd = process.env.NODE_ENV === 'production'
  const prefix = isProd ? '/portfolio' : ''
  const fullImageUrl = `${prefix}${imageUrl}`

  const appButtons = acquireInfo.filter(info => info.type === 'appStore' || info.type === 'playStore')
  const altButtons = acquireInfo.filter(info => info.type === 'contact' || info.type === 'website')

  return (
    <li className='flex flex-col gap-2 border border-nord-main-border rounded-lg mx-auto justify-center items-center px-4 py-6 w-full max-w-[400px]'>
      <Image src={fullImageUrl} className='rounded-[25px]' width={100} height={100} alt={`${name} Logo`} />
      <span className='text-xl font-medium'>{name}</span>
      <span className='max-w-[400px] text-center text-nord-text-secondary opacity-70'>{description}</span>
      <div className='flex flex-row gap-2'>
        {appButtons?.map((info: AcquireInfo, index: number) => (
          <div key={index} className='mt-2'>
            {info.type === 'appStore' && info.link && (
              <Link href={info.link} className='text-blue-500'>
                App Store
              </Link>
            )}
            {info.type === 'playStore' && info.link && (
              <Link href={info.link} className='text-blue-500'>
                Play Store
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className='flex flex-row gap-2'>
        {altButtons?.map((info: AcquireInfo, index: number) => (
          <div key={index} className='mt-2'>
            {info.type === 'website' && info.link && (
              <Link href={info.link} className='text-blue-500'>
                Visit Website
              </Link>
            )}
            {info.type === 'contact' && (
              <a href='mailto:kristijankocev1234@gmail.com' className='text-blue-500'>
                Contact Me
              </a>
            )}
          </div>
        ))}
      </div>
    </li>
  )
}

export default ProjectCard
