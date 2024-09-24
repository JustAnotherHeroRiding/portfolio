import Image from 'next/image'
const ProjectCard = ({ name, description, imageUrl }: { name: string; description: string; imageUrl: string }) => {
  const isProd = process.env.NODE_ENV === 'production'
  const prefix = isProd ? '/portfolio' : ''
  const fullImageUrl = `${prefix}${imageUrl}`

  return (
    <li className='flex flex-col gap-2 border border-nord-main-border rounded-lg mx-auto justify-center items-center px-4 py-6 w-full max-w-[400px]'>
      <Image src={fullImageUrl} className='rounded-[25px]' width={100} height={100} alt='Rate Game Logo' />
      <span className='text-xl font-medium'>{name}</span>
      <span className='max-w-[400px] text-center text-nord-text-secondary opacity-70'>{description}</span>
    </li>
  )
}

export default ProjectCard
