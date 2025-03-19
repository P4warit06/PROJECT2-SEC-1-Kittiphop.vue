<script setup>
import UserProductList from './UserProductList.vue';
import Header from "./Header.vue";
import { ref, onMounted } from 'vue'
import { getItems } from '../libs/fetchUtils.js'

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
  } catch (error) {
    console.log(error)
  }
})

</script>

<template>
  <div>
    <Header :categories="filterCategories" />
    <UserProductList :products="myProducts"/>
  </div>
</template>

<style scoped></style>
