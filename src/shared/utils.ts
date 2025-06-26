export const isString = (value: unknown): value is string => typeof value === 'string'

export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown =>
  typeof value === 'function'

export const getEnvBoolean = (value: string): boolean =>
  isString(value) && value.toLowerCase() === 'true'
