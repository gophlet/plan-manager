import * as React from 'react'
import { cn, genId } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  labelClassName?: string
  wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, labelClassName, wrapperClassName, id, ...props }, ref) => {
    const inputId = id || (label ? genId('input') : undefined)
    return label ? (
      <div className={cn('flex flex-col gap-2', wrapperClassName)}>
        <label
          htmlFor={inputId}
          className={cn('text-sm font-medium text-gray-700', labelClassName)}
        >
          {label}
        </label>
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    ) : (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition',
          className
        )}
        ref={ref}
        id={inputId}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
