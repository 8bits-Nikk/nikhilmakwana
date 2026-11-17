import type { HTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { mergeClasses } from '@/lib/utils'

const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        neutral: 'border border-line bg-muted text-gray-600',
        brand: 'border border-brand/25 bg-brand-soft text-brand',
        solid: 'bg-gray-900 text-gray-50',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3.5 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  },
)

type TagProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tagVariants> & {
    label?: ReactNode
  }

const Tag = ({ label, className, variant, size, children, ...props }: TagProps) => (
  <span
    className={mergeClasses(tagVariants({ variant, size }), className)}
    {...props}
  >
    {label ?? children}
  </span>
)

export default Tag
