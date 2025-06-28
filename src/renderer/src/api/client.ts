import { useAuthStore } from '@renderer/store/auth'
import { getNotify } from '@renderer/components/kit/toast/toast-context'
import { REQUEST_TIMEOUT } from '@renderer/constants'
import { HttpRequestConfig, HttpResponse } from 'src/shared/http-types'
import { isMockEnabled } from './mocks'

const client = {
  async request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    const token = useAuthStore.getState().token

    const res = await window.httpClient.request<T>({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: REQUEST_TIMEOUT,
      baseURL: isMockEnabled
        ? import.meta.env.VITE_MOCK_BASE_URL
        : import.meta.env.VITE_API_BASE_URL,
      ...config
    })

    if (res.error) {
      if (res.status === 401) {
        await useAuthStore.getState().clearToken()
        const notify = getNotify()
        if (notify) {
          notify({
            title: '身份失效',
            description: '请重新登录',
            variant: 'destructive'
          })
        }
      }
      throw new Error(res.message || 'Request failed')
    }
    return res
  }
}

export default client
