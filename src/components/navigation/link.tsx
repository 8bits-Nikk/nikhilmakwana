import type { AnchorHTMLAttributes, Ref } from 'react'

import { mergeClasses } from '@/lib/utils'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Opens in a new tab with the matching `rel` guard. */
  externalLink?: boolean
  withUnderline?: boolean
  /** Skips the default link styling — for links that wrap their own visuals. */
  noCustomization?: boolean
  ref?: Ref<HTMLAnchorElement>
}

const Link = ({
  className,
  children,
  externalLink = false,
  withUnderline = false,
  noCustomization = false,
  ...props
}: LinkProps) => (
  <a
    {...props}
    target={externalLink ? '_blank' : undefined}
    rel={externalLink ? 'noreferrer' : undefined}
    className={mergeClasses(
      !noCustomization &&
        'rounded-sm text-base font-medium text-gray-600 transition-colors hover:text-gray-900',
      withUnderline &&
        'font-medium text-brand underline decoration-brand/40 decoration-2 underline-offset-4 transition-colors hover:decoration-brand',
      className,
    )}
  >
    {children}
  </a>
)

export default Link
