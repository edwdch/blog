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
      <p className="mb-4 text-neutral-700 dark:text-neutral-300">
        如果你正在寻找一个基于浏览器的远程开发环境的解决方案，可以阅读一下 <a
          href="/linux/getting-started"
          className="text-blue-600 dark:text-blue-400"
        >
          《Linux 服务器起步配置》
        </a> 。我几乎从零开始搭建了一个远程开发环境，并分享了我的经验和教训。
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
