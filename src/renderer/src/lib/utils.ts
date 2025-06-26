import { clsx, type ClassValue } from 'clsx'
import { isFunction } from '../../../shared/utils'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const genId = (prefix = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

export const copyToClipboard = (text: string): void => {
  if (window.clipboard && isFunction(window.clipboard.writeText)) {
    window.clipboard.writeText(text)
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  }
}

/**
 * Returns true with the given percentage chance.
 * @param percent [0, 100)
 */
export function randomByPercent(percent: number): boolean {
  return Math.random() * 100 < percent
}
