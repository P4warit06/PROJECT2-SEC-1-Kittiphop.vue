<script setup>
import { ref,computed } from "vue";
import 'boxicons'

const props = defineProps({
  products: {
    type:Array
  }
})
console.log(props.products);
const bergerActive = ref(false);
const count = computed(() => props.products.length)
console.log(count.value);

function toggleMenu() {
  bergerActive.value = !bergerActive.value;
}
</script>

<template>
  <header class="w-full bg-blue-500  hover:bg-blue-800 transition-colors duration-1000 ease-in-out text-black p-4 flex justify-between items-center">
    <router-link to="/home" class="text-lg text-white font-bold hover:opacity-60">Product Management</router-link>
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
        <li class="text-white font-bold">
          <router-link to="/product-manager" class="hover:opacity-70">
            Product
          </router-link>
        </li>
        <li class="text-white font-bold">
          <router-link to="/home" class="hover:opacity-70">
            About
          </router-link>
        </li>
        <ul class="w-full cursor-pointer hover:opacity-80">
          <li class="relative">
            <router-link to="/user-carts">
            <div class="relative inline-block">
              <box-icon type='solid' name='cart' class="font-2xl"></box-icon>
              <p class="absolute top-0 right-0 text-white bg-red-500 rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {{ count }}
              </p>
            </div>
            </router-link>
          </li>
        </ul>
      </ul>
    </nav>

    <div v-show="bergerActive" class="w-full h-screen fixed inset-0 flex flex-col items-center p-20 backdrop-blur-md text-white md:hidden z-50">
        <ul class="space-y-4 text-lg">
          <li>
            <router-link to="/product-manager" active class="text-black text-center block hover:opacity-60">
              Product
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="text-black text-center block hover:opacity-60">
              About
            </router-link>
          </li>
          <li>
            <router-link to="/user-carts" class="text-black text-center block hover:opacity-60">
              Cart
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

  <div class="w-full bg-blue-400  py-2">
    <div class="flex justify-center items-center text-sm sm:text-sm">
      <a href="#" class="mx-2 hover:opacity-80">Accessories</a>
      <a href="#" class="mx-2 hover:opacity-80">Audio</a>
      <a href="#" class="mx-2 hover:opacity-80">Electronics</a>
      <a href="#" class="mx-2 hover:opacity-80">Wearables</a>
    </div>
  </div>
</template>

<style scoped>

</style>
