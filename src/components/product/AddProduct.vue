<script setup>
import { ref } from "vue";
import { previewBinaryFile } from '../lib/utilities.js'

const catagories = ref([
  {name:"Accessories", value:"accessories"},
  {name:"Audio", value:"audio"},
  {name:"Electronics", value:"electronics"},
  {name:"Wearables", value:"wearables"}
])

const status = ref([
  {name: "Active", value:"active"},
  {name: "Low Stock", value:"low stock"},
  {name: "Out of Stock", value:"out of stock"}
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
  <div class="mb-5">
    <div>
      <label>Product name: </label>
      <input v-model="newProduct.name" type="text" placeholder="Enter product name" class="border border-black rounded-lg">
    </div>

    <div>
      <label>Stock: </label>
      <input v-model="newProduct.stock" min="0" type="number" placeholder="Stock" class="border border-black rounded-lg">
    </div>

    <div>
      <label>Price: </label>
      <input v-model="newProduct.price" min="0" type="number" placeholder="Price" class="border border-black rounded-lg">
    </div>

    <div>
      <label>Status: </label>
      <select v-model="newProduct.status" class="border border-black rounded-lg">
        <option class="placeholder" selected disabled value="">Chose one</option>
        <option v-for="(st, index) in status" :key="index" :value="st.value">{{ st.name }}</option>
      </select>
    </div>

    <div>
      <label>Catagory: </label>
      <select v-model="newProduct.catagory" class="border border-black rounded-lg">
        <option class="placeholder" selected disabled value="">Chose one</option>
        <option v-for="(catagory, index) in catagories" :key="index" :value="catagory.value">{{ catagory.name }}</option>
      </select>
    </div>

    <div>
      <label>Upload Image </label>
      <input class="border border-black rounded-lg cursor-pointer" type="file" accept=".jpg, .png, .jpeg" @change="chooseBinaryImg">
      <br>
      <a :href="newProduct.image" target="_blank">
        {{ newProduct.image }}
        <img v-show="newProduct.image" :src="newProduct.image" alt="img" width="100" height="100">
      </a>
    </div>

    <div class="flex justify-start items-center">
      <label>Description</label>
      <textarea v-model="newProduct.description" placeholder="Product description" class="border border-black rounded-lg cursor-pointer"></textarea>
    </div>
  </div>
</template>

<style scoped>
select > .placeholder {
  display: none;
}
</style>
