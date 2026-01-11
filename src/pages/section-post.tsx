import { useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ArticleLayout } from 'app/components/article'
import { mdxComponents } from 'app/lib/mdx-components'
import { Section } from 'app/lib/posts'

// 动态导入所有 section 的 MDX 内容
const linuxPosts: Record<string, { default: React.ComponentType; frontmatter: any }> = import.meta.glob(
  './linux/*.mdx',
  { eager: true }
) as any

const applePosts: Record<string, { default: React.ComponentType; frontmatter: any }> = import.meta.glob(
  './apple/*.mdx',
  { eager: true }
) as any

// 按 section 组织的文章映射
type PostData = { 
  Content: React.ComponentType<{ components?: typeof mdxComponents }>
  frontmatter: any 
}

function createPostsBySlug(
  posts: Record<string, { default: React.ComponentType; frontmatter: any }>,
  section: string
): Record<string, PostData> {
  const result: Record<string, PostData> = {}
  for (const path in posts) {
    const slug = path.replace(`./${section}/`, '').replace('.mdx', '')
    result[slug] = {
      Content: posts[path].default,
      frontmatter: posts[path].frontmatter,
    }
  }
  return result
}

const postsBySection: Record<Section, Record<string, PostData>> = {
  linux: createPostsBySlug(linuxPosts, 'linux'),
  apple: createPostsBySlug(applePosts, 'apple'),
}

type SectionPostPageProps = {
  section: Section
}

export default function SectionPostPage({ section }: SectionPostPageProps) {
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

  const sectionPosts = postsBySection[section]
  
  if (!slug || !sectionPosts[slug]) {
    return (
      <section>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
          404 - Post Not Found
        </h1>
      </section>
    )
  }

  const { Content, frontmatter } = sectionPosts[slug]

  return (
    <ArticleLayout frontmatter={frontmatter} slug={slug} section={section}>
      <Content components={mdxComponents} />
    </ArticleLayout>
  )
}
