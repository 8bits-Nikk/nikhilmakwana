import type { ButtonHTMLAttributes, Ref } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { mergeClasses } from '@/lib/utils'

const iconButtonVariants = cva(
  'relative inline-flex items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'size-8 [&_svg]:size-4',
        md: 'size-10 [&_svg]:size-5',
        lg: 'size-12 [&_svg]:size-6',
      },
      variant: {
        plain: '',
        outlined: 'border border-line bg-surface hover:border-brand/50',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'plain',
    },
  },
)

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants> & {
    ref?: Ref<HTMLButtonElement>
  }

const IconButton = ({
  className,
  size,
  variant,
  children,
  ...props
}: IconButtonProps) => (
  <button
    type="button"
    className={mergeClasses(iconButtonVariants({ size, variant }), className)}
    {...props}
  >
    {children}
  </button>
)

export default IconButton
