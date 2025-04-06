<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const backHome = () => {
  router.push({ path: "/" });
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-white">
    <div
      class="flex flex-col p-8 md:p-12 shadow-lg items-center max-w-lg rounded-lg border border-blue-100"
    >
      <div class="mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h1 class="text-blue-700 font-bold text-3xl mb-2">404</h1>
      <p class="text-blue-600 font-semibold text-xl mb-4">Page Not Found</p>
      <p class="text-blue-400 text-center mb-6">The page you are looking for might have been removed or is temporarily unavailable.</p>
      <button
        @click="backHome"
        class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 cursor-pointer"
      >
        Back to Homepage
      </button>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  div.flex.flex-col {
    padding: 1.5rem;
    margin: 0 1rem;
  }
}
</style>

