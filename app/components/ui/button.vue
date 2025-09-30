<template>
  <button
    :class="[props.variant, props.size]"
    :type="type"
  >
    <Icon
      v-if="props.icon"
      :icon="props.icon"
      :width="props.size === 'sm' ? 16 : props.size === 'md' ? 24 : 28"
    />
    <span v-if="props.label">{{ props.label }}</span>
  </button>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    default: 'md',
  },
  variant: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<style scoped>
button {
  @apply flex flex-row gap-4 items-center font-bold uppercase rounded-lg text-lg font-semibold text-[var(--light-color)] leading-none border-transparent tracking-[10%] border-solid border-[2px] p-[0.625rem] cursor-pointer drop-shadow-[var(--drop-shadow-sm)];
}

button:hover {
  @apply scale-[1.05] transition-transform drop-shadow-[var(--drop-shadow-md)];
}

button.sm {
  @apply text-sm p-[0.375rem];
}

button.lg {
  @apply text-xl p-4;
}

button.primary {
  @apply bg-[var(--primary-color)] border-[var(--primary-color)];
}

button.primary:hover {
  @apply bg-[var(--primary-color-hover)] border-[var(--primary-color-hover)] scale-[1.05];
}

button.secondary {
  @apply bg-transparent border-[var(--light-color)] text-[var(--light-color)];
}

button.primary.sm,
button.secondary.sm {
  @apply px-4;
}

button.primary.md,
button.secondary.md {
  @apply px-6;
}

button.primary.lg,
button.secondary.lg {
  @apply px-8;
}
</style>
