if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date;
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: [
    'packages/**/dist/**',
  ],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
  win: {
    target: "nsis",
    requestedExecutionLevel: "requireAdministrator",
    publish: {
      provider: "generic",
      url: "http://UPDATEURL",
      channel: "latest",
      publishAutoUpdate: true
    }
  },
  publish: [
    {
      provider: "generic",
      url: "http://UPDATEURL",
      channel: "latest",
      publishAutoUpdate: true
    }
  ],
  appId: "com.mycom.MyElectronApp",
  nsis: {
    artifactName: "${productName}-Setup-${version}.${ext}",
    oneClick: true,
    perMachine: false,
    installerIcon: "MyElectronApp.ico",
    uninstallerIcon: "MyElectronApp.ico",
    runAfterFinish: true,
    deleteAppDataOnUninstall: true,
    createStartMenuShortcut: true,
    shortcutName: "MyElectronApp",
    publish: [{
      provider: "generic",
      url: "http://UPDATEURL"
    }]
  }
};

module.exports = config;
