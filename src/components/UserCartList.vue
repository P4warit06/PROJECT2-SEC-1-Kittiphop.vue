<script setup>
import CartModel from './model/CartModel.vue';
import Header from './Header.vue';
import { ref, onMounted } from 'vue';
import { getItems } from '@/libs/fetchUtils';

const carts = ref([])
onMounted(async () => {
    carts.value = await getItems(`${import.meta.env.VITE_APP_URL}/carts`)
    carts.value.forEach((cart) => cart.stock = 1)
})



</script>

<template>
   <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Search Section -->
    <div class="flex flex-col justify-between items-center mb-6">
        <div class="w-full">
            <input type="text" placeholder="Search" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="w-full flex justify-between items-center">
            <div class="flex items-center space-x-2 border p-3 rounded-lg mt-4">
                <input type="checkbox" id="selectAll" class="h-5 w-5 text-blue-500" />
                <label for="selectAll" class="text-lg text-black">Select All</label>
            </div>
            <div class="flex items-center space-x-2 border rounded-lg mt-4">
                <select class="p-3">
                    <option disabled value="">Select category</option>
                    <option value="">Select category</option>
                    <option value="">Select category</option>
                    <option value="">Select category</option>
                </select>
            </div>
        </div>
    </div>

    <CartModel :products="carts">
        <template #heading>
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Order</h1>
        </template>

        <template #listProduct="{ yourProduct }">
            <div class="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg mb-4">
                <div class="flex flex-col space-y-1">
                    <span class="text-xl font-semibold text-gray-900">{{ yourProduct.name }}</span>
                    <span class="text-lg text-green-600">Price: <span class="font-bold">{{ yourProduct.price | currency }}</span></span>
                    <span class="text-sm text-gray-600">Stock: <span class="font-semibold">{{ yourProduct.stock }}</span></span>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">Buy</button>
                </div>
            </div>
        </template>
    </CartModel>
</div>

</template>