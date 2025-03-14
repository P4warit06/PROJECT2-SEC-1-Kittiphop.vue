<script setup>
import ProductList from "./ProductList.vue";
import AddProduct from "./AddProduct.vue";

import { ref, onMounted } from "vue";

const myProducts = ref([]);
const isAdding = ref(false)
import { getItems, getItemById, addItem} from "../../libs/fetchUtils.js"
onMounted(async () => {
  myProducts.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
  console.log(myProducts.value)
})

const addProduct = async(product) => {
  try {
    const newProduct = await addItem(`${import.meta.env.VITE_APP_URL}/products`, product)
    myProducts.value.push(newProduct)
    isAdding.value = false
  } catch(error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <AddProduct v-show="isAdding" @add-new-product="addProduct" @cancel-adding="isAdding = false"></AddProduct>
    <div class="w-full flex justify-center items-center">
      <button v-show="!isAdding" @click="isAdding = true" class="bg-green-300 rounded-lg p-3 my-3">Add product</button>
    </div>
    <ProductList :products="myProducts"></ProductList>
  </div>
</template>

<style scoped></style>
