import { useAuthStore } from '@renderer/store/authStore'
import client from '../client'
import { AuthEndpoints } from '../endpoints'

export interface LoginRequest {
  account: string
  password: string
}

export interface LoginResponse {
  token: string
}

const isMock = import.meta.env.MODE === 'development'

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  if (isMock) {
    const token = 'mock-token-1234567890'
    return new Promise((resolve) => {
      setTimeout(async () => {
        await useAuthStore.getState().setToken(token)
        resolve({ token })
      }, 2000)
    })
  }

  const res = await client.post<LoginResponse>(AuthEndpoints.login, payload)
  await useAuthStore.getState().setToken(res.data.token)
  return res.data
}
