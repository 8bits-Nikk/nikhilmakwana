import { createContext } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

/** Keep in sync with the anti-flash script in index.html. */
export const THEME_STORAGE_KEY = 'theme'

export type ThemeContextValue = {
  /** What the user picked — may be `system`. */
  theme: Theme
  /** What is actually painted right now. */
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
