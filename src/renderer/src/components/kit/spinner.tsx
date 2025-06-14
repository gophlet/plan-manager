import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  color?: string
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 24, color, className, ...props }) => (
  <div className={cn('flex items-center justify-center', className)} {...props}>
    <Loader2 className="animate-spin" size={size} color={color} />
  </div>
)
