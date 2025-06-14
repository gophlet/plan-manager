import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: number
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  className,
  iconSize = 16,
  variant = 'default',
  children,
  ...props
}) => (
  <button
    type="button"
    className={cn(
      'text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-full p-1',
      variant === 'destructive' && 'text-red-400 hover:text-red-600 focus-visible:ring-red-500',
      variant === 'success' && 'text-green-400 hover:text-green-600 focus-visible:ring-green-500',
      variant === 'warning' &&
        'text-yellow-500 hover:text-yellow-700 focus-visible:ring-yellow-500',
      variant === 'info' && 'text-blue-400 hover:text-blue-600 focus-visible:ring-blue-500',
      className
    )}
    aria-label={props['aria-label'] || 'Close'}
    {...props}
  >
    {children || <X size={iconSize} />}
  </button>
)
CloseButton.displayName = 'CloseButton'
