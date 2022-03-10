import { Service } from 'typedi'
import { Commands } from '../commands'

@Service()
export class CommandController {
  constructor() {}

  public async getCommandList() {
    const outArr = []
    for (const prop in Commands) {
      const cmd = Commands[prop]
      outArr.push({
        command: cmd.command,
        name: cmd.name,
        description: cmd.description,
      })
    }

    return outArr
  }

  public async executeCommand(data: string) {
    const splt = data.split(' ')
    const cmd = splt[0]

    if (!cmd || cmd.trim() === '')
      throw new Error('Empty command')

    const cmdObj = Commands[cmd.toLowerCase()]
    if (!cmdObj)
      throw new Error('Command not found')

    return await cmdObj.execute(splt.slice(1, splt.length))
  }
}
