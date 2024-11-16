import { getWritingContent } from '@/app/utils/server-functions/getWritingContent'
import { PageProps } from '../../../../.next/types/app/layout'
import Link from 'next/link'
import { myWritings } from '@/app/utils/allWritings'

export async function generateStaticParams() {
  return myWritings.map(writing => ({ slug: writing.slug }))
}

export default async function Writing({ params }: PageProps) {
  const { slug } = params
  const post = await getWritingContent(slug)

  if (!post) return <p>Post not found</p>

  return (
    <div className='flex flex-col justify-center items-center'>
      <Link href={'/'} className='text-blue-500 hover:opacity-70'>
        <div>Go Back</div>
      </Link>
      <article className='prose prose-lg text-nord-text-primary flex flex-col px-4 md:px-16 py-12 items-center bg-nord-surface mx-auto w-full'>
        <div className='flex flex-col mb-4'>
          <h1 className=''>{post.title}</h1>
          <p className='text-center opacity-70 my-0'>{post.createdAt}</p>
        </div>
        <div className='w-full overflow-hidden break-words' dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </div>
  )
}
