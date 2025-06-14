import * as React from 'react'
import { cn } from '@renderer/lib/utils'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconButton: React.FC<IconButtonProps> = ({ className, ...props }) => (
  <button
    type="button"
    tabIndex={-1}
    className={cn(
      'p-1 rounded transition text-inherit',
      'hover:bg-gray-200 active:bg-gray-300 focus:outline-none',
      className
    )}
    {...props}
  />
)
