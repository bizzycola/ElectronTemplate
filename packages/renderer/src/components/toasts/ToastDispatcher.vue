<template>
  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-7 pointer-events-none sm:p-6 sm:items-start mt-3 <lg:py-17">
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end mt-auto">
      <Toast
        v-for="toast in toastInstances"
        :key="toast"
        :title="toast.title"
        :message="toast.message"
        :duration="toast.duration"
        :destroy="toast.destroy"
        :type="toast.type"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toastInstances } from '../../composables/useToast'
</script>
