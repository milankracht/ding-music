<template>
  <div
    class="wrapper bg-[url(/img/home-bg-mobile.jpg)] md:bg-[url(/img/home-bg-tablet.jpg)] lg:bg-[url(/img/home-bg-desktop.jpg)]"
  >
    <div class="max-w-[48rem] m-auto px-4 pt-[8rem] md:pt-[40vh]">
      <div
        class="jumbotron grid grid-cols-1 grid-rows-[auto, 1fr, auto] md:grid-cols-3 md:grid-rows-2"
      >
        <div class="p-2 md:col-span-2">
          <h1 class="font-black text-4xl md:text-6xl mb-2">Out soon!</h1>
          <h3 class="font-light md:text-3xl tracking-[30%]">Beats Beyond</h3>
        </div>
        <div class="md:row-span-2 py-4 md:py-0">
          <img
            src="/img/Album-cover-Ding---Beats-Beyond.jpg"
            alt="Ding! album cover"
            class="object-cover aspect-square drop-shadow-[var(--drop-shadow-md)]"
          />
        </div>
        <div class="p-2 md:col-span-2">
          <p>Available on special edition vinyl, CD and streaming platforms</p>
          <!-- <UiButton
            label="Order now"
            variant="primary"
            size="lg"
            @click="$router.push('/order')"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'DING! - Homepage',
  description: 'Official website of DING! - Beats Beyond album coming soon',
})
</script>

<style scoped>
.jumbotron {
  animation-name: content-fade-in;
  animation-duration: 1s;
}
</style>
