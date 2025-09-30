<template>
  <div :class="`album--${props.size}`">
    <div :class="`album__cover--${props.size}`">
      <img
        :src="album.image"
        :alt="`${album.title} album cover`"
        class="album__image"
      />
    </div>
    <div :class="`album__details--${props.size}`">
      <h5 v-if="album.artist">{{ album.artist }}</h5>
      <h3>{{ album.title }}</h3>
      <p class="capitalize">{{ album.year }} – {{ album.type }}</p>

      <UiButton
        label="More info"
        variant="secondary"
        size="sm"
        @click="$emit('toggle-overlay', album.id)"
      />

      <div class="text-[1.5rem] font-black my-4">{{ price }}</div>

      <UiButton
        label="Add to cart"
        variant="primary"
        :size="props.size === 'sm' ? 'md' : 'lg'"
        @click="$emit('add-to-cart', album.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { UiButton } from '#components'
import { formatPrice } from '~/utils/helper/price'

const props = defineProps({
  album: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
  },
})

const price = computed(() => {
  return formatPrice(props.album.price, props.album.currency)
})
</script>

<style scoped>
.album--md {
  @apply flex flex-col md:flex-row gap-8 border-b border-white/50 pb-8;
}

.album--sm {
  @apply w-full md:max-w-[18rem] flex flex-col gap-4 border-b border-white/50 pb-8;
}

.album__image {
  @apply w-full h-full md:w-[18rem] md:h-[18rem] object-cover aspect-square drop-shadow-[var(--drop-shadow-md)];
}

.album--sm h3 {
  @apply text-[1.25rem] font-bold;
}
</style>
