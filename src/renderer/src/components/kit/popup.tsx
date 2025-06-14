import * as React from 'react'
import { cn } from '../../lib/utils'
import { CloseButton } from './close-button'

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  closeOnBackdropClick?: boolean
}

export const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  closeOnBackdropClick = false,
  className,
  children,
  ...props
}) => {
  const [show, setShow] = React.useState(open)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setShow(true)
      requestAnimationFrame(() => setActive(true))
    } else {
      setActive(false)
      setTimeout(() => setShow(false), 200)
    }
  }, [open])

  if (!show && !open) return null
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center transition-all duration-200',
        active ? 'bg-black/40 opacity-100' : 'bg-black/0 opacity-0',
        !show && 'pointer-events-none'
      )}
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div
        className={cn(
          'bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative transition-all duration-200 transform',
          active ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <CloseButton className="absolute top-3 right-3" onClick={onClose} />
        {children}
      </div>
    </div>
  )
}
