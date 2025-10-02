<template>
  <div
    class="toast"
    :class="{ 'toast--open': Boolean(props.message) }"
  >
    <div
      class="toast__content"
      :class="[props.type]"
    >
      <Icon
        :icon="iconName"
        :color="iconColor"
        :width="24"
      />
      <span>{{ props.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
  },
})

const iconName = computed(() => {
  switch (props.type) {
    case 'success':
      return 'ic:round-check-circle'
    case 'error':
      return 'ic:baseline-error-outline'
    case 'warning':
      return 'ic:round-warning'
    default:
      return 'ic:round-info'
  }
})

const iconColor = computed(() => {
  switch (props.type) {
    case 'success':
      return 'oklch(0.723 0.219 149.579)'
    case 'error':
      return 'oklch(0.637 0.237 25.331)'
    case 'warning':
      return 'oklch(0.705 0.213 47.604)'
    default:
      return 'oklch(0.623 0.214 259.815)'
  }
})
</script>

<style scoped>
.toast {
  @apply fixed w-full left-0 rounded shadow-md pointer-events-none;
  bottom: -100px; /* Hide below the viewport */
  transition: bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
}

.toast--open {
  bottom: 0; /* Show above bottom, e.g. 4rem (64px) */
}

.toast__content {
  @apply relative max-w-[40rem] flex flex-row gap-4 m-auto p-4 pb-8 bg-black/80 border-l-4 border-green-500 rounded-t-lg;
}

.error {
  @apply border-red-500;
}
.success {
  @apply border-green-500;
}
.warning {
  @apply border-orange-500;
}
.info {
  @apply border-blue-500;
}
</style>
