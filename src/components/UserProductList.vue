<script setup>
import ListModel from './model/ListModel.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart'])

const currentListType = ref('card')
const toggleListType = () => {
  currentListType.value = currentListType.value === 'card' ? 'list' : 'card'
}

const limitShowProduct = ref(10)
const listProducts = computed(() => {
  return props.products.slice(0, limitShowProduct.value)
})
const hasMoreProducts = computed(() => {
  return limitShowProduct.value < props.products.length
})
const loadMoreProducts = () => {
  limitShowProduct.value += 10 
}

const showIfNotLogin = ref(false)
const isAuthenticated = computed(() => {
  return localStorage.getItem("currentUser") !== null
})

const addToCart = (product) => {
  if (!isAuthenticated.value) {
    showIfNotLogin.value = true
    setTimeout(() => {
      router.push('/login')
    }, 5000)
  } else {
    emit('add-to-cart', product)
  }
}
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
        <div class="w-2/6 ml-2 md:w-1/6 md:ml-2">
          <button
            class="max-md:text-sm w-full bg-blue-500 text-white h-full rounded-lg cursor-pointer hover:opacity-85"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Added toggle view button -->
  <div class="flex justify-end px-4">
    <button 
      @click="toggleListType"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center cursor-pointer"
    >
      <span class="mr-2">{{ currentListType === 'card' ? 'List View' : 'Card View' }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <path d="M3 3h18v18H3z"></path>
            <path d="M9 3v18"></path>
            <path d="M15 3v18"></path>
        </svg> 
    </button>
    
  </div>

  <ListModel 
    :items="listProducts" 
    :listType="currentListType"
    :gridCols="currentListType === 'card' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : ''"
  >
    <template #heading>Products</template>
    
    <template #listItems="{ yourItem }">
      <div class="flex flex-col w-full h-full">
        <router-link :to="{name: 'UserProductDetail', params: {productId: yourItem.id}}">
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
        </router-link>
        <button
          @click.stop="addToCart(yourItem)"
          :disabled="yourItem.stock === 0"
          class="cursor-pointer mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </template>
  </ListModel>

  <div v-show="hasMoreProducts" class="flex justify-center mt-6">
      <button
        @click="loadMoreProducts"
        class="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
            clip-rule="evenodd"
          />
        </svg>
        Load More
      </button>
    </div>
  
  <div v-if="showIfNotLogin" class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-sm">
    <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
      <div class="text-center flex flex-col items-center">
        <div class="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        
        <h3 class="text-2xl font-bold text-gray-800 mt-4">Login Required</h3>
        <p class="text-gray-600 mt-2 mb-6">You need to be logged in to add items to your cart.</p>
        
        <p class="text-sm text-gray-500 mb-4">
          Redirecting to login page...
        </p>
        
        <div class="flex justify-center space-x-4">
          <router-link
            to="/login" 
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login Now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>