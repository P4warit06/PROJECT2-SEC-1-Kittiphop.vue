<script setup>
import { computed, ref } from "vue";
import { previewBinaryFile } from '../../libs/utilities.js'


const emit = defineEmits(['addNewProduct', 'cancelAdding'])

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

const newProduct = ref({
  name: "",
  category: "",
  price: 0,
  status: "",
  stock: 0,
  image: "",
  description: ""
});

const imgFileName = ref("")
const chooseBinaryImg = (event) => {
  imgFileName.value = event.target.files[0].name
  if (imgFileName.value.endsWith(".jpg") || imgFileName.value.endsWith(".jpeg") || imgFileName.value.endsWith(".png")) {
      newProduct.value.image = previewBinaryFile(event.target.files[0])
  }
}
</script>

<template>
  <div class="fixed inset-0 flex justify-center items-center backdrop-blur-sm overflow-auto">
    <div class="p-10 bg-white rounded-3xl shadow-2xl max-w-4xl mx-auto flex flex-col justify-center items-center max-h-screen overflow-y-auto">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-10 text-center w-full max-sm:text-xl">Add New Product</h1>

      <div class="grid grid-cols-1 overflow-auto px-1 sm:grid-cols-2 gap-8 w-full">
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">Product Name:</label>
          <input v-model="newProduct.name" type="text" placeholder="Enter product name" 
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">Stock:</label>
          <input v-model="newProduct.stock" type="number" min="0" placeholder="Stock" 
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">Price:</label>
          <input v-model="newProduct.price" type="number" min="0" placeholder="Price" 
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">Status:</label>
          <select v-model="newProduct.status" 
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
            <option disabled value="">Choose one</option>
            <option v-for="(st, index) in status" :key="index" :value="st.value">{{ st.name }}</option>
          </select>
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">Category:</label>
          <select v-model="newProduct.category" 
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
            <option disabled value="">Choose one</option>
            <option v-for="(catagory, index) in catagories" :key="index" :value="catagory.value">{{ catagory.name }}</option>
          </select>
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">Upload Image:</label>
          <input type="file" accept=".jpg, .png, .jpeg" @change="chooseBinaryImg" 
            class="w-full border border-gray-300 rounded-xl px-5 py-3 cursor-pointer focus:ring-2 focus:ring-indigo-400 focus:outline-none">
          <div v-if="newProduct.image" class="mt-4 text-center">
            <a :href="newProduct.image" target="_blank" class="text-indigo-500 underline">View Image</a>
            <img :src="newProduct.image" alt="Product Image" class="mt-4 w-24 h-24 object-cover rounded-lg mx-auto">
          </div>
        </div>

        <div class="col-span-1 sm:col-span-2">
          <label class="block text-lg font-medium text-gray-700 mb-2">Description:</label>
          <textarea v-model="newProduct.description" placeholder="Product description" 
            class="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></textarea>
        </div>

        <div class="col-span-1 sm:col-span-2 flex gap-8 justify-center mt-4">
          <button @click="$emit('addNewProduct', newProduct, catagories)" 
            class="w-full sm:w-2/3 bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 cursor-pointer">Add</button>
          <button @click="$emit('cancelAdding')" 
            class="w-full sm:w-2/3 bg-gray-400 text-white py-3 rounded-xl hover:bg-red-500 cursor-pointer">Cancel</button>
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>
select > .placeholder {
  display: none;
}
</style>