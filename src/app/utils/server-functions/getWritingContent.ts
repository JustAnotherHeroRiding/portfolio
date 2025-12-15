import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import { myWritings } from '@/app/utils/allWritings'
import rehypeStringify from 'rehype-stringify'
import remarkHtml from 'remark-html'

export async function getWritingContent(slug: string) {
  const writing = myWritings.find(w => w.slug === slug)
  if (!writing) return null

  const filePath = path.join(process.cwd(), 'public/posts', `${writing.path}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(fileContents)

  const processedContent = await remark()
    .use(remarkHtml, { sanitize: false })
    .use(remarkRehype, { allowDangerousHtml: true }) // Allow raw HTML during Markdown-to-HAST conversion
    .use(rehypePrism)
    .use(rehypeStringify, { allowDangerousHtml: true }) // Preserve raw HTML in the final string
    .process(content)

  return {
    title: writing.title,
    createdAt: writing.createdAt,
    contentHtml: processedContent.toString(),
    imgUrl: writing.imgUrl,
  }
}
