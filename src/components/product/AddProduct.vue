<script setup>
import { ref } from "vue";
//1. register your custom event
const emits = defineEmits(["addNewProduct"]);
const newProduct = ref({
  name: "",
  price: 0,
});

const checkData = () => {
  emits("addNewProduct", newProduct.value);
};
</script>

<template>
  <div class="max-w-lg mt-10 p-6 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Add Product</h2>

    <div>
      <div class="mb-4">
        <label class="text-gray-700 font-medium mb-2">Product Name</label>
        <input
          v-model="newProduct.name"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter product name"
        />
      </div>
      <div class="mb-6">
        <label class="text-gray-700 font-medium mb-2">Price</label>
        <input
          v-model.number="newProduct.price"
          type="number"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <!-- 2.event trigger -->
      <button
        @click="$emit('addNewProduct', newProduct)"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
      >
        Add Product
      </button>
      <!-- 1.เรียกข้างบน -->
      <button
        @click="checkData"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
      >
        Add Product
      </button>
    </div>
  </div>
</template>
