import { AxiosRequestConfig } from 'axios'

export interface HttpRequestConfig extends AxiosRequestConfig {}

export interface HttpResponse<T = unknown> {
  data: T | null
  status: number | null
  headers: Record<string, unknown> | null
  error: boolean
  message: string | null
}
