import { useParams } from 'react-router-dom'
import { ArticleLayout } from 'app/components/article'

// 动态导入 MDX 内容
const posts: Record<string, { default: React.ComponentType; frontmatter: any }> = import.meta.glob(
  './linux/*.mdx',
  { eager: true }
) as any

// 重新映射：从路径提取 slug
const postsBySlug: Record<string, { Content: React.ComponentType; frontmatter: any }> = {}
for (const path in posts) {
  const slug = path.replace('./linux/', '').replace('.mdx', '')
  postsBySlug[slug] = {
    Content: posts[path].default,
    frontmatter: posts[path].frontmatter,
  }
}

export default function LinuxPostPage() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug || !postsBySlug[slug]) {
    return (
      <section>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          404 - Post Not Found
        </h1>
      </section>
    )
  }

  const { Content, frontmatter } = postsBySlug[slug]

  return (
    <ArticleLayout frontmatter={frontmatter} slug={slug} section="linux">
      <Content />
    </ArticleLayout>
  )
}
