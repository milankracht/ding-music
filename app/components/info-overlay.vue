<template>
  <div
    class="info-overlay"
    :class="{ 'info-overlay--active': props.isVisible }"
  >
    <div
      v-if="props.album"
      class="info-overlay__content"
    >
      <h5
        v-if="props.album.artist"
        class="mb-2"
      >
        {{ props.album.artist }}
      </h5>
      <h1>{{ props.album.title }}</h1>
      <div class="flex flex-col gap-8 md:flex-row mb-8">
        <img
          :src="props.album.image"
          :alt="`${props.album.title} album cover`"
          class="info-overlay__image"
        />
        <div
          class="album__tracklist"
          v-html="props.album.tracklist"
        />
      </div>

      <div
        class="album__description flex mb-8"
        v-html="props.album.description"
      />

      <UiButton
        label="Close"
        variant="secondary"
        size="md"
        class="mb-8"
        @click="$emit('close')"
      />

      <UiButton
        class="info-overlay__close"
        icon="ic:round-close"
        size="lg"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  album: {
    type: Object,
  },
})
</script>

<style scoped>
.info-overlay {
  @apply fixed z-[998] w-full h-full top-[-100vh] left-0 bg-black/80 flex justify-center overflow-y-auto;
}

.info-overlay--active {
  @apply top-0;
}

.info-overlay__content {
  @apply relative p-8 max-w-[40rem] w-full;
}

.info-overlay__close {
  @apply absolute top-3 right-4;
}

.info-overlay__image {
  @apply w-full h-full md:w-[18rem] md:h-[18rem] object-cover aspect-square drop-shadow-[var(--drop-shadow-md)];
}
</style>
