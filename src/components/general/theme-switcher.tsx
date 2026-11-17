import { MoonStar, Sun } from 'lucide-react'

import IconButton from '@/components/general/icon-button'
import useTheme from '@/hooks/use-theme'
import { track } from '@/lib/analytics'
import { mergeClasses } from '@/lib/utils'

type ThemeSwitcherProps = {
  className?: string
}

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <IconButton
      onClick={() => {
        track('theme-toggle', { to: isDark ? 'light' : 'dark' })
        toggleTheme()
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={mergeClasses('overflow-hidden', className)}
    >
      {/* Both icons stay mounted so the swap can be animated. */}
      <Sun
        className={mergeClasses(
          'absolute transition-all duration-300',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0',
        )}
      />
      <MoonStar
        className={mergeClasses(
          'absolute transition-all duration-300',
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100',
        )}
      />
    </IconButton>
  )
}

export default ThemeSwitcher
