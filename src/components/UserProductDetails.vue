<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getItemById } from '@/libs/fetchUtils';
import { ref } from 'vue';

const {params: {productId}} = useRoute();
const selectProduct = ref({})

const getSelectProduct = async () => {
    try {
        selectProduct.value = await getItemById(`${import.meta.env.VITE_APP_URL}/products`, productId)
    } catch(error) {
        console.log(error);
    }
}

const router = useRouter()
function goBack() {
  router.go(-1)
}
getSelectProduct()
</script>

<template>
  <div class="w-full h-screen bg-gray-100 p-5 overflow-auto flex justify-center items-center">
    <div class="bg-white p-10 rounded-2xl shadow-2xl flex justify-center items-center w-1/2">
      <div class="flex flex-col justify-center items-center w-full">
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">Product Details</h2>

        <div class="flex flex-col lg:flex-row items-center justify-around gap-10 h-full w-1/2">
          <div class="flex justify-center lg:justify-end items-center">
            <img
              class="rounded-xl object-contain w-full max-w-2xl max-h-[600px]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeizyn8SwFNfeJdYexfcqyurpCe47SKVR0Ew&s"
              alt="product image"
            />
          </div>

          <div class="flex flex-col justify-center items-start lg:w-1/2 max-w-md space-y-5 text-gray-700">
            <p><span class="font-semibold">ID:</span> {{ selectProduct.id }}</p>
            <p><span class="font-semibold">Name:</span> {{ selectProduct.name }}</p>
            <p><span class="font-semibold">Price:</span> ${{ selectProduct.price }}</p>
            <p><span class="font-semibold">In Stock:</span> {{ selectProduct.stock }}</p>
            <p><span class="font-semibold">Status:</span> {{ selectProduct.status }}</p>
            <p><span class="font-semibold">Description:</span> {{ selectProduct.description }}</p>

            <div class="flex gap-4 pt-4 w-full">
              <button
                class="cursor-pointer flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Buy
              </button>
              <button
                @click="goBack"
                class="cursor-pointer flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

