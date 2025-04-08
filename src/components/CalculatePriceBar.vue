<script setup>
import { computed , ref } from "vue";
import { useRouter } from 'vue-router'

const emit = defineEmits(["buy"]);
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
const productData = computed(() => props.products);
const calculateQuantity = computed(() => {
  return productData.value.reduce(
    (total, product) => total + product.quantity,
    0
  );
});
const calculatePrice = computed(() => {
  return productData.value.reduce((total, product) => total + product.price, 0);
});
const clearSelect = () => {
  productData.value.length = 0;
};

</script>

<template>
  <div class="w-full p-10 bg-white rounded-lg shadow-lg">
    <div
      class="w-full h-full flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
    >
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex items-center md:justify-start">
          <span class="mr-1">Select Products: </span>
          <p class="text-xl font-bold text-blue-500">
            {{ productData.length }}
          </p>
          <div v-show="productData.length > 0" class="ml-3">
            <button @click="clearSelect()" class="underline cursor-pointer">
              Clear
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 md:flex-row md:items-center">
        <div class="flex flex-col items-start md:items-start">
          <div class="flex items-center">
            <h1 class="mr-1">Total Price:</h1>
            <h1 class="text-xl font-bold text-blue-500">
              {{ calculatePrice.toFixed(2) }}
            </h1>
          </div>
          <div class="flex items-center">
            <h1 class="mr-1">Quantity:</h1>
            <h1 class="text-xl font-bold text-blue-500">
              {{ calculateQuantity }}
            </h1>
          </div>
        </div>
        <div class="w-full md:w-auto">
            <button
              @click="$emit('buy', productData)"
              class="w-full md:w-72 bg-blue-300 px-10 py-3 rounded-lg cursor-pointer hover:opacity-80"
            >
              Buy
            </button>
        </div>
      </div>
    </div>
  </div>
</template>
