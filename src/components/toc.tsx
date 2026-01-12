import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type TocItem = {
  id: string
  text: string
  level: number
}

type TocProps = {
  items: TocItem[]
}

export function TableOfContents({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // 找到第一个进入视口的标题
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // 取最靠近顶部的可见标题
          const sorted = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          setActiveId(sorted[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    )

    // 观察所有标题元素
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <nav className="toc">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
        目录
      </h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                  // 更新 URL hash
                  window.history.pushState(null, '', `#${item.id}`)
                  setActiveId(item.id)
                }
              }}
              className={`block py-1 transition-colors duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 ${
                activeId === item.id
                  ? 'text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// 从 DOM 中提取标题生成 TOC
export function useToc() {
  const [items, setItems] = useState<TocItem[]>([])
  const location = useLocation()

  useEffect(() => {
    // 切换文章时先清空目录
    setItems([])
    
    // 等待 MDX 内容渲染完成
    const timer = setTimeout(() => {
      const article = document.querySelector('article.prose')
      if (!article) return

      const headings = article.querySelectorAll('h2, h3, h4')
      const tocItems: TocItem[] = []

      headings.forEach((heading) => {
        const id = heading.id
        const text = heading.textContent || ''
        const level = parseInt(heading.tagName[1])

        if (id && text) {
          tocItems.push({ id, text, level })
        }
      })

      setItems(tocItems)
    }, 100)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return items
}
