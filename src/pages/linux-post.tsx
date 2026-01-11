import { useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ArticleLayout } from 'app/components/article'
import { mdxComponents } from 'app/lib/mdx-components'

// 动态导入 MDX 内容
const posts: Record<string, { default: React.ComponentType; frontmatter: any }> = import.meta.glob(
  './linux/*.mdx',
  { eager: true }
) as any

// 重新映射：从路径提取 slug
const postsBySlug: Record<string, { Content: React.ComponentType<{ components?: typeof mdxComponents }>; frontmatter: any }> = {}
for (const path in posts) {
  const slug = path.replace('./linux/', '').replace('.mdx', '')
  postsBySlug[slug] = {
    Content: posts[path].default,
    frontmatter: posts[path].frontmatter,
  }
}

export default function LinuxPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()

  // 处理 hash 锚点跳转
  useEffect(() => {
    if (location.hash) {
      // 延迟执行，确保内容已渲染
      setTimeout(() => {
        const id = decodeURIComponent(location.hash.slice(1))
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [location.hash, slug])

  if (!slug || !postsBySlug[slug]) {
    return (
      <section>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
          404 - Post Not Found
        </h1>
      </section>
    )
  }

  const { Content, frontmatter } = postsBySlug[slug]

  return (
    <ArticleLayout frontmatter={frontmatter} slug={slug} section="linux">
      <Content components={mdxComponents} />
    </ArticleLayout>
  )
}
