import { useEffect } from 'react'

/**
 * Scrolls to `location.hash` once after mount.
 *
 * The Next.js version of this site shipped its markup in the HTML, so the
 * browser could resolve `nikhilmakwana.in/#work` itself. In a client-rendered
 * app the target does not exist yet when the browser looks for it, so deep
 * links have to be honoured manually.
 */
export default function useHashScroll() {
  useEffect(() => {
    const { hash } = window.location
    if (!hash || hash.length < 2) return

    let id: string
    try {
      id = decodeURIComponent(hash.slice(1))
    } catch {
      return
    }

    // Wait a frame so layout (fonts, images) has settled before measuring.
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    })

    return () => cancelAnimationFrame(frame)
  }, [])
}
