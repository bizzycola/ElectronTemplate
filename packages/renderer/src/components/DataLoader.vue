<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  message: String,
  fetching: Boolean,
  error: Object,
})
</script>

<template>
  <div
    v-if="fetching"
    class="grid h-full gap-4 text-center place-items-center place-content-center"
  >
    <Spinner class="w-12 h-12" />
    <span class="text-sm font-bold text-gray-300">{{ message }}</span>
  </div>
  <div
    v-else-if="error?.message"
    class="grid h-full text-center place-items-center place-content-center"
  >
    <carbon-warning-alt class="text-5xl" />
    <span class="mt-4 text-sm font-bold text-red-700">{{ error?.message }}</span>
  </div>
  <slot v-else />
</template>