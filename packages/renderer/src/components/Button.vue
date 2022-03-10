<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps({
  href: {
    type: String,
    required: false,
  },
  to: {
    type: [String, Object],
    required: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false,
  },
})
const is = computed(() => {
  if (props.href)
    return 'a'
  if (props.to)
    return 'router-link'
  return 'button'
})
const bindings = computed(() => {
  if (is.value === 'a')
    return { href: props.href, target: '_blank' }
  if (is.value === 'router-link')
    return { to: props.to }
  return {}
})
</script>

<template>
  <component
    :is="is"
    v-bind="bindings"
    :class="{ 'bg-green-500 text-green-900 hover:bg-green-600': primary, 'w-10': icon }"
    class="inline-flex flex-row items-center h-10 px-4 ease-in-out transform active:scale-95 rounded-3xl focus:outline-none"
  >
    <div class="grid w-full h-full grid-flow-col gap-2 font-semibold uppercase place-items-center place-content-center">
      <slot />
    </div>
  </component>
</template>