<script setup>
import { computed } from 'vue';


const props = defineProps({
    products: {
        type: Array,
        required: true
    }
})
const productData = computed(() => props.products)
const calculateQuantity = computed(() => {
    return productData.value.reduce((total, product) => total + product.quantity, 0)
})
const calculatePrice = computed(() => {
    return productData.value.reduce((total, product) => total + product.price, 0)
})
</script>

<template>
    <div class="w-full h-42 p-5 bg-white rounded-lg shadow-lg">
        <div class="w-full h-full flex justify-between items-center">
            <div class="flex items-center">
                <span class="mr-1">Select Products: </span>
                <p class="text-xl font-bold text-center text-blue-500">{{ productData.length }}</p>
                
            </div>
            <div class="flex justify-between items-center">
                <div class="flex flex-col items-start">
                    <div class="flex items-center">
                        <h1 class="mr-1">Price:</h1>
                        <h1 class="text-xl font-bold text-blue-500">{{ calculatePrice.toFixed(2) }}</h1>
                    </div>

                    <div class="flex items-center">
                        <h1 class="mr-1">Quantity:</h1>
                        <h1 class="text-xl font-bold text-blue-500">{{ calculateQuantity }}</h1>
                    </div>
                </div>
                <div class="mx-5">
                    <button class="bg-blue-300 px-40 py-5 rounded-lg cursor-pointer hover:opacity-80">Buy</button>
                </div>
            </div>
        </div>
    </div>

</template>