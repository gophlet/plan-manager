import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    clipboard: {
      writeText: (text: string) => void
      readText: () => string
    }
  }
}
