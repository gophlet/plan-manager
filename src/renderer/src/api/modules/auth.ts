import { useAuthStore } from '@renderer/store/auth'
import client from '../client'
import { AuthEndpoint } from '../endpoints'
import { isMockEnabled } from '../mocks'
import { HttpMethod } from '@renderer/constants'

export interface LoginRequest {
  account: string
  password: string
}

export interface LoginResponse {
  token: string
}

export const login = async (payload: LoginRequest): Promise<LoginResponse | null> => {
  if (isMockEnabled) {
    const token = 'mock-token-1234567890'
    return new Promise((resolve) => {
      setTimeout(async () => {
        await useAuthStore.getState().setToken(token)
        resolve({ token })
      }, 2000)
    })
  }

  const res = await client.request<LoginResponse>({
    method: HttpMethod.POST,
    url: AuthEndpoint.LOGIN,
    data: payload
  })

  await useAuthStore.getState().setToken(res.data?.token)
  return res.data
}
