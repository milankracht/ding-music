<template>
  <div class="member">
    <img
      :src="image"
      :alt="`${props.name} image`"
      class="member-image"
    />
    <h3 class="member-name">{{ name }}</h3>
    <p class="member-role">{{ role }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.member {
  @apply flex flex-col items-center max-w-[10rem] md:max-w-[15rem] text-center mx-8 mb-8 drop-shadow-[var(--drop-shadow-sm)];
}
.member-image {
  @apply w-[100%] h-auto rounded-full mb-4;
}
.member-name {
  @apply text-base normal-case font-bold mb-2;
}
.member-role {
  @apply text-sm italic;
}
</style>
