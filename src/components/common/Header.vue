<script setup></script>

<template>
  <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold">Product Management</h1>

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
  </header>
</template>

<style scoped></style>
