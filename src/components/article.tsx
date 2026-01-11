import { formatDate } from 'app/lib/posts'

type ArticleLayoutProps = {
  children: React.ReactNode
  frontmatter: {
    title: string
    publishedAt: string
    summary?: string
    image?: string
  }
  slug: string
  section: 'blog' | 'linux'
}

export function ArticleLayout({
  children,
  frontmatter,
}: ArticleLayoutProps) {
  const { title, publishedAt } = frontmatter

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">{title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(publishedAt)}
        </p>
      </div>
      <article className="prose">{children}</article>
    </section>
  )
}
