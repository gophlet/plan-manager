import * as React from 'react'
import { cn } from '../../lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: string
  className?: string
}

export const Section: React.FC<SectionProps> = ({
  bgColor = 'bg-gray-50',
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn('rounded-lg p-4', bgColor, className)} {...rest}>
      {children}
    </div>
  )
}

export default Section
