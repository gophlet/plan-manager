import { contextBridge, clipboard } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { exposeConf } from 'electron-conf/preload'

const ExposedAPI = {
  ELECTRON: 'electron',
  CLIPBOARD: 'clipboard'
} as const

const clipboardApi = {
  writeText: (text: string) => clipboard.writeText(text),
  readText: () => clipboard.readText()
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld(ExposedAPI.ELECTRON, electronAPI)
    contextBridge.exposeInMainWorld(ExposedAPI.CLIPBOARD, clipboardApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window[ExposedAPI.ELECTRON] = electronAPI
  // @ts-ignore (define in dts)
  window[ExposedAPI.CLIPBOARD] = clipboardApi
}

exposeConf()
