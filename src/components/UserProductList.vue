<script setup>
import ListModel from './model/ListModel.vue'
import { ref, computed } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

const limitShowProduct = ref(10)

const displayedProducts = computed(() => {
  return props.products.slice(0, limitShowProduct.value)
})

const hasMoreProducts = computed(() => {
  return limitShowProduct.value < props.products.length
})


const loadMoreProducts = () => {
  limitShowProduct.value += 10 
}

const addToCart = (product) => {
  emit('add-to-cart', product)
}
</script>

<template>
  <ListModel 
    :items="displayedProducts" 
    listType="card"
    gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <template #heading>Products</template>
    <template #listItems="{ yourItem }">
      <router-link :to="{name: 'UserProductDetail', params: {productId: yourItem.id}}">
        <div class="flex flex-col h-full">
          <div class="flex-grow">
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
          
          <button
            @click.stop="addToCart(yourItem)"
            :disabled="yourItem.stock === 0"
            class="cursor-pointer mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </router-link>
    </template>
  </ListModel>

  <!-- Load More button -->
  <div v-show="hasMoreProducts" class="flex justify-center mt-4">
    <button
      @click="loadMoreProducts"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Load More
    </button>
  </div>
</template>

<style scoped></style>