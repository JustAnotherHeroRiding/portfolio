import { getWritingContent } from '@/app/utils/server-functions/getWritingContent'
import Link from 'next/link'
import { myWritings } from '@/app/utils/allWritings'
import { Metadata } from 'next'
import { PageProps } from '../../../../.next/types/app/layout'

export async function generateStaticParams() {
  return myWritings.map(writing => ({ slug: writing.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = (await params) as { slug: string }
  const post = await getWritingContent(slug)

  const siteUrl = 'https://justanotherheroriding.cc'
  const fallbackTitle = 'Kristijan Kocev'
  const fallbackDescription = 'Everything you need to know about Kristijan Kocev(me)'

  const title = post?.title ? `${post.title}` : fallbackTitle
  const description = post?.contentHtml.slice(0, 160) + '...' || fallbackDescription
  const canonicalPath = `/writing/${slug}`
  const imgUrl = post?.imgUrl || '/images/me.png'

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: 'article',
      siteName: fallbackTitle,
      images: [
        {
          url: imgUrl,
          width: 800,
          height: 600,
          alt: fallbackTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imgUrl],
    },
  }
}

export default async function Writing({ params }: PageProps) {
  const { slug } = (await params) as { slug: string }
  const post = await getWritingContent(slug)

  if (!post) return <p>Post not found</p>

  return (
    <div className='flex flex-col justify-center items-center'>
      <Link href={'/'} className='text-blue-500 hover:opacity-70'>
        <div>Go Back</div>
      </Link>
      <article
        className='prose prose-lg text-nord-text-primary flex flex-col px-4 md:px-16 py-12 items-center bg-nord-surface mx-auto w-full   [&_video]:h-[600px]
  [&_video]:w-full
  [&_video]:object-contain'
      >
        <div className='flex flex-col mb-4'>
          <h1 className=''>{post.title}</h1>
          <p className='text-center opacity-70 my-0'>{post.createdAt}</p>
        </div>
        <div className='w-full overflow-hidden break-words' dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </div>
  )
}
