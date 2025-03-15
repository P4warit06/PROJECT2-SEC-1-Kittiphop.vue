<script setup>
import ProductList from "./ProductList.vue";
import AddProduct from "./AddProduct.vue";
import Header from "../common/Header.vue";

import { ref, onMounted } from "vue";

const myProducts = ref([]);
const productCategories = ref([])
const filterCategories = ref([])
const isAdding = ref(false)
import { getItems, getItemById, addItem} from "../../libs/fetchUtils.js"
onMounted(async () => {
  myProducts.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
  productCategories.value = myProducts.value.map((product) => product.category).filter((category) => category !== null && category !== undefined)
  filterCategories.value = productCategories.value.filter((category, index) => productCategories.value.indexOf(category) === index)
})

const addProduct = async(product) => {
  try {
    if (product) {
      const newProduct = await addItem(`${import.meta.env.VITE_APP_URL}/products`, product)
      myProducts.value.push(newProduct)
      isAdding.value = false
    }
  } catch(error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <Header :categories="filterCategories"/>
    <div>
      <AddProduct v-show="isAdding" @add-new-product="addProduct" @cancel-adding="isAdding = false"></AddProduct>
      <div class="w-full flex justify-center items-center cursor-pointer">
        <button v-show="!isAdding" @click="isAdding = true" class="bg-green-300 rounded-lg p-3 my-3 cursor-pointer">Add product</button>
      </div>
      <ProductList :products="myProducts"></ProductList>
    </div>
  </div>
</template>

<style scoped></style>
