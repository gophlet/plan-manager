export const RouteName = {
  DASHBOARD: '/dashboard',
  WALLET: '/wallet',
  LOGIN: '/login'
} as const

export const AUTH_TOKEN_KEY = 'auth_token'

export const REQUEST_TIMEOUT = 10 * 1000

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const
