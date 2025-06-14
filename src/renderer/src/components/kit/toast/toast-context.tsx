import * as React from 'react'
import { ToastProps } from './toast'

export interface ToastContextType {
  notify: (toast: Omit<ToastProps, 'onClose'>) => void
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

let notifySingleton: ToastContextType['notify'] | undefined

export function setNotify(fn: ToastContextType['notify']): void {
  notifySingleton = fn
}

export function getNotify(): ToastContextType['notify'] | undefined {
  return notifySingleton
}

export function useToast(): ToastContextType {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
