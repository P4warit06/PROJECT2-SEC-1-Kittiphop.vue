<script setup>
import { computed, ref } from "vue";
import { previewBinaryFile } from '../lib/utilities.js'
import Header from "../common/Header.vue";


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
  catagory: "",
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
  <div class="p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
    <h1 class="text-2xl font-semibold mb-5 text-center">Add New Product</h1>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Product Name:</label>
        <input 
          v-model="newProduct.name" 
          type="text" 
          placeholder="Enter product name" 
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 shadow-md"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Stock:</label>
        <input 
          v-model="newProduct.stock" 
          min="0" 
          type="number" 
          placeholder="Stock" 
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 shadow-md"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Price:</label>
        <input 
          v-model="newProduct.price" 
          min="0" 
          type="number" 
          placeholder="Price" 
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 shadow-md"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Status:</label>
        <select 
          v-model="newProduct.status" 
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 shadow-md"
        >
          <option class="placeholder" selected disabled value="">Choose one</option>
          <option v-for="(st, index) in status" :key="index" :value="st.value">{{ st.name }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Category:</label>
        <select 
          v-model="newProduct.catagory" 
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 shadow-md"
        >
          <option class="placeholder" selected disabled value="">Choose one</option>
          <option v-for="(catagory, index) in catagories" :key="index" :value="catagory.value">{{ catagory.name }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Upload Image:</label>
        <input 
          class="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer focus:ring-2 focus:ring-blue-400 shadow-md" 
          type="file" 
          accept=".jpg, .png, .jpeg" 
          @change="chooseBinaryImg"
        />
        <div class="mt-3">
          <a :href="newProduct.image" target="_blank" class="text-blue-500 underline">
            {{ newProduct.image }}
          </a>
          <img v-show="newProduct.image" :src="newProduct.image" alt="img" class="mt-2 rounded-lg border w-24 h-24 object-cover">
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Description:</label>
        <textarea 
          v-model="newProduct.description" 
          placeholder="Product description" 
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 shadow-md"
        ></textarea>
      </div>

      <div class="w-full flex flex-col justify-center items-center">
        <div class="w-full flex justify-center items-center mb-4">
          <button
          @click="$emit('addNewProduct', newProduct)"
          class="w-full bg-green-400 py-2 px-4 rounded-lg cursor-pointer hover:opacity-80">Add Product</button>
        </div>
        <div class="w-full flex justify-center items-center">
          <button 
          @click="$emit('cancelAdding')"
          class="w-full bg-gray-400 py-2 px-4 rounded-lg cursor-pointer hover:opacity-80">Cancel</button>
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
