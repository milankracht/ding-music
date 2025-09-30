<template>
  <div class="badge">
    <slot />
  </div>
</template>

<style scoped>
.badge {
  @apply absolute -top-2 -right-1 w-5 h-5 inline-flex items-center justify-center bg-red-500 rounded-full text-white text-sm font-semibold;
}
</style>
