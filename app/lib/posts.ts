// 从 MDX 文件导入 frontmatter
import { frontmatter as gettingStartedFrontmatter } from 'app/linux/(posts)/getting-started/content.mdx'

export type PostMetadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

export type Post = {
  slug: string
  metadata: PostMetadata
}

// Blog 文章列表
export const blogPosts: Post[] = []

// Linux 文章列表
export const linuxPosts: Post[] = [
  { slug: 'getting-started', metadata: gettingStartedFrontmatter },
]

export function getBlogPosts() {
  return blogPosts
}

export function getLinuxPosts() {
  return linuxPosts
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
