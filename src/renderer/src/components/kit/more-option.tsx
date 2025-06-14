import * as React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { cn } from '../../lib/utils'

export const MoreOption: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => (
  <button
    type="button"
    tabIndex={0}
    className={cn(
      'flex items-center justify-center w-8 h-8 rounded-md transition',
      'hover:bg-gray-200 active:bg-gray-300 focus:outline-none',
      className
    )}
    aria-label="More options"
    {...props}
  >
    <MoreHorizontal size={20} />
  </button>
)
