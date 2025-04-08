<script setup>
import {storeToRefs} from "pinia";
import {useProducts} from "../stores/products.js"
import { onMounted } from "vue";
import { getItems } from "@/libs/fetchUtils.js";
import { ref } from 'vue';

const {products} = storeToRefs(useProducts())
console.log(products.value)

onMounted(async ()=>{
    products.value=await getItems(`${import.meta.env.VITE_APP_URL}/products`)
 console.log(products.value)
})

const slider = ref(null);

const scrollLeft = () => {
  if (slider.value) {
    const cardWidth = slider.value.querySelector('div > div').offsetWidth;
    slider.value.scrollBy({ left: -cardWidth * 1, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (slider.value) {
    const cardWidth = slider.value.querySelector('div > div').offsetWidth;
    slider.value.scrollBy({ left: cardWidth * 1, behavior: 'smooth' });
  }
};

</script>

<template>

<div class="relative group mx-auto max-w-7xl px-4">
  <!-- Navigation Buttons -->
  <button 
    @click="scrollLeft()"
    class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-gray-200"
  >
    ←
  </button>
  <button 
    @click="scrollRight()"
    class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-gray-200"
  >
    →
  </button>

  <!-- Slider Container -->
  <h1 class="text-5xl text-white  text-center mb-12 relative font-bold pb-8">
  <span class="relative z-10">PRODUCTS</span>
  <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white opacity-30 rounded-full"></span>
</h1>
  <div 
    ref="slider"
    class="relative overflow-x-auto no-scrollbar max-lg:0"

  >
    <div class="grid grid-flow-col auto-cols-[minmax(300px,1fr)] gap-6 pb-4 scroll-smooth">
      <div 
        v-for="(product, index) in products" 
        :key="index"
        class="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      >
      
        <router-link 
          :to="{name:'UserProductDetail',params:{productId:product.id}}"
          class="block h-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:border-indigo-100 cursor-pointer opacity-100 "
        >
          <!-- Product Image -->
          <div class="h-64 w-64 overflow-hidden">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
          </div>
          
          <!-- Product Info -->
          <div class="p-5">
            <h3 class="text-xl font-semibold text-gray-800 line-clamp-2 mb-2">{{ product.name }}</h3>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-indigo-600">${{ product.price }}</span>
              <span 
                class="text-sm px-3 py-1 rounded-full"
                :class="{
                  'bg-red-100 text-red-800': product.stock < 10,
                  'bg-green-100 text-green-800': product.stock >= 10
                }"
              >
                {{ product.stock }} in stock
              </span>
            </div>
            <button 
              class="mt-4 w-full py-3 bg-indigo-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-700 cursor-pointer"
            >
              View Details
            </button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</div>


</template>


<style scoped>

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>