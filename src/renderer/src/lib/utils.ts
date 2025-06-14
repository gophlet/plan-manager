import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const genId = (prefix = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

export const copyToClipboard = (text: string): void => {
  if (window.clipboard && typeof window.clipboard.writeText === 'function') {
    window.clipboard.writeText(text)
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  }
}
