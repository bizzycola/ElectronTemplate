interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>
  quit: () => void
  maximize: () => void
  minimize: () => void
  openBrowserLink: (link: string) => void
  // getProcesses: () => Promise<any>;
  get: (request: any) => Promise<any>
  evnt: (name: string, callback: any) => void
}

declare interface Window {
  electron: Readonly<ElectronApi>
  electronRequire?: NodeRequire
  quit: () => void
}
