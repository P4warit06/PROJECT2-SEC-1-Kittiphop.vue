<script setup>
import ProductList from "./ProductList.vue";
import AddProduct from "./AddProduct.vue";

import { ref, onMounted } from "vue";

const myProducts = ref([]);
import { getItems, getItemById} from "../../libs/fetchUtils.js"
onMounted(async () => {
  myProducts.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
  console.log(myProducts.value)
})

</script>

<template>
  <div>
    <!-- 3. call handler function -->
    <!-- <AddProduct @add-new-product="addProduct" /> -->
    <ProductList :products="myProducts"></ProductList>
  </div>
</template>

<style scoped></style>
