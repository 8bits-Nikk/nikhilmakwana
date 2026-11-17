import { ArrowUp } from 'lucide-react'

import useScroll from '@/hooks/use-scroll'
import { mergeClasses } from '@/lib/utils'

const BackToTop = () => {
  const visible = useScroll(600)

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={mergeClasses(
        'fixed right-5 bottom-5 z-30 inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-gray-600 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:text-brand md:right-8 md:bottom-8',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  )
}

export default BackToTop
