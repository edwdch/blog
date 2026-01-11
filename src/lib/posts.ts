// 使用 Vite 的 import.meta.glob 动态导入所有 MDX 文件的 frontmatter
const linuxPostModules = import.meta.glob('../pages/linux/*.mdx', { eager: true }) as Record<
  string,
  { frontmatter: PostMetadata }
>

export type PostMetadata = {
  title: string
  publishedAt: string
  priority?: number
  icon?: string
  image?: string
}

export type Post = {
  slug: string
  metadata: PostMetadata
}

// Linux 文章列表 - 从 MDX 文件动态生成
export const linuxPosts: Post[] = Object.entries(linuxPostModules).map(([path, module]) => {
  const slug = path.replace('../pages/linux/', '').replace('.mdx', '')
  return {
    slug,
    metadata: module.frontmatter,
  }
})

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
