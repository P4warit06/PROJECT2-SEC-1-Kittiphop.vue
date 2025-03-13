<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getItemById } from '../libs/fetchUtils.js';

const route = useRoute();
const router = useRouter();
const product = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    product.value = await getItemById(`${import.meta.env.VITE_APP_URL}/products`, route.params.id);
    if (!product.value) {
      error.value = 'Product not found';
    }
  } catch (err) {
    error.value = 'Error loading product';
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.push({ name: 'products' });
};
</script>

<template>
  <div class="container mx-auto p-4">
    <button 
      @click="goBack" 
      class="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Back to Products
    </button>

    <div v-if="loading" class="text-center py-10">
      <p class="text-xl">Loading product details...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>{{ error }}</p>
      <p>Please try again or return to the products page.</p>
    </div>

    <div v-else-if="product" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:w-1/3">
          <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover" />
        </div>
        <div class="p-8 md:w-2/3">
          <div class="flex justify-between items-start">
            <h1 class="text-3xl font-bold text-gray-800">{{ product.name }}</h1>
            <span :class="{
              'bg-green-200 text-green-800': product.status === 'Active',
              'bg-yellow-200 text-yellow-800': product.status === 'Low Stock',
              'bg-red-200 text-red-800': product.status === 'Out of Stock'
            }" class="px-4 py-1 rounded-full text-sm font-medium">
              {{ product.status }}
            </span>
          </div>
          
          <p class="text-gray-600 mt-4">Category: {{ product.category }}</p>
          <p class="text-2xl font-bold text-blue-600 mt-6">${{ product.price }}</p>
          <p class="text-gray-500 mt-2">Stock: {{ product.stock }}</p>
          
          <div class="mt-6">
            <h2 class="text-xl font-semibold">Description</h2>
            <p class="mt-2 text-gray-700">{{ product.description }}</p>
          </div>
          
          <div class="mt-8">
            <button 
              class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              :disabled="product.stock === 0"
              :class="{ 'opacity-50 cursor-not-allowed': product.stock === 0 }"
            >
              {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>