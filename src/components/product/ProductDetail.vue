<script setup>
import { ref, onMounted } from 'vue';
import { getItemById } from '../../libs/fetchUtils.js';
import ListModel from "../model/ListModel.vue";

// 062 Pongsakorn's
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const product = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    loading.value = true;
    product.value = await getItemById(`${import.meta.env.VITE_APP_URL}/products`, props.id);
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

</script>

// 062 Pongsakorn's
<template>
  <div class="container mx-auto p-4">
    <button class="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
      <router-link to="/products">Back to Products</router-link>
    </button>

    <div v-if="loading" class="text-center py-10">
      <p class="text-xl">Loading product details...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>{{ error }}</p>
      <p>Please try again or return to the products page.</p>
    </div>

    <div v-else-if="product">
      <ListModel :items="[product]" :singleItem="true">
        <template #heading>
          <h2 class="text-2xl font-bold text-center">Product Details</h2>
        </template>
        <template #listItems="{ item }">
          <div class="md:flex">
            <div class="md:w-1/3">
              <img :src="item.image" :alt="item.name" class="w-full h-64 object-cover" />
            </div>
            <div class="p-8 md:w-2/3">
              <div class="flex justify-between items-start">
                <h1 class="text-3xl font-bold text-gray-800">{{ item.name }}</h1>
                <span :class="{
                  'bg-green-200 text-green-800': item.status === 'Active',
                  'bg-yellow-200 text-yellow-800': item.status === 'Low Stock',
                  'bg-red-200 text-red-800': item.status === 'Out of Stock',
                }" class="px-4 py-1 rounded-full text-sm font-medium">
                  {{ item.status }}
                </span>
              </div>

              <p class="text-gray-600 mt-4">Category: {{ item.category }}</p>
              <p class="text-2xl font-bold text-blue-600 mt-6">${{ item.price }}</p>
              <p class="text-gray-500 mt-2">Stock: {{ item.stock }}</p>

              <div class="mt-6">
                <h2 class="text-xl font-semibold">Description</h2>
                <p class="mt-2 text-gray-700">{{ item.description }}</p>
              </div>

              <div class="mt-8">
                <button
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  :disabled="item.stock === 0" :class="{ 'opacity-50 cursor-not-allowed': item.stock === 0 }">
                  {{ item.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
                </button>
              </div>
            </div>
          </div>
        </template>
      </ListModel>
    </div>
  </div>
</template>

<style scoped></style>