import type { ReactNode } from 'react'

import { mergeClasses } from '@/lib/utils'

/** Shared styling for the inputs and the textarea inside a FormField. */
export const controlClasses =
  'w-full rounded-xl border border-line bg-canvas px-4 py-2.5 text-base text-gray-900 transition-colors duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60'

export const controlErrorClasses = 'border-red-500 focus:border-red-500 focus:ring-red-500/20'

type FormFieldProps = {
  label: string
  /** Must match the control's `id`. */
  htmlFor: string
  children: ReactNode
  error?: string
  required?: boolean
  className?: string
}

/** Label + control + error message, wired together for screen readers. */
const FormField = ({
  label,
  htmlFor,
  children,
  error,
  required = false,
  className,
}: FormFieldProps) => (
  <div className={mergeClasses('flex flex-col gap-1.5', className)}>
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-gray-900"
    >
      {label}
      {required && (
        <span className="ml-0.5 text-red-500" aria-hidden>
          *
        </span>
      )}
    </label>

    {children}

    {error && (
      <p
        id={`${htmlFor}-error`}
        role="alert"
        className="text-sm text-red-600 dark:text-red-400"
      >
        {error}
      </p>
    )}
  </div>
)

export default FormField
