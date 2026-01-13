import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type VariableDefinition = {
  key: string
  defaultValue: string
}

type VariablesContextType = {
  variables: Record<string, string>
  definitions: VariableDefinition[]
  setVariable: (key: string, value: string) => void
  resetVariable: (key: string) => void
  resetAll: () => void
}

const VariablesContext = createContext<VariablesContextType | null>(null)

type VariablesProviderProps = {
  children: ReactNode
  definitions: VariableDefinition[]
}

export function VariablesProvider({ children, definitions }: VariablesProviderProps) {
  // 初始化变量值为默认值
  const [variables, setVariables] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    definitions.forEach(({ key, defaultValue }) => {
      initial[key] = defaultValue
    })
    return initial
  })

  const setVariable = useCallback((key: string, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetVariable = useCallback((key: string) => {
    const def = definitions.find((d) => d.key === key)
    if (def) {
      setVariables((prev) => ({ ...prev, [key]: def.defaultValue }))
    }
  }, [definitions])

  const resetAll = useCallback(() => {
    const initial: Record<string, string> = {}
    definitions.forEach(({ key, defaultValue }) => {
      initial[key] = defaultValue
    })
    setVariables(initial)
  }, [definitions])

  return (
    <VariablesContext.Provider
      value={{ variables, definitions, setVariable, resetVariable, resetAll }}
    >
      {children}
    </VariablesContext.Provider>
  )
}

export function useVariables() {
  const context = useContext(VariablesContext)
  if (!context) {
    throw new Error('useVariables must be used within a VariablesProvider')
  }
  return context
}

export function useVariablesOptional() {
  return useContext(VariablesContext)
}
