import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { installExtension, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { Conf } from 'electron-conf/main'
import icon from '../../resources/icon.png?asset'
import { handleHttpRequest } from './http-request'
import { HttpRequestConfig, HttpResponse } from '../shared/http-types'
import { HTTP_CHANNEL, PLATFORM_CHANNEL } from '../shared/ipc-channels'
import { isWindows } from '../shared/utils'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 768,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  /* TODO (Unknown Cause): Failed to load the React DevTools extension on first launch. */
  if (is.dev) {
    installExtension(REACT_DEVELOPER_TOOLS, { loadExtensionOptions: { allowFileAccess: true } })
      .then((ext) => console.log(`Added Extension:  ${ext.name}`))
      .catch((err) => console.log('An error occurred: ', err))
  }

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.plan-manager')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC Listener
  ipcMain.handle(
    HTTP_CHANNEL.REQUEST,
    <T>(_event, config: HttpRequestConfig): Promise<HttpResponse<T>> => handleHttpRequest(config)
  )
  ipcMain.handle(PLATFORM_CHANNEL.IS_WINDOWS, isWindows)

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const conf = new Conf()
conf.registerRendererListener()
