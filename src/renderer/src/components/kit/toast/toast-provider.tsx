import * as React from 'react'
import { Toast, ToastProps } from './toast'
import { ToastContext, setNotify } from './toast-context'

type ToastInstance = Omit<ToastProps, 'onClose'> & {
  toastId: number
  onClose: () => void
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastInstance[]>([])
  const idRef = React.useRef(0)

  const notify = React.useCallback((toast: Omit<ToastProps, 'onClose'>): void => {
    const toastId = ++idRef.current
    setToasts((prev) => [
      ...prev,
      {
        ...toast,
        toastId,
        onClose: () => setToasts((prev) => prev.filter((t) => t.toastId !== toastId))
      }
    ])
  }, [])

  React.useEffect(() => {
    setNotify(notify)
  }, [notify])

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 items-end">
        {toasts.map(({ toastId, ...toast }) => (
          <Toast key={toastId} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
