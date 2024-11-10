import { getWritingContent } from '@/app/utils/server-functions/getWritingContent'
import { PageProps } from '../../../../.next/types/app/layout'

export default async function Writing({ params }: PageProps) {
  const { slug } = params
  const post = await getWritingContent(slug)

  if (!post) return <p>Post not found</p>

  return (
    <article className='prose prose-lg text-nord-text-primary flex flex-col px-4 md:px-16 py-12 items-center bg-nord-surface mx-auto'>
      <div className='flex flex-col my-4'>
        <h1 className='text-3xl font-bold text-center mb-0'>{post.title}</h1>
        <p className='text-center opacity-70 my-0'>{post.createdAt}</p>
      </div>
      <div className='w-full overflow-hidden break-words' dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  )
}
