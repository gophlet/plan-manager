import * as React from 'react'
import AppIcon from '../components/kit/app-icon'

const SidebarHeader: React.FC = () => (
  <div className="flex items-center justify-center gap-3 select-none">
    <AppIcon size={32} className="shadow rounded-lg" />
    <span className="text-2xl font-bold tracking-tight text-gray-800">Plan Manager</span>
  </div>
)

export default SidebarHeader
