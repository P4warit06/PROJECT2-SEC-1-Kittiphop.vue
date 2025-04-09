<script setup>
import { storeToRefs } from "pinia";
import { useProducts } from "../stores/products.js"
import { onMounted, ref, onBeforeUnmount } from "vue";
import { getItems } from "@/libs/fetchUtils.js";

const { products } = storeToRefs(useProducts())
const slider = ref(null);
const isLoading = ref(true);
const visibleItems = ref(4);

// Update visible items based on screen size
const updateVisibleItems = () => {
  if (window.innerWidth < 640) {
    visibleItems.value = 1;
  } else if (window.innerWidth < 1024) {
    visibleItems.value = 2;
  } else {
    visibleItems.value = 4;
  }
}

onMounted(async () => {
  try {
    products.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    isLoading.value = false;
  }
  
  // Initialize responsive behavior
  updateVisibleItems();
  window.addEventListener('resize', updateVisibleItems);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleItems);
});

const scrollLeft = () => {
  if (slider.value) {
    const cardWidth = slider.value.querySelector('div > div').offsetWidth;
    slider.value.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (slider.value) {
    const cardWidth = slider.value.querySelector('div > div').offsetWidth;
    slider.value.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
};

// Touch handling for mobile swipe
const touchStart = ref(0);
const touchEnd = ref(0);

const handleTouchStart = (e) => {
  touchStart.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEnd.value = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50;
  if (touchStart.value - touchEnd.value > swipeThreshold) {
    // Swipe left
    scrollRight();
  } else if (touchEnd.value - touchStart.value > swipeThreshold) {
    // Swipe right
    scrollLeft();
  }
};
</script>

<template>
  <div class="relative group mx-auto max-w-7xl px-4 py-8">
    <!-- Navigation Buttons -->
    <button 
      @click="scrollLeft()"
      class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-gray-200"
      aria-label="Scroll left"
    >
      <span class="sr-only">Previous</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
    <button 
      @click="scrollRight()"
      class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-gray-200"
      aria-label="Scroll right"
    >
      <span class="sr-only">Next</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Section Title -->
    <h1 class="text-4xl sm:text-5xl text-white text-center mb-8 sm:mb-12 relative font-bold pb-8">
      <span class="relative z-10">PRODUCTS</span>
      <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white opacity-30 rounded-full"></span>
    </h1>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
    
    <!-- Slider Container -->
    <div 
      v-else
      ref="slider"
      class="relative overflow-x-auto no-scrollbar"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="grid grid-flow-col auto-cols-[minmax(280px,1fr)] sm:auto-cols-[minmax(300px,1fr)] gap-4 sm:gap-6 pb-4 scroll-smooth">
        <div 
          v-for="(product, index) in products" 
          :key="index"
          class="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <router-link 
            :to="{name:'UserProductDetail',params:{productId:product.id}}"
            class="block h-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:border-indigo-100 cursor-pointer"
          >
            <!-- Product Image -->
            <div class="h-48 sm:h-56 md:h-64 overflow-hidden">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              >
            </div>
            
            <!-- Product Info -->
            <div class="p-4 sm:p-5">
              <h3 class="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2 mb-2">{{ product.name }}</h3>
              <div class="flex items-center justify-between">
                <span class="text-xl sm:text-2xl font-bold text-indigo-600">${{ product.price }}</span>
                <span 
                  class="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full"
                  :class="{
                    'bg-red-100 text-red-800': product.stock < 10,
                    'bg-green-100 text-green-800': product.stock >= 10
                  }"
                >
                  {{ product.stock }} in stock
                </span>
              </div>
              <button 
                class="mt-4 w-full py-2 sm:py-3 bg-indigo-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                View Details
              </button>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Mobile Swipe Indicator -->
    <div class="flex justify-center mt-4 md:hidden">
      <div class="text-white text-sm opacity-70">Swipe to see more products</div>
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

/* Add smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Improve touch experience on mobile */
@media (max-width: 768px) {
  .grid-flow-col {
    scroll-snap-type: x mandatory;
  }
  
  .grid-flow-col > div {
    scroll-snap-align: start;
  }
}
</style>