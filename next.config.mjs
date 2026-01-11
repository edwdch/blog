import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 支持 .mdx 作为页面扩展名
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
})

export default withMDX(nextConfig)
