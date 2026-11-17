import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently under the top third of the viewport,
 * used to highlight the matching nav link. Falls back to the last section once
 * the page is scrolled to the bottom, so short trailing sections still light up.
 */
export default function useActiveSection(sectionIds: string[]) {
  // Empty until a section actually reaches the band, so nothing is highlighted
  // while the hero is still in view.
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }

        // Keep document order rather than intersection order.
        const first = sectionIds.find((id) => visible.has(id))
        if (first) setActiveId(first)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))

    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (atBottom) setActiveId(sectionIds[sectionIds.length - 1])
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [sectionIds])

  return activeId
}
