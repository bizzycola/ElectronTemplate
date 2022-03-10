import { ExitCmd } from './misc'

export interface Command {
  command: string
  name: string
  description: string
  execute: (args: string[]) => Promise<string>
}

type IDictionary<TValue> = Record<string, TValue>

export const Commands: IDictionary<Command> = {
  exit: ExitCmd,
}
