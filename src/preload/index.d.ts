import { ElectronAPI } from '@electron-toolkit/preload'
import { HttpRequestConfig, HttpResponse } from '../shared/http-types'

declare global {
  interface Window {
    electron: ElectronAPI
    clipboard: {
      writeText: (text: string) => void
      readText: () => string
    }
    httpClient: {
      request: <T = unknown>(config: HttpRequestConfig) => Promise<HttpResponse<T>>
    }
    platform: {
      isWindows: () => Promise<boolean>
    }
  }
}
