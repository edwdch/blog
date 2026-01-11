import { Link } from 'react-router-dom'
import { useMemo } from 'react'

type PostMetadata = {
  title: string
  publishedAt: string
  priority?: number
  icon?: string
  image?: string
  benefits?: string[]
}

// 惰性获取文档元数据
function getPostsByPath(): Record<string, PostMetadata> {
  const linuxPostModules = import.meta.glob('../pages/linux/*.mdx', { eager: true }) as Record<
    string,
    { frontmatter: PostMetadata }
  >

  const posts: Record<string, PostMetadata> = {}
  for (const modulePath in linuxPostModules) {
    // 提取 slug，如 "getting-started"
    const slug = modulePath.replace('../pages/linux/', '').replace('.mdx', '')
    const frontmatter = linuxPostModules[modulePath].frontmatter

    // 支持多种路径格式
    posts[slug] = frontmatter                           // getting-started
    posts[`./${slug}`] = frontmatter                    // ./getting-started
    posts[`/linux/${slug}`] = frontmatter               // /linux/getting-started
  }
  return posts
}

let cachedPosts: Record<string, PostMetadata> | null = null

function getPosts() {
  if (!cachedPosts) {
    cachedPosts = getPostsByPath()
  }
  return cachedPosts
}

// 将路径解析为实际的链接 URL
function resolveUrl(path: string): string {
  // 如果是相对路径 ./xxx，转换为 /linux/xxx
  if (path.startsWith('./')) {
    return `/linux/${path.slice(2)}`
  }
  // 如果是绝对路径 /linux/xxx，直接使用
  if (path.startsWith('/')) {
    return path
  }
  // 否则当作 slug，转换为 /linux/slug
  return `/linux/${path}`
}

// 规范化路径用于查找
function normalizePath(path: string): string {
  // 移除开头的 ./ 或 /linux/
  if (path.startsWith('./')) {
    return path.slice(2)
  }
  if (path.startsWith('/linux/')) {
    return path.slice(7)
  }
  return path
}

interface PostLinkProps {
  /** 文章路径，支持多种格式：
   * - slug: "getting-started"
   * - 相对路径: "./getting-started"
   * - 绝对路径: "/linux/getting-started"
   */
  href: string
  /** 可选：自定义链接文本，不传则使用文章标题 */
  children?: React.ReactNode
}

/**
 * 文章链接组件
 * 用于在 MDX 中引用其他文章，自动获取文章标题作为链接文本
 *
 * @example
 * <PostLink href="./getting-started" />
 * <PostLink href="/linux/nginx" />
 * <PostLink href="authelia">自定义文本</PostLink>
 */
export function PostLink({ href, children }: PostLinkProps) {
  const posts = useMemo(() => getPosts(), [])
  const slug = normalizePath(href)
  const metadata = posts[slug]
  const url = resolveUrl(href)

  if (!metadata) {
    return (
      <Link to={url} target="_blank" rel="noopener noreferrer" className="text-orange-500">
        {children || `[文章未找到: ${href}]`}
      </Link>
    )
  }

  return (
    <Link to={url} target="_blank" rel="noopener noreferrer">
      {children || metadata.title}
    </Link>
  )
}
