import { cn } from '@renderer/lib/utils'
import * as React from 'react'

export interface BadgeProps {
  count: number
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ count, className }) => {
  if (count <= 0) return null
  return (
    <span
      className={cn(
        'absolute top-0 right-0 min-w-[20px] h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-semibold shadow-[0_0_0_2px_#fff] z-20',
        className
      )}
    >
      {count}
    </span>
  )
}
