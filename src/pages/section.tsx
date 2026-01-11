import { Link } from 'react-router-dom'
import { formatDate, getPosts, Section } from 'app/lib/posts'

type SectionPageProps = {
  section: Section
  title: string
}

export default function SectionPage({ section, title }: SectionPageProps) {
  const allPosts = getPosts(section)

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-neutral-900 dark:text-neutral-100">
        {title}
      </h1>
      <div>
        {allPosts
          .sort((a, b) => {
            // 先按 priority 排序（升序），priority 越小越靠前
            const aPriority = a.metadata.priority ?? Infinity
            const bPriority = b.metadata.priority ?? Infinity
            if (aPriority !== bPriority) {
              return aPriority - bPriority
            }
            // priority 相同时按发布日期排序（降序）
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4"
              to={`/${section}/${post.slug}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 w-[130px] tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center gap-2">
                  {post.metadata.title}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  )
}
