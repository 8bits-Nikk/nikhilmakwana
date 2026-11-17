import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  ThemeContext,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type Theme,
} from '@/lib/theme-context'

const DARK_QUERY = '(prefers-color-scheme: dark)'

const readStoredTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* localStorage unavailable (private mode / blocked cookies) */
  }
  return 'system'
}

const systemTheme = (): ResolvedTheme =>
  window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme)
  const [systemPreference, setSystemPreference] =
    useState<ResolvedTheme>(systemTheme)

  const resolvedTheme: ResolvedTheme =
    theme === 'system' ? systemPreference : theme

  // Track the OS preference so `system` stays live.
  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) =>
      setSystemPreference(event.matches ? 'dark' : 'light')

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  // Paint the resolved theme. The inline script in index.html already did this
  // for the first paint; this keeps it correct for every change afterwards.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      if (next === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* preference simply will not persist */
    }
  }, [])

  const toggleTheme = useCallback(
    () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
    [resolvedTheme, setTheme],
  )

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}

export default ThemeProvider
