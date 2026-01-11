import { formatDate } from 'app/lib/posts'
import { TableOfContents, useToc } from './toc'

type ArticleLayoutProps = {
  children: React.ReactNode
  frontmatter: {
    title: string
    publishedAt: string
    priority?: number
    icon?: string
    image?: string
  }
  slug: string
  section: 'blog' | 'linux'
}

export function ArticleLayout({
  children,
  frontmatter,
}: ArticleLayoutProps) {
  const { title, publishedAt, icon } = frontmatter
  const tocItems = useToc()

  return (
    <section className="relative">
      <h1 className="title font-semibold text-2xl tracking-tighter text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
        {icon && (
          <img 
            src={`/icons/${icon}`} 
            alt="" 
            className="w-8 h-8 object-contain flex-shrink-0" 
            onError={(e) => {
              console.error('Icon failed to load:', icon)
              e.currentTarget.style.display = 'none'
            }}
          />
        )}
        {title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(publishedAt)}
        </p>
      </div>
      <article className="prose">{children}</article>
      {/* 侧边栏目录 - 固定在文章左侧，不占用主内容宽度 */}
      <aside className="hidden xl:block fixed top-24 left-[max(1rem,calc(50%-336px-14rem-2rem))] w-56 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <TableOfContents items={tocItems} />
      </aside>
    </section>
  )
}
