import { useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark' | 'system'

function getIsDark(theme: Theme): boolean {
  if (theme === 'dark') return true
  if (theme === 'light') return false
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system'
    }
    return 'system'
  })

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else if (newTheme === 'light') {
      root.classList.remove('dark')
    } else {
      // system
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [])

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, applyTheme])

  // 带动画的主题切换
  const toggleThemeWithTransition = useCallback(async (
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    const nextTheme = (() => {
      if (theme === 'light') return 'dark'
      if (theme === 'dark') return 'system'
      return 'light'
    })()

    const currentIsDark = getIsDark(theme)
    const nextIsDark = getIsDark(nextTheme)
    
    // 如果明暗状态没有变化，直接切换
    if (currentIsDark === nextIsDark) {
      setTheme(nextTheme)
      return
    }

    // 检查浏览器是否支持 View Transitions API 和用户是否禁用动画
    const isViewTransitionSupported = 'startViewTransition' in document
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isViewTransitionSupported || isReducedMotion) {
      setTheme(nextTheme)
      return
    }

    // 获取点击位置，用于动画起点
    const x = event?.clientX ?? window.innerWidth / 2
    const y = event?.clientY ?? window.innerHeight / 2

    // 计算最大半径（确保圆形能覆盖整个屏幕）
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // 设置 CSS 变量用于动画
    document.documentElement.style.setProperty('--theme-transition-x', `${x}px`)
    document.documentElement.style.setProperty('--theme-transition-y', `${y}px`)
    document.documentElement.style.setProperty('--theme-transition-radius', `${maxRadius}px`)

    // 标记切换方向
    const isDarkToLight = currentIsDark && !nextIsDark
    document.documentElement.classList.add(
      isDarkToLight ? 'theme-transition-dark-to-light' : 'theme-transition-light-to-dark'
    )

    // @ts-ignore - View Transitions API
    const transition = document.startViewTransition(() => {
      setTheme(nextTheme)
    })

    try {
      await transition.finished
    } finally {
      document.documentElement.classList.remove(
        'theme-transition-dark-to-light',
        'theme-transition-light-to-dark'
      )
    }
  }, [theme, setTheme])

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }

  const isDark = getIsDark(theme)

  return { theme, setTheme, toggleTheme, toggleThemeWithTransition, isDark }
}
