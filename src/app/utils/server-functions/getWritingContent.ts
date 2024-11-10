import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype';
import rehypePrism from 'rehype-prism-plus'
import { myWritings } from '@/app/utils/allWritings'
import rehypeStringify from 'rehype-stringify';
import remarkHtml from 'remark-html'

export async function getWritingContent(slug: string) {
  const writing = myWritings.find((w) => w.slug === slug)
  if (!writing) return null

  const filePath = path.join(process.cwd(), 'public/posts', `${writing.path}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(fileContents)

  const processedContent = await remark()
  .use(remarkHtml)
  .use(remarkRehype)
  .use(rehypePrism)
  .use(rehypeStringify)
  .process(content);

  return {
    title: writing.title,
    createdAt: writing.createdAt,
    contentHtml: processedContent.toString(), 
  }
}
