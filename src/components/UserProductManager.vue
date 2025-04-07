<script setup>
import UserProductList from './UserProductList.vue'
import Header from "./Header.vue"
import { ref, onMounted, computed } from 'vue'
import { getItems, getItemById, editItem, addItem } from '../libs/fetchUtils.js' // เพิ่ม import editItem และ addItem
import { useRouter } from 'vue-router'
import {useProducts} from '../stores/products.js'

const {initialProducts, getProducts } = useProducts()

const getUser = ref(JSON.parse(localStorage.getItem("currentUser")))
const myUser = ref({})
const myCarts = ref([])

const count = computed(() => {
  return myCarts.value?.reduce((total, cart) => total + (cart.quantity || 0), 0) || 0
})

onMounted(async () => {
  try {
    if (getUser.value) {
        myUser.value = await getItemById(`${import.meta.env.VITE_APP_URL}/users`, getUser.value.id)
        myCarts.value = [...myUser.value.carts]
        console.log(myUser.value)
        console.log(myCarts.value)
    } else {
      console.warn("No user logged in")
    }
    
    const fetchedProducts = await getItems(`${import.meta.env.VITE_APP_URL}/products`)
    initialProducts(fetchedProducts)
    console.log(count.value)
  } catch(error) {
    console.error("Error in UserProductManager setup:", error)
  }
})

const currentProduct = ref({})
const addProductToCart = async (product) => {
    try {
        currentProduct.value = await getItemById(`${import.meta.env.VITE_APP_URL}/products`, product.id)
        if (currentProduct.value && currentProduct.value.stock > 0) {
            const findIndexProduct = myCarts.value.findIndex((cartItem) => cartItem.id === currentProduct.value.id)
            if (findIndexProduct !== -1) {
                const cartItem = myCarts.value[findIndexProduct]
                if (cartItem.quantity < currentProduct.value.stock) {
                    cartItem.quantity += 1
                    cartItem.price = cartItem.quantity * currentProduct.value.price
                    myCarts.value.splice(findIndexProduct, 1, cartItem)
                    myUser.value.carts.splice(findIndexProduct, 1, cartItem)
                    await editItem(`${import.meta.env.VITE_APP_URL}/users`, myUser.value.id, myUser.value)
                } else {
                    console.log("Stock is not enough!")
                }
            } else {
                const newCartItem = { 
                  ...currentProduct.value, 
                  quantity: 1, 
                  price: currentProduct.value.price 
                }
                myCarts.value.push(newCartItem)
                myUser.value.carts.push(newCartItem)             
                await editItem(`${import.meta.env.VITE_APP_URL}/users`, myUser.value.id, myUser.value)
              }
        }
    } catch (error) {
        console.log(error)
    }
}
</script>



<template>
  <div>
    <Header :count="count"/>
    <UserProductList :products="getProducts()" @add-to-cart="addProductToCart"></UserProductList>
  </div>
</template>

<style scoped></style>
