<script setup>
import UserProductList from './UserProductList.vue';
import Header from "./Header.vue";
import { ref, onMounted } from 'vue'
import { getItems, getItemById, editItem, addItem } from '../libs/fetchUtils.js'

const myProducts = ref([])
const myCarts = ref([])
onMounted(async () => {
  try {
    myProducts.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
    myCarts.value = await getItems(`${import.meta.env.VITE_APP_URL}/carts`)
  } catch(error) {
    console.log(error);
  }
})

const currentProduct = ref({})
const addProductToCart = async (product) => {
    try {
        currentProduct.value = await getItemById(`${import.meta.env.VITE_APP_URL}/products`, product.id)
        if (currentProduct.value && currentProduct.value.stock > 0) {
            const addCart = await addItem(`${import.meta.env.VITE_APP_URL}/carts`, currentProduct.value)
            if (addCart) {
              myCarts.value.push(addCart)
            }
        }       
    } catch(error) {
        console.log(error);
    }
}
</script>

<template>
  <div>
    <Header :products="myCarts"/>
    <UserProductList :products="myProducts" @add-to-cart="addProductToCart"></UserProductList>
  </div>
</template>

<style scoped></style>
