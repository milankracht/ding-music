<template>
  <header class="">
    <div class="container relative flex justify-between items-center">
      <div
        class="z-[99] text-[2.5rem] font-black tracking-[15%] uppercase py-2"
      >
        Ding!
      </div>
      <nav
        class="absolute z-[99] md:relative w-[100%] md:w-auto top-0 left-0 py-6 flex flex-col md:flex-row gap-[1.5rem] text-[1.125rem] font-bold uppercase tracking-[10%] bg-[rgba(0,0,0,0.85)] md:bg-transparent shadow-md md:shadow-none"
        :class="{ 'top-0': !navIsHidden, 'top-[-800px] md:top-0': navIsHidden }"
      >
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/whatsnew">What's New</NuxtLink>
        <NuxtLink to="/listen">Listen</NuxtLink>
        <!-- <NuxtLink to="/order">Order</NuxtLink> -->
        <NuxtLink to="/contact">Contact</NuxtLink>
        <NuxtLink
          to="/cart"
          v-if="cartTotal > 0"
        >
          <div class="cart-link">
            <Icon
              icon="ic:outline-shopping-cart"
              :width="24"
            />
            <UiBadge>{{ cartTotal }}</UiBadge>
          </div>
        </NuxtLink>
      </nav>
    </div>
    <div
      class="absolute z-[100] top-[0.5rem] right-[0.5rem] md:hidden cursor-pointer"
    >
      <UiButton
        icon="ic:round-menu"
        size="lg"
        @click="toggleNavigation()"
        v-if="navIsHidden"
      />
      <UiButton
        icon="ic:round-close"
        size="lg"
        @click="toggleNavigation()"
        v-else
      />
    </div>
  </header>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const navIsHidden = ref(true)

const router = useRouter()
router.afterEach(() => {
  navIsHidden.value = true
})

const toggleNavigation = () => {
  navIsHidden.value = !navIsHidden.value
}

/* CART TOTAL */
const store = useCartStore()

const cartTotal = computed(() => {
  return store.totalItems
})

onMounted(() => {
  store.setCart()

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header')
    console.log(window.scrollY)
    if (window.scrollY > 10) {
      header?.classList.add('backdrop')
    } else {
      header?.classList.remove('backdrop')
    }
  })
})
</script>

<style scoped>
header {
  @apply fixed z-[99] top-0 w-[100%] h-[8rem];
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
}

nav {
  transition: top 0.3s ease-in-out;
}
nav a {
  @apply relative px-6 md:px-2 text-[var(--light-color)] hover:opacity-60 transition-[var(--transition-out)] no-underline;
}

.cart-link {
  @apply relative flex justify-start items-center gap-2 w-[2rem];
}
</style>
