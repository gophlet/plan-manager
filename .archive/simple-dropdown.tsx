import React, { useRef, useState, useEffect } from 'react'

interface SimpleDropdownProps {
  trigger: React.ReactNode
  options: { label: string; onClick: () => void }[]
  align?: 'left' | 'right'
  onOpenChange?: (open: boolean) => void
}

export const SimpleDropdown: React.FC<SimpleDropdownProps> = ({
  trigger,
  options,
  align = 'right',
  onOpenChange
}) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent): void {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    function handleEsc(e: KeyboardEvent): void {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [open])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        tabIndex={0}
      >
        {trigger}
      </div>
      {open && (
        <div
          ref={menuRef}
          className="py-1 bg-white text-gray-900 shadow-lg rounded-md absolute z-50 min-w-[120px]"
          style={{
            top: '100%',
            [align]: 0,
            marginTop: 4
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.label}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              onClick={() => {
                setOpen(false)
                opt.onClick()
              }}
              type="button"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
