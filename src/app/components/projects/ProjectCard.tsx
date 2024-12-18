import Link from 'next/link'
import Image from 'next/image'
import { AcquireInfo, Project } from '@/app/utils/projects'
import AppStore from '../svg/AppStore'
import GooglePlay from '../svg/GooglePlay'
import Mail from '../svg/Mail'

const ProjectCard = ({ name, description, imageUrl, acquireInfo, stack }: Project) => {
  const isProd = process.env.NODE_ENV === 'production'
  const prefix = isProd ? '/portfolio' : ''
  const fullImageUrl = `${prefix}${imageUrl}`

  const appButtons = acquireInfo.filter(info => info.type === 'appStore' || info.type === 'playStore')
  const altButtons = acquireInfo.filter(info => info.type === 'contact' || info.type === 'website')

  return (
    <li className='flex flex-col gap-2 border border-nord-main-border rounded-lg mx-auto justify-center items-center px-4 py-6 w-full'>
      <Image
        src={fullImageUrl}
        className='rounded-[25px] bg-nord-accent-1'
        width={100}
        height={100}
        alt={`${name} Logo`}
      />
      <span className='text-xl font-medium'>{name}</span>
      <span className='max-w-[350px] text-center text-nord-text-secondary opacity-70'>{description}</span>
      <div className='flex flex-row gap-2 mt-auto'>
        {appButtons?.map((info: AcquireInfo, index: number) => (
          <div key={index} className='mt-2'>
            {info.type === 'appStore' && info.link && (
              <Link href={info.link} className='text-blue-500 hover:opacity-70'>
                <div
                  title='Get on the App Store'
                  className='flex py-2 px-3  bg-nord-text-primary text-white rounded-xl items-center justify-center'
                >
                  <AppStore fill='#2E3440' />
                </div>
              </Link>
            )}
            {info.type === 'playStore' && info.link && (
              <Link href={info.link} className='text-blue-500 hover:opacity-70'>
                <div
                  title='Get on Google Play'
                  className='flex py-2 px-3  bg-nord-text-primary text-white rounded-xl items-center justify-center'
                >
                  <GooglePlay fill='#2E3440' />
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className='flex flex-row gap-2'>
        {altButtons?.map((info: AcquireInfo, index: number) => (
          <div key={index} className='mt-2'>
            {info.type === 'website' && info.link && (
              <Link
                href={info.link}
                className='text-blue-500 hover:opacity-70 flex flex-row items-center justify-center gap-2'
              >
                <div
                  title='Email me for the app'
                  className='flex py-2 px-3 gap-2 bg-nord-text-primary text-white rounded-xl items-center justify-center'
                >
                  {info.logo ? <info.logo size={24} fill='#2E3440' /> : null}
                  <span className='font-bold text-nord-surface'>Check out</span>
                </div>
              </Link>
            )}
            {info.type === 'contact' && (
              <Link href='mailto:kristijankocev1234@gmail.com' className='text-blue-500 hover:opacity-70'>
                <div
                  title='Email me for the app'
                  className='flex py-2 px-3 gap-2 bg-nord-text-primary text-white rounded-xl items-center justify-center'
                >
                  <Mail fill='#2E3440' />
                  <span className='font-bold text-nord-surface'>Contact Me</span>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className='flex flex-row gap-2'>
        {stack.map(s => {
          return (
            <Link
              key={`${s.name}-${name}`}
              href={s.docs}
              className='p-1 hover:opacity-70 bg-nord-accent-1 rounded-full'
            >
              <img src={s.logoUrl} width={42} height={42} alt={`${s.name} Logo`} />
            </Link>
          )
        })}
      </div>
    </li>
  )
}

export default ProjectCard
