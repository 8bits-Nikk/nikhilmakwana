import type { ElementType, HTMLAttributes, Ref } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { mergeClasses } from '@/lib/utils'

const typographyVariants = cva('text-gray-600', {
  variants: {
    variant: {
      display:
        'text-[2.5rem] leading-[1.1] font-bold tracking-[-0.035em] text-gray-900 sm:text-6xl lg:text-7xl',
      h1: 'text-4xl font-semibold tracking-[-0.03em] text-gray-900 md:text-5xl md:font-bold lg:text-6xl lg:leading-[1.1]',
      h2: 'text-3xl font-semibold tracking-[-0.025em] text-gray-900 md:text-4xl',
      h3: 'text-2xl font-semibold tracking-[-0.02em] text-gray-900 md:text-3xl',
      h4: 'text-lg font-semibold tracking-[-0.01em] text-gray-900 md:text-xl',
      subtitle: 'text-lg leading-relaxed md:text-xl',
      body1: 'text-base leading-relaxed md:text-lg',
      body2: 'text-base leading-relaxed',
      body3: 'text-sm leading-relaxed',
      overline:
        'text-xs font-semibold uppercase tracking-[0.18em] text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'body2',
  },
})

const elementMapping = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  subtitle: 'p',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  overline: 'p',
} as const

type TypographyProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    component?: ElementType
    ref?: Ref<HTMLElement>
  }

const Typography = ({
  component,
  className,
  variant,
  children,
  ...props
}: TypographyProps) => {
  const Component: ElementType =
    component ?? (variant ? elementMapping[variant] : 'p')

  return (
    <Component
      className={mergeClasses(typographyVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Typography
