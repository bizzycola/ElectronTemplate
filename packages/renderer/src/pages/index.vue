<script lang="ts" setup>
import { useElectron } from '/@/use/electron'

const { openBrowserLink } = useElectron()

const onElectronBuildClick = () => {
  openBrowserLink('https://electron.build')
}
</script>

<template>
  <div class="bg-deployr-700 shadow overflow-hidden rounded-lg text-left">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-200">
        Features
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-400">
        Grand features of this modified Electron template.
      </p>
    </div>
    <div class="border-t border-deployr-500 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-deployr-500">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-200">
            Controllers
          </dt>
          <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
            Communicate from frontend to backend with controllers!
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-200">
            Typing
          </dt>
          <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
            Types for preloader with useElectron class.
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-200">
            Updating
          </dt>
          <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
            Build installers and updaters with built-in support for <a
              href="#"
              class="text-blue-400 hover:text-blue-500"
              @click="onElectronBuildClick"
            >electron.build</a>.
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-200">
            State Keeper
          </dt>
          <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
            When the app closes, it saves the size and location states of the app window and restores it on the next run!
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-200">
            Vue3 Dev Tools
          </dt>
          <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
            When debugging(yarn watch), we automatically install Vue3 dev tools into the Inspect Element for electron's chromium instance!
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-200">
            Command Pallete
          </dt>
          <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
            Clientside command pallete! Try it now, hit Shift+C and start typing 'exit' to see the autocomplete! Add your own commands!
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
