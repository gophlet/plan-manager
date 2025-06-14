import * as React from 'react'
import { cn } from '@renderer/lib/utils'

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
}

export interface DropdownContextType {
  close: () => void
}

const DropdownContext = React.createContext<DropdownContextType | null>(null)

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'left',
  className
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent): void => {
      if (
        !triggerRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen])

  const handleTriggerClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const closeDropdown = React.useCallback((): void => {
    setIsOpen(false)
  }, [])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      <div ref={triggerRef} onClick={handleTriggerClick} tabIndex={0}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            'py-1 bg-white text-gray-900 shadow-lg rounded-md absolute z-50 min-w-[120px]',
            className
          )}
          style={{
            top: '100%',
            [align]: 0,
            marginTop: 4
          }}
        >
          <DropdownContext.Provider value={{ close: closeDropdown }}>
            <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </DropdownContext.Provider>
        </div>
      )}
    </div>
  )
}

export const DropdownItem: React.FC<{
  onClick?: () => void
  children: React.ReactNode
  className?: string
}> = ({ onClick, children, className }) => {
  const dropdownContext = React.useContext(DropdownContext)

  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    onClick?.()
    dropdownContext?.close()
  }

  return (
    <button
      className={cn(
        'w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors',
        className
      )}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  )
}
