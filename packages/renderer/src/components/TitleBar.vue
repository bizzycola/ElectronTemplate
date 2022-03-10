<script lang="ts" setup>
import { ref } from 'vue'
import { useElectron } from '../use/electron'
const { quit, minimize, maximize } = useElectron()
const doWiggle = ref(Math.random() < 0.2)
setTimeout(() => {
  doWiggle.value = false
}, 30000)
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 h-7 w-full bg-deployr-800 pl-5 titleBar flex flex-row justify-center shadow-lg"
  >
    <span class="flex flex-row items-center justify-center text-teal-600">
      <img
        src="../../assets/icon.png"
        w="5"
        h="auto"
        mr="1"
        mt="1"
        :class="{ 'animate-wiggle': doWiggle }"
      >
      <span class="mt-1">MY ELECTRON APP</span>
    </span>

    <div class="ml-auto flex flex-row items-center justify-center h-full">
      <button
        class="hover:bg-deployr-500 titleBtn px-2 flex flex-col items-center justify-center text-white h-full"
        @click="minimize"
      >
        <codicon-chrome-minimize />
      </button>
      <button
        class="hover:bg-deployr-500 titleBtn px-2 flex flex-col items-center justify-center text-white h-full"
        @click="maximize"
      >
        <codicon-chrome-maximize class="h-4" />
      </button>
      <button
        class="hover:bg-red-500 titleBtn px-2 flex flex-col items-center justify-center text-white h-full"
        @click="quit"
      >
        <bi-x />
      </button>
    </div>
  </div>
</template>
<style scoped>
.titleBar {
    -webkit-user-select: none;
    -webkit-app-region: drag;
}
.titleBtn {
    -webkit-app-region: no-drag;
}
</style>
