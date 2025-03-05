<script setup>
import ListModel from "../model/ListModel.vue";
import { useRouter } from 'vue-router';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
console.log(props.products);

const router = useRouter();
const goToProductDetail = (productId) => {
  router.push({ name: 'ProductDetail', params: { id: productId } });
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-8">Product List </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-blue-600">${{ product.price }}</span>
            <span :class="{
              'bg-green-200 text-green-800': product.status === 'Active',
              'bg-yellow-200 text-yellow-800': product.status === 'Low Stock',
              'bg-red-200 text-red-800': product.status === 'Out of Stock'
            }" class="px-3 py-1 rounded-full text-sm font-medium">
              {{ product.status }}
            </span>
          </div>
          <p class="text-gray-500">Stock: {{ product.stock }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
