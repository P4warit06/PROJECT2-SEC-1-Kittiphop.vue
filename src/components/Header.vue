<script setup>
import { ref,computed, onMounted } from "vue";
import { getItems } from "@/libs/fetchUtils";
import 'boxicons'

const props = defineProps({
  count :{
    type: Number,
    default: 0
  }
})

const cartQuantity = ref([])
const count = computed(() => props.count)

const burgerActive = ref(false);

function toggleMenu() {
  burgerActive.value = !burgerActive.value;
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
          <router-link to="/user-products" class="hover:opacity-70">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 36"><!-- Icon from Clarity by VMware - https://github.com/vmware/clarity-assets/blob/master/LICENSE --><circle cx="13.5" cy="29.5" r="2.5" fill="currentColor" class="clr-i-solid clr-i-solid-path-1"/><circle cx="26.5" cy="29.5" r="2.5" fill="currentColor" class="clr-i-solid clr-i-solid-path-2"/><path fill="currentColor" d="M33.1 6.39a1 1 0 0 0-.79-.39H9.21l-.45-1.43a1 1 0 0 0-.66-.65L4 2.66a1 1 0 1 0-.59 1.92L7 5.68l4.58 14.47l-1.63 1.34l-.13.13A2.66 2.66 0 0 0 9.74 25A2.75 2.75 0 0 0 12 26h16.69a1 1 0 0 0 0-2H11.84a.67.67 0 0 1-.56-1l2.41-2h15.43a1 1 0 0 0 1-.76l3.2-13a1 1 0 0 0-.22-.85" class="clr-i-solid clr-i-solid-path-3"/><path fill="none" d="M0 0h36v36H0z"/></svg>
              <p :class="count > 0 ? 'absolute top-0 right-0 text-white bg-red-500 rounded-full text-xs w-4 h-4 flex items-center justify-center' : 'hidden'">
                {{ count }}
              </p>
            </div>
            </router-link>
          </li>
        </ul>
      </ul>
    </nav>

    <div v-show="burgerActive" class="w-full h-screen fixed inset-0 flex flex-col items-center p-20 backdrop-blur-md text-white md:hidden z-50">
        <ul class="space-y-4 text-lg">
          
          <li>
            <router-link to="/user-products" active class="text-black text-center block hover:opacity-60">
              PRODUCT
            </router-link>
          </li>
          <li>
            <router-link to="/home" class="text-black text-center block hover:opacity-60">
              ABOUT
            </router-link>
          </li>
          <li>
            <router-link to="/user-carts" class="text-black text-center block hover:opacity-60">
              CART
            </router-link>
          </li>
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
 