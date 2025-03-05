<script setup>

</script>
 
<template>
  <div class="flex">
    <!-- Sidebar backdrop (mobile only) -->
    <div class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 hidden" id="sidebar-backdrop" aria-hidden="true"></div>
    
    <!-- Sidebar toggle button (mobile only) -->
    <button class="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-30 focus:outline-none" aria-label="Open menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    
    <!-- Sidebar -->
    <aside class="group fixed md:static inset-y-0 left-0 transform -translate-x-full md:translate-x-0 bg-gray-700 text-white md:w-16 hover:md:w-64 space-y-4 p-2 transition-all duration-300 ease-in-out z-30 md:z-0 h-full overflow-y-auto overflow-x-hidden">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">Menu</h2>
        <!-- Close button (mobile only) -->
        <button class="md:hidden text-white focus:outline-none" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <ul class="space-y-2">
        <li>
          <router-link to="/" class="flex items-center hover:bg-gray-600 p-2 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/product" class="flex items-center hover:bg-gray-600 p-2 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span class="whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">Products</span>
          </router-link>
        </li>
        <li>
          <router-link to="/" class="flex items-center hover:bg-gray-600 p-2 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span class="whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">Categories</span>
          </router-link>
        </li>
        <li>
          <router-link to="/" class="flex items-center hover:bg-gray-600 p-2 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">Settings</span>
          </router-link>
        </li>
      </ul>
    </aside>
    
    <!-- Main content wrapper -->
    <div class="md:ml-16 flex-1 transition-all duration-300 ease-in-out group-hover:md:ml-64">
      <slot></slot>
    </div>
  </div>
</template>
 
<style scoped>

</style>