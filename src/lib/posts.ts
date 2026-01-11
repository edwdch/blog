// 使用 Vite 的 import.meta.glob 动态导入所有 MDX 文件的 frontmatter
const linuxPostModules = import.meta.glob('../pages/linux/*.mdx', { eager: true }) as Record<
  string,
  { frontmatter: PostMetadata }
>
const iosPostModules = import.meta.glob('../pages/ios/*.mdx', { eager: true }) as Record<
  string,
  { frontmatter: PostMetadata }
>

export type PostMetadata = {
  title: string
  publishedAt: string
  priority?: number
  icon?: string
  image?: string
  benefits?: string[]
}

export type Post = {
  slug: string
  metadata: PostMetadata
}

export type Section = 'linux' | 'ios'

// 通用函数：从模块生成文章列表
function createPosts(modules: Record<string, { frontmatter: PostMetadata }>, section: string): Post[] {
  return Object.entries(modules).map(([path, module]) => {
    const slug = path.replace(`../pages/${section}/`, '').replace('.mdx', '')
    return {
      slug,
      metadata: module.frontmatter,
    }
  })
}

// 各 section 的文章列表
const postsBySection: Record<Section, Post[]> = {
  linux: createPosts(linuxPostModules, 'linux'),
  ios: createPosts(iosPostModules, 'ios'),
}

// 通用获取函数
export function getPosts(section: Section): Post[] {
  return postsBySection[section] || []
}

// 保持向后兼容
export function getLinuxPosts() {
  return getPosts('linux')
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
