import * as React from 'react'
import { cn } from '../lib/utils'
import { MoreOption } from './kit/more-option'
import { Dropdown, DropdownItem } from './kit/dropdown'

export interface SidebarItem {
  key: string
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
  onSelect?: (key: string) => void
  children?: React.ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ groups, header, onSelect, children }) => {
  const [openDropdownKey, setOpenDropdownKey] = React.useState<string | null>(null)

  const handleMenuItemClick = (_itemKey: string, onClick: () => void): void => {
    onClick()
    setOpenDropdownKey(null)
  }

  return (
    <aside className="w-56 bg-white border-r border-gray-300 h-full flex flex-col pt-6 gap-6">
      {header}
      <nav className="flex-1 flex flex-col gap-4 px-4 pb-6 overflow-scroll">
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
                    key={item.key}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md cursor-pointer transition group',
                      item.active ? 'bg-gray-100' : 'hover:bg-gray-50 '
                    )}
                    onClick={(e) => {
                      if (
                        e.target === e.currentTarget ||
                        (e.target as HTMLElement).closest('.menu-trigger') === null
                      ) {
                        onSelect?.(item.key)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {item.icon}
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.menu && item.menu.length > 0 && (
                      <Dropdown
                        trigger={
                          <div className="menu-trigger">
                            <MoreOption
                              className={cn(
                                'ml-auto transition-opacity opacity-0 group-hover:opacity-100',
                                openDropdownKey === item.key && 'opacity-100'
                              )}
                            />
                          </div>
                        }
                        align="right"
                      >
                        {item.menu.map((menuItem) => (
                          <DropdownItem
                            key={menuItem.label}
                            onClick={() => handleMenuItemClick(item.key, menuItem.onClick)}
                          >
                            {menuItem.label}
                          </DropdownItem>
                        ))}
                      </Dropdown>
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
