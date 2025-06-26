import * as React from 'react'
import { Outlet } from 'react-router'

interface ErrorLayoutProps {
  children?: React.ReactNode
}

const ErrorLayout = ({ children }: ErrorLayoutProps): React.JSX.Element => (
  <div className="h-full flex flex-col items-center justify-center bg-gray-50">
    {children ?? <Outlet />}
  </div>
)

export default ErrorLayout
