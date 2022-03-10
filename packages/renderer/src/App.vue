<script lang="ts" setup>
import { useElectron } from '/@/use/electron'
import { useToast } from '/@/composables/useToast'
import CommandBox from './components/commands/CommandBox.vue';
const { createToast } = useToast()

const { checkUpdates, evnt } = useElectron()

evnt('unhandledError', (error: any) => {
  createToast({
    type: 'error',
    title: 'Unknown Error',
    message: `${error}`,
    duration: 5,
  })
})

evnt('appUpdateAvailable', (info: any) => {
  console.log('Update available!', info)

  createToast({
    type: 'info',
    title: 'Update Available',
    message: 'A new update is available!',
    duration: 5,
  })
})

evnt('appUpdateError', (err: any) => {
  createToast({
    type: 'error',
    title: 'Update Error',
    message: `${err}`,
    duration: 5,
  })
})

onMounted(() => {
  setInterval(() => checkUpdates, 300000)
})
</script>

<template>
  <CommandBox />
  <router-view />
  <ToastDispatcher />
</template>
