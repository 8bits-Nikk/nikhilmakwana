import type { HTMLAttributes, Ref } from 'react'

import { mergeClasses } from '@/lib/utils'

type ContainerProps = HTMLAttributes<HTMLElement> & {
  /** `muted` tints the section so alternating sections separate visually. */
  tone?: 'canvas' | 'muted'
  ref?: Ref<HTMLElement>
}

const Container = ({
  className,
  children,
  tone = 'canvas',
  ...props
}: ContainerProps) => (
  <section
    className={mergeClasses(
      'relative w-full py-20 md:py-24 2xl:py-28',
      tone === 'muted' ? 'bg-muted' : 'bg-canvas',
      className,
    )}
    {...props}
  >
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 md:gap-16 md:px-8">
      {children}
    </div>
  </section>
)

export default Container
