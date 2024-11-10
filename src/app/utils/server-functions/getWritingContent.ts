import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import rehypePrism from 'rehype-prism-plus'
import { myWritings } from '@/app/utils/writings'

export async function getWritingContent(slug: string) {
  const writing = myWritings.find((w) => w.slug === slug)
  if (!writing) return null

  const filePath = path.join(process.cwd(), 'public/posts', `${writing.path}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .use(rehypePrism) 
    .process(content)

  return {
    title: writing.title,
    createdAt: writing.createdAt,
    contentHtml: processedContent.toString(), 
  }
}
