import { BlogPosts } from 'app/components/posts'

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
        Edward's Blog
      </h1>
      <p className="mb-4 text-neutral-700 dark:text-neutral-300">
        我希望把我在学习和工作中遇到的问题和解决方案记录并分享出来。
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
