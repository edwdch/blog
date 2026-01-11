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
        出于自己的需求，我总结了一个<a
          href="/linux/remote-dev-in-browser"
          className="text-blue-600 dark:text-blue-400"
        >基于浏览器的远程开发解决方案</a> 。从头开始配置，如果你也有类似需求，可以参考系列文章总结自己的解决方案。
      </p>
      <p className="mb-4 text-neutral-700 dark:text-neutral-300">
        {`阅读时请注意，有些文章会依赖前置文章。对于这些文章，会在开头提供前置阅读的链接列表，
        必须先阅读前置文章，否则会因为缺失了上文信息导致无法理解突然出现的内容。
        比如，有些服务编写了 Nginx 配置，而我在 conf 文件中会引用一些片段配置，
        这些片段配置仅会在 Nginx 章节中进行说明。`}
      </p>
    </section>
  )
}
