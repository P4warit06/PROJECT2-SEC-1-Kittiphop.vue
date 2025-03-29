<script setup>
import UserProductList from './UserProductList.vue';
import Header from "./Header.vue";
import { ref, onMounted, onUpdated, computed } from 'vue'
import { getItems, getItemById, editItem, addItem } from '../libs/fetchUtils.js'

const myProducts = ref([])
const myCarts = ref([])
const count = computed(() => {
  return myCarts.value.reduce((total, cart) => total + cart.quantity, 0);
})
onMounted(async () => {
  try {
    myProducts.value = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
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
                    cartItem.price = cartItem.quantity * currentProduct.value.price
                    const updatedCartItem = await editItem(`${import.meta.env.VITE_APP_URL}/carts`, cartItem.id, cartItem);
                    myCarts.value.splice(findIndexProduct, 1, updatedCartItem);
                } else {
                    console.log("Stock is not enough!");
                }
            } else {
                const newCartItem = { ...currentProduct.value, quantity: 1, price:currentProduct.value.price };
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
    <UserProductList :products="myProducts" @add-to-cart="addProductToCart"></UserProductList>
  </div>
</template>

<style scoped></style>
