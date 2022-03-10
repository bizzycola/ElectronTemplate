import { app } from 'electron'
import type { Command } from './index'

export const ExitCmd: Command = {
  command: 'exit',
  name: 'Exit launcher',
  description: 'Usage: exit',
  execute: async(args: string[]) => {
    app.exit()
    return 'Exiting.'
  },
}
