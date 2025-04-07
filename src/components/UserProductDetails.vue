<script setup>
import { useRoute, useRouter } from "vue-router"
import { getItemById } from "@/libs/fetchUtils"
import { ref } from "vue"

const {
  params: { productId },
} = useRoute()
const selectProduct = ref({})

const getSelectProduct = async () => {
  try {
    selectProduct.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/products`,
      productId
    )
  } catch (error) {
    console.log(error)
  }
}

const router = useRouter()
function goBack() {
  router.go(-1)
}

getSelectProduct()
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100 p-5 overflow-auto">
    <div class="flex items-center gap-4 mb-8">
      <button
        @click="goBack"
        class="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        >
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
      </button>
    </div>
    <div class="bg-white p-8 rounded-2xl shadow-xl max-w-6xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-1/2">
          <img
            class="rounded-xl object-contain w-full lg:h-[500px] sm:h-[200px]"
            :src="selectProduct.image || 'https://via.placeholder.com/600'"
            alt="product image"
          />
        </div>
        <div class="lg:w-1/2 space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ selectProduct.name }}
            </h1>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-amber-600 text-sm">4 ★★★★☆</span>
              <span class="text-gray-500 text-sm">999 ratings</span>
            </div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center gap-4">
              <span class="text-3xl font-bold text-gray-900"
                >${{ selectProduct.price }}</span
              >
              <span class="text-gray-500 line-through">$999</span>
              <span class="text-green-600 font-semibold">-99%</span>
            </div>
            <p class="text-gray-500 text-sm mt-2">Inclusive of all taxes</p>
          </div>

          <div class="mt-8 pt-8 border-t">
            <h3 class="text-lg font-semibold mb-4">Description</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ selectProduct.description }}
            </p>
          </div>

          <div class="flex gap-4 pt-4">
            <button
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
