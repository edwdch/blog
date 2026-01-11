export default function HomePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-neutral-100">
        Edward's Blog
      </h1>
      <p className="mb-4 text-neutral-700 dark:text-neutral-300">
        出于自己的需求，我总结了一个<a
          href="/linux/remote-dev-in-browser"
          className="text-blue-600 dark:text-blue-400"
        >基于浏览器的远程开发解决方案</a> 。从头开始配置，如果你也有类似需求，可以参考系列文章总结自己的解决方案。
      </p>
      <p className="mb-4 text-neutral-700 dark:text-neutral-300">
        {`阅读时请注意，有些文章会在开头提供前置阅读的链接列表，此为必读部分，
        否则会因为缺失了上文信息导致无法理解突然出现的内容。
        比如，有些服务可能会在 nginx 的 conf 文件中会引用一些片段配置，
        而这些片段仅会在 Nginx 章节中说明。`}
      </p>
    </section>
  )
}
