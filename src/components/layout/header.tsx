import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import DownloadCV from '@/components/general/download-cv'
import IconButton from '@/components/general/icon-button'
import ThemeSwitcher from '@/components/general/theme-switcher'
import Typography from '@/components/general/typography'
import ScrollProgress from '@/components/layout/scroll-progress'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/navigation/drawer'
import useActiveSection from '@/hooks/use-active-section'
import useScroll from '@/hooks/use-scroll'
import useWindowSize from '@/hooks/use-window-size'
import { track, trackAttrs } from '@/lib/analytics'
import { NAV_LINKS } from '@/lib/data'
import { mergeClasses } from '@/lib/utils'

// Module scope keeps the array identity stable across renders.
const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1))

// Sections already reported this page load, so scrolling back and forth
// records how far visitors get rather than how much they scroll.
const viewedSections = new Set<string>()

const Logo = () => (
  <a
    href="#hero"
    aria-label="Back to the top of the page"
    className="rounded-lg transition-opacity hover:opacity-80"
  >
    <Typography variant="h4" component="span" className="font-bold">
      <span className="text-gray-400">&lt;</span>
      NM
      <span className="text-gray-400"> /&gt;</span>
    </Typography>
  </a>
)

const Header = () => {
  const scrolled = useScroll(24)
  const [isOpen, setIsOpen] = useState(false)
  const { width } = useWindowSize()
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    if (!activeSection || viewedSections.has(activeSection)) return
    viewedSections.add(activeSection)
    track('section-view', { section: activeSection })
  }, [activeSection])

  // Close the drawer if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (width && width > 767 && isOpen) setIsOpen(false)
  }, [width, isOpen])

  return (
    <header
      className={mergeClasses(
        'sticky top-0 z-40 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-line bg-canvas/70 backdrop-blur-xl'
          : 'border-transparent bg-canvas',
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1)

            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                {...trackAttrs('nav-click', { section: link.href.slice(1), location: 'header' })}
                className={mergeClasses(
                  'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900',
                )}
              >
                {link.label}
                <span
                  className={mergeClasses(
                    'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-indigo-500 to-violet-500 transition-transform duration-300',
                    isActive ? 'scale-x-100' : 'scale-x-0',
                  )}
                  aria-hidden
                />
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeSwitcher />
          <div className="h-6 w-px bg-line" />
          <DownloadCV size="sm" location="header" />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeSwitcher />
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <IconButton aria-label="Open navigation menu">
                <Menu />
              </IconButton>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <Logo />
                <DrawerClose asChild>
                  <IconButton aria-label="Close navigation menu">
                    <X />
                  </IconButton>
                </DrawerClose>
              </div>

              <nav className="flex flex-col gap-1 p-3" aria-label="Sections">
                {NAV_LINKS.map((link) => (
                  <DrawerClose asChild key={link.href}>
                    <a
                      href={link.href}
                      {...trackAttrs('nav-click', { section: link.href.slice(1), location: 'mobile-menu' })}
                      className={mergeClasses(
                        'rounded-xl px-3 py-2.5 text-base font-medium transition-colors',
                        activeSection === link.href.slice(1)
                          ? 'bg-brand-soft text-brand'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                      )}
                    >
                      {link.label}
                    </a>
                  </DrawerClose>
                ))}
              </nav>

              <div className="mt-auto border-t border-line p-5">
                <DownloadCV className="w-full" size="lg" location="mobile-menu" />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <ScrollProgress />
    </header>
  )
}

export default Header
