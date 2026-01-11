import { Link } from 'react-router-dom'
import { useMemo } from 'react'

export type DocMetadata = {
  title: string
  publishedAt: string
  priority?: number
  icon?: string
  image?: string
  benefits?: string[]
}

// 惰性获取文档元数据，避免循环依赖
function getDocsBySlug(): Record<string, DocMetadata> {
  const linuxPostModules = import.meta.glob('../pages/linux/*.mdx', { eager: true }) as Record<
    string,
    { frontmatter: DocMetadata }
  >
  
  const docs: Record<string, DocMetadata> = {}
  for (const path in linuxPostModules) {
    const slug = path.replace('../pages/linux/', '').replace('.mdx', '')
    docs[slug] = linuxPostModules[path].frontmatter
  }
  return docs
}

let cachedDocs: Record<string, DocMetadata> | null = null

function getDocs() {
  if (!cachedDocs) {
    cachedDocs = getDocsBySlug()
  }
  return cachedDocs
}

interface DocRefProps {
  /** 文档的 slug，例如 "getting-started", "nginx" */
  path: string
  /** 可选：自定义显示的 benefits，不传则使用文档的 benefits */
  benefits?: string[]
}

/**
 * 文档引用组件
 * 用于在 MDX 中引用其他文档，并显示该文档的标题和 benefits
 *
 * @example
 * <DocRef path="getting-started" />
 * <DocRef path="nginx" benefits={["Nginx 反向代理"]} />
 */
export function DocRef({ path, benefits: customBenefits }: DocRefProps) {
  const docs = useMemo(() => getDocs(), [])
  const metadata = docs[path]

  if (!metadata) {
    return (
      <span className="text-red-500">
        [文档未找到: {path}]
      </span>
    )
  }

  const benefits = customBenefits ?? metadata.benefits
  const benefitText = benefits?.length ? benefits.join('、') : null

  return (
    <span className="not-prose inline-flex items-center gap-1.5 text-sm">
      <span className="text-neutral-400">📖</span>
      <Link
        to={`/linux/${path}`}
        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
      >
        {metadata.title}
      </Link>
      {benefitText && (
        <>
          <span className="text-neutral-400">—</span>
          <span className="text-neutral-600 dark:text-neutral-400">{benefitText}</span>
        </>
      )}
    </span>
  )
}

interface DocRefListProps {
  children: React.ReactNode
}

/**
 * 文档引用列表容器
 * 用于包裹多个 DocRef 组件，提供统一的列表样式
 *
 * @example
 * <DocRefList>
 *   <DocRef path="getting-started" />
 *   <DocRef path="nginx" />
 * </DocRefList>
 */
export function DocRefList({ children }: DocRefListProps) {
  return (
    <div className="not-prose my-4 flex flex-col gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        前置阅读
      </div>
      {children}
    </div>
  )
}
