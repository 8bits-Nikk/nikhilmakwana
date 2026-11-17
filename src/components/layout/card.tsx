import type { HTMLAttributes, Ref } from 'react'

import { mergeClasses } from '@/lib/utils'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Adds a lift + border glow on hover. Use for interactive cards. */
  interactive?: boolean
  ref?: Ref<HTMLDivElement>
}

const Card = ({
  className,
  children,
  interactive = false,
  ...props
}: CardProps) => (
  <div
    className={mergeClasses(
      'rounded-2xl border border-line bg-surface shadow-card',
      interactive &&
        'transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-hover',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export default Card
