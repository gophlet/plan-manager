import { create } from 'zustand'
import conf from '@renderer/conf'

interface AuthState {
  token: string | undefined
  init: () => Promise<void>
  setToken: (token: string | undefined) => Promise<void>
  clearToken: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => {
  const setToken = async (token: string | undefined): Promise<void> => {
    if (token) await conf.setToken(token)
    else await conf.clearToken()
    set({ token })
  }

  return {
    token: undefined,
    init: async () => setToken(await conf.getToken()),
    setToken,
    clearToken: () => setToken(undefined)
  }
})
