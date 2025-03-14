<script setup>
import data from "../../../data/db.json";
import ProductList from "./ProductList.vue";
import AddProduct from "./AddProduct.vue";
import UpdateProduct from "./updateProduct.vue"; 
import Header from "../common/Header.vue";
import { ref } from "vue";

const myProducts = ref(data.products);
const isAdding = ref(false);
const isUpdate = ref(false);

const listCategory = () => {
  const categories = new Set(myProducts.value.map((product) => product.category));
  return categories
}



const addProduct = (product) => {
  if (product) {
    myProducts.value.push(product);
    isAdding.value = false;
  }
};
// ice 
// Function to update 
const updateProduct = (id, newData) => {  
  const index = myProducts.value.findIndex(item => item.id === id);

  if (index === -1) {
    throw new Error(`Cannot find the product with ID: ${id}`);
  }

  myProducts.value[index] = { ...myProducts.value[index], ...newData };
  isUpdate.value = false; // Hide update form after updating
};

// ทำเผื่อไว้ได้ใช้งาน
const cancelUpdate = () => {
  isUpdate.value = false;
};
// ice 

const cancelAdding = () => {
  isAdding.value = false;
};
</script>

<template>
  <div>
    <Header :categories="listCategory()"></Header>
    <AddProduct v-show="isAdding" @add-new-product="addProduct" @cancel-adding="cancelAdding" :is-adding="isAdding"></AddProduct>
    <div class="w-full flex justify-center items-center my-4">
      <button v-show="!isAdding" @click="isAdding = !isAdding"
        class="bg-green-400 py-2 px-4 rounded-lg cursor-pointer hover:opacity-80 text-white">
        Add Product
      </button>
    </div>
    <!-- // Ice  -->
    <!-- <button v-show="!isUpdate" @click="isUpdate = !isUpdate" class="bg-blue-400 py-3 px-4 rounded-lg">
      <span class="text-white">Update Product</span>
    </button>
    <UpdateProduct v-show="isUpdate" @update-product="updateProduct"></UpdateProduct> -->
    <!-- Ice  -->
    <ProductList :products="myProducts"></ProductList>
  </div>
</template>
