<script setup>
import UserProductList from './UserProductList.vue';
import Header from "./Header.vue";
import { ref, onMounted, computed } from 'vue'
import { getItems, getItemById, editItem, addItem } from '../libs/fetchUtils.js' // เพิ่ม import editItem และ addItem

import {useProducts} from '../stores/products.js'
const {initialProducts, getProducts } =useProducts();

const myCarts = ref([])
const count = computed(() => {
  return myCarts.value.reduce((total, cart) => total + cart.quantity, 0);
})

onMounted(async () => {
  try {
    const fetchedProducts = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
    initialProducts(fetchedProducts)
    
    myCarts.value = await getItems(`${import.meta.env.VITE_APP_URL}/carts`)
    console.log(count.value);
  } catch(error) {
    console.log(error);
  }
})

const currentProduct = ref({})
const addProductToCart = async (product) => {
    try {
        currentProduct.value = await getItemById(`${import.meta.env.VITE_APP_URL}/products`, product.id);
        if (currentProduct.value && currentProduct.value.stock > 0) {
            const findIndexProduct = myCarts.value.findIndex((cartItem) => cartItem.id === currentProduct.value.id);
            if (findIndexProduct !== -1) {
                const cartItem = myCarts.value[findIndexProduct];
                if (cartItem.quantity < currentProduct.value.stock) {
                    cartItem.quantity += 1;
                    cartItem.price = cartItem.quantity * currentProduct.value.price; // คำนวณราคาใหม่
                    const updatedCartItem = await editItem(`${import.meta.env.VITE_APP_URL}/carts`, cartItem.id, cartItem);
                    myCarts.value.splice(findIndexProduct, 1, updatedCartItem);
                } else {
                    console.log("Stock is not enough!");
                }
            } else {
                const newCartItem = { 
                  ...currentProduct.value, 
                  quantity: 1, 
                  price: currentProduct.value.price 
                };
                const addedCartItem = await addItem(`${import.meta.env.VITE_APP_URL}/carts`, newCartItem);
                myCarts.value.push(addedCartItem);
            }
        }
    } catch (error) {
        console.log(error);
    }
};
</script>



<template>
  <div>
    <Header :count="count"/>
    <UserProductList :products="getProducts()" @add-to-cart="addProductToCart"></UserProductList>
  </div>
</template>

<style scoped></style>
