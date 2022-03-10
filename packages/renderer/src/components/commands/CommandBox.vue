<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ExclamationCircleIcon, SearchIcon } from '@heroicons/vue/solid'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { useMagicKeys } from '@vueuse/core'
import { executeCommand, getCommandList } from '/@/logic/electroApi'
import { useToast } from '/@/composables/useToast'
const { createToast } = useToast()

const { shift, c } = useMagicKeys()

const commands = ref([
  {
    command: 'launch',
    name: 'Launch Game',
    description: 'Launches a game(bf1942, bfv or bf2)',
  },
])

const open = ref(false)
const query = ref('')

const filteredItems = computed(() =>
  query.value === ''
    ? []
    : commands.value.filter((cmd) => {
      const splt = query.value.split(' ')
      return cmd.command.toLowerCase().includes(splt[0].toLowerCase())
    }),
)

watchEffect(() => {
  if (shift.value && c.value) {
    setTimeout(() => {
      open.value = true
    }, 250)
  }
})

const onSubmit = async() => {
  try {
    if (query.value.trim() === '') return

    const splt = query.value.split(' ')
    const cmd = splt[0]
    const args = splt.slice(1, splt.length)

    open.value = false
    const res = await executeCommand(query.value)
    query.value = ''

    createToast({
      type: 'info',
      title: 'Command Executed',
      message: res,
      duration: 5,
    })
  }
  catch (err) {
    createToast({
      type: 'error',
      title: 'Execution Failed',
      message: `${err}`.replace('Error: Error invoking remote method \'controller\': Error:', ''),
      duration: 5,
    })
  }
}

onMounted(async() => {
  commands.value = await getCommandList()
})
</script>

<template>
  <TransitionRoot
    :show="open"
    as="template"
    @after-leave="query = ''"
  >
    <Dialog
      as="div"
      class="fixed inset-0 z-600 overflow-y-auto p-4 sm:p-6 md:p-20 lg:pl-64"
      @close="open = false"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-dark-900 bg-opacity-25 transition-opacity" />
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <Combobox
          v-model="query"
          as="div"
          class="mx-auto max-w-xl transform divide-y divide-deployr-600 overflow-hidden rounded-xl bg-deployr-600 shadow-md transition-all "
        >
          <div class="relative">
            <SearchIcon
              class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <ComboboxInput
              class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-200 placeholder-gray-400 focus:ring-0 sm:text-sm select-none outline-none "
              placeholder="Search..."
              @change="query = $event.target.value"
              @keyup.enter="onSubmit"
            />
          </div>

          <ComboboxOptions
            v-if="filteredItems.length > 0"
            static
            class="max-h-96 scroll-py-3 overflow-y-auto p-3 bg-deployr-700"
          >
            <ComboboxOption
              v-for="item in filteredItems"
              :key="item.command"
              :value="item"
              as="template"
              @click="query = item.command"
            >
              <li
                :class="['flex cursor-pointer select-none rounded-xl p-3 hover:bg-deployr-600']"
                @click="query = item.command"
              >
                <div class="ml-4 flex-auto">
                  <p class="text-sm font-medium text-gray-200">
                    {{ item.name }}
                  </p>
                  <p :class="['text-sm text-gray-400']">
                    {{ item.description }}
                  </p>
                </div>
              </li>
            </ComboboxOption>
          </ComboboxOptions>

          <div
            v-if="query !== '' && filteredItems.length === 0"
            class="py-14 px-6 text-center text-sm sm:px-14"
          >
            <ExclamationCircleIcon
              type="outline"
              name="exclamation-circle"
              class="mx-auto h-6 w-6 text-gray-400"
            />
            <p class="mt-4 font-semibold text-gray-900">
              No results found
            </p>
            <p class="mt-2 text-gray-500">
              No components found for this search term. Please try again.
            </p>
          </div>
        </Combobox>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
