<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <!-- Demo Header -->
  <div class="flex item-center justify-center">
    <div> Demo Header Context</div>
        <Header>
          <template #logo></template>
          <template #Maintitle> Main template</template>
          <template #Subtitle> Sub template</template>
        </Header>
    </div>
  <!-- Demo template  -->
  <div class="item-center justify-center flex pt-20 pb-20">
    <div
      class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology
          acquisitions 2021</h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology
        acquisitions
        of 2021 so far, in reverse chronological order.</p>
      <a href="./components/Header.vue"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </a>
    </div>

  </div>


</template>

<style scoped></style>
