<script lang="ts" setup>
import { useElectron } from '/@/use/electron'
const { evnt, performUpdate, checkUpdates } = useElectron()

const hasUpdate = ref(false)
const isUpdating = ref(false)
const updatePercentage = ref(0)

evnt('appUpdateAvailable', () => {
  hasUpdate.value = true
})

const doUpdate = () => {
  performUpdate()
  isUpdating.value = true
  updatePercentage.value = 0
}

onMounted(() => {
  setTimeout(() => {
    checkUpdates()
  }, 2500)
})
</script>

<template>
  <nav
    text="light-900 opacity-80"
    position="fixed top-auto lg:top-0 bottom-0 lg:bottom-full left-0"
    z="500"
    p="lg:b-7"
    overflow="x-hidden y-auto"
    transition-all="~ origin-left transform duration-500 ease-in-out"
    bg="deployr-800"
    w="lg:60 full"
    h="lg:full 15"
    flex="~ row lg:col"
    shadow="lg"
    mt="7"
  >
    <h1 class="-lg:hidden -lg:flex -lg:flex-row -lg:justify-center -lg:items-center -lg:-mt-1 text-2xl font-medium mr-2 lg:mb-2 lg:mr-0 text-gray-400 lg:flex items-center px-4 py-2 lg:block hover:bg-dca-600 lg:hover:bg-transparent" />
    <div
      p="x-4"
      space="lg:y-2 x-2 lg:x-0"
      flex="~ lg:col row"
      items="<lg:center"
    >
      <NavigationLink to="/">
        <template #icon>
          <carbon-home />
        </template>
        Home
      </Navigationlink>
    </div>

    <div
      v-if="hasUpdate"
      class="mt-auto"
    >
      <button
        v-if="!isUpdating"
        class="w-full bg-teal-700 p-2 hover:bg-teal-600 flex flex-row justify-center items-center"
        @click="doUpdate"
      >
        <bx-download class="mr-2" /> Update Now
      </button>
      <button
        v-else
        class="w-full bg-teal-700 p-2 hover:bg-teal-600 flex flex-row justify-center items-center"
      >
        <Spinner class="w-4 h-4 mr-2" /> Updating..
      </button>
    </div>
  </nav>

  <!-- Primary Loading Dialog -->
  <!--<PageLoader v-if="fetching" />-->
</template>
