<script setup>
import { useRoute, useRouter } from "vue-router"
import { editItem, getItemById } from "@/libs/fetchUtils"
import { onMounted, ref } from "vue"
import ProductDetailModel from "@/components/model/ProductDetailModel.vue"

const {
  params: { productId },
} = useRoute()
const selectProduct = ref({})
const getUser = JSON.parse(localStorage.getItem("currentUser"))
const myUser = ref({})
onMounted(async () => {
  try {
    if (getUser) { 
      myUser.value = await getItemById(`${import.meta.env.VITE_APP_URL}/users`, getUser.id)
    }
  } catch(error) {
    console.error("Error in UserProductManager setup:", error)
  }
})
const addToCartInDetail = async () => {
  try {
    if (selectProduct.value.stock > 0) {
        const findIndexProduct = myUser.value.carts.findIndex((product) => product.id === selectProduct.value.id)
        if (findIndexProduct !== -1) {
            const cartItem = myUser.value.carts[findIndexProduct]
            if (cartItem.quantity < selectProduct.value.stock) {          
            cartItem.quantity += 1
            cartItem.price = cartItem.quantity * selectProduct.value.price
            myUser.value.carts.splice(findIndexProduct, 1, cartItem)
            await editItem(`${import.meta.env.VITE_APP_URL}/users`, myUser.value.id, myUser.value)
            } else {
              console.log("Stock is not enough!")
            }
        } else {
          const newCartItem = {...selectProduct.value, quantity:1, price:selectProduct.value.price}
          myUser.value.carts.push(newCartItem)
          await editItem(`${import.meta.env.VITE_APP_URL}/users`, myUser.value.id, myUser.value)
        }
    }
  } catch(error) {
    console.log(error)
  }
}

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
  <ProductDetailModel :product="selectProduct">
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
    
    <template #header="{ product }">
      <h1 class="text-2xl font-bold text-gray-900">
        {{ product.name }}
      </h1>
      <div class="flex items-center gap-2 mt-2">
        <span class="text-amber-600 text-sm">4 ★★★★☆</span>
        <span class="text-gray-500 text-sm">999 ratings</span>
      </div>
      <div>
        <span class="text-gray-500 text-sm">Stock: {{ product.stock }}</span>
      </div>
    </template>
    
    <template #price="{ product }">
      <div class="flex items-center gap-4">
        <span class="text-3xl font-bold text-gray-900">${{ product.price }}</span>
        <span class="text-gray-500 line-through">$999</span>
        <span class="text-green-600 font-semibold">-99%</span>
      </div>
      <p class="text-gray-500 text-sm mt-2">Inclusive of all taxes</p>
    </template>
    
    <template #details="{ product }">
      <h3 class="text-lg font-semibold mb-4">Description</h3>
      <p class="text-gray-600 leading-relaxed">
        {{ product.description }}
      </p>
    </template>
    
    <template #actions>
      <button
        @click="addToCartInDetail"
        class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer"
      >
        Add to Cart
      </button>
    </template>
  </ProductDetailModel>
</template>

<style scoped></style>
