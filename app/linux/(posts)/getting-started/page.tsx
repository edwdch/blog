import Content, { frontmatter } from './content.mdx'
import { ArticleLayout } from 'app/components/article'
import { baseUrl } from 'app/sitemap'

export function generateMetadata() {
  const { title, summary: description, image } = frontmatter
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      url: `${baseUrl}/linux/getting-started`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Page() {
  return (
    <ArticleLayout frontmatter={frontmatter} slug="getting-started" section="linux">
      <Content />
    </ArticleLayout>
  )
}
