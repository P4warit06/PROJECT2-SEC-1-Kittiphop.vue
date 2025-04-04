<script setup>
import ListModel from './model/ListModel.vue';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['add-to-cart']);

const addToCart = (product) => {
  emit('add-to-cart', product);
};
</script>

<template>
  <div class="m-6">
    <div class="w-full flex flex-col justify-between items-center mb-6">
        <div class="w-full flex">
          <div class="w-5/6">
            <input
              type="text"
              placeholder="Search"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="w-1/6 ml-2">
            <button
              class="w-full bg-blue-500 text-white h-full rounded-lg cursor-pointer hover:opacity-85"
            >
              Search
            </button>
          </div>
        </div>
    </div>
  </div>
  <ListModel 
  :items="products" 
  listType="card"
  gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  <template #heading>Products</template>
  <template #listItems="{ yourItem }">
    <div class="flex flex-col h-full">
      <router-link :to="{ name: 'UserProductDetail', params: { productId: yourItem.id } }" class="flex-grow">
        <div>
          <img 
            v-if="yourItem.image" 
            :src="yourItem.image" 
            :alt="yourItem.name"
            class="w-full h-32 object-contain mb-2"
          />
          <div v-else class="w-full h-32 bg-gray-200 flex items-center justify-center mb-2">
            <span class="text-gray-500">No Image</span>
          </div>
          
          <h3 class="font-bold text-lg truncate">{{ yourItem.name }}</h3>
          <p class="text-gray-600">${{ yourItem.price }}</p>
          <p class="text-sm" :class="{
            'text-green-600': yourItem.stock > 10,
            'text-yellow-600': yourItem.stock <= 10 && yourItem.stock > 0,
            'text-red-600': yourItem.stock === 0
          }">
            Stock: {{ yourItem.stock }}
          </p>
        </div>
      </router-link>

      <button
        @click="addToCart(yourItem)"
        :disabled="yourItem.stock === 0"
        class="cursor-pointer mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add to Cart
      </button>
    </div>
  </template>
</ListModel>
</template>

<style scoped></style>