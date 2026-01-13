import { formatDate } from 'app/lib/posts'
import { TableOfContents, useToc } from './toc'
import { VariablesProvider, VariableDefinition } from 'app/lib/variables-context'

type ArticleLayoutProps = {
  children: React.ReactNode
  frontmatter: {
    title: string
    publishedAt: string
    updatedAt?: string
    priority?: number
    icon?: string
    image?: string
    variables?: Record<string, string>
  }
  slug: string
  section: 'linux' | 'apple'
}

export function ArticleLayout({
  children,
  frontmatter,
}: ArticleLayoutProps) {
  const { title, publishedAt, updatedAt, icon, variables } = frontmatter
  const tocItems = useToc()

  // 将 variables 对象转换为 VariableDefinition 数组
  const variableDefinitions: VariableDefinition[] = variables
    ? Object.entries(variables).map(([key, defaultValue]) => ({
        key,
        defaultValue,
      }))
    : []

  const content = (
    <section className="relative">
      <h1 className="title font-semibold text-2xl tracking-tighter text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
        {icon && (
          <img 
            src={`/icons/${icon}`} 
            alt="" 
            className="w-8 h-8 object-contain shrink-0" 
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
          {updatedAt && (
            <span className="ml-3 text-neutral-500 dark:text-neutral-500">
              (Updated at {formatDate(updatedAt)})
            </span>
          )}
        </p>
      </div>
      <article className="prose">{children}</article>
      {/* 侧边栏目录 - 固定在文章左侧，不占用主内容宽度 */}
      <aside className="hidden xl:block fixed top-24 left-[max(1rem,calc(50%-336px-14rem-2rem))] w-56 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <TableOfContents items={tocItems} />
      </aside>
    </section>
  )

  // 如果有变量定义，使用 VariablesProvider 包裹
  if (variableDefinitions.length > 0) {
    return (
      <VariablesProvider definitions={variableDefinitions}>
        {content}
      </VariablesProvider>
    )
  }

  return content
}
