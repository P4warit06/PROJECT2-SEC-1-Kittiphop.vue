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

  <div class="max-w-lg mt-10 p-6 bg-white shadow-md rounded-md">
    <h1 class="text-4xl font-bold mb-10 text-blue-800 text-center w-full max-sm:text-xl">{{newProduct.id === undefined ?
      'Add New Product' : 'Edit Product'}}</h1>

    <div>
      <div div class="my-5">
        <label class="text-gray-700 font-medium mb-2">Product ID :</label>
        <input v-model="newProduct.id" type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter product ID" />
      </div>

      <div class="my-5">
        <label class="text-gray-700 font-medium mb-2">Product Name :</label>
        <input v-model="newProduct.productName" type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter product name" />
      </div>


      <div class="my-5">
        <label class="text-gray-700 font-medium mb-2">Price : </label>
        <input v-model.number="newProduct.price" type="number"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div class="my-5">
        <label class="text-gray-700 font-medium mb-2">Stock : </label>
        <input v-model.number="newProduct.stock" type="number"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
      </div>

      <div class="my-5">
        <label class="font-medium text-gray-700 mb-2">Status:</label>
        <select v-model="newProduct.status"
          class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
          <option disabled :value="newProduct.status">Active</option>
          <option v-for="(st, index) in status" :key="index" :value="st.value">{{ st.name }}</option>
        </select>
      </div>

      <div class="my-5">
        <label class="font-medium text-gray-700 mb-2">Category:</label>
        <select v-model="newProduct.category"
          class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
          <option disabled :value="newProduct.catagories">Choose one</option>
          <option v-for="(catagory, index) in catagories" :key="index" :value="catagory.value">{{ catagory.name }}
          </option>
        </select>
      </div>









      <!-- 2. event trigger -->
      <button v-show="newProduct.id === undefined" @click="$emit('addNewProduct', newProduct)"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">
        Add Product
      </button>

      <button v-show="newProduct.id !== undefined" @click="$emit('editProduct', newProduct)"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">
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
