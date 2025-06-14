import * as React from 'react'
import { cn, genId } from '../../lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode
  labelClassName?: string
  wrapperClassName?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, labelClassName, wrapperClassName, id, ...props }, ref) => {
    const textareaId = id || (label ? genId('textarea') : undefined)
    return label ? (
      <div className={cn('flex flex-col gap-2', wrapperClassName)}>
        <label
          htmlFor={textareaId}
          className={cn('text-sm font-medium text-gray-700', labelClassName)}
        >
          {label}
        </label>
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition resize-none',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    ) : (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition resize-none',
          className
        )}
        ref={ref}
        id={textareaId}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
