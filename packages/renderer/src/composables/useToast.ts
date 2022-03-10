import { ref } from 'vue'

export const toastInstances = ref<any[]>([])

const createToastInstance = (options: ToastOptions, resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
  const instance = {
    ...options,
    resolve,
    reject,
    destroy() {
      toastInstances.value.splice(toastInstances.value.indexOf(this), 1)
    },

  }

  toastInstances.value = [
    ...toastInstances.value,
    instance,
  ]

  if (toastInstances.value.length > 3)
    toastInstances.value.splice(0, 1)
}

interface ToastOptions {
  title: string
  message: string
  duration?: number
  type?: string
}

export const useToast = () => {
  const createToast = (options: ToastOptions) => {
    return new Promise((resolve, reject) => {
      createToastInstance(options, resolve, reject)
    })
  }

  return {
    createToast,
  }
}
