<script setup>
import { ref } from 'vue'
//1. register your custom event
const emits = defineEmits(['addNewProduct', 'editProduct'])
const props = defineProps({
  activeProduct: {
    type: Object,
    required: true
  }
})
// const newProduct = ref({
//   productName: '',
//   price: 0
// })
const newProduct = ref(props.activeProduct)

// const checkData = () => {
//   //validate data
//   emits('addNewProduct', newProduct.value)
// }


console.log(props.activeProduct)

</script>

<template>
  <div class="max-w-lg mt-10 p-6 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-bold mb-6 text-center">{{newProduct.id === undefined ? 'Add Product' : 'Edit Product'}}</h2>

    <div>
      <div class="mb-4">
        <label class="text-gray-700 font-medium mb-2">Product Name</label>
        <input
          v-model="newProduct.productName"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter product name"
        />
      </div>
      <div class="mb-6">
        <label class="text-gray-700 font-medium mb-2">Price</label>
        <input
          v-model.number="newProduct.price"
          type="number"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <!-- 2. event trigger -->
      <button
      v-show="newProduct.id === undefined"
        @click="$emit('addNewProduct', newProduct)"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
      >
        Add Product
      </button>
      <button
      v-show="newProduct.id !== undefined"
        @click="$emit('editProduct', newProduct)"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
      >
        Edit Product
      </button>
      <!-- <button
        @click="checkData"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
      >
        Add Product
      </button> -->
    </div>
  </div>
</template>
