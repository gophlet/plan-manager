import * as React from 'react'
import { cn } from '@renderer/lib/utils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer select-none', className)}>
      <input
        type="checkbox"
        ref={ref}
        className="w-4 h-4 accent-primary-500 border-gray-300 rounded focus:ring-2 focus:ring-primary-200 transition"
        {...props}
      />
      {label && <span className="text-sm text-gray-900">{label}</span>}
    </label>
  )
)
Checkbox.displayName = 'Checkbox'
