<script setup>
import { ref } from "vue";
import 'boxicons';

const bergerActive = ref(false);
const countItem = ref(7)

function toggleMenu() {
  bergerActive.value = !bergerActive.value;
}
</script>

<template>
  <header class="w-full bg-blue-300 text-black py-5 px-8 flex justify-between items-center">
    <h1 class="text-lg font-bold">Product Management</h1>
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

    <nav class="hidden md:block">
      <ul class="flex space-x-4">
        <li>
          <router-link to="/products" class="hover:opacity-70">
            Products
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="hover:opacity-70">
            About
          </router-link>
        </li>
        <li>
          <div class="relative w-full hover:opacity-80">
            <box-icon type="solid" name="cart" class="cursor-pointer text-2xl"></box-icon>
            <div
              v-show="countItem > 0"
              class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
            >
              {{ countItem }}
            </div>
          </div>
        </li>
      </ul>
    </nav>

    <div v-show="bergerActive" class="w-full h-screen fixed inset-0 flex flex-col items-center p-20 backdrop-blur-md text-white md:hidden z-50">
        <ul class="space-y-4 text-lg">
          <li>
            <router-link to="/products" class="text-black text-center block hover:opacity-60">
              Products
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="text-black text-center block hover:opacity-60">
              About
            </router-link>
          </li>
        </ul>
        <button
          @click="bergerActive = !bergerActive"
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

  <div class="w-full bg-blue-200 py-2">
    <div class="flex justify-center items-center text-sm sm:text-sm">
      <a href="#" class="px-2 hover:opacity-70">Accessories</a>
      <a href="#" class="px-2 hover:opacity-70">Audio</a>
      <a href="#" class="px-2 hover:opacity-70">Electronics</a>
      <a href="#" class="px-2 hover:opacity-70">Wearables</a>
    </div>
  </div>
</template>

<style scoped>
header {
  position: relative;
}
</style>
