import { useEffect, useRef, useState } from 'react'

type Options = {
  /** Stop observing after the first reveal. Defaults to true. */
  once?: boolean
  rootMargin?: string
  threshold?: number
}

/**
 * Tracks whether an element has entered the viewport. Powers the scroll-reveal
 * animations without pulling in an animation library.
 */
export default function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.15,
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Without IntersectionObserver (or with motion turned down) show everything.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
