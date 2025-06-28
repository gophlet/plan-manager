export const AUTH_TOKEN_KEY = 'auth_token'

export const REQUEST_TIMEOUT = 10 * 1000

export const DEFAULT_ERROR_DESCRIPTION = '请与管理员联系'

export const RouteName = {
  DASHBOARD: '/dashboard',
  WALLET: '/wallet',
  LOGIN: '/login'
} as const

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const
