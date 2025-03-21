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

const catagories = ref([
  {name:"Accessories", value:"Accessories"},
  {name:"Audio", value:"Audio"},
  {name:"Electronics", value:"Electronics"},
  {name:"Wearables", value:"Wearables"}
])

const status = ref([
  {name: "Active", value:"Active"},
  {name: "Low Stock", value:"Low Stock"},
  {name: "Out of Stock", value:"Out of Stock"}
  ])

console.log(props.activeProduct)

</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-white">

    <div
      class="p-10 bg-white rounded-3xl shadow-2xl max-w-4xl mx-auto flex flex-col justify-center items-center max-h-screen overflow-y-auto">
      <h1 class="text-3xl font-bold mb-10 text-blue-800 text-center w-full max-sm:text-xl">{{newProduct.id === undefined
        ?
        'Create Product' : 'Edit Product'}}</h1>

      <div class="grid grid-cols-1 overflow-auto px-1 sm:grid-cols-2 gap-8.5 w-full">
        <div>
          <label class="block text-gray-700 text-lg font-medium mb-2 text-center">Product ID</label>
          <input v-model="newProduct.id" type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
            placeholder="Enter product ID" />
        </div>

        <div>
          <label class="block text-gray-700 text-lg font-medium mb-2 text-center">Product Name </label>
          <input v-model="newProduct.productName" type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
            placeholder="Enter product name" />
        </div>


        <div>
          <label class="block text-gray-700 text-lg font-medium mb-2 text-center">Price : </label>
          <input v-model.number="newProduct.price" type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700" />
        </div>

        <div>
          <label class="block text-gray-700  text-lg font-medium mb-2 text-center">Quantity In Stock </label>
          <input v-model.number="newProduct.stock" type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700">
        </div>

        <div class="mb-4">
          <label class="block font-medium text-lg text-gray-700 mb-2 text-center">Product Status</label>
          <select v-model="newProduct.status"
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-700 focus:outline-none">
            <option disabled :value="newProduct.status">Active</option>
            <option v-for="(st, index) in status" :key="index" :value="st.value">{{ st.name }}</option>
          </select>
        </div>

        <div>
          <label class="block font-medium text-lg text-gray-700 mb-2 text-center">Product Category</label>
          <select v-model="newProduct.category"
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-700 focus:outline-none">
            <option disabled :value="newProduct.catagories">Choose one</option>
            <option v-for="(catagory, index) in catagories" :key="index" :value="catagory.value">{{ catagory.name }}
            </option>
          </select>
        </div>

        <div class="col-span-1 sm:col-span-2">
          <label class="block font-medium text-lg  text-gray-700 mb-2 text-center">Description</label>
          <textarea v-model="newProduct.description" type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-700"
            placeholder="Enter your product information"></textarea>
        </div>

        <!-- <div class="mb-6 flex item-center">
          <input type="checkbox" class="mr-2">
          <label class="text-gray-700"> I agree to the terms and conditions </label>
        </div> -->


        <!-- 2. event trigger -->
        <!-- <button v-show="newProduct.id === undefined" @click="$emit('addNewProduct', newProduct)"
          class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">
          Add Product
        </button> -->

        <!-- <button v-show="newProduct.id !== undefined" @click="$emit('editProduct', newProduct)"
          class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">
          Edit Product
        </button> -->
        <!-- <button
        @click="checkData"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
      >
        Add Product
      </button> -->
      </div>
      <div>
        <div class="my-7 flex item-center">
          <input type="checkbox" class="mr-2">
          <label class="text-gray-700"> I agree to the terms and conditions </label>
        </div>


        <!-- 2. event trigger -->
        <button v-show="newProduct.id === undefined" @click="$emit('addNewProduct', newProduct)"
          class="w-full bg-indigo-500 text-white py-3 px-45 rounded-md hover:bg-indigo-600 transition-colors duration-300">
          Add Product
        </button>

        <button v-show="newProduct.id !== undefined" @click="$emit('editProduct', newProduct)"
          class="w-full bg-indigo-500 text-white py-3 px-45 rounded-md hover:bg-indigo-600 transition-colors duration-300">
          Edit Product
        </button>
      </div>
    </div>
  </div>

</template>
