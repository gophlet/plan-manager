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
export const randomByPercent = (percent: number): boolean => {
  return Math.random() * 100 < percent
}

/**
 * Format a number as a currency string.
 * @param amount The numeric amount to format.
 * @param currency The currency symbol to prepend (default: '').
 * @param fractionDigits Number of decimal places (default: 2).
 * @param fallbackText Text to display if amount is invalid (default: '-')
 * @returns Formatted string, e.g. '$1,234.56'
 */
export const formatCurrency = (
  amount: number,
  currency = '',
  fractionDigits = 2,
  fallbackText = '-'
): string => {
  if (amount == null || isNaN(amount)) return fallbackText
  return `${currency}${amount.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  })}`
}

/**
 * Truncate a number to K/M/B units (e.g. 1.23K, 4.56M, 7.89B)
 * @param amount The numeric amount to truncate
 * @param fractionDigits Number of decimal places (default: 2)
 * @param fallbackText Text to display if amount is invalid (default: '-')
 * @returns Truncated string, e.g. '1.23K', '4.56M', '7.89B'
 */
export const truncateAmount = (amount: number, fractionDigits = 2, fallbackText = '-'): string => {
  if (amount == null || isNaN(amount)) return fallbackText
  const abs = Math.abs(amount)
  if (abs >= 1e9) return (amount / 1e9).toFixed(fractionDigits) + 'B'
  if (abs >= 1e6) return (amount / 1e6).toFixed(fractionDigits) + 'M'
  if (abs >= 1e3) return (amount / 1e3).toFixed(fractionDigits) + 'K'
  return amount.toFixed(fractionDigits)
}

/**
 * Display raw backend value with fallback if invalid.
 * @param value The value to display (string | number)
 * @param fallbackText Text to display if value is null, undefined, or empty (default: '-')
 * @returns The value as string, or fallbackText if invalid
 */
export const formatRaw = (
  value: string | number | null | undefined,
  fallbackText = '-'
): string => {
  if (value === null || value === undefined) return fallbackText
  if (typeof value === 'string' && value.trim() === '') return fallbackText
  if (typeof value === 'number' && isNaN(value)) return fallbackText
  return String(value)
}
