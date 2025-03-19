<script setup>
import UserProductList from './UserProductList.vue';
import Header from "./Header.vue";
import { ref, onMounted } from 'vue'
import { getItems, getItemById, editItem } from '../libs/fetchUtils.js'

const myProducts = ref([])
onMounted(async () => {
  myProducts.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
})

onMounted(async () => {
  try {
    myProducts.value = await getItems(
      `${import.meta.env.VITE_APP_URL}/products`
    )
    console.log(myProducts.value)
    console.log(carts.value);
  } catch (error) {
    console.log(error)
  }
})

const carts = ref([])
const currentProduct = ref({})
const addProductToCart = async (product) => {
    try {
        currentProduct.value = await getItemById(`${import.meta.env.VITE_APP_URL}/products`, product.id)
        currentProduct.value.stock--
        carts.value.push(currentProduct.value)
        console.log(carts.value);
        // await editItem(`${import.meta.env.VITE_APP_URL}/products`, product.id, currentProduct.value)
    } catch(error) {
        console.log(error);
    }
}
</script>

<template>
  <div>
    <Header :products="carts"/>
    <UserProductList :products="myProducts" @add-to-cart="addProductToCart"></UserProductList>
  </div>
</template>

<style scoped></style>
