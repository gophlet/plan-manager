import * as React from 'react'
import { cn } from '../lib/utils'
import { SimpleDropdown } from './kit/simple-dropdown'
import { MoreOption } from './kit/more-option'

export interface SidebarItem {
  icon: React.ReactNode
  label: string
  active?: boolean
  menu?: { label: string; onClick: () => void }[]
  route?: string
  walletId?: string
  walletAddress?: string
}

export interface SidebarGroup {
  title?: string
  items: SidebarItem[]
  headerRight?: React.ReactNode
  skeleton?: React.ReactNode
}

export interface SidebarProps {
  groups?: SidebarGroup[]
  header?: React.ReactNode
  onSelect?: (label: string) => void
  children?: React.ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ groups, header, onSelect, children }) => {
  const [openDropdownLabel, setOpenDropdownLabel] = React.useState<string | null>(null)
  return (
    <aside className="w-56 bg-white border-r border-gray-300 h-full flex flex-col pt-6 gap-6">
      {header}
      <nav className="flex-1 flex flex-col gap-4 px-4 overflow-scroll">
        {groups?.map((group, idx) => (
          <div key={group.title || idx} className="flex flex-col gap-2">
            {group.title && (
              <div className="flex items-center justify-between text-xs text-gray-400 font-semibold mb-1 px-2 select-none sticky top-0 z-10 bg-white">
                <span>{group.title}</span>
                {group.headerRight && <span>{group.headerRight}</span>}
              </div>
            )}
            {group.skeleton
              ? group.skeleton
              : group.items.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md cursor-pointer transition group',
                      item.active ? 'bg-gray-100' : 'hover:bg-gray-50 '
                    )}
                    onClick={() => onSelect?.(item.label)}
                    role="button"
                    tabIndex={0}
                  >
                    {item.icon}
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.menu && item.menu.length > 0 && (
                      <SimpleDropdown
                        trigger={
                          <MoreOption
                            className={cn(
                              'ml-auto transition-opacity opacity-0 group-hover:opacity-100',
                              openDropdownLabel === item.label && 'opacity-100'
                            )}
                          />
                        }
                        options={item.menu}
                        align="right"
                        onOpenChange={(open) => setOpenDropdownLabel(open ? item.label : null)}
                      />
                    )}
                  </div>
                ))}
          </div>
        ))}
        {children}
      </nav>
    </aside>
  )
}

export default Sidebar
