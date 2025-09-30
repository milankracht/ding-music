<template>
  <div
    class="wrapper bg-[url(/img/listen-bg-mobile.jpg)] md:bg-[url(/img/listen-bg-tablet.jpg)] lg:bg-[url(/img/listen-bg-desktop.jpg)]"
  >
    <section class="content-container--first">
      <h1>Listen</h1>
      <h2>69 Année Érotique</h2>

      <div class="w-full p-8 mb-12 bg-white/50 rounded-xl shadow-lg">
        <canvas ref="canvas" />
        <audio
          ref="player"
          :src="mySource"
          controls
          class="w-full mt-4"
        />
      </div>

      <div class="max-w-[24rem]">
        <img
          src="/img/Album-cover-Ding---Beats-Beyond.jpg"
          alt="Ding! album cover"
          class="w-full h-full object-cover aspect-square drop-shadow-[var(--drop-shadow-md)]"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAVWaveform } from 'vue-audio-visual'

const player = ref(null)
const canvas = ref(null)
const mySource = '/audio/annee-erotique.m4a'
const canvWidth = ref(544)

// useAVWaveform(player, canvas, {
//   src: mySource,
//   canvHeight: 80,
//   canvWidth: canvWidth.value,
//   noplayedLineColor: '#c61d74',
//   barColor: 'black',
//   outlineColor: 'black',
//   playtime: false,
//   playtimeSliderColor: '#c61d74',
//   playedLineColor: '#7a1f4e',
// })

onMounted(() => {
  canvWidth.value = window.innerWidth > 768 ? 544 : window.innerWidth - 80

  useAVWaveform(player, canvas, {
    src: mySource,
    canvHeight: 80,
    canvWidth: canvWidth.value,
    noplayedLineColor: '#c61d74',
    barColor: 'black',
    outlineColor: 'black',
    playtime: false,
    playtimeSliderColor: '#c61d74',
    playedLineColor: '#7a1f4e',
  })
})
</script>
