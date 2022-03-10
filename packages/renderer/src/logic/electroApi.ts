import { useElectron } from '../use/electron'
import type { ControllerRequest } from '../../../../types/controllerRequest'

const { get } = useElectron()

const getRequest = (controller: string, method: string, ...args: any[]) => {
  const req: ControllerRequest = {
    controller,
    method,
    data: args,
  }
  return req
}

/* == Commands == */
export const getCommandList = async() => {
  const res = await get(getRequest('commands', 'getCommandList'))
  if (res) return res
  return null
}

export const executeCommand = async(data: string) => {
  const res = await get(getRequest('commands', 'executeCommand', data))
  if (res) return res
  return null
}
