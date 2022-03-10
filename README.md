# Vite Vue3 Electron Template
Template for creating my electron apps from.
Includes self-updating, basic controllers and event handling.

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