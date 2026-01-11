import { BlogPosts } from 'app/components/posts'

export default function HomePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Edward's Blog
      </h1>
      <p className="mb-4">
        我希望把我在学习和工作中遇到的问题和解决方案记录下来，分享给大家。
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
