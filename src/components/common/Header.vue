<script setup>
const props = defineProps({
  categories: {
    type:Set,
    required:true
  }
})
console.log(props.categories);

</script>

<template>
  <header class="bg-gray-300 text-black p-4">
    <div class="flex justify-between items-center mx-10">
        <h1 class="text-lg">Product Management</h1>

        <!-- Mobile menu button (visible on small screens) -->
        <button class="md:hidden focus:outline-none" aria-label="Toggle menu">
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

        <!-- Desktop navigation (hidden on small screens) -->
        <nav class="hidden md:block">
          <ul class="flex space-x-4">
            <li>
              <router-link to="/about" class="hover:text-blue-300"
                >About</router-link
              >
            </li>
            <li>
              <router-link to="/product" class="hover:text-blue-300"
                >Product</router-link
              >
            </li>
          </ul>
        </nav>

        <!-- Mobile navigation (initially hidden, would be shown with JavaScript) -->
        <div
          class="absolute top-16 right-0 left-0 bg-blue-600 p-4 hidden md:hidden"
        >
          <ul class="space-y-2">
            <li>
              <router-link to="/about" class="block hover:text-blue-300 py-2"
                >About</router-link
              >
            </li>
            <li>
              <router-link to="/product" class="block hover:text-blue-300 py-2"
                >Products</router-link
              >
            </li>
          </ul>
        </div>
    </div>
  </header>

  <div class="w-full bg-gray-200">
    <div class="flex justify-center items-center py-1">
        <a class="px-5" href="" v-for="(category, index) in categories" :key="index">{{ category }}</a>
    </div>
  </div>
</template>

<style scoped></style>
