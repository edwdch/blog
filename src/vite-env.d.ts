/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const frontmatter: {
    title: string
    publishedAt: string
    priority?: number
    image?: string
  }
  const MDXComponent: ComponentType
  export default MDXComponent
}
