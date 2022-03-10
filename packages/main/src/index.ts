import 'reflect-metadata'
import type { BrowserWindow } from 'electron'
import { app, ipcMain, shell } from 'electron'
import './security-restrictions'
import { restoreOrCreateWindow } from '/@/mainWindow'
import { Container } from 'typedi'
import { autoUpdater } from 'electron-updater'
import log = require('electron-log')
import type { ControllerRequest } from '../../../types/controllerRequest'
import { CommandController } from './controllers'

// Setup Controllers
type IDictionary<TValue> = Record<string, TValue>

const controllers: IDictionary<any> = {
  commands: Container.get(CommandController),
}

let mainWindowObj: BrowserWindow | null = null
export const MainWindow = () => {
  return mainWindowObj
}

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}
app.on('second-instance', restoreOrCreateWindow)

/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration()

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit()
})

/**
 * @see https://www.electronjs.org/docs/v14-x-y/api/app#event-activate-macos Event: 'activate'
 */
app.on('activate', restoreOrCreateWindow)

/**
 * Install Vue.js or some other devtools in development mode only
 */
if (import.meta.env.DEV) {
  app.whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, VUEJS3_DEVTOOLS }) => installExtension(VUEJS3_DEVTOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    }))
    .catch(e => console.error('Failed install extension:', e))
}

/**
 * Check new app version in production mode only
 */
if (import.meta.env.PROD) {
  app.whenReady()
    .then(() => {
      log.transports.file.level = 'debug'
      autoUpdater.logger = log
      autoUpdater.autoDownload = false
      autoUpdater.checkForUpdates()
    })
    .catch(e => console.error('Failed check updates:', e))
}

ipcMain.on('appExit', () => {
  app.quit()
})

ipcMain.on('openBrowserLink', (e, link: string) => {
  shell.openExternal(link)
})

ipcMain.handle('controller', (e, request: ControllerRequest) => {
  return new Promise((resolve, reject) => {
    const c = controllers[request.controller]
    const method = c[request.method]

    try {
      if (!c) throw new Error('Controller not found')
      if (!method) throw new Error('Method not found')

      const call = method(...request.data)
      if (call instanceof Promise)
        call.then((data) => { resolve(data) }).catch((err) => { reject(err) })
      else
        return call
    }
    catch (err) {
      reject(err)
    }
  })
})

function init() {
  app.whenReady()
    .then(async() => {
      const window = await restoreOrCreateWindow()
      mainWindowObj = window
    })
    .catch(e => console.error('Failed create window:', e))
}
init()

// --config.asar=false

// Update Events
/* autoUpdater.on('checking-for-update', () => {

}) */

autoUpdater.on('update-available', (info) => {
  const window = MainWindow()
  if (!window) return

  window.webContents.send('appUpdateAvailable', info)
})

/* autoUpdater.on('update-not-available', (info) => {

}) */

autoUpdater.on('error', (err) => {
  const window = MainWindow()
  if (!window) return

  window.webContents.send('appUpdateError', err)
})

autoUpdater.on('download-progress', (progressObj) => {
  const window = MainWindow()
  if (!window) return

  window.webContents.send('appUpdateProgress', progressObj)
})

autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall()
})

ipcMain.handle('performUpdate', () => {
  if (import.meta.env.PROD)
    autoUpdater.downloadUpdate()
})

ipcMain.handle('checkUpdates', () => {
  if (import.meta.env.PROD)
    autoUpdater.checkForUpdates()
})
