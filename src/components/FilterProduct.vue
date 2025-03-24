<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
</script>
<template>
    <div class="w-6/6 my-2">
      <div class="flex justify-center items-center">
        <select class="w-0.5/6 mr-2 py-2 rounded-lg text-gray-600 border border-gray-400 text-center">
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
          class="w-4/6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button class="w-1/6 mx-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Search
        </button>  
      </div>
    </div>
</template>
<style scoped>

</style>