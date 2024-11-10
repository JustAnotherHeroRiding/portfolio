import { myWritings } from '@/app/utils/allWritings'
import Link from 'next/link'

export const Writings = () => {
  return (
    <div className='flex flex-col justify-center items-center border-b w-fit mx-auto border-nord-highlight-2'>
      <h1 className='text-2xl font-bold'>Writings</h1>
      <div className='flex flex-col gap-4 items-center align-center'>
        {myWritings.map(blog => (
          <Link className='hover:opacity-70' href={`/writing/${blog.slug}`} key={blog.id}>
            <span className='font-medium'>{blog.title}</span>
            {' - '}
            <span className='text-nord-text-secondary opacity-70'>{blog.createdAt}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
