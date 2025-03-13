<script setup>
import data from "../../../data/db.json";
import ProductList from "./ProductList.vue";
import AddProduct from "./AddProduct.vue";
import { ref } from "vue";

const myProducts = ref(data.products);
const isAdding = ref(false)
const addProduct = (product) => {
  if (product) {
    myProducts.value.push(product)
    isAdding.value = false
  }
}

const cancelAdding = () => {
  isAdding.value = false
}

</script>

<template>
  <div>
    <div class="w-full flex justify-center items-center my-4">
      <button
      v-show="!isAdding"
      @click="isAdding = !isAdding"
      class="bg-green-400 py-2 px-4 rounded-lg cursor-pointer hover:opacity-80">Add Product</button>
    </div>
    <AddProduct v-show="isAdding" @add-new-product="addProduct" @cancel-adding="cancelAdding" :is-adding="isAdding"></AddProduct>
    <ProductList :products="myProducts"></ProductList>
  </div>
</template>

<style scoped></style>
