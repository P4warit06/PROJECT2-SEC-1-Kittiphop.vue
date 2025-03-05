<script setup>
import data from "../../../data/db.json";
import ProductList from "./ProductList.vue";
import AddProduct from "./AddProduct.vue";

import { ref } from "vue";

const myProducts = ref(data.products);

const addProduct = (product) => {
  //validate
  myProducts.value.push(product);
};
</script>

<template>
  <div>
    <!-- 3. call handler function -->
    <!-- <AddProduct @add-new-product="addProduct" /> -->
    <ProductList :products="myProducts"></ProductList>
  </div>
</template>

<style scoped></style>
