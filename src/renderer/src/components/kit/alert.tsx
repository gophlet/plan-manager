import * as React from 'react'
import { CheckCircle2, Info, XCircle, TriangleAlert } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
  title?: string
}

const variantIconMap = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  destructive: XCircle
}

const variantStyleMap = {
  default: 'border-gray-300 bg-gray-50 text-gray-800',
  info: 'border-blue-600 bg-blue-50 text-blue-700',
  success: 'border-green-500 bg-green-50 text-green-700',
  warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
  destructive: 'border-red-500 bg-red-50 text-red-700'
}

const variantColorMap = {
  default: 'text-gray-400',
  info: 'text-blue-600',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  destructive: 'text-red-500'
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, children, ...props }, ref) => {
    const Icon = variantIconMap[variant] || Info
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-md border p-4 flex items-center gap-2 text-sm',
          variantStyleMap[variant],
          className
        )}
        {...props}
      >
        <Icon
          className={cn(
            'w-5 h-5 flex-shrink-0',
            variantColorMap[variant] || variantColorMap.default
          )}
        />
        <div className="flex-1 min-w-0">
          {title && <div className="font-semibold mb-1">{title}</div>}
          {children}
        </div>
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert }
