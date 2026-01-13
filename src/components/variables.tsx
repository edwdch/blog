import { useVariables } from 'app/lib/variables-context'

/**
 * 变量编辑器组件
 * 显示所有可编辑的变量，用户可以修改变量值
 */
export function Variables() {
  const { variables, definitions, setVariable, resetAll } = useVariables()

  if (definitions.length === 0) {
    return null
  }

  const hasChanges = definitions.some(
    ({ key, defaultValue }) => variables[key] !== defaultValue
  )

  return (
    <div className="not-prose my-6 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          修改下方变量值，文章中的相应内容会自动更新
        </div>
        {hasChanges && (
          <button
            onClick={resetAll}
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            重置全部
          </button>
        )}
      </div>
      <div className="space-y-3">
        {definitions.map(({ key, defaultValue }) => (
          <div key={key} className="flex items-center gap-3">
            <label
              htmlFor={`var-${key}`}
              className="text-sm font-mono text-neutral-600 dark:text-neutral-400 min-w-[120px] shrink-0"
            >
              {key}
            </label>
            <input
              id={`var-${key}`}
              type="text"
              value={variables[key] || ''}
              onChange={(e) => setVariable(key, e.target.value)}
              placeholder={defaultValue}
              className="flex-1 px-3 py-1.5 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-shadow"
            />
            {variables[key] !== defaultValue && (
              <button
                onClick={() => setVariable(key, defaultValue)}
                className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                title="重置为默认值"
              >
                ↺
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * 变量显示组件
 * 在文章中使用，显示变量的当前值
 * 使用方式: <Var name="domain" />
 */
export function Var({ name }: { name: string }) {
  const { variables, definitions } = useVariables()
  const value = variables[name]
  const definition = definitions.find((d) => d.key === name)
  const isModified = definition && value !== definition.defaultValue

  if (!value) {
    return <span className="text-red-500">[undefined: {name}]</span>
  }

  return (
    <span
      className={`${
        isModified
          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-1 rounded'
          : ''
      }`}
    >
      {value}
    </span>
  )
}
