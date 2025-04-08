<script setup>
import {storeToRefs} from "pinia";
import {useProducts} from "../stores/products.js"
import { onMounted } from "vue";
import { getItems } from "@/libs/fetchUtils.js";

const {products} = storeToRefs(useProducts())
console.log(products.value)

onMounted(async ()=>{
    products.value=await getItems(`${import.meta.env.VITE_APP_URL}/products`)
 console.log(products.value)
})

</script>

<template>


<ul v-for="(product,index) in products" :key="index">
    <router-link :to="{name:'UserProductDetail',params:{productId:product.id}}">
        <img :src="product.image" alt="">
        <li>Name: {{product.name}}</li>
        <li>Price: {{product.price}}</li>
        <li>Stock: {{product.stock}}</li>
    </router-link>
</ul>





</template>


<style scoped>


</style>