import { contextBridge, clipboard, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { exposeConf } from 'electron-conf/preload'
import { HttpRequestConfig, HttpResponse } from '../shared/http-types'
import { HTTP_CHANNEL, PLATFORM_CHANNEL } from '../shared/ipc-channels'

const ExposedAPI = {
  ELECTRON: 'electron',
  CLIPBOARD: 'clipboard',
  HTTP_CLIENT: 'httpClient',
  PLATFORM: 'platform'
} as const

const clipboardAPI = {
  writeText: (text: string) => clipboard.writeText(text),
  readText: () => clipboard.readText()
}

const httpClientAPI = {
  request: (config: HttpRequestConfig): Promise<HttpResponse> =>
    ipcRenderer.invoke(HTTP_CHANNEL.REQUEST, config)
}

const platformAPI = {
  isWindows: (): Promise<boolean> => ipcRenderer.invoke(PLATFORM_CHANNEL.IS_WINDOWS)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld(ExposedAPI.ELECTRON, electronAPI)
    contextBridge.exposeInMainWorld(ExposedAPI.CLIPBOARD, clipboardAPI)
    contextBridge.exposeInMainWorld(ExposedAPI.HTTP_CLIENT, httpClientAPI)
    contextBridge.exposeInMainWorld(ExposedAPI.PLATFORM, platformAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window[ExposedAPI.ELECTRON] = electronAPI
  // @ts-ignore (define in dts)
  window[ExposedAPI.CLIPBOARD] = clipboardAPI
  // @ts-ignore (define in dts)
  window[ExposedAPI.HTTP_CLIENT] = httpClientAPI
  // @ts-ignore (define in dts)
  window[ExposedAPI.IS_WINDOWS] = platformAPI
}

exposeConf()
