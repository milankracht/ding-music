<template>
  <div
    class="wrapper bg-[url(/img/whatsnew-bg-mobile.jpg)] md:bg-[url(/img/whatsnew-bg-tablet.jpg)] lg:bg-[url(/img/whatsnew-bg-desktop.jpg)]"
  >
    <section class="content-container--first">
      <h1>What's new</h1>
      <h3>Review in JazzFlits</h3>
      <p>We had a nice review in Dutch magazine JazzFlits:</p>
      <img
        src="/img/JazzFlits.png"
        alt="JazzFlits review"
        class="my-8 w-full h-auto rounded-lg shadow-lg"
      />
    </section>
    <section class="content-container">
      <h3>Album available now!</h3>
      <p>
        <strong>Beats Beyond</strong> is available now on special edition vinyl
        and CD. Order <NuxtLink to="/order">here</NuxtLink>
      </p>
      <p>The album can be streamed from several digital platforms as well:</p>
      <ul class="mb-16">
        <li>
          <a
            href="https://music.apple.com/nl/artist/ding/1825462843?l=en-GB"
            target="_blank"
            rel="noopener"
            >Apple Music</a
          >
        </li>
        <li>
          <a
            href="https://open.spotify.com/album/0iRNn3YTKQiMxPZGlePtC5?si=qSxw_qjbTRauPMUUXJZtvQ"
            target="_blank"
            rel="noopener"
            >Spotify</a
          >
        </li>
        <li>
          <a
            href="https://music.youtube.com/channel/UCaloQISb_5r-t5dcJRUI_zw?si=WKdUeq4_m115w_VG"
            target="_blank"
            rel="noopener"
            >YouTube Music</a
          >
        </li>
      </ul>
      <hr />
    </section>

    <section class="content-container">
      <h3>Album release show on October 7th</h3>
      <p>
        We are happy to announce that we will release our latest album
        <strong>Beats Beyond</strong> on 7 October at Theater De Liefde in
        Haarlem
      </p>
      <p>
        During this show we will off course play some tunes of this album, along
        with some brand new pieces. From this day on,
        <strong>Beats Beyond</strong> will be available on special edition
        vinyl, CD and all know streaming platforms.
      </p>
      <img
        src="https://theaterdeliefde.nl/wp-content/uploads/2025/06/ding-800x600.jpg"
        alt="Ding! live"
        class="my-8 w-full h-auto rounded-lg shadow-lg"
      />
      <p>We hope to see you there!</p>
      <p>
        <strong
          >Tickets are available now via
          <a
            href="https://theaterdeliefde.nl/events/ding/"
            target="_blank"
            rel="noopener"
            >theaterdeliefde.nl</a
          ></strong
        >
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "DING! - What's new!",
  description:
    'DING! album release show on October 7th at Theater De Liefde in Haarlem. Tickets available now!',
})
</script>
