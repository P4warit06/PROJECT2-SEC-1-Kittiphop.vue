<script setup>
import { ref } from "vue"
import { getItemById } from "@/libs/fetchUtils.js"
import { useRoute, useRouter } from "vue-router"
import ProductDetailModel from "@/components/model/ProductDetailModel.vue"

const {
  params: { productId },
} = useRoute()
const selectProduct = ref({})

async function getProductById() {
  try {
    selectProduct.value = await getItemById(
      `${import.meta.env.VITE_APP_URL}/products`,
      productId
    )
  } catch (error) {
    console.log(error)
  }
}

getProductById()

const router = useRouter()
function goBack() {
  router.go(-1)
}
</script>

<template>
  <ProductDetailModel :product="selectProduct">
    <!-- Navigation Slot -->
    <template #navigation>
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
    </template>
    
    <template #details="{ product }">
      <h3 class="text-lg font-semibold mb-4">Product Details</h3>
      <div class="text-gray-600 leading-relaxed">
        <p><span class="font-semibold">ID: </span>{{ product.id }}</p>
        <p><span class="font-semibold">Name: </span>{{ product.name }}</p>
        <p><span class="font-semibold">Price: </span>${{ product.price }}</p>
        <p><span class="font-semibold">Description: </span>{{ product.description }}</p>
        <p><span class="font-semibold">In Stock: </span>{{ product.stock }}</p>
        <p><span class="font-semibold">Status: </span>{{ product.status }}</p>
      </div>
    </template>
    

    <template #actions>
      <button
        @click="goBack"
        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer"
      >
        Back
      </button>
    </template>
  </ProductDetailModel>
</template>

<style scoped></style>
