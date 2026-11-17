import type { ButtonHTMLAttributes, Ref } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { mergeClasses } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // The gray scale is inverted in dark mode, so this pair stays high
        // contrast in both themes.
        primary:
          'bg-gray-900 text-gray-50 shadow-sm hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md active:translate-y-0',
        accent:
          'bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/30 active:translate-y-0',
        outline:
          'border border-line bg-surface text-gray-700 hover:-translate-y-0.5 hover:border-brand/50 hover:text-gray-900 active:translate-y-0',
        ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    ref?: Ref<HTMLButtonElement>
  }

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={mergeClasses(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export default Button
