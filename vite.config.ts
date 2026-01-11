import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import path from 'path'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
        remarkGfm, // GitHub 风格 Markdown：表格、任务列表、删除线等
      ],
      rehypePlugins: [
        rehypeSlug, // 为标题添加 id
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'prepend',
            properties: {
              className: ['anchor'],
              ariaLabel: 'Link to section',
            },
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: {
              dark: 'github-dark',
              light: 'github-light',
            },
            keepBackground: false,
          },
        ],
      ],
    }),
    react(),
  ],
  resolve: {
    alias: {
      'app': path.resolve(__dirname, './src'),
    },
  },
})
