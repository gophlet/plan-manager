import * as React from 'react'
import { CheckCircle2, Info, XCircle, TriangleAlert } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { CloseButton } from '../close-button'

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  onClose?: () => void
  autoClose?: boolean
  autoCloseTime?: number // ms
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
}

const variantIconMap = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  destructive: XCircle
}

const variantStyleMap = {
  default: 'border-gray-300 bg-white text-gray-800',
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

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  onClose,
  autoClose = true,
  autoCloseTime = 3000,
  variant = 'default',
  className,
  ...props
}) => {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    setVisible(true)
    if (autoClose) {
      const timer = setTimeout(() => setVisible(false), autoCloseTime)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [autoClose, autoCloseTime])

  React.useEffect(() => {
    if (!visible && onClose) {
      const timer = setTimeout(onClose, 200)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [visible, onClose])

  const Icon = variantIconMap[variant] || Info

  return (
    <div
      className={cn(
        'relative flex items-start gap-2 rounded-md border p-4 shadow-lg transition-all duration-200',
        'min-w-[320px] max-w-xs',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none',
        variantStyleMap[variant],
        className
      )}
      {...props}
    >
      <Icon
        className={cn(
          'w-5 h-5 mt-0.5 flex-shrink-0',
          variantColorMap[variant] || variantColorMap.default
        )}
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold mb-1 truncate">{title}</div>
        {description && <div className="text-sm text-gray-600 break-words">{description}</div>}
      </div>
      {onClose && <CloseButton onClick={() => setVisible(false)} className="ml-2 mt-0.5" />}
    </div>
  )
}
