<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="max-w-sm w-full bg-deployr-500 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <CheckCircleIcon
              v-if="type === 'success'"
              class="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
            <akar-icons-triangle-alert
              v-if="type === 'warning'"
              class="h-6 w-6 text-yellow-400"
            />
            <bx-bx-error-circle v-if="type === 'error'" class="h-6 w-6 text-red-400" />
            <akar-icons-info v-if="type === 'info'" class="h-6 w-6 text-blue-400" />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-100">
              {{ title }}
            </p>
            <p class="mt-1 text-sm text-gray-300">
              {{ message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              class="bg-deployr-500 rounded-md inline-flex text-gray-200 hover:text-gray-400 focus:outline-none"
              @click="destroy"
            >
              <span class="sr-only">Close</span>
              <XIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'
const props = defineProps<{
  title: string
  message: string
  duration?: number
  destroy: any
  type?: string
}>()
const show = ref(true)
if (props.duration) {
  setTimeout(() => {
    show.value = false
    setTimeout(() => {
      props.destroy()
    }, 0.3)
  }, (props.duration * 1000) - 0.3)
}
</script>
