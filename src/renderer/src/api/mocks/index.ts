import { HttpStatus } from '@renderer/constants'
import { getEnvBoolean } from '../../../../shared/utils'

export const isMockEnabled = import.meta.env.DEV && getEnvBoolean(import.meta.env.VITE_MOCK_ENABLED)

export const MOCK_DELAY = 500

export const MockEndpoint = {
  UNAUTHORIZED: `/status/${HttpStatus.UNAUTHORIZED}`
} as const
