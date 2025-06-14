import * as React from 'react'
import { cn } from '@renderer/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  radius?: number | string
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  radius = 4,
  style,
  ...props
}) => {
  return (
    <div
      className={cn('animate-pulse bg-gray-200', className)}
      style={{
        width,
        height,
        borderRadius: radius,
        ...style
      }}
      {...props}
    />
  )
}
