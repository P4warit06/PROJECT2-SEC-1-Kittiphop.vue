<script setup>
import { ref } from "vue"

const props = defineProps({
  title: {
    type: String,
    default: "Product Management"
  }
})

const burgerActive = ref(false)

function toggleMenu() {
  burgerActive.value = !burgerActive.value
}
</script>

<template>
  <header class="w-full bg-blue-500 hover:bg-blue-800 transition-colors duration-1000 ease-in-out text-black p-4 flex justify-between items-center">
    <!-- Title slot with fallback -->
    <router-link to="/home" class="text-lg text-white font-bold hover:opacity-60">
      <slot name="title">{{ props.title }}</slot>
    </router-link>
    
    <!-- Mobile menu button -->
    <button
      @click="toggleMenu"
      class="cursor-pointer hover:opacity-60 md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Desktop navigation -->
    <nav class="hidden md:block">
      <ul class="flex space-x-4 items-center">
        <slot name="navigation-items"></slot>
      </ul>
    </nav>

    <!-- Mobile menu overlay -->
    <div v-show="burgerActive" class="w-full h-screen fixed inset-0 flex flex-col items-center p-20 backdrop-blur-md text-white md:hidden z-50">
      <ul class="space-y-4 text-lg">
        <slot name="mobile-navigation-items"></slot>
      </ul>
      <button
        @click="burgerActive = !burgerActive"
        class="absolute top-4 right-4 text-black font-bold hover:opacity-70 focus:outline-none cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
svg {
  color: white;
  text-align: center;
}
</style>
