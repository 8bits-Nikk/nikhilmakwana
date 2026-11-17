import type { ReactNode } from 'react'

import useInView from '@/hooks/use-in-view'
import { mergeClasses } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger in milliseconds, for lists of cards. */
  delay?: number
}

/** Fades and lifts its children into place the first time they scroll into view. */
const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={mergeClasses(
        'transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Reveal
