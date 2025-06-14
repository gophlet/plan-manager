import axios from 'axios'
import { useAuthStore } from '@renderer/store/authStore'
import { getNotify } from '@renderer/components/kit/toast/toast-context'
import { REQUEST_TIMEOUT } from '@renderer/constants'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const status = error.response?.status

    if (status === 401) {
      await useAuthStore.getState().clearToken()
      const notify = getNotify()
      if (notify) {
        notify({
          title: '身份失效',
          description: '请重新登录',
          variant: 'destructive'
        })
      }
      console.warn('Token expired or invalid, please re-login')
    }

    return Promise.reject(error)
  }
)

export default client
