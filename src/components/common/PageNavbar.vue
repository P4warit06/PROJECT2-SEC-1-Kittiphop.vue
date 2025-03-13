<template>
    <header class="flex justify-between items-center p-6">
      <!-- Menu Button -->
      <button class="text-white focus:outline-none flex space-x-24">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <router-link to="/" class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">EXPLORE</router-link>
      </button>
      
      <!-- Navigation Links -->
      <div class="flex items-center space-x-6">
        
        <div class="flex space-x-6 ml-auto">
          <router-link to="/products"  class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">PRODUCT</router-link>
          <router-link to="/about"  class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">ABOUT</router-link>
          <!-- สมมติว่า user login แล้ว  -->
          <router-link to="/" class="text-white text-xl font-bold hover:text-blue-200 transition duration-300">LOGIN</router-link>

        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>