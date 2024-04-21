# Vite Vue3 Electron Template
Template for creating my electron apps from.
Includes self-updating, basic controllers and event handling.

## Archived
The packages here are pretty outdated now, leaving archived, still a good reference for Vue3/TS/Tailwind and Electron. May contain reference to an old project I built this template out of, but not really an issue.

## Setup
Fork the repository, and start by updating `.electron-builder.config.js` to setup your build config with installers and update config. For information regarding how to configure this to your liking, visit [https://www.electron.build/](https://www.electron.build/).

Also, remember to update the package name in `package.json`.

Then, run `yarn` to install packages and start writing code.

## Running and Building
To build the app you can use one of these two commands:

1. With app.asar (compresses your vue app into an app.asar file, don't do this if you need to access files in your app from in-code unless you move the files to a directly you can read from): `yarn unpacked`.

2. Without app.asar(uncompressed web app): `yarn compile`

These commands will both create an unpacked app, and also an installer if you keep the default electron builder config.

## Features
* Controllers for client to electron communication
* Typed Electron communication classes for VueJS
* Built in updater with clientside events for alerting and triggering updates.
* Window state keeper, saves the last known window size and location so the main window (almost?) always re-opens in the state it was in when the app last exited.
* Vue3 Developer Tools installed in debug mode
* Client side command pallete(opened with Shift+C) with command auto-completeing(see `packages/main/commands`)
* Includes SweetAlert2
* Includes VueUse and Axios
* Client Toast notifications
* Toast and Navigation bar show when a new update is available
* Automatically check for updates every 5 minutes

## Web Server Update Config
This is the only config I've done, so I'll discuss this. If you want to update by publishing to Github or other platforms, see the [electron.build](https://www.electron.build/) documentation.

Configuration is done in `.electron-builder.config.js`.

First off, create a directory on your webserver where you will serve the update files. Copy the URL to the update path, in this example we're gonna use `http://localhost:8080/myapp`. Change all instances of `http://UPDATEURL` in `.electron-builder.config.js` to `http://localhost:8080/myapp`. Next, set instances of `MyElectronApp` to your apps name.

Now, run `yarn compile`.
This will create `dist` directory with a variety of files. Each time we compile a new update of our app, we'll need to empty the contents of the `myapp` directory on the webserver and upload all the following files to it:

* electrontemplate-Setup-##.#.##-####.exe
* electrontemplate-Setup-##.#.##-####.blockmap
* ####.yml (4 digits)
* .icon-ico

After uploading the files, you'll need to rename `####.yml` to `latest.yml`. After this, launch an older installed version of your app and you will recieve the update notification.

**Note** The `electrontemplate-Setup-##.#.##-####.exe` file is the installer for your app! Distribute it to all!

**WARNING** If you don't have a signing key for your app, people installing it will get a warning on Windows saying the file may not be trusted.
