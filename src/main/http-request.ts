import axios from 'axios'
import { HttpRequestConfig, HttpResponse } from '../shared/http-types'

export async function handleHttpRequest<T = unknown>(
  config: HttpRequestConfig
): Promise<HttpResponse<T>> {
  try {
    const response = await axios.request(config)
    return {
      error: false,
      message: null,
      data: response.data,
      status: response.status,
      headers: response.headers
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.message,
        data: error.response?.data ?? null,
        status: error.response?.status ?? null,
        headers: error.response?.headers ?? null
      }
    } else {
      return {
        error: true,
        message: 'An unexpected error occurred',
        data: null,
        status: null,
        headers: null
      }
    }
  }
}
