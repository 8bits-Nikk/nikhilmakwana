import { useEffect, useState } from 'react'

/** Thin gradient bar under the header showing how far down the page you are. */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const { scrollHeight, clientHeight } = document.documentElement
      const scrollable = scrollHeight - clientHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="absolute inset-x-0 bottom-0 h-px" aria-hidden>
      <div
        className="h-full origin-left bg-linear-to-r from-indigo-500 to-violet-500 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  )
}

export default ScrollProgress
