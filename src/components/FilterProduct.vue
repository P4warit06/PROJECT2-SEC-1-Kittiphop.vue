<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
</script>
<template>
      <div class="w-full bg-gray-300 py-2">
        <div class="flex justify-center items-center text-sm sm:text-sm">
      <a
        href="#"
        v-for="(category, index) in categories"
        :key="index"
        class="px-2 hover:opacity-70"
      >
        {{ category }}
      </a>
        </div>
    </div>
    <div class="w-full">
    
    <select class="text-red-600">
         <option value="" disabled selected>Select Filter</option>
        <option value="id">Id</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="status">Status</option>
        <option value="stock">Stock</option>
    </select>

    <input
      v-model="filter"
      type="text"
      placeholder="Search..."
      class=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />

   <button class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
    Search
   </button>
    
    </div>
</template>
<style scoped>

</style>