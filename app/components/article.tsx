import { formatDate } from 'app/lib/posts'
import { baseUrl } from 'app/sitemap'

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
  slug,
  section,
}: ArticleLayoutProps) {
  const { title, publishedAt, summary, image } = frontmatter

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            datePublished: publishedAt,
            dateModified: publishedAt,
            description: summary,
            image: image
              ? `${baseUrl}${image}`
              : `/og?title=${encodeURIComponent(title)}`,
            url: `${baseUrl}/${section}/${slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
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
