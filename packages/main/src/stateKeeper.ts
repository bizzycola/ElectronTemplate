import { screen } from 'electron'
import * as settings from 'electron-settings'

export const windowStateKeeper = async(windowName) => {
  let window, windowState

  const setBounds = async() => {
    // Restore from appConfig
    if (await settings.has(`windowState.${windowName}`)) {
      windowState = await settings.get(`windowState.${windowName}`)
      return
    }

    const size = screen.getPrimaryDisplay().workAreaSize

    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: size.width / 2,
      height: size.height / 2,
    }
  }

  const states: any[] = []
  setInterval(async() => {
    if (states.length < 1) return
    await settings.set(`windowState.${windowName}`, states.pop())
  }, 500)

  const saveState = async() => {
    // bug: lots of save state events are called. they should be debounced
    if (!windowState.isMaximized)
      windowState = window.getBounds()

    windowState.isMaximized = window.isMaximized()
    states.push(windowState)
  }

  const track = async(win) => {
    window = win;
    ['resize', 'move', 'close'].forEach((event) => {
      win.on(event, saveState)
    })
  }

  await setBounds()

  return {
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  }
}
