import { useEffect, useState } from 'react'

// Same three choices as the dashboard's Appearance settings.
export type ThemePreference = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'isopod-theme'
const lightQuery = () => window.matchMedia('(prefers-color-scheme: light)')

const readPreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Storage can be blocked (private mode); fall back to the OS setting
  }
  return 'system'
}

const apply = (pref: ThemePreference) => {
  const light = pref === 'light' || (pref === 'system' && lightQuery().matches)
  document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark')
}

export const useTheme = () => {
  const [preference, setPreference] = useState<ThemePreference>(readPreference)

  useEffect(() => {
    apply(preference)
    try {
      if (preference === 'system') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, preference)
    } catch {
      // Not persisted; the choice still applies for this visit
    }
    if (preference !== 'system') return
    const query = lightQuery()
    const onChange = () => apply('system')
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [preference])

  return [preference, setPreference] as const
}
