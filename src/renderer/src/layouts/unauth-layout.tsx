import * as React from 'react'
import { Outlet } from 'react-router'

const UnauthLayout = (): React.JSX.Element => (
  <div className="h-full flex flex-col items-center justify-center bg-gray-50">
    <Outlet />
  </div>
)

export default UnauthLayout
