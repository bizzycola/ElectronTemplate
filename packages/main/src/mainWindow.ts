import { join } from 'path'
import { URL } from 'url'
import { BrowserWindow, ipcMain } from 'electron'
import { windowStateKeeper } from './stateKeeper'

async function createWindow() {
  const mainWindowStateKeeper = await windowStateKeeper('main')

  const browserWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
    frame: false,
    icon: join(__dirname, '../../../buildResources/twichat.png'),
  })

  mainWindowStateKeeper.track(browserWindow)

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show()

    if (import.meta.env.DEV)
      browserWindow?.webContents.openDevTools()
  })

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl = import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../renderer/dist/index.html', `file://${__dirname}`).toString()

  await browserWindow.loadURL(pageUrl)

  setupIpcEvents(browserWindow)

  return browserWindow
}

function setupIpcEvents(mainWindow: BrowserWindow) {
  ipcMain.on('appMaximize', () => {
    if (mainWindow?.isMaximized())
      mainWindow.unmaximize()
    else
      mainWindow?.maximize()
  })

  ipcMain.on('appMinimize', () => {
    mainWindow?.minimize()
  })
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())

  if (window === undefined)
    window = await createWindow()

  if (window.isMinimized())
    window.restore()

  window.focus()
  return window
}
