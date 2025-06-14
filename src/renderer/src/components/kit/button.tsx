import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning' | 'info'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:shadow-lg disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2',
          variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
          variant === 'outline' &&
            'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 active:bg-blue-100',
          variant === 'ghost' && 'bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100',
          variant === 'destructive' && 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
          variant === 'success' && 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
          variant === 'warning' &&
            'bg-yellow-400 text-white hover:bg-yellow-500 active:bg-yellow-600',
          variant === 'info' && 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
